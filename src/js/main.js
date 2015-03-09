/*jslint node: true */
'use strict';

var $               = require('../../bower_components/jquery/dist/jquery');
var StageController = require('./StageController');
var StageDrawer     = require('./StageDrawer');
var Typewriter      = require('./Typewriter');



var Main = {

	initialize : function() {

		// Initialize stage controller
		var gridElement = $('#grid');
		var stageElement = $('#grid-stage');
		var stageController = new StageController( gridElement, stageElement );

		// Initialize drawer
		var drawerElement = $('#drawer');
		var drawer = new StageDrawer( drawerElement );

		var outputElement = $('#output');
		var typewriter = new Typewriter( outputElement, {
			initialType : 'and other stuff too.'
		});

		console.log(typewriter);



	}

};

Main.initialize();
