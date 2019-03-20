/* eslint-disable */
// https://github.com/osmlab/jsopeninghours/blob/gh-pages/index.js
const days = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

function parseOpeningHours(text) {
  var result = null;
  if (text === '' || text === null) {
      result = null;
  }
  else if (text == '24/7') {
      result = {'24/7': true};
  }
  else if (text == 'seasonal') {
      result = {'seasonal': true};
  }
  else {
      result = {};
      var modified_some_days = false;
      for (var k = 0; k < days.length; k++) {
          result[days[k]] = null;
      }

      var dayregex = /^(mo|tu|we|th|fr|sa|su)\-?(mo|tu|we|th|fr|sa|su)?$/,
          timeregex = /^\s*(\d\d:\d\d)\-(\d\d:\d\d)\s*$/,
          dayranges = text.toLowerCase().split(/\s*;\s*/),
          dayrange;
      while((dayrange = dayranges.shift())) {
          var daytimes = dayrange.trim().split(/\s+/),
              daytime,
              startday = 0,
              endday = 6,
              whichDays,
              whichTimes,
              starttime,
              endtime;

          while((daytime = daytimes.shift())) {
              if (dayregex.test(daytime)) {
                  var daymatches = daytime.match(dayregex);

                  if (daymatches.length === 3) {
                      startday = days.indexOf(daymatches[1]);
                      if (daymatches[2]) {
                          endday = days.indexOf(daymatches[2]);
                      } else {
                          endday = startday;
                      }
                  } else {
                      return null;
                  }
              } else if (timeregex.test(daytime)) {
                  var timematches = daytime.match(timeregex);

                  if (timematches.length === 3) {
                      starttime = timematches[1];
                      endtime = timematches[2];
                  } else {
                      return null;
                  }
              } else {
                  return null;
              }
          }

          for (var j = startday; j <= endday; j++) {
              result[days[j]] = [starttime, endtime];
              modified_some_days = true;
          }

          if (!modified_some_days) {
              result = null;
          }
      }
  }
  return result;
}

export default parseOpeningHours;