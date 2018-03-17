// Creating a global  variables

var myDB;
var rent;
var name;
var bedroom;
var date;
var property;
var furniture;
var notes;

//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite3.db", location: 'default' });

    // this code is getting the users location and saving it for later use. it will go in onSuccess function if it got the coordinates. it goes in onError function if something went wrong. if it fails to get the coordinates in the time mentioned in the timeout field it goes into onError function. The timeout is set in milliseconds.
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 5000 });
    function onSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;

        localStorage.setItem("Lat", lat);
        localStorage.setItem("Lang", lang);
  
        };

        function onError(error) {
            alert("Problem occured while estabishing connection. Kindly make sure you have internet and GPS enabled.");
            navigator.app.exitApp();
        }


    }


function SubmitClicked()
{
 
    // on save clicked

  rent = ((document.getElementById("rent")||{}).value)||"";
   name = ((document.getElementById("name") || {}).value) || "";
  bedroom = ((document.getElementById("bedroom") || {}).value) || "";
  date = ((document.getElementById("date") || {}).value) || "";
  property = ((document.getElementById("property") || {}).value) || "";
  furniture = ((document.getElementById("furniture") || {}).value) || "";
  notes = ((document.getElementById("notes") || {}).value) || "";



  if (rent === "" || name === "" || bedroom === "" || date === "" || property === "" )
    {
      alert("Kindly enter all the required fields before proceeding.");
      return;
    }


  var d = "PropertyType: " + property +
      "\n Bedrooms: " + bedroom +
      "\n Date: " + date +
      "\n Rent: " + rent +
      "\n Name: " + name;

  if (notes !== "")
      d += "\n Notes: " + notes;

  if (furniture != "")
      d += "\n Furniture:" + furniture;


       // the code below show a dialog box asking user the confirmation to save data.
  navigator.notification.confirm(
      d,
      onConfirm,
      'Confirm Details',
      'Confirm,Edit'
  );
    
return;
}
function onConfirm(buttonIndex)
{
    // button index contains the number of the choice of the user from the dialog box. 2 for Edit 1 for Confirm.
    if (buttonIndex == 2) {
        return;
    }
    else {

        // opening Database
        var id = localStorage.getItem("id");

        if (id == null || id == undefined) {
            id = 1;
            localStorage.setItem("id", id);
        }
        else {
            id++;
        }

        // getting the previously stored coordinates
        var lat = localStorage.getItem("Lat");
        var lang = localStorage.getItem("Lang");
        localStorage.removeItem("Lat");
        localStorage.removeItem("Lang");
        
        console.log(alert);
        if (lat == "" || lang == "" || lat == "0")
        {
            alert("Kindly make sure your gps and internet are enabled.");
            return;
        }

        // check if a table exists if not create one otherwise use the one which is already there.
        myDB.transaction(
            function (transaction) {
                transaction.executeSql('CREATE TABLE IF NOT EXISTS MyTable ( id integer primary key autoincrement , rent text, name text , bedroom text, date text unique , property text , furniture text , notes text , lat real , lang real )', [],
                    function (tx, result) {
                      
                    },
                    function (error) {
                        alert("Error occurred while creating the table.");
                    });
            });

        // Inserting Data into db
        ;
        myDB.transaction(function (transaction) {
            var executeQuery = "INSERT INTO MyTable ( rent , name , bedroom , date , property , furniture , notes , lat , lang ) VALUES (?,?,?,?,?,?,?,?,?) ";
            transaction.executeSql(executeQuery, [ rent, name, bedroom, date, property, furniture, notes, lat, lang]
                , function (tx, result) {
       
                    window.location.href = "index.html";
                },
                function (error) {
                    alert('Error occurred possibly due to duplicate entry.');
                    console.log(error);
                });
        });
    }
}

document.addEventListener('backbutton', function () {
    // go to previous page on button click.
    window.location.href = "index.html";
  });
