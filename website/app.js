/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// personal api Keys to get the data from OpenWeatherMap
const baseURL= "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=adf5a32405c06e3075cf5fc9ca191c2b&units=metric";

// The generate function
function generate(event) { 
    //Storing the values of the feelings and the zip after clicking the generate button
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    Get_Data_From_API(zip).then((data) => {
         // Making sure that all data are available
     if (zip==null || feelings==null) {
        console.log(" Fill all required data!");
        return;
    }
        else {
          const {
            main: { temp },
            name: city,
          } = data;
          
    
          const info = {
            newDate,
            city,
            temp: Math.round(temp),
            feelings,
          };
          console.log(info);
          postData(`http://localhost:5000/addData`,info)
    
          update_UI();
          
        }
      } 
   
);}

// calling the Function by the event listener
document.getElementById("generate").addEventListener("click", generate);

//Function to GET Web API Data
async function Get_Data_From_API (zipCode) {
    let res = await fetch(`${baseURL}${zipCode}${apiKey}`, {
    });
     try { 
         let New_Data = await res.json();
         return New_Data;
     } catch(error) {
         console.log("Error, please try again");
     }
 }

 /* Function to POST data */
async function postData (url='', info={}) {
    let res = await fetch(url, {
       method:"POST",
       headers:{
           "content-Type":"application/json"
       },
       body: JSON.stringify(info)
    });

    try {
        let new_Data = await(res.json());
        return new_Data;
    } catch(error) {
        console.log("Error, please try again");
    }
}
// Change UI function
async function update_UI() {
    const res = await fetch('http://localhost:5000/all');

    try {
        const NewData = await res.json();
        let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let userData = document.getElementById('content');
        date.innerHTML = "Date: " + NewData.newDate;
        temp.innerHTML = "Temperature: " + NewData.temp+"&deg;C";
        userData.innerHTML = `Feeling: ${NewData.feelings}`;
        
    } catch(error) {
        console.log("Error, please try again");
    }
}