/*jslint node: true */
'use strict';

var $     = require('../../bower_components/jquery/dist/jquery');

var proto;

/**
 * Menu
 * @constructor
 */
var Menu = function( menuElement, menuButton ) {
	this.$documentBody = $('body');
	this.$menuElement = menuElement;
	this.$menuButton = menuButton;

	this._attachEvents();
};

proto = Menu.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto.open = function () {
	this.$documentBody.addClass('open-menu');
};

proto.close = function () {
	this.$documentBody.removeClass('open-menu');
};

proto.toggle = function () {
	console.log('toggle!');
	this.$documentBody.toggleClass('open-menu');
};


proto._attachEvents = function () {
	this.$menuButton.on( 'click', this.toggle.bind(this) );
};


module.exports = Menu;
