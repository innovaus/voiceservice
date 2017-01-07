var appRouter = function(app) {

  var https = require('https');
  app.get("/", function(req, res) {
      res.send("Hello World");
  });

  app.post("/usbservice", function(req, res) {
    console.log(req.body);
    // check the intent Name
    var intent = req.body.result.metadata.intentName;

    // handle branch locator intent
    if(intent == 'branch-locator-service') {
        handleBranchLocator(req, res);
    }
    // handle account-service
    else if(intent == 'account-service'){
        handleAccountBalance(req, res);
    }
    // handle Transaction History
    else if (intent == 'transaction-service'){
        handleTransactionHistory(req, res);
    }

    // handle default intent == 'Default Welcome Intent'
    else {
      handleWelcomeIntent(req, res);
    }
  });

app.post("/branchlocator", function(req, res) {
    handleBranchLocator(req, res);
});

var handleWelcomeIntent = function(req, res) {
  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
    var response =
    {
    "speech": "",
    "displayText": "",
    "messages": [
                    {
                      "title": "How may I help you?",
                      "subtitle": "Please type your question or choose from the below option",
                      "buttons": [
                        {
                          "text": "Balance Check",
                          "postback": "Balance Check"
                        },
                        {
                          "text": "Transaction History",
                          "postback": "Transaction History"
                        },
                        {
                          "text": "Branch Locator",
                          "postback": "branch"
                        }
                      ],
                      "type": 1
                    }
                  ],
    "contextOut": [],
    "source": "US Bank"
    }
    res.send(response);
  } else {
    var response =
      {
      "speech": "How may I help you? Specify balance check, transaction history, branch locator",
      "displayText": "",
      "data": {},
      "contextOut": [],
      "source": "US Bank"
      }
    res.send(response);
  }
}


// Start handleAccountBalance

var handleAccountBalance = function(req, res) {

  console.log(req.body.originalRequest.source);
    var accountType = req.body.result.parameters.accountType;
    if(accountType == null || accountType == "" ){
      if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
          var branchResponse =
                    {
                    "speech": "",
                    "displayText": "",
                    "messages": [
                        {
                          "title": "Choose Account Type: ",
                          "subtitle": "",
                          "buttons": [
                            {
                              "text": "Checking xx356",
                              "postback": "Checking"
                            },
                            {
                              "text": "Saving xxx432",
                              "postback": "Saving"
                            },
                            {
                              "text": "CD xxx478",
                              "postback": "CD"
                            }
                          ],
                          "type": 1
                        }
                      ],

                    "contextOut": [],
                    "source": "U.S Bank"
                    }

          res.send(branchResponse);
          return;
        } else {
          var response =
            {
            "speech": "Choose Account Type, Say Checkings, Savings, CD",
            "displayText": "",
            "data": {},
            "contextOut": [],
            "source": "US Bank"
            }
          res.send(response);
        }
    }

    var subtitle;
    if (accountType == 'checkings'){
      subtitle = "Checking xxx356: $15,382.57";
    }else if(accountType == 'savings'){
      subtitle = "Saving  xxx432: $4,655.00";
    }else if(accountType == 'CD') {
      subtitle = "CD xxx478: $400,655.00";
    }

  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
    var response =
    {
    "speech": "",
    "displayText": "",
    "messages": [
                    {
                      "title": "Your Balance as of " + getDateTime(),
                      "subtitle": subtitle,
                      "buttons": [
                        {
                          "text": "Transactions",
                          "postback": "Transactions of "+ accountType
                        }
                      ],
                      "type": 1
                    }
                  ],
    "contextOut": [],
    "source": "US Bank"
    }
    res.send(response);
  } else {
    var response =
      {
      "speech": "Your Balance as of " + getDateTime() + " in " + subtitle ,
      "displayText": "",
      "data": {},
      "contextOut": [],
      "source": "US Bank"
      }
    res.send(response);
  }
}
// End handleAccountBalance

// Start  handleTransactionHistory
var handleTransactionHistory = function(req, res) {
  console.log(req.body.result.parameters.accountType);
  var accountType = req.body.result.parameters.accountType;
  if(accountType == null || accountType == "" ){
    if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
      var branchResponse =
                    {
                    "speech": "",
                    "displayText": "",
                    "messages": [
                        {
                          "title": "Choose Account Type: ",
                          "subtitle": "",
                          "buttons": [
                            {
                              "text": "Checking xx356",
                              "postback": "Checking"
                            },
                            {
                              "text": "Saving xxx432",
                              "postback": "Saving"
                            },
                            {
                              "text": "CD xxx478",
                              "postback": "CD"
                            }
                          ],
                          "type": 1
                        }
                      ],

                    "contextOut": [],
                    "source": "U.S Bank"
                    }

          res.send(branchResponse);
          return;
      } else {
        var response =
          {
          "speech": "Choose Account Type, Say Checkings, Savings, CD",
          "displayText": "",
          "data": {},
          "contextOut": [],
          "source": "US Bank"
          }
        res.send(response);
      }
    }
  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
    if (accountType == 'checkings'){
       var response =
          {
          "speech": "",
          "displayText": "",
          "messages": [
                          {
                            "title": "Your Transaction History as of" + getDateTime(),
                            "subtitle": "Account No:...xxx356:",
                            "buttons": [
                              {
                                "text": "-$159.90 on 12/01 Web Author",
                                "postback": "-$159.90 on 12/01 Web Author"
                              },
                              {
                                "text": "-$19.98 on 12/01 Debit Purc",
                                "postback": "-$19.98 on 12/01 Debit Purc"
                              },
                              {
                                "text": "+$856.45 on 12/02 Electronic",
                                "postback": "+$856.45 on 12/02 Electronic"
                              }
                            ],
                            "type": 1
                          }
                        ],
          "contextOut": [],
          "source": "US Bank"
          }
          res.send(response);

    }else if(accountType == 'savings'){
        var response =
            {
            "speech": "",
            "displayText": "",
            "messages": [
                            {
                              "title": "Your Transaction History as of" + getDateTime(),
                              "subtitle": "Account No:...xxx432:",
                              "buttons": [
                                {
                                  "text": "-$3459.90 on 12/03 Macys",
                                  "postback": "-$3459.90 on 12/03 Macys"
                                },
                                {
                                  "text": "-$239.98 on 12/05 Sears",
                                  "postback": "-$239.98 on 12/05 Sears"
                                },
                                {
                                  "text": "-$2000.45 on 12/08 Transfer",
                                  "postback": "-$2000.45 on 12/08 Transfer"
                                }
                              ],
                              "type": 1
                            }
                          ],
            "contextOut": [],
            "source": "US Bank"
            }
            res.send(response);
    }else if(accountType == 'CD') {
        var response =
            {
            "speech": "",
            "displayText": "",
            "messages": [
                            {
                              "title": "Your Transaction History as of" + getDateTime(),
                              "subtitle": "Account No:...xxx478:",
                              "buttons": [
                                {
                                  "text": "+$1,450.000.00 on 12/09  Deposit"
                                }
                              ],
                              "type": 1
                            }
                          ],
            "contextOut": [],
            "source": "US Bank"
            }
            res.send(response);
    }
  } else {
    if (accountType == 'checkings'){
      var response =
        {
        "speech": "Your Transaction History as of" + getDateTime()+" in Account No:...xxx356: -$159.90 on 12/01 Web Author",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }else if(accountType == 'savings'){
      var response =
        {
        "speech": "Your Transaction History as of" + getDateTime()+" in Account No:...xxx432: -$3459.90 on 12/03 Macys",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }else if(accountType == 'CD') {
      var response =
        {
        "speech": "Your Transaction History as of" + getDateTime()+" in Account No:...xxx478: +$1,450.000.00 on 12/09  Deposit",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }
  }
}

// End handleTransactionHistory

var handleBranchLocator = function(req, res) {
  //console.log(req.body);
    var zip = req.body.result.parameters.zipcode;
    if(zip == null || zip == "" || zip.length < 5 || zip.length > 5){
      var branchResponse =
                {
                "speech": "Please provide a Zipcode",
                "displayText": "",
                "data": {},
                "contextOut": [],
                "source": "U.S Bank"
                }

      res.send(branchResponse);
      return;
    }
    getJsonFromBranchLocator(zip, function(data){
      if(data.GetListATMorBranchReply.BranchList.length == 0)
        {
            spokenMsg = "<speak>The zip code <say-as interpret-as=\"digits\">" + zip +
                "</say-as> does not have any nearby branches.</speak>";
            cardMsg = "The zip code " + zip + " does not have any nearby branches.";

            response.tellWithCard(spokenMsg, "Branch Locator", cardMsg);
            return;
        }

        var branchName = data.GetListATMorBranchReply.BranchList[0].Name.replace("&", "and");
        var distance = data.GetListATMorBranchReply.BranchList[0].Distance + " miles";
        var streetAddress = data.GetListATMorBranchReply.BranchList[0].LocationIdentifier.Address.AddressLine1.replace("&", "and");
        var closingTime = getBranchClosingTimeForToday(data.GetListATMorBranchReply.BranchList[0]);

        spokenMsg = "<speak>The closest Branch to the <say-as interpret-as=\"digits\">" + zip +
                "</say-as> zip code is the " + branchName + " location. It's located " + distance +
                " away at " + streetAddress + ". " +
                "The branch closes this evening at " + closingTime + ".</speak>";

        cardMsg = "The closest Branch to the " + zip + " zip code is the "
                + branchName + " location. It's located " + distance + " away at " + streetAddress + ". " +
                "The branch closes this evening at " + closingTime + ".";


        if(req.body.originalRequest.source!= null && req.body.originalRequest.source == 'facebook'){
          var branchResponse =
                    {
                    "speech": cardMsg,
                    "displayText": cardMsg,
                    "data": {},
                    "contextOut": [],
                    "source": "U.S Bank"
                  };
          res.send(branchResponse);
        } else {
          var branchResponse =
                    {
                    "speech": spokenMsg,
                    "displayText": cardMsg,
                    "data": {},
                    "contextOut": [],
                    "source": "U.S Bank"
                  };
          res.send(branchResponse);
        }

        return;
     });
};

var url = function(zip){
    return "https://publicrestservice.usbank.com/public/ATMBranchLocatorRESTService_V_8_0/GetListATMorBranch/LocationSearch/" +
                    "StringQuery?application=parasoft&transactionid=cb6b8ea5-3331-408c-9ab3-58e18f2e5f95&output=json&searchtype=E&" +
                    "stringquery=" + zip + "&branchfeatures=BOP&maxitems=1&radius=5";
    //return "https://branchservice.herokuapp.com/";
};

var getJsonFromBranchLocator = function (zip, callback){
  var t0 = new Date().getTime();
    https.get(url(zip), function(res){
    var body = '';

    res.on('data', function(data){
      body += data;
    });

    res.on('end', function(){
      var t1 = new Date().getTime();
      console.log("Call to service took " + (t1 - t0) + " milliseconds.");
      //var result = body;
      var result = JSON.parse(body);
      return callback(result);
    });

  }).on('error', function(e){
    console.log('Error: ' + e);
  });
};

var getBranchClosingTimeForToday = function(branch){

    var d = new Date().getDay();
    var time = "";

    if(d == 0)
        time = branch.OperationalHours.Sunday.ClosingTime;
    else if(d == 1)
        time =  branch.OperationalHours.Monday.ClosingTime;
    else if(d == 2)
        time =  branch.OperationalHours.Tuesday.ClosingTime;
    else if(d == 3)
        time =  branch.OperationalHours.Wednesday.ClosingTime;
    else if(d == 4)
        time =  branch.OperationalHours.Thursday.ClosingTime;
    else if(d == 5)
        time =  branch.OperationalHours.Friday.ClosingTime;
    else if(d == 6)
        time =  branch.OperationalHours.Saturday.ClosingTime;

    var hour = time.substr(0, 2);
    var minutes = time.substr(3, 2);

    if(hour > 12)
        return (hour - 12) + ":" + minutes + " PM";
    if(hour == 12)
        return hour + ":" + minutes + "PM";
    if(hour < 12)
        return hour + ":" + minutes + "AM";
};

var getDateTime =function () {


    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var dateTime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec + " CT"

    return dateTime;

}

app.post("/branch", function(req, res) {
    var branchResponse =
      {
      "speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
      "displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
      "data": {},
      "contextOut": [],
      "source": "DuckDuckGo"
      }
    res.send(branchResponse);
});

app.post("/branchalexa", function(req, res) {
    var zip = 55124;
    if(zip == null || zip == "" || zip.length < 5 || zip.length > 5){
      var branchResponse =
                {
               "version": "1.0",
      "response": {
          "outputSpeech": {
          "type": "PlainText",
          "text": "Please provide zipcode."
          },
          "card": {
               "content": "",
              "title": "",
           "type": "Simple"
          },
  "shouldEndSession": true
},
"sessionAttributes": {}
                }

      res.send(branchResponse);
      return;
    }
    getJsonFromBranchLocator(zip, function(data){
      if(data.GetListATMorBranchReply.BranchList.length == 0)
        {
            spokenMsg = "<speak>The zip code <say-as interpret-as=\"digits\">" + zip +
                "</say-as> does not have any nearby branches.</speak>";
            cardMsg = "The zip code " + zip + " does not have any nearby branches.";

            response.tellWithCard(spokenMsg, "Branch Locator", cardMsg);
            return;
        }

        var branchName = data.GetListATMorBranchReply.BranchList[0].Name.replace("&", "and");
        var distance = data.GetListATMorBranchReply.BranchList[0].Distance + " miles";
        var streetAddress = data.GetListATMorBranchReply.BranchList[0].LocationIdentifier.Address.AddressLine1.replace("&", "and");
        var closingTime = getBranchClosingTimeForToday(data.GetListATMorBranchReply.BranchList[0]);

        spokenMsg = "<speak>The closest Branch to the <say-as interpret-as=\"digits\">" + zip +
                "</say-as> zip code is the " + branchName + " location. It's located " + distance +
                " away at " + streetAddress + ". " +
                "The branch closes this evening at " + closingTime + ".</speak>";

        cardMsg = "The closest Branch to the " + zip + " zip code is the "
                + branchName + " location. It's located " + distance + " away at " + streetAddress + ". " +
                "The branch closes this evening at " + closingTime + ".";

        var branchResponse =
                  {
                 "version": "1.0",
      "response": {
          "outputSpeech": {
          "type": "PlainText",
          "text": spokenMsg
          },
          "card": {
               "content": "",
              "title": "",
           "type": "Simple"
          },
  "shouldEndSession": true
},
"sessionAttributes": {}
                  }

        //response.tellWithCard(spokenMsg, "Branch Locator", cardMsg);
        res.send(branchResponse);
        return;
     });
});

  app.get("/account", function(req, res) {
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
});

}

module.exports = appRouter;
