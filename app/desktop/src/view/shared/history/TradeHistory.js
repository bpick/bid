Ext.define('Coin.shared.history.TradeHistory', {
    extend: 'Ext.Panel',
    xtype: 'tradehistory',
    cls: Ext.baseCSSPrefix + 'trade-history',
    tpl: new Ext.XTemplate(
        '<h2>Trade History</h2>',
        '<div class="history">',
        '   <tpl for="TradeHistory">',
        '       <div class="{Type}">',
        '           <span class="first">{Column1}</span>',
        '           <span class="second">{Column2}</span>',
        '           <span class="third">{Column3}</span>',
        '       </div>',
        '   </tpl>',
        '</div>'
    ),
    data: {}
});