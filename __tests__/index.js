var GCalHelper = require("./../index");
var moment = require("moment");
var config = require("../config/test");

let gCalHelper = new GCalHelper({
    CLIENT_EMAIL: config.CLIENT_EMAIL,
    PRIVATE_KEY: config.PRIVATE_KEY
});

test("Got start and end", async () => {
    await gCalHelper
        .listEvents({
            start: "2018-02-01",
            end: "2018-02-28"
        })
        .then(function(events) {
            expect(events.length).toBe(1);
        });
});

test("Got start", async () => {
    await gCalHelper
        .listEvents({
            start: "2018-02-01"
        })
        .then(function(events) {
            expect(events.length).toBe(1);
        });
});

test("Got end", async () => {
    await gCalHelper
        .listEvents({
            end: "2018-02-28"
        })
        .then(function(events) {
            expect(events.length).toBe(1);
        });
});

test("Miss both", async () => {
    await gCalHelper.listEvents().then(function(events) {
        // handle events...
    });
});
