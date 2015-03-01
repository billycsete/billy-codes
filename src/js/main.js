/*jslint node: true */
'use strict';

var $               = require('../../bower_components/jquery/dist/jquery');
var StageController = require('./StageController');

var Main = {

	initialize : function() {

		// Initialize stage controller
		var gridElement = $('.grid');
		var stageElement = $('.grid-stage');
		var stageController = new StageController( gridElement, stageElement );

	}

};

Main.initialize();
