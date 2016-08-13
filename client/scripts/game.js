var choice=Math.random();
var team;
var adderButton = $(".adder");

// Choose team
if(choice>0.5){
	 team="B";
      }
 else{
 	team="A";

 }

$("#team").text("You're on team " + team);
switch (team) {
	case 'A':
		$('body').css('background-color', '#f5f392');
		break;
	case 'B':
		$('body').css('background-color', '#37ab3c');
		break;
}



 
 adderButton.on('click tap', function(){
       $.ajax({
       		url: "http://192.168.0.107:3000/",
       	   data:{"team":team},
       		success: function(result){
           		console.log("Sent click!");
        	}});
       moveButton();
       resizeButton();
    });
function moveButton() {
	// var currX = adderButton.position().left,
	// 	currY = adderButton.position().top;
	var buttonHeight = adderButton.outerHeight(),
		buttonWidth = adderButton.outerWidth();
	var containerHeight = window.innerHeight,
		containerWidth = window.innerWidth;

	var newX = Math.random() * (containerWidth - buttonWidth);
	var newY = Math.random() * (containerHeight - buttonHeight);

	adderButton.offset({left: newX, top: newY});

}

function resizeButton() {
	var currHeight = adderButton.height(),
		currWidth = adderButton.width();
	adderButton.height(
		Math.max(currHeight * 0.8, 10)
	);
	adderButton.width(
		Math.max(currWidth * 0.8, 10)
	);


}