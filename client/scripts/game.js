var choice=Math.random();
var team;
if(choice>0.5){
	 team="B";
      }
 else{
 	team="A";

 }

 $("#team").text("You're on team " + team);

 
  $(".adder").on('click tap', function(){
       $.ajax({
       		//url: "http://dev.galiaba.com/chen.php",
       		url: "http://192.168.0.107:3000/",
       	   data:{"team":team},
       		success: function(result){
           		//$("#team").html(result);
           		console.log("Sent click!");
        	}});
    });
