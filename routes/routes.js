var appRouter = function(app) {

  var https = require('https');
  app.get("/", function(req, res) {
      res.send("Hello World");
  });

  app.post("/usbservice", function(req, res) {
    if(req.body.originalRequest.source == 'facebook'){
      var response =
        {
          "facebook": {
            {

          "recipient": {

              "id": recipient_id

          },            "message": {

              "attachment":{

                "type":"template",

                "payload":{

                  "template_type":"generic",

                  "elements":[

                      {

                          "title":"How may I help you?",

                          "subtitle":"Please type your question or choose from the below option or slide right for more options.",

                          "buttons":[

                            {

                              "type":"postback",

                              "title":"Balance Check",

                              "payload":"balance_check"

                            },

                            {

                              "type":"postback",

                              "title":"Transaction History",

                              "payload":"transaction_history"

                            },

                            {

                              "type":"postback",

                              "title":"Card Operations",

                              "payload":"card_operations"

                            }

                          ]

                      },

                      {

                          "title":"Other Queries",

                          "buttons":[

                            {

                              "type":"postback",

                              "title":"Let me Type",

                              "payload":"other_queries"

                            }]

                      },

                      {

                          "title":"Connect with Live Agent",

                          "subtitle":"A live agent will assist you for your queries",

                          "buttons":[

                            {

                              "type":"postback",

                              "title":"Connect Me",

                              "payload":"live_agent_connect"

                            }]

                      }

                  ]

                }

              }

          }

      }
            }
        }
      res.send(response);
    } else {
      var response =
        {
        "speech": "How may I help you? Specify balance check, transaction history, card operations",
        "displayText": "",
        "data": {},
        "contextOut": [],
        "source": "US Bank"
        }
      res.send(response);
    }
  });

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



  app.post("/branchlocator", function(req, res) {
    //console.log(req.body);
    console.log(req.body.originalRequest.source);
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


          if(req.body.originalRequest.source == 'facebook'){
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
  });

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
