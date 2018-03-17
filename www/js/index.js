
var myDB;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite3.db", location: 'default' });
}

function SearchClicked()
{
    window.location.href = "Search.html"; 
}
function EditClicked()
{
    window.location.href = "Edit.html"
}
function Delete(selectedIndex) {
    if (selectedIndex == 1)
    {
        //Delete Data from Database
      
            myDB.transaction(function (transaction) {
                var executeQuery = "DROP TABLE  IF EXISTS MyTable ";
                transaction.executeSql(executeQuery, [],
                    function (tx, result) { alert('All entries deleted successfully.'); },
                    function (error) { alert('Error occurred while droping the table.'); }
                );
            });
   

        
    }
}
function DeleteClicked()
{

    navigator.notification.confirm(
        "Are you sure you want to delete all entries in the database?" ,
        Delete,
        'Delete all entries',
        'Yes,No'
    );
}
function AddClicked()
{
    window.location.href = "Add.html";
}