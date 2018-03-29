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

        }

        // check if a table exists if not create one otherwise use the one which is already there.
        myDB.transaction(
            function (transaction) {
                transaction.executeSql('CREATE TABLE IF NOT EXISTS MyTable ( id integer primary key autoincrement , rent text, name text , bedroom text, date text unique , property text , furniture text , notes text)', [],
                    function (tx, result) {
                      
                    },
                    function (error) {
                        alert("Error occurred while creating the table.");
                    });
            });

        // Inserting Data into db
        ;
        myDB.transaction(function (transaction) {
            var executeQuery = "INSERT INTO MyTable ( rent , name , bedroom , date , property , furniture , notes , ) VALUES (?,?,?,?,?,?,?) ";
            transaction.executeSql(executeQuery, [ rent, name, bedroom, date, property, furniture, notes]
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
