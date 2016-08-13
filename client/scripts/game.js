
if(Math.random()>0.5){
	document.getElementById("team").innerHTML = "Your team is: A";
      }
 else{
 	document.getElementById("team").innerHTML = "Your team is: B";

 }
 console.log("hello");
  $(".adder").click(function(){
       $.ajax({url: "http://dev.galiaba.com/chen.php",
       		success: function(result){
           		$("#team").html(result);
        	}});
    });