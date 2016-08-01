/*
* MAIN is a global variable due 'npm-devtool' wraps the code in IIFE
* npm-devtool: https://www.npmjs.com/package/devtool
*/
/*var*/ MAIN = (function() {
	'use strict';

	var webdriver = require('webdriverio');
	var options = {
	    desiredCapabilities: {
	        browserName: 'chrome'
	    }
	};
	var device = webdriver.remote(options).init();

	function openFacebook() {
		var browser = device.url('http://www.facebook.com.br');
		browser.setValue('input[type="email"]#email', 'e-mail');
		browser.setValue('input[type="password"]#pass', 'password').then(execute(submitLoginButton));

		function submitLoginButton() {
			browser.click('input[type="submit"]#u_0_m');
		};
	}

	/*
	* Generic function for callback with timeout.
	*/
	function execute(callback, time) {
		return function wait() {
			if(callback instanceof Function) {
				if(time instanceof Number) {
				 	setTimeout(callback, time);
				} else {
					if(time !== undefined) console.warn('WARNING - Time must be a Number. Executing [%s]!', callback.name);
					callback();
				}
			} else {
				console.error('ERROR - Callback must be a function');
			}
		}
	}
	return {
		start: function() {
			console.debug("INFO - Openning the browser");
			openFacebook();
		},
		closeBrowser: function() {
			console.debug("INFO - Closing the browser");
			browser.end();
		}
	}
}());
