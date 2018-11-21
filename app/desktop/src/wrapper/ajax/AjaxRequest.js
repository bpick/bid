/**
 * 
 */
Ext.define('Bidmo.wrapper.ajax.AjaxRequest', {
    extend: 'Ext.data.Connection',
    alternateClassName: 'AjaxRequest',
    singleton: true,
    defaultTimeout: 120000,
    // status code
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOTFOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    /**
     * @cfg {Object} extraParams
     * @hide
     */

    /**
     * @cfg {Object} defaultHeaders
     * @hide
     */

    /**
     * @cfg {String} method
     * @hide
     */

    /**
     * @cfg {Number} timeout
     * @hide
     */

    /**
     * @cfg {Boolean} autoAbort
     * @hide
     */

    /**
     * @cfg {Boolean} disableCaching
     * @hide
     */

    /**
     * @property {Boolean} disableCaching
     * True to add a unique cache-buster param to GET requests. Defaults to true.
     */

    /**
     * @property {String} url
     * The default URL to be used for requests to the server.
     * If the server receives all requests through one URL, setting this once is easier than
     * entering it on every request.
     */

    /**
     * @property {Object} extraParams
     * An object containing properties which are used as extra parameters to each request made
     * by this object. Session information and other data that you need
     * to pass with each request are commonly put here.
     */

    /**
     * @property {Object} defaultHeaders
     * An object containing request headers which are added to each request made by this object.
     */

    /**
     * @property {String} method
     * The default HTTP method to be used for requests. Note that this is case-sensitive and
     * should be all caps (if not set but params are present will use `POST`, otherwise will
     * use `GET`.)
     */

    /**
     * @property {Number} timeout
     * The timeout in milliseconds to be used for requests. Defaults to 30000.
     *
     * When a request fails due to timeout the XMLHttpRequest response object will
     * contain:
     *
     *     timedout: true
     */

    /**
     * @property {Boolean} autoAbort
     * Whether a new request should abort any pending requests.
     */
    autoAbort: false,

    executeGetRequest: function (request) {
        // set GET method
        request.method = 'GET';
        return this.executeRequest(request);
    },
    executePostRequest: function (request) {
        // set POST method
        request.method = 'POST';
        return this.executeRequest(request);
    },
    executeRequest: function (request) {
        var me = this;
        return new Ext.Promise(function (resolve, reject) {

            request.success = function (response) {
                // Use the provided "resolve" method to deliver the result.
                var msg = Ext.JSON.decode(response.responseText, true);
                if ((response.status == 200 && response.success) || !msg || msg.success || msg === true) {
                    resolve(msg || "");
                } else {
                    reject(msg);
                }
            };

            request.failure = function (response) {
                var errorMsg = Ext.JSON.decode(response.responseText, true);
                if (Ext.isObject(errorMsg)) {
                    var msg = "";
                    if (errorMsg.hasOwnProperty('ExceptionMessage')) {
                        msg += errorMsg.ExceptionMessage + '<br/>';
                    }
                    else if (errorMsg.hasOwnProperty('StackTrace')) {
                        msg += errorMsg.StackTrace + '<br/>';
                    }
                    else if (errorMsg.hasOwnProperty('message')) {
                        msg += errorMsg.message + '<br/>';
                    }
                    reject(msg);
                } else {
                    reject(response);
                }
            };
            me.request(request);
        });
    },
    handleException: Ext.emptyFn,
    handleBadrequest: Ext.emptyFn,
    handleForbidden: Ext.emptyFn,
    handleUnauthorized: Ext.emptyFn,
    handleNotfound: Ext.emptyFn,
    handleInternalError: Ext.emptyFn,
    handleComplete: Ext.emptyFn

}, function () {
    let me = this, timeout;
    timeout = me.getTimeout() || me.defaultTimeout;
    me.setTimeout(timeout);

    me.on({
        scope: me,
        requestexception: function (conn, response, options, eOpts) {
            switch (response.status) {
                case AjaxRequest.BAD_REQUEST:
                    AjaxRequest.handleBadrequest(conn, response, options, eOpts);
                    break;
                case AjaxRequest.FORBIDDEN:
                    AjaxRequest.handleForbidden(conn, response, options, eOpts);
                    break;
                case AjaxRequest.UNAUTHORIZED:
                    AjaxRequest.handleUnauthorized(conn, response, options, eOpts);
                    break;
                case AjaxRequest.NOTFOUND:
                    AjaxRequest.handleNotfound(conn, response, options, eOpts);
                    break;
                case AjaxRequest.INTERNAL_SERVER_ERROR:
                    AjaxRequest.handleInternalError(conn, response, options, eOpts);
                    break;
                default:
                    AjaxRequest.handleException(conn, response, options, eOpts);
                    break;

            }
        },
        requestcomplete: function (conn, response, options, eOpts) {
            if (Ext.isFunction(AjaxRequest.handleComplete)
                && !Ext.isEmpty(AjaxRequest.handleComplete))
                AjaxRequest.handleComplete(conn, response, options, eOpts);
        }
    });
});