Ext.define('Bidmo.view.shared.setup.items.BuySellBlock', {
    extend: 'Ext.Component',
    cls: Ext.baseCSSPrefix + 'bs-block',
    tpl: new Ext.XTemplate(
        '<div class="statistic">',
        '   <div class="buy" height="{[this.calulateHeight(values, true)]}">',
        '       {[this.addBlocks(values.BuyBlocks)]}',
        '   </div>',
        '   <div class="sell"  height="{[this.calulateHeight(values, false)]}">',
        '       {[this.addBlocks(values.SellBlocks)]}',
        '   </div>',
        '</div>',
        {
            addBlocks: function(amount) {
                var html = "";
                for(var i = 0; i < amount; i++) {
                    html += "<span class=\"block\"></span>"
                }
                return html;
            },
            calulateHeight: function(data, buy) {
                var buyBlocks = data.BuyBlocks;
                var sellBlocks = data.SellBlocks;
                var total = buyBlocks + sellBlocks;
                if(buy) {
                    var percent = Math.floor(buyBlocks * 100 / total);
                    return `${percent}%`;
                } else {
                    var percent = Math.floor(sellBlocks * 100 / total);
                    return `${percent}%`;
                }
            }
        }
    )
});