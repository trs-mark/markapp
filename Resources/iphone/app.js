/*
 * global constants
 */
var VERSION = '1.0.0';
var APP_NAME = '管理栄養士国試対策問題集アプリ（生化学編)';
var APP_TEXT = '本アプリで解説と一緒に示されているページは、理工図書株式会社から出版されている「栄養管理と生命科学シリーズ　化学・生化学　人体の構造と機能」のページです。こちらも一緒に参照することで、より学習効率を高めることができます。';
var COPYRIGHT = 'copyright(c)2013';
var COMPANY = "TECHNO SQUARE INC";
var COMPANY_URL = 'http://www.technosquare.co.jp';
var DB_NAME = 'eiyoushi';
var CONTENT_MST_TABLE = 'CONTENTS';
var CONTENT_META_TABLE = 'CONTENT_META';
var CONTENT_REL_TABLE = 'CONTENT_RELATIONSHIPS';
var CATEGORY_MST_TABLE = 'CATEGORYS';
var CATEGORY_REL_TABLE = 'CATEGORY_RELATIONSHIPS';
var APP_TYPE = 1; // 1 = full version; 2 = result document version
var QUIZ_CHOICE = 2; // 1 = four choice; 2 = five choices 
var IS_ANDROID = (Ti.Platform.osname=='android');
var OSNAME = Ti.Platform.osname;
var BG_PATH = 'iphone_images/bg.png';
var IMG_PATH = 'iphone_images/';
var DEVICE_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var DEVICE_WIDTH = Ti.Platform.displayCaps.platformWidth;

try{
var db = Ti.Database.install('eiyoushi.sqlite', DB_NAME);
db.close();
}catch(e){
	alert('cannot install database');
}

var MainWindow = require('ui/MainWindow');
var rootWindow = new MainWindow();
rootWindow.open();