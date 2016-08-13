var choice=Math.random();
var team;
if(choice>0.5){
	 team="B";
      }
 else{
 	team="A";

 }

 $("#team").text("You're on team " + team);

 
  $(".adder").click(function(){
       $.ajax({
       		//url: "http://dev.galiaba.com/chen.php",
       		url: "http://localhost:3000/",
       	   data:{"team":team},
       		success: function(result){
           		//$("#team").html(result);
           		console.log("Sent click!");
        	}});
       var x = event.clientX;     // Get the horizontal coordinate
       var y = event.clientY;     // Get the vertical coordinate
       var coor = "X coords: " + x + ", Y coords: " + y;
       console.log(coor);
    });

