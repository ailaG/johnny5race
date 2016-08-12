
if(Math.random()>0.5){
	document.getElementById("team").innerHTML = "Your team is: A";
      }
 else{
 	document.getElementById("team").innerHTML = "Your team is: B";

 }
  $("button").click(function(){
       $.ajax({
       		url: "http://dev.galiaba.com/chen.php",
       		success: function(result){
           		$("#div1").html(result);
        	}
        });
    });
