"use strict"

// Misc
var sleep_lib = require('sleep'),
	sleep = sleep_lib.sleep;

// Load Johnny-Five
var five = require('johnny-five');
var board = new five.Board();

// Handle events
var events = require('events');
const eventEmitter = new events();

// Express - handle AJAX
var express = require('express');
var webserver = express();

webserver.get('/', function (req, res) {
  var url = require('url');
//  res.send('Got team!');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var team = query['team'];
	console.log('Got team ' + team);
	if (team=='A' || team=='B') {
		advance(team);
	}

	res.status(200);
	res.header('Access-Control-Allow-Origin', '*');
	res.send('Advanced team ' + team + '!');
});

webserver.listen(3000, function () {
  console.log('Listening on port 3000!');
});


// Global stuff

var advance_step = 2;

var led_ids = {
	'A' : ['A5','A4','A3','A2','A1'],
	'B' : [2,3,4,5,6]
}
var leds;

var speaker,
	piezo_pin = 11;

var is_game_on = true;
var scores = {
	A : 0,
	B : 0
}



// Helper functions
function advance(team) {
	console.log('Advance ' + team);
	scores[team]++;
	eventEmitter.emit('score_change');
}

function updateLights(team, count) {
	console.log('Updating lights for team ' + team + ' to ' + count);
	count = Math.min(count, leds[team].length);
	
	console.log('All off');
	for (let led of leds[team]) {
		led.stop().off();
	}

	for (let i=0; i<count; i++) {
		console.log('turning on ' + leds[team][i].pin);
		leds[team][i].on();
	}
	if (count >= leds[team].length) {
		// Win
		is_game_on = false;
		eventEmitter.emit('game_won', team)
	} else {
		console.log('blinking ' + (count) + ' led # ' + leds[team][count].pin);
		leds[team][count].blink(); //TODO
	}

}

// Event handling

eventEmitter.on('game_won', (team) => {
	console.log('Team ' + team + ' won!');
	speaker = new five.Piezo(piezo_pin);
	leds[team].forEach((led) => {
		led.strobe(500);
	});
	webserver.close();
})

eventEmitter.on('score_change', () => {
	console.log('Score changed');
	if (is_game_on) // todo
		updateLights('A', Math.floor(scores['A'] / advance_step));
	if (is_game_on) // todo
		updateLights('B', Math.floor(scores['B'] / advance_step));
})


board.on("ready", () => {
	console.log('Board Ready');
	leds = {
		'A' : led_ids['A'].map((id) => new five.Led(id)),
		'B' : led_ids['B'].map((id) => new five.Led(id))
	}

	// Test LEDs
	// for (let led of leds.A.concat(leds.B)) {
	// 	led.on();
	// }
	//	sleep(1);

	// Reset LEDs
	updateLights('A',0);
	updateLights('B',0);
	console.log("Game logic ready!");



})

