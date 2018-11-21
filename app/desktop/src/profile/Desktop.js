Ext.define('Bidmo.profile.Desktop', {
    extend: 'Bidmo.profile.Base',
    requires:[
    ],
    views: {
        main: 'Bidmo.view.desktop.Main',
        home: 'Bidmo.view.desktop.home.Home',
        header: 'Bidmo.desktop.header.HeaderBar',
        content: 'Bidmo.view.desktop.content.Content',
        chartsection: 'Bidmo.view.desktop.content.ChartSection',
        bsblock: 'Bidmo.view.shared.setup.items.BuySellBlock',
        leftmenu: 'Bidmo.view.shared.setup.Menu'
    },
    controllers: ['Bidmo.controller.desktop.Main'],
    isActive: function () {
        return Ext.os.is.Desktop;
    }
});