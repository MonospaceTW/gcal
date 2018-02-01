var fs = require("fs");
var moment = require("moment");
var google = require("googleapis");
var googleAuth = require("google-auth-library");
var privatekey = require("./private_key.json");

class GCalHelper {
    constructor() {
        this.jwtClient = new google.auth.JWT(
            privatekey.client_email,
            null,
            privatekey.private_key,
            ["https://www.googleapis.com/auth/calendar"]
        );
        //authenticate request
        this.jwtClient.authorize(function(err, tokens) {
            if (err) {
                console.log(err);
                return;
            } else {
                // console.log("Successfully connected!");
            }
        });
    }

    addEvents(event, callback) {
        let calendar = google.calendar("v3");
        calendar.events.insert(
            {
                auth: this.jwtClient,
                calendarId: "primary",
                resource: event
            },
            function(err, response) {
                if (err) {
                    console.log("The API returned an error: " + err);
                    return;
                }
                callback(response);
            }
        );
    }

    /**
     * Return list of events between given search range.
     *
     * @param {Date} start Start of search range.
     * @param {Date} end End of search range.
     * @param {Function} callback Callback function.
     */
    listEvents(start, end, callback) {
        if (typeof start === "undefined") start = moment().startOf("month");
        if (typeof end === "undefined") end = moment().endOf("month");

        let calendar = google.calendar("v3");
        calendar.events.list(
            {
                auth: this.jwtClient,
                calendarId: "primary",
                timeMin: moment(start).toDate(),
                timeMax: moment(end).toDate()
            },
            function(err, response) {
                if (err) {
                    console.log("The API returned an error: " + err);
                }
                var events = response.data.items;
                if (typeof callback === "function") callback(events);
            }
        );
    }
}

module.exports = GCalHelper;
