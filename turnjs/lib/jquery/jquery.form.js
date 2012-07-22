(function($){

	"use strict";

	var formAjax = function(self, options){
		this.initialize(self, options);
	};

	formAjax.prototype = {
		initialize: function(self, options){
			this.$self = $(self);
			this.self = self;

			this.paramsArry = $(self).serializeArray();
		},

		self: 			null,
		$self: 			null,
		paramsArry: 	null,
		params: 		null,
	};

	$.ajaxForm = function(self, options){
		new formAjax(self, options);
		return false;
	};

})(jQuery);