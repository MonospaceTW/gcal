# trunk-gcal

## 安裝
```
npm install
```

## 準備 Google Calendar Api 服務帳戶金鑰
將 ```private_key.json``` 放置於專案目錄

## 範例
```
let gCalHelper = new GCalHelper();

gCalHelper.listEvents(
    moment().startOf('month'),  // start(default: start of month)
    moment().endOf('month'),    // end(default: end of month)
    function(events) {          // callback function
        // got events
    }
);
```

## 測試
使用 `npm test` 測試

## License
MIT