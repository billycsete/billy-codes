/*jslint node: true */
'use strict';

var $               = require('../../bower_components/jquery/dist/jquery');


var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'codes', { preload: preload, create: create });

var codeLineHeight = 18;
var codeIndentValue = 22;
var codeLeftIndent = 20;
var codeStartTop = 100;
var codeCurrentPosition = codeStartTop;

var htmlImages = [
	'tag-doctype',
	'tag-medium-open',
	'tag-medium-close',
	'tag-header-open',
	'tag-header-close',
	'tag-title',
	'tag-meta',
	'tag-h1'
];

var html = [
	{
		code : 'tag-doctype',
		indentation : 0
	},
	{
		code : 'tag-medium-open',
		indentation : 0
	},
	{
		code : 'tag-medium-open',
		indentation : 1
	},
	{
		code : 'tag-title',
		indentation : 2
	},
	{
		code : 'tag-meta',
		indentation : 2
	},
	{
		code : 'tag-medium-close',
		indentation : 1
	},
	{
		code : 'tag-medium-open',
		indentation : 1
	},
	{
		code : 'tag-header-open',
		indentation : 2
	},
	{
		code : 'tag-h1',
		indentation : 3
	},
	{
		code : 'tag-header-close',
		indentation : 2
	},
	{
		code : 'tag-header-open',
		indentation : 2
	},
	{
		code : 'tag-h1',
		indentation : 3
	},
	{
		code : 'tag-header-close',
		indentation : 2
	},
	{
		code : 'tag-header-open',
		indentation : 2
	},
	{
		code : 'tag-h1',
		indentation : 3
	},
	{
		code : 'tag-header-close',
		indentation : 2
	},
	{
		code : 'tag-medium-close',
		indentation : 1
	},
	{
		code : 'tag-medium-close',
		indentation : 0
	}
];


function preload() {

	htmlImages.forEach( function(imageName) {
		game.load.image(imageName, 'images/' + imageName + '.png');
	});

	// for (var key in validation_messages) {
	// 	if (validation_messages.hasOwnProperty(key)) {
	// 		var obj = validation_messages[key];
	// 	}
	// }

	// // load tags
	// game.load.image('doctype', 'images/tag_doctype.png');
	// game.load.image('html-open', 'images/tag_html_open.png');
	// game.load.image('html-close', 'images/tag_html_close.png');
	// game.load.image('head-open', 'images/tag_head_open.png');
	// game.load.image('head-close', 'images/tag_head_close.png');
	// game.load.image('body-open', 'images/tag_body_open.png');
	// game.load.image('body-close', 'images/tag_body_close.png');
	// game.load.image('header-open', 'images/tag_header_open.png');
	// game.load.image('header-close', 'images/tag_header_close.png');
	// game.load.image('title', 'images/tag_title.png');
	// game.load.image('meta', 'images/tag_meta.png');
	// game.load.image('h1', 'images/tag_h1.png');
	// game.load.image('paragraph', 'images/tag_paragraph.png');

}

function create() {

	// Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
	game.input.maxPointers = 1;
	// Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
	game.stage.disableVisibilityChange = true;
	// This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	// viewport background color
	game.stage.backgroundColor = '#FCF7E6';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.setBoundsToWorld();
	game.physics.box2d.gravity.y = 300;
	game.physics.box2d.restitution = 0.8;


	// Add lines of code
	html.forEach( function( htmlLine, index ) {

		var image = game.cache.getImage( htmlLine.code );
		var left = codeLeftIndent + (htmlLine.indentation * codeIndentValue) + image.width/2;
		var top = codeStartTop + ( index * codeLineHeight );

		var sprite = game.add.sprite( left, top, htmlLine.code );

		game.physics.box2d.enable(sprite);
		sprite.body.gravityScale = 0;
	});


	// Set up handlers for mouse events
	game.input.onDown.add(mouseDragStart, this);
	game.input.addMoveCallback(mouseDragMove, this);
	game.input.onUp.add(mouseDragEnd, this);

}

function mouseDragStart() {

	game.physics.box2d.mouseDragStart(game.input.mousePointer);

}

function mouseDragMove() {

	game.physics.box2d.mouseDragMove(game.input.mousePointer);

}

function mouseDragEnd() {

	game.physics.box2d.mouseDragEnd();

}
