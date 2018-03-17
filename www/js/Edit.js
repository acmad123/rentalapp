
var myDB;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite3.db", location: 'default' });
}

function AddNoteClicked()
{
    var id = ((document.getElementById("id") || {}).value) || "";
    if (id == "")
    {
        alert("Enter an ID in ID field.");
        return;

    }
    
    var note = ((document.getElementById("note") || {}).value) || "";
    if (note == "") {
        alert("You cannot add an empty note field.");
        return;

    }

    // updates the note field in the database wrt to the id.
    myDB.transaction(function (transaction) {
        var executeQuery = "UPDATE MyTable SET notes=? WHERE id=?";
        transaction.executeSql(executeQuery, [note, id],
            //On Success
            function (tx, result) { alert('Updated successfully'); },
            //On Error
            function (error) { alert('Something went Wrong'); });
    });


}
