/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Bidmo.view.desktop.Main', {
    extend: 'Ext.Panel',
    layout: 'card',
    controller: 'main',
    viewModel: 'main'
});
