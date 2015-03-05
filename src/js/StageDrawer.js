/*jslint node: true */
'use strict';

var $     = require('../../bower_components/jquery/dist/jquery');

var proto;

/**
 * StageDrawer
 * @constructor
 */
var StageDrawer = function( drawerElement ) {
	this.$drawer = drawerElement;
	this.$triggers = $('[data-icon="briefcase"]');

	console.log(this.$triggers);

	this._init();
};

proto = StageDrawer.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto._init = function( ) {
	this._attachEvents();
};


proto._attachEvents = function( ) {
	this.$triggers.each( function( index, triggerElement ) {
		$(triggerElement).on( 'mouseover', this._onMouseOver.bind(this) );
		$(triggerElement).on( 'mouseout', this._onMouseOut.bind(this) );
		$(triggerElement).on( 'click', this._onClick.bind(this) );
	}.bind(this));
};


proto._onMouseOver = function( evt ) {
	console.log('mouseover ', this);
	this.peekDrawer();
};

proto._onMouseOut = function( evt ) {
	console.log('mouseout ', this);
	this.unPeek();
};


proto._onClick = function( evt ) {
	console.log('clicked');
	this.toggleDrawer();
};


proto.toggleDrawer = function( ) {
	$('body').toggleClass('open-drawer');
};


proto.peekDrawer = function( ) {
	$('body').addClass('peek-drawer');
};


proto.unPeek = function( ) {
	$('body').removeClass('peek-drawer');
};


module.exports = StageDrawer;
