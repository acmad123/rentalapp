$(document).ready(function()
 {


 $("#insert").click(function()
 {
  // alert("here");
 var my_email=$("#email").val();
if(email == "")
{
    alert("Field is empty. Kindly provide your email address for authentication.");
}
else {
  var dataString="my_email="+email+"&insert=";
  if($.trim(email).length>0 )
  {
  $.ajax({
  type: "POST",
  url:"http://pakrsa.com/rsa_directory/SignIn.php",

  data: dataString,
  dataType:"json",
  crossDomain: true,
  cache: false,
  beforeSend: function(){ $("#insert").val('Connecting...');},
  success:function(data)
  {
 if(data!="This Account does not exist")
 {
     $("#insert").val('Succeeded');


     console.log(data);

     localStorage.setItem('car_id',data[0].Car_ID);
     localStorage.setItem('ID',data[0].ID);
   //  alert(localStorage.getItem("ID"));
     localStorage.setItem('Name',data[0].Name);
     localStorage.setItem('Phone',data[0].Phone);
       localStorage.setItem('Email',data[0].Email);
     // this should output the firstnames.
     if (confirm("Click 'Ok' if you want to search providers based on the service you select.") == true) {
       window.location.href = "selectservice.html";
     } else {
       window.location.href = "menu.html"
     }
 }
 else {
   alert("This Account does not exist");
   $("#insert").val('Login');
 }
 },
 error: function () {
                   alert("There is some error. Kindly check your internet connection.");
                   $("#insert").val('Login');
               }

  });
  }
  //alert("TEU");

}

 return false;
 });
 });

 document.addEventListener('backbutton', function(){
        window.location.href="index.html";
   });
