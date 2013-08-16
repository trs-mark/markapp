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
var BG_PATH = 'images/iphone_images/bg.png';
var IMG_PATH = 'images/iphone_images/';
var DEVICE_HEIGHT = Ti.Platform.displayCaps.platformHeight;
var DEVICE_WIDTH = Ti.Platform.displayCaps.platformWidth;
/*
 * global helper function
 */
var convert = function(quest){
	var q = quest; 
	var conq;
	/*var dataUniSup = ['\u00B9','\u00B2','\u00B3','\u2074','\u2076','\u207A','\u207B'];
	var dataUniSub = ['\u2081','\u2082','\u2083','\u2084','\u2086','\u208A','\u208B'];10fc = 6 1D9D  04A9 U+03ED 0328*/
	
	if(IS_ANDROID){
		var dataUniSup = ['\u00B9','\u00B2','\u00B3','\u2074','\u2076',' \u0E4B','\u02C9'];
		var dataUniSub = ['\u2081','\u2082','\u2083','\u2084','<sub>6</sub>',' \u031F ','\u02CD'];
	}else{
		var dataUniSup = ['\u00B9','\u00B2','\u00B3','\u2074','\u2076','\u207A','\u207B'];
		var dataUniSub = ['\u2081','\u2082','\u2083','\u2084','\u2086',' \u031F ','\u02CD'];
	}
	var dataSup = [/<sup>1/g,/<sup>2/g,/<sup>3/g,/<sup>4/g,/<sup>6/g,/<sup>plus/g,/<sup>minus/g];
	var dataSub = [/<sub>1/g,/<sub>2/g,/<sub>3/g,/<sub>4/g,/<sub>6/g,/<sub>plus/g,/<sub>minus/g];
	var qIndexsuP = q.indexOf("<sup>");
	var qIndexsuB = q.indexOf("<sub>");
	
	if(qIndexsuP!=-1){
		for(var i=0;i<dataUniSup.length;i++){
			q = q.replace(dataSup[i],dataUniSup[i]);
		}
	}
	
	if(qIndexsuB!=-1){
		for(var i=0;i<dataUniSub.length;i++){
			q = q.replace(dataSub[i],dataUniSub[i]);
		}
	}
	return q;
};

try{
var db = Ti.Database.install('eiyoushi.sqlite', DB_NAME);
db.close();
}catch(e){
	alert('cannot install database');
}

var MainWindow = require('ui/MainWindow');
var rootWindow = new MainWindow();
rootWindow.open();