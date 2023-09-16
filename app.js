///need to include your own .env file with private CTA API key

const env = require('dotenv').config({path: './.env'});
const API_KEY = process.env.API_KEY
const url = 'https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${API_KEY}&mapid=40570&outputType=JSON'
console.log(url)

//array to hold all the dired arrival objects for the Blue Line California stop
let trainArrivalsArray = []
function fetchTrainTimes(){
    let output = ""//creates an empty string for our output

    //fetches the data at the chicago public transit API endpoint
    fetch(url, {mode: 'no-cors'})
    //begins the promise statement 
        .then((res) => {
            //when resolved, format data into JSON format
        res
          .json()
          .then((data) => {
          //grabs data from the API call and maps it to an array of objects
            trainArrivalsArray = data.ctatt.eta.map((arrival) => ({
              route: arrival.rt,
              destination: arrival.destNm,
              arrivalTime: arrival.arrT,
            }));
            //itterates through that array of objects
            trainArrivalsArray.forEach(element => {
              //sets the specific date returned to be in a readable format
              //this was a challenge, turns out Javascript has a whole library for dealing with dates
              const arvTime = new Date(element.arrivalTime) //creates the date input into a date Object
              const formattedDate = arvTime.toLocaleString("en-US", {
                      timeStyle: "short",
                      hour12: true,
                  });
              //logs our trains due at their respective times :-)
              console.log("\n"+element.destination+" due at "+formattedDate)
              //concats to our empty string the output of arrival times
              output.concat("\n"+element.destination+" due at "+formattedDate)
           });
          })
          .catch((err) => {
            console.log(err);
            console.log("oh no!")
            //assigns an unhappy value to our output if everything fails
            output.concat("oh no")
          });

      });//end of promise statement
    
    return output
}
//runs the function
fetchTrainTimes()

function updateText(element, textInput){
    element.textContent = textInput
    console.log("text test")
}
