/*jslint node: true */
'use strict';

var $ = require('../../bower_components/jquery/dist/jquery');

var proto;

/**
 * StageController
 * @constructor
 */
var StageController = function( gridElement, stageElement ) {
	this.$grid = gridElement;
	this.$gridItems = $('.grid-item');
	this.$stage = stageElement;
	this.$stageIcon = $('.icon', stageElement);
	console.log(this.$stageIcon);

	this._init();
};

proto = StageController.prototype;


/**
 * Show an error message
 * @param {string} message - message to be displayed
 */
proto._init = function( ) {
	this._attachEvents();
};


proto._attachEvents = function( ) {
	this.$gridItems.each( function( index, gridItem ) {
		$(gridItem).on( 'mouseover', this._onHover.bind(this) );
		$(gridItem).on( 'click', this._onClick.bind(this) );
	}.bind(this));
};


proto._onHover = function( evt ) {
	var icon = evt.target.getAttribute( 'data-icon' );

	this._setStageIcon( icon );
};


proto._onClick = function( evt ) {
	var text = evt.target.getAttribute( 'data-text' );

	this._setHeaderText( text );
};


proto._setStageIcon = function( icon ) {
	this.$stageIcon.attr('class', 'icon icon-' + icon);
};


proto._setHeaderText = function( text ) {

};


module.exports = StageController;
