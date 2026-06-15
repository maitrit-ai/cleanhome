const SHEET_ID = '1uoCGRQDZ7x8I1HfkXSBV0XHQQlsbPVCadNtPExCTO8U';
const HISTORY_SHEET = 'History';
const USERS_SHEET = 'Users';

function doGet(e) {
  const action = e.parameter.action;
  let result;
  try {
    if (action === 'getHistory') result = getHistory();
    else if (action === 'getUsers') result = getUsers();
    else result = { error: 'Unknown action' };
  } catch (err) {
    result = { error: err.message };
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  let result;
  try {
    if (action === 'logTask') result = logTask(data);
    else if (action === 'saveUser') result = saveUser(data);
    else result = { error: 'Unknown action' };
  } catch (err) {
    result = { error: err.message };
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getHistory() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(HISTORY_SHEET);
  if (!sheet) return { history: [] };
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { history: [] };
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return { history: rows };
}

function getUsers() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(USERS_SHEET);
  if (!sheet) return { users: [] };
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { users: [] };
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return { users: rows };
}

function logTask(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(HISTORY_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(HISTORY_SHEET);
    sheet.appendRow(['taskId','userId','userName','userColor','timestamp','actualTime','description','zone','floor','frequency','tier']);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['taskId','userId','userName','userColor','timestamp','actualTime','description','zone','floor','frequency','tier']);
  }
  sheet.appendRow([
    data.taskId, data.userId, data.userName, data.userColor,
    data.timestamp, data.actualTime, data.description,
    data.zone, data.floor, data.frequency, data.tier
  ]);
  return { success: true };
}

function saveUser(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(USERS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(USERS_SHEET);
    sheet.appendRow(['id','name','color']);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id','name','color']);
  }
  // Check if user already exists, update if so
  const data2 = sheet.getDataRange().getValues();
  for (let i = 1; i < data2.length; i++) {
    if (data2[i][0] === data.id) {
      sheet.getRange(i + 1, 1, 1, 3).setValues([[data.id, data.name, data.color]]);
      return { success: true, updated: true };
    }
  }
  sheet.appendRow([data.id, data.name, data.color]);
  return { success: true, created: true };
}