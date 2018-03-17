var option;
var usersphone;

  //your code here

$(function () {
            $('#lstFruits').multiselect({
                includeSelectAllOption: true
            });
            $('#Submit').click(function () {
                var selected = $("#selectpicker option:selected");
                var message = "";
                selected.each(function () {
                    message += $(this).text() + " " + $(this).val() + "\n";
                });
                alert(message);
            });
        });
function continueButton() {
  var user = ((document.getElementById("uname")||{}).value)||"";
  var phone = ((document.getElementById("contact")||{}).value)||"";
  var mail = ((document.getElementById("email")||{}).value)||"";
  var myvar=document.getElementById("list");
  option=myvar.options[myvar.selectedIndex].value;
  user_credential=localStorage.getItem("Email");

  if(user_credential)
  {

  var lat=localStorage.getItem("Lat");
  var lang=localStorage.getItem("Lang");
  var dataString="lat="+lat+"&lang="+lang+"&service="+option+"&insert=";
  // call to server here


  $.ajax({
  type: "POST",
  url:"http://pakrsa.com/rsa_directory/CallService.php",
  data: dataString,
  dataType:"json",
  cache: false,
  beforeSend: function(){$("#insert").val('Connecting...'); },
  success:function(data)
  {

    if(data=="No Nearby providers within 5 kilometers")
    {
      alert("No Nearby providers within 7 kilometers");
      $("#insert").val('Continue');
    }
    else {
      console.log(data);
  //  alert(data.length);
      localStorage.setItem("ProvidersList",JSON.stringify(data));


   window.location.href = "nearbyproviders.html";

    }


 },
 error: function ()
          {
                   alert("Something went wrong.Please make sure you are connected to the internet.");
                   $("#insert").val('Continue');
          }

  });
// end
}
  else
  {
        if(user=="" || phone=="" || mail=="") {
          if (confirm("You need to be logged in first. Click 'Ok' if you want to login now.") == true) {
            window.location.href = "SignIn.html";
        } else {
            window.location.href = "selectservice.html"
        }
        }
        else {

        }
  }
}

document.addEventListener('backbutton', function(){
       window.location.href="index.html";
  });
