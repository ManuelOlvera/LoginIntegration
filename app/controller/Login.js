Ext.define('LoginIntegration.controller.Login', {
	extend: 'Ext.app.Controller',

	init : function(){

		document.addEventListener("backbutton",
			function(){
				if( Ext.Viewport.getActiveItem().getActiveItem().xtype === 'login_panel' ){
					// back on home page must quit the app
					navigator.app.exitApp();
				}else{
					history.back();
				}
			}

		, false);
	},

	config: {
		refs: {

			salesforceSingInButton : '#login_sing_in',
			// tabpanel buttons - for history support as well
			// homeTabBarButton    : 'tabbar button[title=Home]',

		},
		control: {

			// homeTabBarButton    : {
			// 	tap: function(){
			// 		this.redirectTo('home');
			// 	}
			// }
			salesforceSingInButton : {
				tap: 'salesforceSingIn'
			}
		},

		// history support
		routes: {

			// 'home'		 		: 'showHome'

		}
	},

	salesforceSingIn: function() {


    var client;

    var thisController = this;


		console.log('salesforceSingIn');

    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

      client = new forcetk.Client(salesforceCredentials['clientId'], salesforceCredentials['loginUrl']);

      console.log(client);

      var cb = window.plugins.childBrowser;
      if(cb != null) {
        console.log('cb ready');
        cb.onLocationChange = function(loc){
          console.log('onLocationChange ready');
          if (loc.search(salesforceCredentials['redirectUri']) >= 0) {
            console.log('loc.search ready');
            cb.close();
            thisController._sessionCallback(unescape(loc),client);
          }
        };

        cb.showWebPage(thisController._getAuthorizeUrl(salesforceCredentials['loginUrl'],salesforceCredentials['clientId'],salesforceCredentials['redirectUri']));

      } else {
          console.log("childbrowser null");
      }

    } else {


      client = new forcetk.Client(salesforceCredentials['webClientId'], salesforceCredentials['loginUrl'], salesforceCredentials['proxyUrl']);

      console.log(client);

      $(document).ready(function() {
        $(this).popupWindow({
            windowURL: thisController._getAuthorizeUrl(salesforceCredentials['loginUrl'],salesforceCredentials['webClientId'],salesforceCredentials['webRedirectUri']),
            windowName: 'Connect',
            centerBrowser: 1,
            height:524,
            width:675
        });
      });

    }

	},
  _getAuthorizeUrl: function(loginUrl, clientId, redirectUri){
  	console.log('_getAuthorizeUrl ready');
      return loginUrl+'services/oauth2/authorize?display=touch'
          +'&response_type=token&client_id='+escape(clientId)
          +'&redirect_uri='+escape(redirectUri);
  },
  _sessionCallback: function(loc, client) {
  	console.log('_sessionCallback ready');
      var oauthResponse = {};

      var fragment = loc.split("#")[1];

      if (fragment) {
          var nvps = fragment.split('&');
          for (var nvp in nvps) {
              var parts = nvps[nvp].split('=');
              oauthResponse[parts[0]] = unescape(parts[1]);
          }
      }

      if (typeof oauthResponse === 'undefined'
          || typeof oauthResponse['access_token'] === 'undefined') {
      	console.log('error oauthResponse', oauthResponse);
          errorCallback({
                        status: 0,
                        statusText: 'Unauthorized',
                        responseText: 'No OAuth response'
                        });
      } else {

		console.log('oauthResponse ready', oauthResponse);

          console.log("client1", client);
          client.setSessionToken(oauthResponse.access_token, null,
              oauthResponse.instance_url);

          console.log("client2", client);
          // Dont know why refresh token comes without these two equals at the end
          // Whithout that it doesnt work
          client.setRefreshToken(oauthResponse['refresh_token']+"==");

          console.log("client3", client);

          client.refreshAccessToken(function(response){

              console.log('refresh success');
              console.log("response", response);
              client.setSessionToken(response['access_token'], null, response['instance_url']);

              client.query("SELECT Name FROM Account LIMIT 1",
                  function(response){
                      console.log("success querying", response);
                      console.log('The first account I see is ', response.records[0].English__c);
                  },
                  function(response){
                      console.log("error querying", response);
                  }
              );
          },function(response){
              console.log('refresh error');
              console.log("oauthResponse", oauthResponse);
              console.log("client", client);
              console.log("response", response);
          });
      }
  }
// showHome: function(){

//   	// if the viewport stack has other containers at the top we have to destroy them
//   	if( Ext.Viewport.getActiveItem().xtype != 'kio_main_tabPanel' ){
//   		// remove the active item on top of the tab bar panel
//   		Ext.Viewport.animateActiveItem(0, this.slideRightTransition);	// 0 is always the tab bar panel
//   	}

// 	// deselect all the items from the news list
// 	this.getNewsListPanel().deselectAll()

//   	// move back to item 0 the main tab panel
//   	this.getMainTabPanel().setActiveItem(0);
//   }

});