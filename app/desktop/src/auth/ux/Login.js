
Ext.define('Bidmo.auth.ux.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'flex-login',

    requires: [
        'Ext.field.Toggle',
        'Ext.field.Display',
        'Ext.layout.VBox',
        'Ext.Img',
        'Ext.util.KeyMap'
    ],
    config: {
        /**
        * image size logo
        */
        imageSize: undefined,
        /**
         * submit button
         */
        submitBtn: undefined,
        /**
         * login form width
         */
        loginWidth: undefined,
        /**
         * login body padding
         */
        loginPadding: undefined,
    },
    cls: Ext.baseCSSPrefix + 'auth',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'start'
    },
    defaults: {
        width: '100%'
    },
    items: [{
        xtype: 'image',
        cls: 'auth-header',
        mode: 'img',
        width: 'auto',
        reference: 'image',
        src: Ext.getResourcePath('default_trans.png', null, 'images')
    }, {
        xtype: 'textfield',
        name: 'username',
        itemId: 'username',
        label: 'USERNAME',
        labelAlign: 'top',
        placeholder: 'Type your username',
        ui: 'auth',
        required: true,
        triggers: {
            user: {
                iconCls: 'x-fa fa-user',
                side: 'left'
            }
        },

        classCls: Ext.baseCSSPrefix + 'ixuser'
    }, {
        xtype: 'textfield',
        name: 'password',
        itemId: 'password',
        label: 'PASSWORD',
        labelAlign: 'top',
        placeholder: 'Type your password',
        ui: 'auth',
        required: true,
        inputType: 'password',

        triggers: {
            password: {
                iconCls: 'x-fa fa-lock',
                side: 'left'
            }
        },

        classCls: Ext.baseCSSPrefix + 'ixpassword'
    }, {
        xtype: 'button',
        text: 'LOGIN',
        itemId: 'submit-btn',
        ui: 'action auth round',
        formBind: true,
        margin: '20 0 0 0'
    }],
    getSubmitBtn: function() {
        return this.getComponent('submit-btn');
    },
    getUserField: function() {
        return this.getComponent('username');
    },
    getPasswordField: function() {
        return this.getComponent('password');
    },
    updateImageSize: function(imageSize) {
        let img = this.down('image');
        img.setHeight(imageSize);
    },
    focusUser: function() {
        let me = this,
            usrField = me.getUserField();
        me.parent.onAfter('show', function() {
            usrField.rendered = true;
            usrField.focus(true, false);
        });
    },
    handlerLogin: Ext.emptyFn,
    getLoginData: function() {
        let usrField = this.getUserField();
            let passwdField = this.getPasswordField();;
        return {
            username: usrField.getValue(),
            password: passwdField.getValue()
        }
    }
});