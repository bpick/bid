Ext.define('Bidmo.storage.State', {
    alternateClassName: 'State',
    requires: [
        'Ext.util.LocalStorage'
    ],
    singleton: true,
    key: 'session',
    /**
     * @cfg {Ext.util.LocalStorage} store
     * A local storage that used to save access token
     */
    store: new Ext.util.LocalStorage({
        id: 'local-20'
    }),
    get: function(key, defaultValue) {
        var value = this.store && this.store.getItem(key);
        if(!value) return undefined;
        let data = Ext.JSON.decode(value, true) || defaultValue;
        return data;
    },
    set: function(key, value) {
        if(!this.store) return;
        if( value !== null) {
            this.store.setItem(key, value);
            return true;
        } else {
            this.store.removeItem(key);
        }
    },
    getStorage: function() {
        var value = this.store && this.store.getItem(State.key);
        if(!value) return undefined;
        let data = Ext.JSON.decode(value) || defaultValue;
        return data;
    },
    clearValue: function(key) {
        this.set(key, null);
    }
});