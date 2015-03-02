/*jslint node: true */
'use strict';

var $               = require('../../bower_components/jquery/dist/jquery');
require('../../bower_components/typed.js/js/typed.js');
var StageController = require('./StageController');



var Main = {

	initialize : function() {

		// Initialize stage controller
		var gridElement = $('.grid');
		var stageElement = $('.grid-stage');
		var stageController = new StageController( gridElement, stageElement );

		// $('#output').typed({
		// 	strings: ["and other stuff too."],
		// 	contentType: 'html'
		// });



	}

};

Main.initialize();
