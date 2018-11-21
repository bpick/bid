/**
 * @class Bidmo.controller.common.Main
 * @extends Bidmo.controller.Base
 * A sharing controller between multiple profiles
 */
Ext.define('Bidmo.controller.common.Main', {
    extend: 'Bidmo.controller.Base',
    requires: [
        'Ext.util.Format'
    ],
    listen: {
        controller: {
            '*': {
                'login': 'controlLogin',
                'logout': 'controlLogout'
            }
        }
    },
    control: {
        '*': {
            'logout': 'controlLogout'
        }
    },
    routes: {
        'login': 'handleLogin',
        ':type': {
            action: 'handleModule',
            conditions: {
                ':type': '(home)'
            }
        }
    },
    refs: [{
        ref: 'main',
        selector: 'main'
    }],
    mixins: {
        ensureview: 'Bidmo.mixins.EnsureView'
    },
    init: function () {
        let me = this;
        me.ensureview = me.mixins.ensureview;
        me.originalRoute = Bidmo.getApplication().getDefaultToken();
        // setup http action
        HttpAction.setUrl(CFG.SERVER_API);

        me.session = me.restoreSession();
        if (me.session) {
    
            me.getUserInfo().then(function (response) {
                me.initUserInfo(response.result);
            }).catch(function (err) {
                MsgError.show(err);
            }).then(function () {
                // nothing
            });
        } else {
            me.terminateSession();
        }
    },

    terminateSession: function () {
        this.callParent(arguments);
        this.redirectTo('home');
    },
    // login section
    handleLogin: function () {
        this.showAuth();
    },
    showAuth: function () {
        let me = this;
        me.showView('login');
    },
    // module section
    handleModule: function (type) {
        var me = this,
            mainView = me.getMainView(),
            xtype, viewId, view;
        xtype = viewId = type;

        // leave a developer message in case of new types addition
        if (!Ext.ClassManager.getNameByAlias('widget.' + xtype)) {
            Ext.log.error('Invalid route: no view for xtype: ' + xtype);
        }
        let _view = me.ensureView(mainView, xtype, viewId);
        mainView.setActiveItem(_view);
    },
    /**
     * return application main view
     */
    getMainView: function () {
        let viewport = this.getViewport();
        var mainview = this.ensureMainView();
        viewport.setActiveItem(mainview);
        return mainview;
    },
    ensureMainView: function() {
        var me = this,
            viewport = me.getViewport();

        return this.ensureView(viewport, 'main');
    },
    ensureView: function(viewport, xtype) {
        var me = this;

        var _view = viewport.child(xtype);
        if(!_view) {
            _view = Ext.create({
                xtype: xtype
            });
            viewport.add(_view);
        }
            
        return _view;
    },
    controlLogin: function (session) {
        let me = this;
        if (!session || !session.isValid()) {
            return false;
        }
        me.session = me.initiateSession(session);

        // if originalRoute is present and differs than default token, redirect to it
        if (me.originalRoute !== Bidmo.app._defaultToken) {
            me.redirectTo(`${me.originalRoute}`, { replace: true });
        } else {
            let mainView = this.getMain();
            mainView.getController().navigateToNextProduct();
        }

        me.getUserInfo().then(function (response) {
            me.initUserInfo(response.result);
        }).catch(function (err) {
            MsgError.show(err);
        }).then(function () {
            // nothing
        });
    },
    controlLogout: function () {
        var me = this,
            session = me.session;

        if (!session || !session.isValid()) {
            return false;
        }

        Ext.Viewport.setMasked({ xtype: 'loadmask' });
        session.logout().catch(function () {
            // TODO handle errors
        }).then(function () {
            me.removeHeaderToken();
            me.originalRoute = Ext.History.getToken();
            me.terminateSession();
            Ext.Viewport.setMasked(false);
            me.redirectTo('home');
        });
    },
    
    getUserInfo: function () {
        let url = HttpAction.getUrl() + '/flex/user/user-detail';
        return new Ext.Promise(function (resolve, reject) {
            let request = {
                url: url
            };
            AjaxRequest.executeGetRequest(request).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                reject(err)
            });
        });
    },
    initUserInfo: function (userInfo) {
        let viewport = Ext.Viewport,
            vpModel = viewport.getViewModel();
        // strawberry
        userInfo = Ext.apply(userInfo, {
            Avatar: Ext.getResourcePath('default.png', null, 'images')
        });
        vpModel.set('user', userInfo);
    },
    // end routes action
    getViewport: function () {
        return Bidmo.app.viewport;
    }
});