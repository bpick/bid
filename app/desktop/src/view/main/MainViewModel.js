Ext.define('Bidmo.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        authenticated: true
    },
    formulas: {
        iconAlignBigButton: function(get) {
            var auth = get('authenticated');
            var result = auth ? 'left': 'top';
            return result;
        }
    }
});