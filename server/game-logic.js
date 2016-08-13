"use strict"

// Misc
var sleep_lib = require('sleep');
var sleep = sleep_lib.sleep;

// Load Johnny-Five
var five = require('johnny-five');
var board = new five.Board();

// Handle events
var events = require('events');
const eventEmitter = new events();

// Express - handle AJAX
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  var url = require('url');
//  res.send('Got team!');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var team = query['team'];
	console.log('Got team ' + team);
	if (team=='A' || team=='B') {
		advance(team);
	}
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


// Global stuff

var led_ids = {
	'A' : ['A5','A4','A3','A2','A1'],
	'B' : [2,3,4,5,6]
}
var leds;

var is_game_on = true;
var scores = {
	A : 0,
	B : 0
}

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
		eventEmitter.emit('game_over', team)
	} else {
		console.log('blinking ' + (count) + ' led # ' + leds[team][count].pin);
		//leds[team][count].blink(); //TODO
	}

}

eventEmitter.on('game_over', (team) => {
	console.log('Team ' + team + ' won!');
})



board.on("ready", () => {
	console.log('Board Ready');
	leds = {
		'A' : led_ids['A'].map((id) => new five.Led(id)),
		'B' : led_ids['B'].map((id) => new five.Led(id))
	}
	// leds = {
	// 	'A' : new five.Leds(led_ids['A']),
	// 	'B' : new five.Leds(led_ids['B'])
	// }

	// Test LEDs
	// for (let led of leds.A.concat(leds.B)) {
	// 	led.on();
	// }
//	sleep(1);

	// Reset LEDs
	console.log('All off');
	for (let led of leds.A.concat(leds.B)) {
		led.stop().off();
	}

	eventEmitter.on('score_change', () => {
		console.log('Score changed');
		if (is_game_on) // todo
			updateLights('A', scores['A']);
		if (is_game_on) // todo
			updateLights('B', scores['B']);
	})


	// setTimeout(advance('A'), 10);
	// sleep(1);
	// setTimeout(advance('A'), 10);
	// sleep(1);
	// setTimeout(advance('B'));
	// sleep(1);
	// setTimeout(advance('A'));
	// sleep(1);
	// setTimeout(advance('A'));
	// sleep(1);
	// setTimeout(advance('A'));
})

