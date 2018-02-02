const moment = require('moment');
const google = require('googleapis');

const calendar = google.calendar('v3');

class GCalHelper {
  constructor({ CLIENT_EMAIL, PRIVATE_KEY }) {
    this.jwtClient = new google.auth.JWT(
      CLIENT_EMAIL,
      null,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/calendar'],
    );
    this.jwtClient.authorize((err, tokens) => {
      if (err) {
        return new Error(err);
      }
      return tokens;
    });
  }

  async addEvents(resource) {
    return new Promise((resolve, reject) => {
      calendar.events.insert({
        auth: this.jwtClient,
        calendarId: 'primary',
        resource,
      }, (err, response) => {
        if (err) {
          reject(new Error(`Error occured while adding event: ${err}`));
        }
        resolve(response.data);
      });
    });
  }

  async deleteEvent(eventId) {
    return new Promise((resolve, reject) => {
      calendar.events.delete({
        auth: this.jwtClient,
        calendarId: 'primary',
        eventId,
      }, (err, response) => {
        if (err) {
          reject(new Error(`Error occured while deleting event: ${err}`));
        }
        resolve(response);
      });
    });
  }

  async listEvents({
    start = moment().startOf('month'),
    end = moment().endOf('month'),
  } = {}) {
    return new Promise((resolve, reject) => {
      calendar.events.list({
        auth: this.jwtClient,
        calendarId: 'primary',
        timeMin: moment(start).toDate(),
        timeMax: moment(end).toDate(),
      }, (err, response) => {
        if (err) {
          reject(new Error(`Error occured while show event: ${err}`));
        }
        resolve(response.data.items);
      });
    });
  }
}

module.exports = GCalHelper;
