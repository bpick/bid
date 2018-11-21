Ext.define('Bidmo.Application', {
	extend: 'Ext.app.Application',
	name: 'Bidmo',
	
	platformConfig: {
        desktop: {
            quickTips: true
        }
    },
    profiles: [
        'Bidmo.profile.Desktop',
        'Bidmo.profile.Phone'
    ],
    viewport: {
        controller: 'viewport',
        viewModel: 'viewport'
    },
    defaultToken: 'home',
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'onUnmatchedRoute'
            }
        }
    },
	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		this.removeSplash();
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	},
    onUnmatchedRoute : function (hash) {
        this.redirectTo('home');
    }
});
