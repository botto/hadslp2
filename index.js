/**
 * @typedef {Object} HadSLP2MapData
 * @property {number} y The year of the measurment.
 * @property {number} y.m The month of the measurment.
 * @property {number} y.m.v The degerees vertically.
 * @property {number} y.m.v.h The degrees horizontally.
 */

/**
 * Formats the input rawHadSLP2 string as a multilevel object.
 * 
 * @param {string} rawHadSLP2 Raw HadSLP2 string.
 * @returns {HadSLP2MapData} Formatted HadSLP2 data.
 */
module.exports = (rawHadSLP2) => {
  const groupStartMatch = /\s{3}([0-9]{4})\s{5,6}([0-9]{1,2})/;
  const rawStrings = rawHadSLP2.split('\n');
  const data = {};
  let vert = 0;
  let horz = 0;
  let currentYear;
  let currentMonth;
  for (const line of rawStrings) {
    if (line.length == 14) {
      const parts = groupStartMatch.exec(line);
      currentYear = parts[1].trim();
      currentMonth = parts[2].trim();
      if (data[currentYear]) {
        data[currentYear][currentMonth] = {};
      }
      else {
        data[currentYear] = {
          [currentMonth]: {}
        };
      }
      horz = 0;
      vert = 0;
    }
    else {
      const monthGroup = data[currentYear][currentMonth];
      const horzGroup = {};
      // Trim the values of the line and only return non empty.
      const parts = line.split('  ').map(v => v.trim()).filter(v => v);
      for (let p of parts) {
        const horzDeg = -180 + horz * 5;
        horzGroup[horzDeg] = p;
        horz++;
      }
      horz = 0;
      const vertDeg = -90 + vert * 5
      monthGroup[vertDeg] = horzGroup;
      vert++;
    }
  }
  return data;
};