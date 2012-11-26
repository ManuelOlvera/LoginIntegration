var salesforceCredentials = {

    loginUrl: 'https://login.salesforce.com/',
    clientId: '3MVG9rFJvQRVOvk7iv8t.9fmXUJpANbmAW2uvnRBffz0Xn41bfe5HGnYRoSaiiJl0CjWBWKkV6.W4iyQzGg69',
    redirectUri: 'https://login.salesforce.com/services/oauth2/success',
    webRedirectUri: 'http://localhost/LoginIntegration/oauthcallback.html',
    proxyUrl: 'http://localhost/LoginIntegration/resources/proxy/proxy.php?mode=native',
    webClientId: '3MVG9rFJvQRVOvk7iv8t.9fmXUDKLDT5n2ihsfFijGR6mEyUnSZmmwcnZBdL91DOuKNqs1YZqkEFbPvkzvPri'
};

var App = Ext.application({
    name: 'LoginIntegration',

    requires: [
        'Ext.MessageBox',
        'Ext.TitleBar'
    ],

    controllers: ['Login'],
    views: ['Main', 'Login'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {

        console.log("launch function");
        alert("launch function");
        // Initialize the main view
        Ext.Viewport.add(Ext.create('LoginIntegration.view.Login'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
