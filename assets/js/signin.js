let apiFetchData;

function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1xPgB1JTmP-zZ4sW0k5zcvJvvHb-bGD8CcfRp-uW7L-0', // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: 'responses', // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.

    // valueRenderOption: '',  // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].

    // dateTimeRenderOption: '',  // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {

    // TODO: Change code below to process the `response` object:
    console.log(response.result);
    return(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  var API_KEY = 'AIzaSyAeNuw7F1SG2xX7MwOZ7K6b9MCN46H6wDM'; // TODO: Update placeholder with desired API key.

  var CLIENT_ID = '168729206764-mjc72nq1d74mt8lklu99ndv503ebb861.apps.googleusercontent.com'; // TODO: Update placeholder with desired client ID.

  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function handleClientLoad() {

  gapi.load('client:auth2', initClient);
}



function updateSignInStatus(isSignedIn) {

  setTimeout(function() {

    if (isSignedIn) {
      apiFetchData = makeApiCall();
      document.getElementById("signed_header").innerHTML = '<h2>Details</h2>';
      document.getElementById("signingButton").innerHTML = '<button class="theme-btn" onclick="handleSignOutClick()">Sign Out</button>';
    } else {

      document.getElementById("signed_header").innerHTML = '<h2>Sign In</h2><button class="theme-btn" onclick="handleSignInClick()">Sign In</button>';
      document.getElementById("signingButton").innerHTML = '<button class="theme-btn" onclick="handleSignInClick()">Sign In</button>';
    }
  }, 2000);
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}
