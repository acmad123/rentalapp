//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function ()
{
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function()
{


var	 myuser = ((document.getElementById("myname")||{}).value)||"";
  var myphone = ((document.getElementById("phone")||{}).value)||"";
  var mymail = ((document.getElementById("mail")||{}).value)||"";
	var cname = ((document.getElementById("cmodel")||{}).value)||""; //options car masla
  var cmodel = ((document.getElementById("year")||{}).value)||"";
  var plate = ((document.getElementById("plate")||{}).value)||"";
		if(myuser=="" || myphone=="" || mymail=="" || cname=="" || cmodel=="" ||plate=="")
		{
			alert("Please input all fields!");
		}
		else
		{

			var dataString="name="+myuser+"&phone="+myphone+"&my_email="+mymail+"&cname="+cname+"&cmodel="+cmodel+"&myplate="+plate+"&insert=";
			if($.trim(myuser).length>0 & $.trim(myphone).length>0 & $.trim(mymail).length>0 & $.trim(cmodel).length>0 & $.trim(cname).length>0 & $.trim(plate).length>0)
			{


			$.ajax({
			type: "POST",
			url:"http://pakrsa.com/rsa_directory/insert.php",

			data: dataString,
			crossDomain: true,
			cache: false,
			beforeSend: function(){ $(".submit").val('Connecting...');},
			success:function(data){

				console.log(data);
				if($.trim(data).toUpperCase()!="THIS ACCOUNT ALREADY EXISTS" && $.trim(data).toUpperCase()!="KINDLY UPDATE YOUR APPLICATION." && $.trim(data).toUpperCase()!="THIS ACCOUNT ALREADY EXISTS.")
				 {
					 $(".submit").val('Signed In');

					 localStorage.setItem('car_id',data);
					 localStorage.setItem('mycar',cname);
					 localStorage.setItem("mymodel",cmodel);
					 localStorage.setItem('myplate',plate);
					 localStorage.setItem('Name',myuser);
					 localStorage.setItem("Phone",myphone);
					 localStorage.setItem('Email',mymail);

					 if (confirm("Click 'Ok' if you want to search providers based on the service you select.") == true) {
			       window.location.href = "selectservice.html";
			   } else {
			       window.location.href = "menu.html"
			   }
				 }
				 else {
					 alert(data);
					 $(".submit").val('Resubmit');
				 }
			}

			});
			return false;


			}

     		}

});
function onError(error) {
alert('code: ' + error.code + '\n' +
'message: ' + error.message + '\n');
}

document.addEventListener('backbutton', function(){
       window.location.href="SignIn.html";
  });
