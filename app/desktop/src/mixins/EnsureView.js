Ext.define('Bidmo.mixins.EnsureView', {
    extend: 'Ext.Mixin',
    validateView: function (container, type, viewId) {
        let me = this;
        if (!type) return undefined;
        // validate if parentView has contained child
        let xtype = type;
        if (Ext.isObject(type)) {
            xtype = type['xtype'];
        }

        if (!xtype) {
            Ext.raise('Could not setup view section without specific type');
            return undefined;
        }

        //var _view = container.child(xtype);
        var checkValue = viewId || xtype;
        let _view = this.checkViewExist(container, checkValue);
        if (!_view) {
            // check if type is an input view
            _view = type.initialized ? type :  me.createView(type, viewId);
            container.add(_view);
        }

        return _view;
    },
    privates: {
        createView: function(type, viewId) {
            let config = {};
            viewId = viewId || type;
            if(Ext.isString(type)) {
                config = {
                    xtype: type,
                    viewId: viewId,
                    itemId: viewId
                }
            } else if (Ext.isObject(type)) {
                config = Ext.apply({}, type);
            }
            return Ext.create(config);
        },
        checkViewExist: function (container, viewId) {
            var existView = container.down(viewId) || container.getComponent(viewId);
            return existView;
        }
    }
});