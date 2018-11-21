Ext.define('Bidmo.view.shared.chart.action.items.Trade', {
    extend: 'Ext.Button',
    xtype: 'trade',
    config: {
        /**
         * timer as seconds
         */
        timer: undefined
    },
    ui: 'scpf-basic',
    iconCls: 'icofont-clock-time',
    runTimer: function(timer) {
        var me = this;
        if(!me.runner) {
            me.runner = new Ext.util.TaskRunner();
        }
        if(timer > 0) {
            me.syncClock(timer, me);
        }
    },
    /**
     * @private
     */
    syncClock: function(timer, button) {
        var me = button;
        var date = new Date(null);
        date.setSeconds(timer);
        var result = Ext.Date.format(date, 'i:s');
        me.setText(result);
        if(timer === 0) {
            me.setText('Trade');
            me.runner.destroy();
            me.runner = undefined;
            return false;
        }
        Ext.defer(function() {
            timer = timer - 1;
            me.syncClock(timer, me);
        }, 1000);
    }
});