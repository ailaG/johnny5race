var choice=Math.random();
var team;
if(choice>0.5){
	 team="B";

if(Math.random()>0.5){
	document.getElementById("team").innerHTML = "Your team is: A";
      }
 else{
 	team="A";
 	document.getElementById("team").innerHTML = "Your team is: B";

 }
 console.log("hello");
  $(".adder").click(function(){
       $.ajax({url: "http://dev.galiaba.com/chen.php",
       	   data:{"team":team},
       		success: function(result){
           		$("#team").html(result);
        	}});
    });