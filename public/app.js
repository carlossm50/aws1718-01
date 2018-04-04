'use strict';

// Google Login

function onLoadFunction() {
    gapi.client.setApiKey('AIzaSyBo7V9-coDagdPWOCPVlEa7vNX0AG8Afw0');
    gapi.client.load('plus', 'v1', function() {});
    
}

window.fbAsyncInit = function() {
    FB.init({
      appId            : '144396223060988',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12',
      status           : true
    });
    
    FB.getLoginStatus (function(response) {
        if(response.status === 'connected') {
            // we are connected
        } else if(response.status ==='not_authorized') {
            //not auth
        } else {
            // we are not logged in to facebook.
        }
        
    })
    
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));