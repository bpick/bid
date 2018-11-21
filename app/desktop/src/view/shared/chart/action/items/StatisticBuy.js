Ext.define('Coin.shared.chart.action.items.StatisticBuy', {
    extend: 'Ext.Component',
    xtype: 'statisticbuy',
    cls: Ext.baseCSSPrefix + 'statistic',
    tpl: new Ext.XTemplate(
        '<div class="statistic buy">',
        '   <span class="x-icon-el x-font-icon md-icon md-icon-trending-up"></span>',
        '   Buy: {Percentage}',
        '</div>'
    ),
    data: {}
});