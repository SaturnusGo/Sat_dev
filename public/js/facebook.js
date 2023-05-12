  window.fbAsyncInit = function() {
    FB.init({
      appId            : 'your-app-id',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v11.0'
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      var accessToken = response.authResponse.accessToken;
      // do something with the access token
    } else if (response.status === 'not_authorized') {
      // user is not authorized your app
    } else {
      // user is not logged in to Facebook
    }
  }
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
