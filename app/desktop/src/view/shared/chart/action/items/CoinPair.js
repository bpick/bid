Ext.define('Bidmo.view.shared.chart.action.items.CoinPair', {
    extend: 'Ext.Button',
    xtype: 'coinpair',
    ui: 'scpf-basic',
    text: 'BTC-USD',
    stretchMenu: true,
    menu: {
        anchor: true,
        items: [{
            text: 'BTC-USD'
        }, {
            text: 'ETH-USD'
        }, {
            text: 'XRP-USD'
        }]
    }
});