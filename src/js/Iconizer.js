/*jslint node: true */
'use strict';

var $ = require('../../../lib/jquery/jquery');

var proto;

/**
 * UploaderMessage
 * @constructor
 */
var Iconizer = function() {
	this.$element = $('#uploader-message');
	this.$messageText = $('#message-text');
	this.isHidden = true;

	this._init();
};

proto = Iconizer.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto._init = function( ) {
	// do stuff
};


module.exports = Iconizer;
