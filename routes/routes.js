var appRouter = function(app) {

  var https = require('https');
  app.get("/", function(req, res) {
      res.send("Hello World");
  });

  app.post("/usbservice", function(req, res) {
    //const util = require('util');
    //console.log(util.inspect(req, false, null));
    // check the intent Name
    var intent = req.body.result.metadata.intentName;

    // handle login
    if(intent == 'login') {
      //console.log("Log in");
      // handleLogin(req, res);
    }
    // handle branch locator intent
    else if(intent == 'branch-locator-service') {
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
    // handle auto loan
    else if (intent == 'auto-loan-service'){
        handleAutoLoan(req, res);
    }
    // handle home loan
    else if (intent == 'home-loan-service'){
        handleHomeLoan(req, res);
    }
    // handle default intent == 'Default Welcome Intent'
    else {
      handleWelcomeIntent(req, res);
    }
  });

app.post("/branchlocator", function(req, res) {
    handleBranchLocator(req, res);
});
// handle welcome intent
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
                    },
                    {
                      "title": "Other Queries",
                      "subtitle": "",
                      "buttons": [
                        {
                          "text": "Let me Type",
                          "postback": "Let me Type"
                        }
                      ],
                      "type": 1
                    },
                    {
                      "title": "Connect with Live Agent",
                      "subtitle": "A live agent will assist you for your queries",
                      "buttons": [
                        {
                          "text": "Connect Me",
                          "postback": "Connect Me"
                        }
                      ],
                      "type": 1
                    },
                  ],
    "contextOut": [],
    "source": "US Bank"
    }
    res.send(response);
  } else {
    var response =
      {
      "speech": "<speak>How may I help you? Specify balance check, transaction history, branch locator</speak>",
      "displayText": "",
      "data": {},
      "contextOut": [],
      "source": "US Bank"
      }
    res.send(response);
  }
}

// Start Handle login
var handleLogin = function(req, res) {
  //console.log(req.body.originalRequest.source);
  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
      var branchResponse =
                {
                "speech": "",
                "displayText": "",
                "messages": [
                    {
                      "title": "If you are an existing client, please login.",
                      "subtitle": "",
                      "buttons": [
                        {
                          "text": "Log In",
                          "type":"account_link",
                          "postback": "https://usblogin.herokuapp.com/login.php"
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
        "speech": "<speak>If you are an existing client, please login.</speak>",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }
}
// End Handle Login

// Start handleAccountBalance
var handleAccountBalance = function(req, res) {
  //console.log(req.body.originalRequest.source);

  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
    var response =
    {
    "speech": "",
    "displayText": "",
    "messages": [
                    {
                      "title": "Your Balance as of " + getDate() + " " +getTime(),
                      "subtitle": "Checking xxx3562: $15,382.57",
                      "buttons": [
                        {
                          "text": "Transactions",
                          "postback": "Transactions of Checking"
                        }
                      ],
                      "type": 1
                    },
                     {
                      "title": "Your Balance as of " + getDate()  + " " + getTime(),
                      "subtitle": "Saving  xxx4321: $4,655.00",
                      "buttons": [
                        {
                          "text": "Transactions",
                          "postback": "Transactions of Saving"
                        }
                      ],
                      "type": 1
                    },
                     {
                      "title": "Your Balance as of " + getDate() + " " + getTime(),
                      "subtitle": "CD xxx4789: $400,655.00",
                      "buttons": [
                        {
                          "text": "Transactions",
                          "postback": "Transactions of CD"
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
      "speech": "<speak> Your Balance as of  <say-as interpret-as=\"date\" format=\"yyyymmdd\" detail=\"2\">" + " " + getDate() +
    "</say-as> <say-as interpret-as=\"time\" format=\"hms12\">"+ getTime() +"</say-as> in "
      + "Checking account ending with <say-as interpret-as=\"digits\">3562 </say-as> is $15,382.57"
      + ", Saving  account ending with <say-as interpret-as=\"digits\">4321 </say-as>is $4,655.00"
      + ", CD account ending with <say-as interpret-as=\"digits\">4789 </say-as> is $400,655.00 </speak>",
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
  //console.log(req.body.result.parameters.accountType);
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
                              "text": "Checking xx3562",
                              "postback": "Transactions of Checking"
                            },
                            {
                              "text": "Saving xxx4321",
                              "postback": "Transactions of Saving"
                            },
                            {
                              "text": "CD xxx4789",
                              "postback": "Transactions of CD"
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
          "speech": "<speak>Specify account type, Say Checking, Saving, CD</speak>",
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
                            "title": "Your Transaction History as of" + getDate() + " " +getTime(),
                            "subtitle": "Account No:...xxx3562:",
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
                              "title": "Your Transaction History as of" + getDate() +  " " +getTime(),
                              "subtitle": "Account No:...xxx4321:",
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
                              "title": "Your Transaction History as of" + getDate() +  " " +getTime(),
                              "subtitle": "Account No:...xxx4789:",
                              "buttons": [
                                {
                                  "text": "+$1,450,000.00 on 12/09  Deposit"
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
        "speech": "<speak>Your last transaction as of  <say-as interpret-as=\"date\" format=\"yyyymmdd\" detail=\"2\">" + " " + getDate() +
    "</say-as> <say-as interpret-as=\"time\" format=\"hms12\">"+ getTime() +"</say-as> in Checking account ending with <say-as interpret-as=\"digits\">3562 </say-as> is - $159.90 on <say-as interpret-as=\"date\" format=\"dm\" > 2-12 </say-as>  Web Author</speak>",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }else if(accountType == 'savings'){
      var response =
        {
        "speech":  "<speak>Your last transaction as of <say-as interpret-as=\"date\" format=\"yyyymmdd\" detail=\"2\">" + " " + getDate() +
    "</say-as> <say-as interpret-as=\"time\" format=\"hms12\">"+ getTime() +"</say-as> in Saving account ending with <say-as interpret-as=\"digits\">4321 </say-as> is - $3459.90 on <say-as interpret-as=\"date\" format=\"dm\" > 3-12 </say-as> Macys</speak>",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }else if(accountType == 'CD') {
      var response =
        {
        "speech":  "<speak>Your last transaction as of <say-as interpret-as=\"date\" format=\"yyyymmdd\" detail=\"2\">" + " " + getDate() +
    "</say-as> <say-as interpret-as=\"time\" format=\"hms12\">"+ getTime() +"</say-as> in CD account ending with <say-as interpret-as=\"digits\">4789<\say-as> is + $1,450,000.00 on <say-as interpret-as=\"date\" format=\"dm\" > 9-12 </say-as>  Deposit</speak>",
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
// Start Handle Branch Locator
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
//End
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

var getDate =function () {


    var date = new Date();

   // var hour = date.getHours();
    //hour = (hour < 10 ? "0" : "") + hour;

    //var min  = date.getMinutes();
    //min = (min < 10 ? "0" : "") + min;

    //var sec  = date.getSeconds();
    //sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var currentDate = year + "-" + month + "-" + day

    return currentDate;

}

var getTime =function () {


    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;


    /*var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;*/

    var currentTime = hour + ":" + min

    return currentTime;

}

var handleAutoLoan =function(req, res) {
  const util = require('util');
  //console.log(util.inspect(req.body, false, null));
  var zip = req.body.result.parameters.zipcode;
  var loantermmonths = req.body.result.parameters.loanterm;
  var loanamount = req.body.result.parameters.loanamount;
  getJsonFromAutoLoan(zip, loanamount, loantermmonths, function(data){
    var interest = data.AutoLoanRates.RateTier[0].Rate;
    //console.log(interest);


    if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
      var autoLoanResponse =
                    {
                    "speech": "",
                    "displayText": "",
                    "messages": [
                        {
                          "title": "Your new auto loan has an interest rate of "+interest+"%.",
                          "subtitle": "For addtional auto loan information choose from the below options.",
                          "buttons": [
                             {
                              "text": "usbank.com",
                              "postback": "https://www.usbank.com/loans-lines/auto-loans/index.aspx"
                            },
                            {
                              "text": "Connect me to an agent",
                              "postback": "Connect Me"
                            }

                          ],
                          "type": 1
                        }
                      ],

                    "contextOut": [],
                    "source": "U.S Bank"
                    }
          res.send(autoLoanResponse);
          return;
      } else {
        var response =
          {
          "speech": "<speak>Your new auto loan has an interest rate of "+interest+"%. Addtional loan options information can be found at usbank.com. </speak>",
          "displayText": "",
          "data": {},
          "contextOut": [],
          "source": "US Bank"
          }
        res.send(response);
      }
 /*   var autoLoanReponse ={
                      "speech": "Your Auto Loan APR is " +interest+ "% for loan amount of $"+loanamount+" for "+loantermmonths+ "months",
                      "displayText": "",
                      "data": {},
                      "contextOut": [],
                      "source": "U.S Bank"
                    };
    res.send(autoLoanReponse);*/
  });
}

var autoLoanurl = function(zip, loanamount, loantermmonths){
    return "https://publicrestservice.usbank.com/public/RatesRestService_V_5_0/GetAutoLoanRates?application=RIB&output=json&zipcode="+zip+"&loanamount="+loanamount+"&loantermmonths="+loantermmonths;
};

var getJsonFromAutoLoan = function (zip, loanamount, loantermmonths, callback){
  var t0 = new Date().getTime();
    https.get(autoLoanurl(zip, loanamount, loantermmonths), function(res){
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

var handleHomeLoan =function(req, res) {
  const util = require('util');
  console.log(util.inspect(req, false, null));
  getJsonFromHomeLoan(function(data){
    var interest = data.MortgageRatesList.MortgageRates[7].RatesDetailList.Rate;
    console.log(interest);
    if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
      var homeLoanResponse =
                    {
                    "speech": "",
                    "displayText": "",
                    "messages": [
                        {
                          "title": "Our popular 30 years Home Loan has an interest rate of "+interest+"%.",
                          "subtitle": "For addtional home loan information choose from the below options.",
                          "buttons": [
                             {
                              "text": "usbank.com",
                              "postback": "https://www.usbank.com/home-loans/mortgage/mortgage-rates.aspx"
                            },
                            {
                              "text": "Connect me to an agent",
                              "postback": "Connect Me"
                            }

                          ],
                          "type": 1
                        }
                      ],

                    "contextOut": [],
                    "source": "U.S Bank"
                    }
          res.send(homeLoanResponse);
          return;
      } else {
        var response =
          {
          "speech": "<speak>Our popular 30 years Home Loan has an interest rate of "+interest+"%. Addtional loan options information can be found at usbank.com. </speak>",
          "displayText": "",
          "data": {},
          "contextOut": [],
          "source": "US Bank"
          }
        res.send(response);
      }
  /*  var homeLoanReponse ={
                      "speech": "Your Home Loan APR is "+interest+"% APR",
                      "displayText": "",
                      "data": {},
                      "contextOut": [],
                      "source": "U.S Bank"
                    };
    res.send(homeLoanReponse);*/
  });
}

var homeLoanurl = function(){
    return "https://publicrestservice.usbank.com/public/RatesRestService_V_5_0/GetMortgageRates?application=RIB&output=json";

};

var getJsonFromHomeLoan = function (callback){
  var t0 = new Date().getTime();
    https.get(homeLoanurl(), function(res){
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

app.post("/branch", function(req, res) {


  if(req.body.originalRequest != null && req.body.originalRequest.source == 'facebook'){
      var homeLoanResponse =
                    {
                    "speech": "",
                    "displayText": "",
                    "messages": [
                        {
                          "title": "Our popular 30 years Home Loan has an interest rate of "+interest+"%.",
                          "subtitle": "Addtional Home Loan options information can be found at usbank.com. I can also connect to youj one of our loan specialists. Do you be interested?",
                          "buttons": [
                            {
                              "text": "Connect Me",
                              "postback": "Connect Me"
                            }

                          ],
                          "type": 1
                        }
                      ],

                    "contextOut": [],
                    "source": "U.S Bank"
                    }
          res.send(homeLoanResponse);
          return;
      } else {
        var response =
          {
          "speech": "<speak>Our popular 30 years loan has an interest rate of "+interest+"%. Addtional loan options information can be found at usbank.com. </speak>",
          "displayText": "",
          "data": {},
          "contextOut": [],
          "source": "US Bank"
          }
        res.send(response);
      }
    /*var branchResponse =
      {
      "speech": "Barack Hussein Obama II is the 44th and current President of the United States.",
      "displayText": "Barack Hussein Obama II is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University   and Harvard Law School, where ",
      "data": {},
      "contextOut": [],
      "source": "DuckDuckGo"
      }
    res.send(branchResponse);*/
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


app.post("/autoloanalexa", function(req, res) {
    console.log(req.body);
    // need to check for values in session attributes
    var session = req.body.session;
    var sessionAttributes = session.attributes;

    if(req.body.request.intent.slots.numberslot.value){

      if(!sessionAttributes.zipcode){
        // collect the value
            var zipcode = {"zipcode":req.body.request.intent.slots.numberslot.value};
            var branchResponse =
                      {
                     "version": "1.0",
                      "response": {
                          "outputSpeech": {
                          "type": "PlainText",
                          "text": "Specify the loan amount"
                          },
                          "shouldEndSession": false
                        },
                        "sessionAttributes": zipcode
                      }
            res.send(branchResponse);
            return;
      } else if(!sessionAttributes.amount){
        // collect the value
            var zipcode = sessionAttributes.zipcode;
            var amount = {
              "zipcode": zipcode,
              "amount": req.body.request.intent.slots.numberslot.value
            };
            var branchResponse =
                      {
                     "version": "1.0",
                      "response": {
                          "outputSpeech": {
                          "type": "PlainText",
                          "text": "Specify the loan term in months"
                          },
                          "shouldEndSession": false
                        },
                        "sessionAttributes": amount
                      }
            res.send(branchResponse);
            return;
      } else if(!sessionAttributes.term){
            // collect the value
            var zipcode = sessionAttributes.zipcode;
            var amount = sessionAttributes.amount;
            var term = req.body.request.intent.slots.numberslot.value;
            var branchResponse =
                      {
                     "version": "1.0",
                      "response": {
                          "outputSpeech": {
                          "type": "PlainText",
                          "text": "Auto loan APR is 3% for "+amount+" of loan amount"
                          },
                          "shouldEndSession": true
                        }
                      }
            res.send(branchResponse);
            return;
      }

    }
    var branchResponse =
              {
             "version": "1.0",
              "response": {
                  "outputSpeech": {
                  "type": "PlainText",
                  "text": "Please provide Zipcode"
                  },
                  "shouldEndSession": false
                },
                "sessionAttributes": {}
              }
    res.send(branchResponse);
    return;
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

app.get("/login", function(req, res) {
    //console.log(req.query);
    //res.send("Hello World");
    //https://oauth-redirect.googleusercontent.com/r/YOUR_PROJECT_ID#access_token=ACCESS_TOKEN&token_type=bearer&state=STATE_STRING
    res.writeHead(301,{Location: req.query.redirect_uri+"#access_token=1234567890&token_type=bearer&state="+req.query.state});
    res.end();
});

app.get("/p2pqr", function(req, res) {
    //https://oauth-redirect.googleusercontent.com/r/YOUR_PROJECT_ID#access_token=ACCESS_TOKEN&token_type=bearer&state=STATE_STRING
    res.writeHead(301,{Location: "usbank://sendmoney?amount="+req.query.amount+"&sender="+req.query.sender+"&token="+req.query.token});
    res.end();
});

}

module.exports = appRouter;
