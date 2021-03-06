var CHANNEL_ACCESS_TOKEN = '<<access-token>>'; 
var USER_ID = '<<user-id>>';
var sheet = SpreadsheetApp.getActiveSheet();
var lastRow = sheet.getLastRow();
var today = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd");
var TEXT_MESSAGE = '本日の予定はありません';

for(var i = 1; i <= lastRow; i++) {
 if(today == Utilities.formatDate(sheet.getRange(i, 1).getValue(), "Asia/Tokyo", "yyyy/MM/dd")
    && !sheet.getRange(i, 2).getValue() == '') {
     TEXT_MESSAGE = "秘書報告\nおはようございます！\n＃今日の積み上げ予定\n"
     + sheet.getRange(i, 2).getValue() 
     +"\n今日も１日頑張ってください！！\n by 秘書みさ子☆"
 }
} 
function pushMessage() {
 var postData = {
   "to": USER_ID,
   "messages": [{
     "type": "text",
     "text": TEXT_MESSAGE,
   }]
 };

 var url = "https://api.line.me/v2/bot/message/push";
 var headers = {
   "Content-Type": "application/json",
   'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
 };

 var options = {
   "method": "post",
   "headers": headers,
   "payload": JSON.stringify(postData)
 };
 var response = UrlFetchApp.fetch(url, options);
}
