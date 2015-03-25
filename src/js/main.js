/*jslint node: true */
'use strict';

var $               = require('../../bower_components/jquery/dist/jquery');


var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'codes', { preload: preload, create: create });

function preload() {

	// load tags
	game.load.image('doctype', 'images/tag_doctype.png');
	game.load.image('html-open', 'images/tag_html_open.png');
	game.load.image('html-close', 'images/tag_html_close.png');
	game.load.image('head-open', 'images/tag_head_open.png');
	game.load.image('head-close', 'images/tag_head_close.png');
	game.load.image('body-open', 'images/tag_body_open.png');
	game.load.image('body-close', 'images/tag_body_close.png');
	game.load.image('header-open', 'images/tag_header_open.png');
	game.load.image('header-close', 'images/tag_header_close.png');
	game.load.image('title', 'images/tag_title.png');
	game.load.image('meta', 'images/tag_meta.png');
	game.load.image('h1', 'images/tag_h1.png');
	game.load.image('paragraph', 'images/tag_paragraph.png');

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
	game.physics.box2d.gravity.y = 200;

	console.log(game);


	// Add tags

	var doctypeImg = game.cache.getImage('doctype');
	var doctypeSprite = game.add.sprite(300 + doctypeImg.width/2 , 100, 'doctype');
	// doctypeSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(doctypeSprite);

	var htmlOpenImg = game.cache.getImage('html-open');
	var htmlOpenSprite = game.add.sprite(300 + htmlOpenImg.width/2 , 118, 'html-open');
	// htmlOpenSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(htmlOpenSprite);

	var headOpenImg = game.cache.getImage('head-open');
	var headOpenSprite = game.add.sprite(330 + headOpenImg.width/2, 136, 'head-open');
	// headOpenSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(headOpenSprite);

	var titleImg = game.cache.getImage('title');
	var titleSprite = game.add.sprite(360 + titleImg.width/2, 154, 'title');
	// titleSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(titleSprite);

	var metaImg = game.cache.getImage('meta');
	var metaSprite = game.add.sprite(360 + metaImg.width/2, 172, 'meta');
	// metaSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(metaSprite);

	var headCloseImg = game.cache.getImage('head-close');
	var headCloseSprite = game.add.sprite(330 + headCloseImg.width/2, 190, 'head-close');
	// headCloseSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(headCloseSprite);

	var bodyOpenImg = game.cache.getImage('body-open');
	var bodyOpenSprite = game.add.sprite(330 + bodyOpenImg.width/2, 208, 'body-open');
	// bodyOpenSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(bodyOpenSprite);

	var headerOpenImg = game.cache.getImage('header-open');
	var headerOpenSprite = game.add.sprite(360 + headerOpenImg.width/2, 226, 'header-open');
	// headerOpenSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(headerOpenSprite);

	var h1Img = game.cache.getImage('h1');
	var h1Sprite = game.add.sprite(390 + h1Img.width/2, 244, 'h1');
	// h1Sprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(h1Sprite);

	var headerCloseImg = game.cache.getImage('header-close');
	var headerCloseSprite = game.add.sprite(360 + headerCloseImg.width/2, 262, 'header-close');
	// headerCloseSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(headerCloseSprite);

	var bodyCloseImg = game.cache.getImage('body-close');
	var bodyCloseSprite = game.add.sprite(330 + bodyCloseImg.width/2, 280, 'body-close');
	// bodyCloseSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(bodyCloseSprite);

	var htmlCloseImg = game.cache.getImage('html-close');
	var htmlCloseSprite = game.add.sprite(300 + htmlCloseImg.width/2 , 298, 'html-close');
	// htmlCloseSprite.anchor.setTo(0, 0.5);
	game.physics.box2d.enable(htmlCloseSprite);


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
