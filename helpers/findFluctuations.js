const moment = require('moment');

const findFluctuations = (data, percent) => {
  const results = { o: [], h: [], date: [], p: [], total: 0 };
  for (const [i] of data.o.entries()) {
    const fluct = data.h[i] / data.o[i];
    if (fluct >= percent) {
      const date = moment.unix(data.t[i]).utc().format('D MMM YYYY');
      results.o.unshift(data.o[i]);
      results.h.unshift(data.h[i]);
      results.date.unshift(date);
      results.p.unshift(convertPercent(fluct));
      results.total++;
    }
  }
  return results;
};

const convertPercent = (num) => Math.round((num - 1) * 10000) / 100;

module.exports = findFluctuations;
