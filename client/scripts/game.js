var choice=Math.random();
var team;
if(choice>0.5){
	 team="B";
      }
 else{
 	team="A";

 }

 
  $(".adder").click(function(){
       $.ajax({url: "http://dev.galiaba.com/chen.php",
       	   data:{"team":team},
       		success: function(result){
           		$("#team").html(result);
        	}});
    });
