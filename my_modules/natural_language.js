let Wit = null;
Wit = require('node-wit').Wit;
var meteo = require('../meteo.js');
var axios = require('axios');


const accessToken = (() => {
  return "TW3QQWBWDKISHWMQJYS3ON5PVLSWQDHF";
})();

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  getForecast({context, entities}) {
    return new Promise(function(resolve, reject) {
      var location = firstEntityValue(entities, "location")
      if (location) {
          axios.request({
                        url:'http://api.openweathermap.org/data/2.5/forecast/daily?q='+location+'&appid=5aaa01984cc54ac180592116b5e0fb9c&cnt=2',

                        method: 'GET',
                      }).then(function (response) {
                        var emot = "";
                        
                        // Ici, nous construisons des smileys en fonction du climat.
                        
                        if((response.data.list[1].weather[0].description).includes("clouds")){
                          emot = ":cloud: :frowning2:";
                        }
                        else if((response.data.list[1].weather[0].description).includes("rain")){
                          emot = ":cloud_rain: :disappointed_relieved:";
                        }
                        else if((response.data.list[1].weather[0].description).includes("clear")){
                          emot =":sunny: :grinning:";
                        }

                          context.forecast = "The weather will be "+response.data.list[1].weather[0].description+" in "+location+" tomorrow."+emot+" \n"+"Temperature:  "+(response.data.list[1].temp.day-273.15)+"°";
                        }).catch(function (error) {
                          context.forecast = "Problème rencontré...";
                        });
        //context.forecast = 'sunny in ' + location; // we should call a weather API here

        delete context.missingLocation;
      } else {
        context.missingLocation = true;
        delete context.forecast;
      }
      return resolve(context);
    });
  },
};

const client = new Wit({accessToken, actions});

const sessionId = 'my-user-session-44';
var context0 = {};

client.runActions(sessionId, 'Quelle est la temperature ?', context0)
.then((context1) => {
  console.log('The session state is now: ' + JSON.stringify(context1));
  context0 = context1;
});

console.log("blabla");
client.runActions(sessionId, 'a Paris ?', context0)
.then((context2) => {
  console.log('The session state is now: ' + JSON.stringify(context2));
})
.catch((e) => {
  console.log('Oops! Got an error: ' + e);
});
