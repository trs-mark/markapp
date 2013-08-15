Ti.include('common/common.js');
//database install
//データベースのインストール
try{
	/*var db = Ti.Database.open(DB_NAME);
	db.close();
	db.remove();*/
	var db = Ti.Database.install('eiyoushi.sqlite', DB_NAME);
	db.close();
	db = null;
} catch(e) {
	alert('データベースに接続できません');
	Titanium.API.info(e);
}

Ti.App.OnceSelectedFlag = false;
Ti.App.thisTarget = true;
Ti.App.memoAlert = true;
Ti.App.turnOff = false;
//call the TopMenuView.js
//TopMenuView.jsを呼び出す
Ti.App.nav = new (require('common/NavPool'))();
var param = new (require('common/WindowParam'))('TopMenuView');
param.newnav = true;

showNextWindow(param);
