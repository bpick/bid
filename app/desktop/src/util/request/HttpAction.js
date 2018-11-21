
Ext.define('Bidmo.util.request.HttpAction', {
    singleton: true,
    alternateClassName: 'HttpAction',
    config: {
        url: undefined
    },
    updateUrl: function(url) {
        this._url = this.buildSchema(url);
    },
    privates: {
        buildSchema: function(url) {
            var schemaReg = new RegExp("^http|https", "i");
            if(!schemaReg.test(url)) {
                url = Ext.String.format('{0}//{1}', window.location.protocol, url);
            }
            return url;
        }
    }
    
});