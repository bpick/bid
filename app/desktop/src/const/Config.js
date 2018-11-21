Ext.define('Bidmo.constant.Config', {
    alternateClassName: 'CFG',
    singleton: true,
    constructor: function(cfg) {
        this.callParent(arguments);
    },
    SESSION_KEY: "session",
    SERVER_API: 'localhost:60615',
    //SERVER_API: '10.200.10.4:5050',
    LOGGER_API: '/logger/submitError'
});