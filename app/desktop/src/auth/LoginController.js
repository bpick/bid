Ext.define('Bidmo.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    control: {
        '*': {
            'onLogin': 'onLoginTap'
        }
    },
    onLoginTap: function(btn) {
        let me = this,
            view = me.getView(),
            loginForm = view.getLoginForm(),
            url = HttpAction.getUrl() + '/api/token/GetToken';
            
        let data = loginForm.getLoginData();
        // call form validate
        if(!loginForm.validate()) return false;
        Ext.Viewport.setMasked({ xtype: 'mask' });
        
        Session.login(data, url).then(function(session) {
            me.fireEvent('login', session?session:null);
        }).catch(function(err) {
            MsgError.show(err);
        }).then(function() {
            Ext.Viewport.setMasked(false);
        });
    }
});