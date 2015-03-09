/*jslint node: true */
'use strict';

var $     = require('../../bower_components/jquery/dist/jquery');

var proto;

/**
 * Typewriter
 * @constructor
 */
var Typewriter = function( outputElement , options ) {
	this.options = $.extend( {}, options );
	this.$outputElement = outputElement;

	this.outputText = this.options.initialType;
	this.currentText = '';
	this.characterIndex = 0;
	this.isTag = false;

	this._init();
};

proto = Typewriter.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto.write = function () {

};

proto.backspace = function () {

};

proto.clear = function () {

};


proto._init = function () {
	// write the initial type


	this._type();
};

proto._type = function () {
	var humanize = Math.round(Math.random() * (100 - 30));

	this.currentText = this.outputText.slice( 0, ++this.characterIndex );

	console.log('current: ', this.currentText);
	console.log('output: ', this.outputText);

	this.$outputElement.html(this.currentText);

	if (this.currentText === this.outputText) return;


	// var character = this.currentText.slice(-1);
	// if( character === '<' ) isTag = true;
	// if( character === '>' ) isTag = false;

	// if (this.isTag ) return type();

	setTimeout( function () {
		this._type();
	}.bind(this), humanize);
};


proto._setInitialCharacters = function () {

};

module.exports = Typewriter;
