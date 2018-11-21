Ext.define('Bidmo.model.Session', {
    extend: 'Ext.data.Model',
    alternateClassName: 'Session',
    fields: [
        { name: 'access_token', type: 'string' },
        { name: 'expires_in', type: 'date' },
        { name: 'refresh_token', reference: 'Person' }
    ],
    
    statics: {
        login: function(data, url) {
            return new Ext.Promise(function(resolve, reject) {
                let user = data;
                let queryStr = Ext.Object.toQueryString(user);
                // default request route api to get token as /api/token/GetToken
                url = url || HttpAction.getUrl() + '/api/token/GetToken'
                var request = {
                    url:  `${url}?${queryStr}`
                };
                AjaxRequest.executeGetRequest(request).then(function(response) {
                    if(response.success) {
                        let session = Session.loadData(response.result);
                        if(!session.isValid()) {
                            reject(`Session ${session} is invalid`);
                        }
                        resolve(session);
                    }
                    reject(response.message);
                }).catch(function(response) {
                    reject(response.message);
                });
            });
        
        }
    },
    isValid: function() {
        if(!Ext.isEmpty(this.get(`access_token`)
            && this.get(`expires_in`) > new Date())) {
                return true;
            }
        return false;
    },
    logout: function() {
        return new Ext.Promise(function(resolve, reject) {
            var request = {
                url: HttpRequest.getUrl() + '/logout'
            };
            AjaxRequest.executeGetRequest(request).then(function(response) {
                resolve();
            });
        });
    }
});
