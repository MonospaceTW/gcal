# trunk-gcal

## 安裝
```
npm install
```

## 準備 Google Calendar Api 服務帳戶金鑰
1. 新增專案
2. 前往[API和服務](https://console.cloud.google.com/apis/credentials)

![API和服務](./images/1.PNG)

3. 建立服務帳戶金鑰

![API和服務](./images/2.PNG)

4. 將私密金鑰存至電腦中
![API和服務](./images/3.PNG)


## 範例
將上一步金鑰內 ```client_email``` 與 ```private_key``` 複製到 default.js 中

./config/default.js
```js
module.exports = {
    CLIENT_EMAIL: 'your client email',
    PRIVATE_KEY: 'your private key'
};
```
app.js
```js
const config = require('./config/default');

let gCalHelper = new GCalHelper({
    CLIENT_EMAIL: config.CLIENT_EMAIL,
    PRIVATE_KEY: config.PRIVATE_KEY
});

gCalHelper.listEvents({
    start: '2018-01-01',
    end: '2018-01-31'
}).then(function(events){
    // handle events...
}).catch(function(err){
    // handle error...
});
```

## API

### listEvents(params)
回傳：[Events Resouce](https://developers.google.com/google-apps/calendar/v3/reference/events#resource)

參數：

|名稱|型態|
|-|-|
|`start`|`string` / `dateTime`|
|`end`|`string` / `dateTime`|


## 測試
使用 `npm test` 測試

## License
MIT