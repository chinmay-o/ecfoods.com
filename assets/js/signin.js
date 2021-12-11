
const apiFetchEnquiryData;

const enquiryRegister = [];
const complaintRegister = [];

function handleClientLoad() {

  gapi.load('client:auth2', initClient);
}

function makeApiCall(sheetID) {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: sheetID, // TODO: Update placeholder value.

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

function updateSignInStatus(isSignedIn) {

  if (isSignedIn) {

    var enquirySheetID = '1xPgB1JTmP-zZ4sW0k5zcvJvvHb-bGD8CcfRp-uW7L-0';
    var complaintSheetID = '1xPgB1JTmP-zZ4sW0k5zcvJvvHb-bGD8CcfRp-uW7L-0';
    apiFetchEnquiryData = makeApiCall(enquirySheetID);
    document.getElementById("signed_header").innerHTML = '<h2>Details</h2>';
    document.getElementById("signingButton").innerHTML = '<button class="theme-btn" onclick="handleSignOutClick()">Sign Out</button>';

    setTimeout(function() {

      loadAPIEnquiryData();
      for (var a = 0; a < enquiryRegister.length; a++) {

        document.getElementById("enquiryModelData").innerHTML += '<div class="card-single"><div class="row"><div class="col col-xs-6"><h5>'+ enquiryRegister[a].key +'</h5></div><div class="col col-xs-6"><h5>'+ enquiryRegister[a].date +'</h5></div><div class="col col-xs-6"><h4>'+ enquiryRegister[a].registeree +'</h4></div><div class="col col-xs-6"><h4>'+ enquiryRegister[a].contact +'</h4></div><div class="col col-xs-12"><h4>'+ enquiryRegister[a].subject +'</h4></div></div></div>';
      }
      loader = true;
    }, 2000);
  } else {

    document.getElementById("signed_header").innerHTML = '<h2>Sign In</h2><button class="theme-btn" onclick="handleSignInClick()">Sign In</button>';
    document.getElementById("signingButton").innerHTML = '<button class="theme-btn" onclick="handleSignInClick()">Sign In</button>';
  }
}

function loadAPIEnquiryData() {

  for (var i = 1; i < apiFetchEnquiryData.values.length; i++) {

    enquiryRegister.push(
      {
        key: apiFetchEnquiryData.values[i][1],
        date: apiFetchEnquiryData.values[i][0],
        registeree: apiFetchEnquiryData.values[i][2],
        contact: apiFetchEnquiryData.values[i][3],
        subject: apiFetchEnquiryData.values[i][4]
      }
    );
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  location.reload();
}
