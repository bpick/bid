Ext.define('Coin.shared.chart.action.items.StatisticSell', {
    extend: 'Ext.Component',
    xtype: 'statisticsell',
    cls: Ext.baseCSSPrefix + 'statistic',
    tpl: new Ext.XTemplate(
        '<div class="statistic sell">',
        '   <span class="x-icon-el x-font-icon md-icon md-icon-trending-down"></span>',
        '   Sell: {Percentage}',
        '</div>'
    ),
    data: {}
});