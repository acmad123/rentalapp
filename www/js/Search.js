
var myDB;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite3.db", location: 'default' });
}

function SearchClicked() {

     // check if a table exists if not create one otherwise use the one which is already there.
    var property = ((document.getElementById("property") || {}).value) || "";
    myDB.transaction( 
        function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS MyTable ( id integer primary key autoincrement , rent text, name text , bedroom text, date text unique , property text , furniture text , notes text , lat real , lang real )', [],
                function (tx, result) {
                   
                },
                function (error) {
                    alert("Error occurred while creating the table.");
                });
        });
    // getting the reference to the paragraph tag on the Search.html with id = data
    var data = document.getElementById("data");
    // chr will contain the results which will be populated on the screen.
    var chr = ""

    // searching with respect from DB here
    myDB.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM MyTable where property = ?', [property], function (tx, results) {
            var len = results.rows.length;
            // location variable will be used to store the location of the user. The latitude and langitude fields will be added to it after fetching their values from the db.
            var location ="https://www.google.com/maps/search/?api=1&query="
            var i;
           
            if (len == 0)
            {
                data.innerHTML = "No results to display.";
            }
            for (i = 0; i < len; i++) {
          

                var res = results.rows.item(i).date;
                // spliting the date variable which contains both the time and date into two separate time and date variables.
                    var date = res.split("T");
                    chr += "<br /> <b> ID: <b>" + results.rows.item(i).id
                        + "<br/><b> Property Type: <b>" + results.rows.item(i).property
                        + "<br/><b>Number of Bedrooms: <b> " + results.rows.item(i).bedroom
                        + "<br/><b>Name of Reporter: <b> " + results.rows.item(i).name
                        + "<br/><b>Date: <b> " + date[0]
                        + "<br/><b>Time: <b> " + date[1]
                        + " <br/><b>Rent:<b> " + results.rows.item(i).rent
                    if (results.rows.item(i).notes != "")
                        chr += "<br/><b>Note: <b> " + results.rows.item(i).notes;

                    if (results.rows.item(i).furniture != "")
                        chr += "<br/><b> Furniture Type: <b>" + results.rows.item(i).furniture;
                
                // concatinating string location with the latitude and longitude. 
                    chr += "<br/><a href=" + location + results.rows.item(i).lat + "," + results.rows.item(i).lang + ">Click to see location</a>" + "<br/><br/>************************************";
                }
            // data.innerHTML will populate the results on the screen.
            if (chr != "")
                data.innerHTML = chr;
        }, null);
    });

}
document.addEventListener('backbutton', function () {
     // go back to the main screen on back button pressed.
        window.location.href="index.html";
   });
