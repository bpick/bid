Ext.define('Bidmo.view.shared.items.Logo', {
    extend: 'Ext.Img',
    xtype: 'logo',
    width: 90,
    maxWidth: 180,
    height: 60,
    maxHeight: 70,
    plugins: {
        responsive: true
    },
    responsiveConfig: {
        /* 'width < 800': {
            hidden: true
        },

        'width >= 800': {
            hidden: false
        } */
    },
    src: Ext.getResourcePath('default_small.png', null, 'images')
});