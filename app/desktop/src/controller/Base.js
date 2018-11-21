
Ext.define('Bidmo.controller.Base', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.util.Format'
    ],
    config: {
        sessionKey: 'session'
    },
    refs: {
    },
    restoreSession: function (key) {
        let me = this;
        key = key || 'session';
        let session = Session.loadData(State.get(key));

        if (session && session.isValid()) {
            return me.initiateSession(session);
        } else {
            me.terminateSession();
        }
        return null;
    },

    initiateSession: function (session) {
        this.setHeaderToken(session);
        this.saveSession(session);
        this.showMain();
        return session;
    },
    // Session
    terminateSession: function () {
        this.saveSession(null);
        return null;
    },
    saveSession: function (session, key) {
        var me = this,
            key = key || me.getSessionKey();
        if (session) {
            State.set(key, session && session.getData(true));
            return session;
        } else {
            State.set(key, null);
            return me.session = null;
        }
    },
    // End session
    /**
     * alert an error
     * @method showError
     * @param {string} err
     */
    showError: function (err) {
        Ext.Msg.alert('Error', err);
    },
    /**
     * activate a specific view on mainView
     * 
     * @method showView
     * @param {string} xtype
     * @param {object} mainview
     */
    showView: function (xtype) {
        let viewport = Ext.Viewport;
        var view = viewport.getController().lookup(xtype);

        if (!view) {
            //viewport.removeAll();
            view = viewport.add({
                xtype: xtype,
                reference: xtype
            });
        }

        viewport.setActiveItem(view);
    },
    showMain: function () {
        this.showView('main');
    },
    /**
     * Load an input package if package does not load
     * 
     * @param {pkg} package name
     * @return Promise
     */
    loadPkg: function (pkg) {
        if (pkg && !Ext.Package.isLoaded(pkg)) {
            // load package
            return Ext.Package.load(pkg);
        }

        return new Ext.Promise(function (resolve) {
            resolve();
        });
    },
    /**
     * set header Authorization with receive token as bearer token
     * @param session
     */
    setHeaderToken: function (session) {
        var headers = {
            'Authorization': 'Bearer ' + session.get('access_token')
        };
        // set default header for Ext.Ajax
        Ext.Ajax.setDefaultHeaders(headers);
        // set default header for wrapper AjaxRequest
        AjaxRequest.setDefaultHeaders(headers);
    },
    removeHeaderToken: function () {
        // set default header for Ext.Ajax
        Ext.Ajax.setDefaultHeaders(null);
        // set default header for wrapper AjaxRequest
        AjaxRequest.setDefaultHeaders(null);
    }
});