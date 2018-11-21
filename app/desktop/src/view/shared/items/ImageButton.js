Ext.define('Bidmo.view.shared.items.ImageButton', {
    extend: 'Ext.Component',
    xtype: 'image-button',
    cls: Ext.baseCSSPrefix + 'image-button',
    tpl: new Ext.XTemplate(
        '<div class="profile">',
        '   {[this.addLogo(values)]}',
        '   <span class="text">{Text}</span>',
        '</div>',
        {
            addLogo: function(data) {
                if(data.Image) {
                    var path = Ext.getResourcePath(data.Image, null, 'images');
                    return `<img src="${path}"></img>`;
                }
                var name = data.Name || "T";
                var symbol = name.slice(0, 1);
                return `<div class="logo"><span>${symbol}</span></div>`;
                
            }
        }
    ),
    data: {}
});