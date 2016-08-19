/*
* MAIN is a global variable due 'npm-devtool' wraps the code in IIFE
* npm-devtool: https://www.npmjs.com/package/devtool
*/
/*var*/ MAIN = (function() {
	'use strict';

	var webdriver = require('webdriverio');
	var utils = require('./utils');
	var options = {
	    desiredCapabilities: {
	        browserName: 'chrome'
	    }
	};
	var device = webdriver.remote(options).init();

	function openFacebook() {
		var browser = device.url('http://www.facebook.com.br');
		browser.setValue('input[type="email"]#email', 'e-mail');
		browser.setValue('input[type="password"]#pass', 'password').then(utils.execute(submitLoginButton));

		function submitLoginButton() {
			browser.click('input[type="submit"]#u_0_m');
		};
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
