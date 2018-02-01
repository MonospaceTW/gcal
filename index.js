const moment = require("moment");
const google = require("googleapis");
const calendar = google.calendar("v3");

class GCalHelper {
    constructor({ CLIENT_EMAIL, PRIVATE_KEY }) {
        this.jwtClient = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, [
            "https://www.googleapis.com/auth/calendar"
        ]);
        //authenticate request
        this.jwtClient.authorize(function(err, tokens) {
            if (err) {
                return;
            } else {
                this.tokens = tokens;
            }
        });
    }

    addEvents(event) {
        return new Promise((resolve, reject) => {
            calendar.events.insert(
                {
                    auth: this.jwtClient,
                    calendarId: "primary",
                    resource: event
                },
                function(err, response) {
                    if (err) reject("The API returned an error: " + err);
                    else resolve(response);
                }
            );
        });
    }

    deleteEvent(eventId) {
        return new Promise((resolve, reject) => {
            calendar.events.delete(
                {
                    auth: this.jwtClient,
                    calendarId: "primary",
                    eventId: eventId
                },
                function(err, response) {
                    if (err)
                        reject("Error occured while deleting event: " + err);
                    else resolve(response);
                }
            );
        });
    }

    listEvents({
        start = moment().startOf("month"),
        end = moment().endOf("month")
    } = {}) {
        return new Promise((resolve, reject) => {
            calendar.events.list(
                {
                    auth: this.jwtClient,
                    calendarId: "primary",
                    timeMin: moment(start).toDate(),
                    timeMax: moment(end).toDate()
                },
                function(err, response) {
                    if (err) {
                        reject("The API returned an error: " + err);
                    }
                    var events = response.data.items;
                    resolve(events);
                }
            );
        });
    }
}

module.exports = GCalHelper;
