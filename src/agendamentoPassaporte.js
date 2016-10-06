/* Informações sobre o agendamento
*   Data agendada: 30/08/2016
*   Horário agendado: 12:51
*   Posto de Atendimento: DPF/SOD/SP - DELEGACIA DE POLÍCIA FEDERAL EM SOROCABA > DPF/SOD/SP
*   Rodovia Raposo Tavares - km, 103,5, Jardim Itanguá
*   SOROCABA/ SP
*   CEP: 18052-775 Telefone(s): (15) 3217-7760 / (15) 3217-7760 / (15) 3217-7760
*/
(function() {
    'use strict';

    var webdriver = require('webdriverio');
    var fs = require('fs');
    var utils = require('./utils');

    var device;
    var browser;
		var count = 0;
    setInterval(start, 1800000);
		start();

		var logInfo;
    function start() {
			var now = new Date();
			logInfo = '(try: ' + count + ') ' + now.getDay() + '/' + now.getMonth() + ' - ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ' --> ';
			count++;

      device = webdriver.remote({ desiredCapabilities: {browserName: 'chrome'} }).init();
      browser = device.url('https://servicos.dpf.gov.br/sinpa/realizarReagendamento.do?dispatcher=exibirSolicitacaoReagendamento&validate=false');

      Promise.all([
          browser.setValue('input[type="text"]#cpf', '--'),
          browser.setValue('input[type="text"]#protocolo', '--'),
          browser.setValue('input[type="text"]#dataNascimento', '--')
      ]).then(utils.execute(executeAfterCredentials, 10000));
    };

    function executeAfterCredentials() {
        Promise.all([
            browser.click('input[name="Prosseguir"]'),
            browser.waitForExist('#postoComAgendamento236', 5000).click('#postoComAgendamento236')
        ]).then(function() {
            browser.getValue('select#dataAtendimento > option').then(getDates);
        });
    };

    function getDates(dates) {
        var date = dates[1];
        var availableDate = new Date(date);
        var myDate = new Date('2016-08-30');

        if (myDate.getTime() > availableDate.getTime()) {
            writeInFile(date);
        }
				console.log('LOGGING: ' + logInfo + ' date available: ' + date);
        browser.end();
    };

    function writeInFile(date) {
        fs.readFile('logs.log', function(err, oldData) {
            if (err) console.log('ARQUIVO NÃO EXISTENTE, CRIANDO...');

            var newData = oldData + logInfo + date + '\n';
            fs.writeFile('logs.log', newData);
        });
    };
}());
