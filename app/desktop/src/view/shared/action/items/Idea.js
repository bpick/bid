Ext.define('Bidmo.view.shared.action.items.Idea', {
    extend: 'Ext.Component',
    xtype: 'idea',
    cls: Ext.baseCSSPrefix + 'idea',
    tpl: new Ext.XTemplate(
        '<div class="statistic">',
        '   <div class="idea-collector" data-buy="{PercentBuy}" data-sell="{PercentSell}" style="--data-buy: {PercentBuy};--data-sell: {PercentSell}">',
        '   </div>',
        '   <div class="idea-price">',
        '       <span class="price price-buy">{PriceUnit}{PriceBuy}</span>',
        '       <span class="price price-sell">{PriceUnit}{PriceSell}</span>',
        '   </div>',
        '</div>'
    )
});