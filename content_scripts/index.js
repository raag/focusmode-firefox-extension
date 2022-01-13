const config = require('./config.json');
const moment = require('moment');
const currentUrl = window.location.href;
// const currentUrl = 'https://facebook.com';

const currentHourIsInScheduledPeriod = () => {
  const hourFormat = 'hh:mm';
  for (let period of config.scheduledPeriods) {
    const startTime = moment(period.start, hourFormat);
    const endTime = moment(period.end, hourFormat);
    const now = moment();

    if (now.isBetween(startTime, endTime)) {
      return true;
    }
  }
  return false;
};

const currentDayIsInSchedule = () => {
  const currentDay = moment().format('dddd');
  for (let day of config.days) {
    if (day === currentDay) {
      return true;
    }
  }
  return false;
};

const urlIsInListOfSitesToBlock = (url) => {
  for (let site of config.sites) {
    const siteRegExp = new RegExp(site);
    if (url.match(siteRegExp)) {
      return true;
    }
  }
  return false;
};

const shouldBlock = () => {
  return (
    currentHourIsInScheduledPeriod() &&
    currentDayIsInSchedule() &&
    urlIsInListOfSitesToBlock(currentUrl)
  );
};

if (shouldBlock()) {
  window.location.href = browser.runtime.getURL('block.html');
}
