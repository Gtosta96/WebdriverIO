(function() {
	'use strict';

	var webdriver = require('webdriverio');
	var utils = require('./utils');
	var options = {
	    desiredCapabilities: {
	        browserName: 'chrome'
	    }
	};
	var device = webdriver.remote(options).init();
	var browser = device.url('https://servicos.dpf.gov.br/sinpa/realizarReagendamento.do;jsessionid=68B74F9E05CF670EB6B08E79C6B404F3.sdf0021_inst_0?dispatcher=exibirSolicitacaoReagendamento&validate=false');

	start();

	function start() {
		Promise.all([
			browser.setValue('input[type="text"]#cpf', '41296957896'),
			browser.setValue('input[type="text"]#protocolo', '12016.0002091397'),
			browser.setValue('input[type="text"]#dataNascimento', '10031996')
		]).then(utils.execute(executeAfterCredentials, 5000));
	}

	function executeAfterCredentials() {
		Promise.all([
				browser.click('input[name="Prosseguir"]'),
				browser.waitForExist('#postoComAgendamento236', 5000).click('#postoComAgendamento236')
		]).then(function() {
			browser.getValue('select#dataAtendimento > option').then(getDates);
		});

		function getDates(dates) {
			var earliestDate = new Date(dates[1]);
			var myDate = new Date('2016-08-22');

			if(myDate.getTime() > earliestDate.getTime()) {
				console.log('earliestDate: %o', earliestDate);
			} else {
				console.log('no-date :(');
			}
		}
	}
}());
