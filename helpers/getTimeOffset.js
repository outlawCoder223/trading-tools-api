const moment = require('moment');

const getTimeOffset = (time) => {
  let timeOffset;
  switch (parseInt(time)) {
    case 0:
      timeOffset = moment.utc().subtract(1, 'week').unix();
      break;
    case 1:
      timeOffset = moment.utc().subtract(2, 'weeks').unix();
      break;
    case 2:
      timeOffset = moment.utc().subtract(1, 'month').unix();
      break;
    case 3:
      timeOffset = moment.utc().subtract(3, 'months').unix();
      break;
    case 4:
      timeOffset = moment.utc().subtract(6, 'months').unix();
      break;
    case 5:
      timeOffset = moment.utc().subtract(1, 'year').unix();
      break;

    default:
      timeOffset = moment.utc().unix();
      break;
  }

  return timeOffset;
};

module.exports = getTimeOffset;
