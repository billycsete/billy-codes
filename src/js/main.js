/*jslint node: true */
'use strict';

var $ = require('../../bower_components/jquery/dist/jquery');

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
