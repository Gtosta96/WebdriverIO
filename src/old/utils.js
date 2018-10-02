(function() {
	'use strict';

		module.exports = {
			execute: execute
		};

		//Generic function for callback with timeout.
		function execute(callback, time) {
			return function wait(args) {
				if(typeof callback === 'function') {
					if(typeof time === 'number') {
					 	setTimeout(callback, time, args); // args (3º parameter) is a parameter to pass to the function callback (1º parameter).
					} else {
						if(time !== undefined) console.warn('WARNING - Time must be a Number. Executing [%s]!', callback.name);
						callback(args);
					}
				} else {
					console.error('ERROR - Callback must be a function');
				}
			}
		}
}());
