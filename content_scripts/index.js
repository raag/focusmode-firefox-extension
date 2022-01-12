const schedule = require('./schedule.json');
const moment = require('moment');

const hourFormat = 'hh:mm';

schedule.schedule.forEach(function (scheduleTime) {
  const startTime = moment(scheduleTime.start, hourFormat);
  console.log(startTime);
  const endTime = moment(scheduleTime.end, hourFormat);
  const now = moment();

  if (now.isBetween(startTime, endTime)) {
    schedule.sites.forEach((site) => {
      const siteRegExp = new RegExp(site);
      if (window.location.href.match(siteRegExp)) {
        window.location.href = browser.runtime.getURL('block.html');
      }
    });
  }
});
