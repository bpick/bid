Ext.define('Bidmo.view.auth.Login', {
    extend: 'Ext.container.Container',
    xtype: 'login',
    layout: 'center',
    controller: 'login',
    cls: 'login-page',
    items: [{
        xtype: 'flex-login',
        imageSize: 120,
        plugins: 'responsive',
        responsiveConfig: {
            'width <= 1280': {
                imageSize: 86
            },

            'width > 1280': {
                imageSize: 140
            },
            '(width < 500)': {
                width: 350
            }
        },
        width: 400,
        bodyPadding: '0 16 16 16',
    }],
    listeners: {
        initialize: function(login) {
            let me = this;
            me.setKeyMap({
                scope: 'this',
                ENTER: 'onEnterKey'
            });
            // focus to username field
            var loginForm = me.getLoginForm();
            loginForm.focusUser();

            // fire login action when user taps submit button
            let submitBtn = loginForm.getSubmitBtn();
            submitBtn.on('tap', me.doLogin, me);
        }
    },
    onEnterKey: function() {
        this.doLogin();
    },
    doLogin: function() {
        var me = this;
        me.fireEvent('onLogin', me);
    },
    getLoginForm: function() {
        return this.down('flex-login')
    }
});