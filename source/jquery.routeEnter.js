/*
jQuery.routeEnter is licensed under the MIT license. 
Copyright (c) 2010 Alex Pendleton, http://alexcpendleton.github.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
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