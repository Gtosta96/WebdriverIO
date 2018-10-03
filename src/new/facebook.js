const webdriver = require('webdriverio');

start();

async function start() {
  const options = {
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
          '--start-maximized',
          '--disable-notifications',
        ]
      }
    }
  };
  let device = webdriver.remote(options).init();
  let browser = device.url('https://www.facebook.com/');

  try {
    await Promise.all([
      browser.setValue('input#email', 'temporaryAccFatec@outlook.com'),
      browser.setValue('input#pass', 'b@tata123'),
    ]);
    await browser.click('input[data-testid="royal_login_button"');

    await browser.waitForExist('input[data-testid="search_input"]', 5000);

    await browser.setValue('input[data-testid="search_input"]', 'HeroWayBrasil');
    await browser.click('button[data-testid="facebar_search_button"]');

    await browser.waitForExist('div#BrowseResultsContainer', 5000);
    await browser.click('div=Heroway')

    setInterval(async () => {
      await browser.waitForExist('button[data-testid="page_profile_like_button_test_id"]', 5000);
      browser.click('button[data-testid="page_profile_like_button_test_id"]');
    }, 5000);
    
  } catch(e) {
    console.log(e);
  }

}
