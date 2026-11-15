/**
 * Penyimpanan tandaan Kontrol Mingguan di Google Sheet.
 *
 * Pasang dari Google Sheet jadwal: Extensions > Apps Script, tempel file ini,
 * lalu Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Tempel URL /exec ke Pengaturan > Simpan ke Google Sheet di aplikasi.
 *
 * Data disimpan sebagai JSON di tab "KontrolData", dipecah per 40.000 karakter
 * karena satu sel dibatasi 50.000 karakter.
 */
const TAB = 'KontrolData';
const CHUNK = 40000;

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(TAB) || ss.insertSheet(TAB);
}

function out_(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sh = sheet_();
  const n = sh.getLastRow();
  if (!n) return out_('{}');
  return out_(sh.getRange(1, 1, n, 1).getValues().map(function (r) { return r[0]; }).join(''));
}

function doPost(e) {
  const body = e.postData.contents;
  JSON.parse(body); // tolak isi yang bukan JSON
  const parts = [];
  for (let i = 0; i < body.length; i += CHUNK) parts.push([body.slice(i, i + CHUNK)]);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheet_();
    sh.clearContents();
    sh.getRange(1, 1, parts.length, 1).setNumberFormat('@').setValues(parts);
  } finally {
    lock.releaseLock();
  }
  return out_('{"ok":true}');
}
