Ext.define('Bidmo.profile.Phone', {
    extend: 'Bidmo.profile.Base',
    requires:[
    ],
    views: {
        main: 'Bidmo.view.phone.Main',
        home: 'Bidmo.view.phone.home.Home',
        header: 'Bidmo.phone.header.Header',
        content: 'Bidmo.view.phone.content.Content',
        chartsection: 'Bidmo.view.phone.content.ChartSection'
    },
    controllers: ['Bidmo.controller.phone.Main'],
    isActive: function () {
        return Ext.os.deviceType === 'Phone' || Ext.os.deviceType === 'Tablet';
    }
});