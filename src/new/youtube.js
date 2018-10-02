const fs = require('fs');
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
  let browser = device.url('https://music.youtube.com/watch?v=1kz6hNDlEEg&list=RDAMVMd3sA5plF6kE');

  try {
    await browser.waitForExist('#contents', 5000);
    let songs = await browser.getText('.song-title');

    songs = songs.join('\n');
    fs.writeFile("./src/new/songs.txt", songs, (err) => {
    if (err) throw err;

    console.log('saved!');
    });
    
  } catch(e) {
    console.log(e);
  }

}
