const { Entity } = require('./entity');

class Month {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

class Calendar extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);
        const {months, weekdays, years, seasons, suffix, has_leap_year,
          leap_year_amount, leap_year_month, leap_year_offset, leap_year_start } = params;

        this.path = 'calendars';
        const monthObjs = months.map(month => new Month(month.name, month.length));

        Object.assign(this, {monthObjs, weekdays, years, seasons, suffix, has_leap_year,
          leap_year_amount, leap_year_month, leap_year_offset, leap_year_start });
    }
}

module.exports = {
    Calendar,
    Month
}
