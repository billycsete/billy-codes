(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jslint node: true */
'use strict';

// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.box2d = require('./box2d-plugin-full');
// window.Phaser = require('phaser/build/custom/phaser-split');


// Create new Phaser game canvas
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'codes', { create: create, update: update });

var maxCodeLength = 300;
var codeLineHeight = 10;
var codeLineHeightSpacing = 6;
var codeIndentValue = 20;
var codeLeftIndent = $(document).width() / 2 - 150;
var codeStartTop = $(document).height() / 2 - 160;
var codeCurrentPosition = codeStartTop;


var colors = {
	grey   : '#878985',
	pink   : '#ED2D73',
	green  : '#A8CE38',
	orange : '#F79624',
	yellow : '#E6DB73'
};

var LinesOfCode;


function create() {

	// Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
	game.input.maxPointers = 1;
	// Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
	game.stage.disableVisibilityChange = true;
	// This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	// viewport background color
	game.stage.backgroundColor = '#222222';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.setBoundsToWorld();
	game.physics.box2d.gravity.y = 300;
	game.physics.box2d.restitution = 0.8;

	// Create group
	LinesOfCode = game.add.group();
	LinesOfCode.enableBody = true;
	LinesOfCode.physicsBodyType = Phaser.Physics.BOX2D;

	// Add lines of code
	createLineOfCode(0,  90,  colors.grey,   0);
	createLineOfCode(1,  60,  colors.pink,   0);
	createLineOfCode(2,  60,  colors.pink,   1);
	createLineOfCode(3,  120, colors.green,  2);
	createLineOfCode(4,  100, colors.orange, 2);
	createLineOfCode(5,  80,  colors.pink,   1);
	createLineOfCode(6,  80,  colors.pink,   1);
	createLineOfCode(7,  90,  colors.pink,   2);
	createLineOfCode(8,  140, colors.green,  3);
	createLineOfCode(9,  240, colors.yellow, 3);
	createLineOfCode(10, 160, colors.yellow, 3);
	createLineOfCode(11, 90,  colors.pink,   2);
	createLineOfCode(12, 80,  colors.pink,   1);
	createLineOfCode(13, 120, colors.green,  2);
	createLineOfCode(14, 60,  colors.pink,   2);
	createLineOfCode(15, 100, colors.orange, 3);
	createLineOfCode(16, 150, colors.yellow, 3);
	createLineOfCode(17, 80,  colors.orange, 3);
	createLineOfCode(18, 120, colors.yellow, 3);
	createLineOfCode(19, 60,  colors.pink,   2);
	createLineOfCode(20, 200, colors.green,  1);
	createLineOfCode(21, 80,  colors.pink,   1);
	createLineOfCode(22, 80,  colors.pink,   0);

	// Set up handlers for mouse events
	game.input.onDown.add(mouseDragStart, this);
	game.input.addMoveCallback(mouseDragMove, this);
	game.input.onUp.add(mouseDragEnd, this);

	// Do stuff when the browser is resized
	game.scale.onSizeChange.add(sizeChange, this);

	// Align the HTML type with the lines of code
	setTypePosition();
}


function update( ) {
	if (game.input.activePointer.isDown)
	{
		//  First is the callback
		//  Second is the context in which the callback runs, in this case game.physics.arcade
		//  Third is the parameter the callback expects - it is always sent the Group child as the first parameter
		LinesOfCode.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 2000);
	}
}


function setTypePosition( ) {
	// Add text
	var textX = $(document).width() / 2 - 150;
	var textY = $(document).height() / 2 - 230;

	$('#header').css({
		'top' : textY + 'px',
		'left' : textX + 'px'
	});
}


function sizeChange( ) {
	console.log('size changed!');
	// setTypePosition();
}


function createLineOfCode( lineNumber, length, color, indentation ) {
	// TODO: guard against code that would be too long for iphone 5
	// var length = length;
	// // make sure the code fits on an iPhone 5
	// if( length + indentation * codeIndentValue > maxCodeLength ) {
	// 	length = maxCodeLength;
	// }

	var code = game.add.bitmapData(length, codeLineHeight);

	code.ctx.beginPath();
	code.ctx.rect(0, 0, length, codeLineHeight);
	code.ctx.fillStyle = color;
	code.ctx.fill();

	var x = codeLeftIndent + ( indentation * codeIndentValue ) + length/2;
	var y = codeStartTop + ( lineNumber * (codeLineHeight + codeLineHeightSpacing) );

	var sprite = LinesOfCode.create(x, y, code);

	// add physics to the line of code
	// game.physics.box2d.enable(sprite);
	// have the code floating in place initially
	sprite.body.gravityScale = 0;
}


function mouseDragStart() {
	game.physics.box2d.mouseDragStart(game.input.activePointer);

	// console.log(game.input.activePointer.x);
}


function mouseDragMove() {
	game.physics.box2d.mouseDragMove(game.input.activePointer);

	// console.log(game.input.activePointer);
}


function mouseDragEnd() {
	game.physics.box2d.mouseDragEnd();
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNsaW50IG5vZGU6IHRydWUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gd2luZG93LlBJWEkgPSByZXF1aXJlKCdwaGFzZXIvYnVpbGQvY3VzdG9tL3BpeGknKTtcbi8vIHdpbmRvdy5wMiA9IHJlcXVpcmUoJ3BoYXNlci9idWlsZC9jdXN0b20vcDInKTtcbi8vIHdpbmRvdy5ib3gyZCA9IHJlcXVpcmUoJy4vYm94MmQtcGx1Z2luLWZ1bGwnKTtcbi8vIHdpbmRvdy5QaGFzZXIgPSByZXF1aXJlKCdwaGFzZXIvYnVpbGQvY3VzdG9tL3BoYXNlci1zcGxpdCcpO1xuXG5cbi8vIENyZWF0ZSBuZXcgUGhhc2VyIGdhbWUgY2FudmFzXG52YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgnMTAwJScsICcxMDAlJywgUGhhc2VyLkFVVE8sICdjb2RlcycsIHsgY3JlYXRlOiBjcmVhdGUsIHVwZGF0ZTogdXBkYXRlIH0pO1xuXG52YXIgbWF4Q29kZUxlbmd0aCA9IDMwMDtcbnZhciBjb2RlTGluZUhlaWdodCA9IDEwO1xudmFyIGNvZGVMaW5lSGVpZ2h0U3BhY2luZyA9IDY7XG52YXIgY29kZUluZGVudFZhbHVlID0gMjA7XG52YXIgY29kZUxlZnRJbmRlbnQgPSAkKGRvY3VtZW50KS53aWR0aCgpIC8gMiAtIDE1MDtcbnZhciBjb2RlU3RhcnRUb3AgPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAvIDIgLSAxNjA7XG52YXIgY29kZUN1cnJlbnRQb3NpdGlvbiA9IGNvZGVTdGFydFRvcDtcblxuXG52YXIgY29sb3JzID0ge1xuXHRncmV5ICAgOiAnIzg3ODk4NScsXG5cdHBpbmsgICA6ICcjRUQyRDczJyxcblx0Z3JlZW4gIDogJyNBOENFMzgnLFxuXHRvcmFuZ2UgOiAnI0Y3OTYyNCcsXG5cdHllbGxvdyA6ICcjRTZEQjczJ1xufTtcblxudmFyIExpbmVzT2ZDb2RlO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcblxuXHQvLyBVbmxlc3MgeW91IHNwZWNpZmljYWxseSBrbm93IHlvdXIgZ2FtZSBuZWVkcyB0byBzdXBwb3J0IG11bHRpLXRvdWNoIEkgd291bGQgcmVjb21tZW5kIHNldHRpbmcgdGhpcyB0byAxXG5cdGdhbWUuaW5wdXQubWF4UG9pbnRlcnMgPSAxO1xuXHQvLyBQaGFzZXIgd2lsbCBhdXRvbWF0aWNhbGx5IHBhdXNlIGlmIHRoZSBicm93c2VyIHRhYiB0aGUgZ2FtZSBpcyBpbiBsb3NlcyBmb2N1cy4gWW91IGNhbiBkaXNhYmxlIHRoYXQgaGVyZTpcblx0Z2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XG5cdC8vIFRoaXMgdGVsbHMgdGhlIGdhbWUgdG8gcmVzaXplIHRoZSByZW5kZXJlciB0byBtYXRjaCB0aGUgZ2FtZSBkaW1lbnNpb25zIChpLmUuIDEwMCUgYnJvd3NlciB3aWR0aCAvIGhlaWdodClcblx0Z2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlJFU0laRTtcblx0Ly8gdmlld3BvcnQgYmFja2dyb3VuZCBjb2xvclxuXHRnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMjIyMjIyJztcblxuXHQvLyBFbmFibGUgQm94MkQgcGh5c2ljc1xuXHRnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQk9YMkQpO1xuXHRnYW1lLnBoeXNpY3MuYm94MmQuc2V0Qm91bmRzVG9Xb3JsZCgpO1xuXHRnYW1lLnBoeXNpY3MuYm94MmQuZ3Jhdml0eS55ID0gMzAwO1xuXHRnYW1lLnBoeXNpY3MuYm94MmQucmVzdGl0dXRpb24gPSAwLjg7XG5cblx0Ly8gQ3JlYXRlIGdyb3VwXG5cdExpbmVzT2ZDb2RlID0gZ2FtZS5hZGQuZ3JvdXAoKTtcblx0TGluZXNPZkNvZGUuZW5hYmxlQm9keSA9IHRydWU7XG5cdExpbmVzT2ZDb2RlLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkJPWDJEO1xuXG5cdC8vIEFkZCBsaW5lcyBvZiBjb2RlXG5cdGNyZWF0ZUxpbmVPZkNvZGUoMCwgIDkwLCAgY29sb3JzLmdyZXksICAgMCk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMSwgIDYwLCAgY29sb3JzLnBpbmssICAgMCk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMiwgIDYwLCAgY29sb3JzLnBpbmssICAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMywgIDEyMCwgY29sb3JzLmdyZWVuLCAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoNCwgIDEwMCwgY29sb3JzLm9yYW5nZSwgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoNSwgIDgwLCAgY29sb3JzLnBpbmssICAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoNiwgIDgwLCAgY29sb3JzLnBpbmssICAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoNywgIDkwLCAgY29sb3JzLnBpbmssICAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoOCwgIDE0MCwgY29sb3JzLmdyZWVuLCAgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoOSwgIDI0MCwgY29sb3JzLnllbGxvdywgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTAsIDE2MCwgY29sb3JzLnllbGxvdywgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTEsIDkwLCAgY29sb3JzLnBpbmssICAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTIsIDgwLCAgY29sb3JzLnBpbmssICAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTMsIDEyMCwgY29sb3JzLmdyZWVuLCAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTQsIDYwLCAgY29sb3JzLnBpbmssICAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTUsIDEwMCwgY29sb3JzLm9yYW5nZSwgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTYsIDE1MCwgY29sb3JzLnllbGxvdywgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTcsIDgwLCAgY29sb3JzLm9yYW5nZSwgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTgsIDEyMCwgY29sb3JzLnllbGxvdywgMyk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMTksIDYwLCAgY29sb3JzLnBpbmssICAgMik7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMjAsIDIwMCwgY29sb3JzLmdyZWVuLCAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMjEsIDgwLCAgY29sb3JzLnBpbmssICAgMSk7XG5cdGNyZWF0ZUxpbmVPZkNvZGUoMjIsIDgwLCAgY29sb3JzLnBpbmssICAgMCk7XG5cblx0Ly8gU2V0IHVwIGhhbmRsZXJzIGZvciBtb3VzZSBldmVudHNcblx0Z2FtZS5pbnB1dC5vbkRvd24uYWRkKG1vdXNlRHJhZ1N0YXJ0LCB0aGlzKTtcblx0Z2FtZS5pbnB1dC5hZGRNb3ZlQ2FsbGJhY2sobW91c2VEcmFnTW92ZSwgdGhpcyk7XG5cdGdhbWUuaW5wdXQub25VcC5hZGQobW91c2VEcmFnRW5kLCB0aGlzKTtcblxuXHQvLyBEbyBzdHVmZiB3aGVuIHRoZSBicm93c2VyIGlzIHJlc2l6ZWRcblx0Z2FtZS5zY2FsZS5vblNpemVDaGFuZ2UuYWRkKHNpemVDaGFuZ2UsIHRoaXMpO1xuXG5cdC8vIEFsaWduIHRoZSBIVE1MIHR5cGUgd2l0aCB0aGUgbGluZXMgb2YgY29kZVxuXHRzZXRUeXBlUG9zaXRpb24oKTtcbn1cblxuXG5mdW5jdGlvbiB1cGRhdGUoICkge1xuXHRpZiAoZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bilcblx0e1xuXHRcdC8vICBGaXJzdCBpcyB0aGUgY2FsbGJhY2tcblx0XHQvLyAgU2Vjb25kIGlzIHRoZSBjb250ZXh0IGluIHdoaWNoIHRoZSBjYWxsYmFjayBydW5zLCBpbiB0aGlzIGNhc2UgZ2FtZS5waHlzaWNzLmFyY2FkZVxuXHRcdC8vICBUaGlyZCBpcyB0aGUgcGFyYW1ldGVyIHRoZSBjYWxsYmFjayBleHBlY3RzIC0gaXQgaXMgYWx3YXlzIHNlbnQgdGhlIEdyb3VwIGNoaWxkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXJcblx0XHRMaW5lc09mQ29kZS5mb3JFYWNoKGdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvUG9pbnRlciwgZ2FtZS5waHlzaWNzLmFyY2FkZSwgZmFsc2UsIDIwMDApO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gc2V0VHlwZVBvc2l0aW9uKCApIHtcblx0Ly8gQWRkIHRleHRcblx0dmFyIHRleHRYID0gJChkb2N1bWVudCkud2lkdGgoKSAvIDIgLSAxNTA7XG5cdHZhciB0ZXh0WSA9ICQoZG9jdW1lbnQpLmhlaWdodCgpIC8gMiAtIDIzMDtcblxuXHQkKCcjaGVhZGVyJykuY3NzKHtcblx0XHQndG9wJyA6IHRleHRZICsgJ3B4Jyxcblx0XHQnbGVmdCcgOiB0ZXh0WCArICdweCdcblx0fSk7XG59XG5cblxuZnVuY3Rpb24gc2l6ZUNoYW5nZSggKSB7XG5cdGNvbnNvbGUubG9nKCdzaXplIGNoYW5nZWQhJyk7XG5cdC8vIHNldFR5cGVQb3NpdGlvbigpO1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmVPZkNvZGUoIGxpbmVOdW1iZXIsIGxlbmd0aCwgY29sb3IsIGluZGVudGF0aW9uICkge1xuXHQvLyBUT0RPOiBndWFyZCBhZ2FpbnN0IGNvZGUgdGhhdCB3b3VsZCBiZSB0b28gbG9uZyBmb3IgaXBob25lIDVcblx0Ly8gdmFyIGxlbmd0aCA9IGxlbmd0aDtcblx0Ly8gLy8gbWFrZSBzdXJlIHRoZSBjb2RlIGZpdHMgb24gYW4gaVBob25lIDVcblx0Ly8gaWYoIGxlbmd0aCArIGluZGVudGF0aW9uICogY29kZUluZGVudFZhbHVlID4gbWF4Q29kZUxlbmd0aCApIHtcblx0Ly8gXHRsZW5ndGggPSBtYXhDb2RlTGVuZ3RoO1xuXHQvLyB9XG5cblx0dmFyIGNvZGUgPSBnYW1lLmFkZC5iaXRtYXBEYXRhKGxlbmd0aCwgY29kZUxpbmVIZWlnaHQpO1xuXG5cdGNvZGUuY3R4LmJlZ2luUGF0aCgpO1xuXHRjb2RlLmN0eC5yZWN0KDAsIDAsIGxlbmd0aCwgY29kZUxpbmVIZWlnaHQpO1xuXHRjb2RlLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0Y29kZS5jdHguZmlsbCgpO1xuXG5cdHZhciB4ID0gY29kZUxlZnRJbmRlbnQgKyAoIGluZGVudGF0aW9uICogY29kZUluZGVudFZhbHVlICkgKyBsZW5ndGgvMjtcblx0dmFyIHkgPSBjb2RlU3RhcnRUb3AgKyAoIGxpbmVOdW1iZXIgKiAoY29kZUxpbmVIZWlnaHQgKyBjb2RlTGluZUhlaWdodFNwYWNpbmcpICk7XG5cblx0dmFyIHNwcml0ZSA9IExpbmVzT2ZDb2RlLmNyZWF0ZSh4LCB5LCBjb2RlKTtcblxuXHQvLyBhZGQgcGh5c2ljcyB0byB0aGUgbGluZSBvZiBjb2RlXG5cdC8vIGdhbWUucGh5c2ljcy5ib3gyZC5lbmFibGUoc3ByaXRlKTtcblx0Ly8gaGF2ZSB0aGUgY29kZSBmbG9hdGluZyBpbiBwbGFjZSBpbml0aWFsbHlcblx0c3ByaXRlLmJvZHkuZ3Jhdml0eVNjYWxlID0gMDtcbn1cblxuXG5mdW5jdGlvbiBtb3VzZURyYWdTdGFydCgpIHtcblx0Z2FtZS5waHlzaWNzLmJveDJkLm1vdXNlRHJhZ1N0YXJ0KGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlcik7XG5cblx0Ly8gY29uc29sZS5sb2coZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLngpO1xufVxuXG5cbmZ1bmN0aW9uIG1vdXNlRHJhZ01vdmUoKSB7XG5cdGdhbWUucGh5c2ljcy5ib3gyZC5tb3VzZURyYWdNb3ZlKGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlcik7XG5cblx0Ly8gY29uc29sZS5sb2coZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyKTtcbn1cblxuXG5mdW5jdGlvbiBtb3VzZURyYWdFbmQoKSB7XG5cdGdhbWUucGh5c2ljcy5ib3gyZC5tb3VzZURyYWdFbmQoKTtcbn1cbiJdfQ==
