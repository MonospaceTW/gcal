var GCalHelper = require("./../index");
var moment = require("moment");

let gcalHelper = new GCalHelper();

test("Got start and end", () => {
    gcalHelper.listEvents(
        moment([2018, 0, 26, 0, 0, 0]),
        moment([2018, 0, 26, 23, 59, 59])
    );
});

test("Got start", () => {
    gcalHelper.listEvents(
        moment([2018, 0, 26, 0, 0, 0])
    );
});

test("Got end", () => {
    gcalHelper.listEvents(
        undefined,
        moment([2018, 0, 26, 23, 59, 59])
    );
});

test("Miss both", () => {
    gcalHelper.listEvents();
});

// gcalHelper.addEvents({
//     start: {
//         dateTime: moment()
//             .add(4, "h")
//             .format()
//     },
//     end: {
//         dateTime: moment()
//             .add(5, "h")
//             .format()
//     },
//     summary: "Dinner"
// });
