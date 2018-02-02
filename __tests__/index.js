const GCalHelper = require('./../index');
const config = require('../config/test.js');

const gCalHelper = new GCalHelper({
  CLIENT_EMAIL: config.CLIENT_EMAIL,
  PRIVATE_KEY: config.PRIVATE_KEY,
});

const event = {
  summary: 'Google I/O 2015',
  location: '800 Howard St., San Francisco, CA 94103',
  description: 'A chance to hear more about Google\'s developer products.',
  start: {
    dateTime: '2015-05-28T09:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2015-05-28T17:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  recurrence: [
    'RRULE:FREQ=DAILY;COUNT=2',
  ],
  attendees: [
    { email: 'lpage@example.com' },
    { email: 'sbrin@example.com' },
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 10 },
    ],
  },
};

test('Events: insert [Got an event]', async () => {
  await gCalHelper.addEvents(event)
    .then((res) => {
      expect(res).toMatchObject(event);
    });
});

test('Events: list [Got start and end]', async () => {
  await gCalHelper
    .listEvents({
      start: '2015-05-01',
      end: '2015-05-31',
    });
});

test('Events: list [Got start]', async () => {
  await gCalHelper
    .listEvents({
      start: '2015-05-01',
    });
});

test('Events: list [Got end]', async () => {
  await gCalHelper
    .listEvents({
      end: '2015-05-31',
    });
});

test('Events: list [Miss both]', async () => {
  await gCalHelper.listEvents();
});
