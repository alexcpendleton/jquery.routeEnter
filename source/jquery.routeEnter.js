(function($){
$.fn.routeEnter = function(options) {
	var defaultSettings = {
		button:"input[type=submit]:first",
		formDataKey:"enterRouted",
		router:{
			attr:{type:"submit", id:"enterRouter", name:"enterRouter"},
			css:{ position:'absolute', left:'-2000px' }// IE won't send click events to a button with display:none, so just move it off screen
		},
		fields:":input",
		buttonEvent:"click",
		targetForm:$("form:first"),
		triggeredEvent:"enterRouted"
	};
	/* jQuery isjQuery - v0.4 - 2/13/2010
	* http://benalman.com/projects/jquery-misc-plugins/
	* Copyright (c) 2010 "Cowboy" Ben Alman
	* Dual licensed under the MIT and GPL licenses.
	* http://benalman.com/about/license/ */
	function isJquery(a) { return a&&a.hasOwnProperty&&a instanceof jQuery }
	var settings = $.extend(true, defaultSettings, options);
	var targetForm = isJquery(settings.targetForm) ? settings.targetForm : targetForm;
	function setFormData(value) { targetForm.data(settings.formDataKey, value); }
	var router;	
	if(targetForm.data(settings.formDataKey) === undefined) {
		router = $("<input />").attr(settings.router.attr).css(settings.router.css).prependTo(targetForm);	
		setFormData(false);
		router.click(function(e) {
			var data = targetForm.data(settings.formDataKey);
			if (isJquery(data)) {
				e.preventDefault();
				data.trigger(settings.buttonEvent);
				return false;
			}
			// If the user wasn't in a routed area then just let it pass
		});
	} else {
		router = $("#"+settings.router.attr.id);
	}
	return $(this).each(function() {
		var current = $(this);
		var fields = isJquery(settings.fields) ? settings.fields : current.find(settings.fields);
		var targetButton = isJquery(settings.button) ? settings.button : current.find(settings.button);		
		fields.focus(function() {
			setFormData(targetButton);
		}).blur(function() {
			setFormData(false);
		});
	});
};

})(jQuery);