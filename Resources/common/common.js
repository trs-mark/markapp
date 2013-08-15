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
function showNextWindow(winParamObj) {
	var Window = require(winParamObj.window_file);
	
	if (winParamObj.newnav || Ti.Platform.osname !== 'iphone') {
		var win = Window(winParamObj);
		if (win == false) { return; }
		win.open();
	} 
	
	else {
		var navGroup = Ti.App.nav.getNav();
		var win = Window(winParamObj);
		if (win == false) { return; }
		if (win) {
			navGroup.open(win);
		}
		navGroup=null;
	}
}

function closeWindow(winParamObj) {
	winParamObj.parent_window.close();
	if (Ti.Platform.osname === 'iphone') {
		Ti.App.nav.removeNav();
	}
}

function addCloseButton(winParamObj, viewObj, text){
	
	if (Ti.Platform.osname === 'iphone') {
		var iphoneLeftButton = Titanium.UI.createButton({
			title:text,
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		iphoneLeftButton.addEventListener('click', function() {
			clickBack(winParamObj);
		});
		viewObj.parent_window_leftbutton = iphoneLeftButton;
	}
	else {
		winParamObj.parent_window.addEventListener('android:back', function(){
			clickBack(winParamObj);
	    });
  	}
}

function addReturnButton(winParamObj, viewObj, text){
	if (Ti.Platform.osname === 'iphone') {
		var iphoneLeftButton = Titanium.UI.createButton({
			title:text,
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		iphoneLeftButton.addEventListener('click', function() {
			closeWindow(winParamObj);
		});
		viewObj.parent_window_leftbutton = iphoneLeftButton;
	}
	else {
		winParamObj.parent_window.addEventListener('androidback', function(event){
			closeWindow(winParamObj);
	    });
  	}
}

function addSaveButton(winParamObj, viewObj, text, page, oldtmp){
	if (Ti.Platform.osname === 'iphone') {
		var iphoneRightButton = Titanium.UI.createButton({
			title:'保存',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		iphoneRightButton.addEventListener('click', function() {
			var Memo = require('common/Memo');
			var MemoModel = new Memo();
			var tmp = text.value;
			var charVal = tmp.trim().length;
			
			if(tmp == oldtmp){closeWindow(winParamObj);}
			else{
				// turn on memo alert
				function turnOnAlert(){
					// close parent window
					closeWindow(Ti.App.closeParentWindow);
						
					Ti.App.memoAlert.backgroundImage = getImagesPath('read_btn_view_orange.png');
					
					var param = new (require('common/WindowParam'))('ReadSelectOneView');
					param.toSource = winParamObj.view_file + winParamObj.toSource; 
					param.quiz_obj = new (require('common/ReadSelectOneList'))();
					if (param.quiz_obj == false) { return; }
					param.newnav = true; 
					param.newDoc4 = true; 
					for (var i = 1; i <= 14; i++) {
						if(page == i){
							param.quiz_obj.now_step = i;
							showNextWindow(param);
							closeWindow(winParamObj);
						}
					}
				}
				
				// turn off memo alert
				function turnOffAlert(){
					MemoModel.updateMemo(page, tmp);
					
					// close parent window
					closeWindow(Ti.App.closeParentWindow);
					
					MemoModel.deleteMemo(page, tmp);
					
					var param = new (require('common/WindowParam'))('ReadSelectOneView');
					param.toSource = winParamObj.view_file + winParamObj.toSource; 
					param.quiz_obj = new (require('common/ReadSelectOneList'))();
					if (param.quiz_obj == false) { return; }
					param.newnav = true; 
					param.newDoc4 = true; 
					for (var i = 1; i <= 14; i++) {
						if(page == i){
							param.quiz_obj.now_step = i;
							showNextWindow(param);
							closeWindow(winParamObj);
						}
					}
				}
						
				if(tmp != oldtmp){
					if(tmp != '' && tmp != null){
						
						// save memo
						if(oldtmp == ''){
							if(charVal == 0){turnOffAlert();}
							else{MemoModel.saveMemo(page, tmp);turnOnAlert();}
						}
						
						// update memo
						if(tmp != '' && oldtmp != ''){
							if(charVal == 0){
								if(tmp.length != charVal){
									tmp = '';
									
									turnOffAlert();
								}
							}
							else{MemoModel.updateMemo(page, tmp);turnOnAlert();}
						}
					}
					else{
						turnOffAlert();
					}
				}
			}
		});
		viewObj.parent_window_rightbutton = iphoneRightButton;
	}
	else {
		var btn_bg = Titanium.UI.createImageView({
			image:getImagesPath('memo_btn_bg.png'),
			width:'320dp',
			height:'50dp',
			top: '0dp',
			zIndex: 2
		});
		viewObj.add(btn_bg);
		var save = Titanium.UI.createButton({
			buttonId: 1,
			height:'50dp',
			width:'320dp',
			top: '0dp',
		    backgroundImage:getImagesPath('memo_btn_save.png'),
			zIndex: 2
		});
		if (Ti.Platform.osname !=='iphone') {
			save.backgroundSelectedImage = getImagesPath('memo_btn_save_selected.png');
		}
		save.addEventListener('click', function(e) {
			var Memo = require('common/Memo');
			var MemoModel = new Memo();
			var tmp = text.value;
			var charVal = tmp.trim().length;
			
			if(tmp == oldtmp){closeWindow(winParamObj);}
			else{
				// turn on memo alert
				function turnOnAlert(){
					// close parent window
					closeWindow(Ti.App.closeParentWindow);
						
					Ti.App.memoAlert.backgroundImage = getImagesPath('read_btn_view_orange.png');
					
					var param = new (require('common/WindowParam'))('ReadSelectOneView');
					param.toSource = winParamObj.view_file + winParamObj.toSource; 
					param.quiz_obj = new (require('common/ReadSelectOneList'))();
					if (param.quiz_obj == false) { return; }
					param.newnav = true; 
					param.newDoc4 = true; 
					for (var i = 1; i <= 14; i++) {
						if(page == i){
							param.quiz_obj.now_step = i;
							showNextWindow(param);
							closeWindow(winParamObj);
						}
					}
				}
				
				// turn off memo alert
				function turnOffAlert(){
					alert('off');
					MemoModel.updateMemo(page, tmp);
					
					// close parent window
					closeWindow(Ti.App.closeParentWindow);
					
					MemoModel.deleteMemo(page, tmp);
					
					var param = new (require('common/WindowParam'))('ReadSelectOneView');
					param.toSource = winParamObj.view_file + winParamObj.toSource; 
					param.quiz_obj = new (require('common/ReadSelectOneList'))();
					if (param.quiz_obj == false) { return; }
					param.newnav = true; 
					param.newDoc4 = true; 
					for (var i = 1; i <= 14; i++) {
						if(page == i){
							param.quiz_obj.now_step = i;
							showNextWindow(param);
							closeWindow(winParamObj);
						}
					}
				}
						
				if(tmp != oldtmp){
					if(tmp != '' && tmp != null){
						
						// save memo
						if(oldtmp == ''){
							if(charVal == 0){turnOffAlert();}
							else{MemoModel.saveMemo(page, tmp);turnOnAlert();}
						}
						
						// update memo
						if(tmp != '' && oldtmp != ''){
							if(charVal == 0){
								if(tmp.length != charVal){
									tmp = '';
									
									turnOffAlert();
								}
							}
							else{MemoModel.updateMemo(page, tmp);turnOnAlert();}
						}
					}
					else{
						turnOffAlert();
					}
				}
			}
		});
		viewObj.add(save);
	}
}

function memoAlert(winParamObj, page){
	var MemoList = require('common/MemoList');
	var MemoListModel = new MemoList();
	var memoList = MemoListModel.getMemoList(winParamObj.quiz_obj);
	
	// get page number and memo
	for(var i=0; i < memoList.length; i++) {
		var no = memoList[i].memo_name.split('.')[0];
		var memo = memoList[i].memo_memo;
		
		// change color view memo button
		if(page == no){
			Ti.App.memoAlert.backgroundImage = getImagesPath('read_btn_view_orange.png');
		}
		
	}
}

function addMemoListButton(winParamObj, viewObj, src){
	if (Ti.Platform.osname === 'iphone') {
		var iphoneRightButton = Titanium.UI.createButton({
			title:'メモ一覧',
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
		});
		iphoneRightButton.addEventListener('click', function() {
			if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
			var param = new (require('common/WindowParam'))('MemoListView');
			param.newnav = true; 
			param.toSource = src; 
			showNextWindow(param);
			
			// set parent window
			Ti.App.closeParentWindow = winParamObj;
		});
		viewObj.parent_window_rightbutton = iphoneRightButton;
	}
	else {
		var b = null;
		winParamObj.parent_window.activity.onCreateOptionsMenu = function(e) {
	        var menu = e.menu;
	        var menuItem1 = menu.add({ title: "メモ一覧",itemId:1 });
	        menuItem1.addEventListener("click",function(e) {
       			if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
				var param = new (require('common/WindowParam'))('MemoListView');
				param.newnav = true; 
				param.toSource = src; 
				showNextWindow(param);
				
				// set parent window
				Ti.App.closeParentWindow = winParamObj;
			});
	    };
	}
}

function clickBack(winParamObj) {
	var alertDialog = Titanium.UI.createAlertDialog({ 
	    message: '学習を終了しますか？',
	    buttonNames: ['OK','キャンセル'],
	    cancel: 1 
	});
	alertDialog.addEventListener('click',function(event){
	    if(event.index == 0){ closeWindow(winParamObj); }
	});
	alertDialog.show();	
}

function getAddTarget(winParamObj) {
	var viewclass = require(winParamObj.view_file);
	var view = viewclass(winParamObj);
	if (!view) { return false; }
	
	if (Ti.Platform.osname === 'iphone') {
		var masterContainerWindow = Ti.UI.createWindow();
		
		if (view.parent_window_leftbutton) {
			masterContainerWindow.setLeftNavButton(view.parent_window_leftbutton);
		}
		if (view.parent_window_rightbutton) {
			masterContainerWindow.setRightNavButton(view.parent_window_rightbutton);
		}
		masterContainerWindow.add(view);
		
		if (winParamObj.newnav) {
			masterContainerWindow.title = view.parent_window_title;
			var navGroup = Ti.UI.iPhone.createNavigationGroup({
				window:masterContainerWindow
			});
			if(winParamObj.newDoc){
				Ti.App.thisTarget = navGroup;
			}
			if(winParamObj.newDoc1){
				Ti.App.thisTarget = navGroup;
			}
			if(winParamObj.newDoc2){
				Ti.App.thisTarget = navGroup;
			}
			if(winParamObj.newDoc3){
				Ti.App.thisTarget = navGroup;
			}
			if(winParamObj.newDoc4){
				Ti.App.thisTarget = navGroup;
			}
			if(winParamObj.newDoc5){
				Ti.App.thisTarget = navGroup;
			}
			Ti.App.nav.addNav(navGroup);
			
			return navGroup;
		} 
		else {
			return 	masterContainerWindow;
		}
	} 
	else {
		return 	view;
	}
}

function searchNone(winParamObj) {
	var alertDialog = Titanium.UI.createAlertDialog({
	    message: '該当するものがありません',
	    buttonNames: ['戻る']
	});
	alertDialog.show();
}

function getImagesPath(fname, common) {
	var fullpath = '';
	
	if (common) {
		if (Ti.Platform.osname === 'iphone') {
			fullpath = Titanium.Filesystem.resourcesDirectory 
						+ 'images/' + fname;
		} else {
			fullpath = '../images/' + fname;		
		}
		return fullpath;	
	} 

	if (Ti.Platform.osname === 'iphone') {
		fullpath = Titanium.Filesystem.resourcesDirectory 
					+ 'images/iphone_images/' + fname;
	} else {
		fullpath = '../images/android_images/' + fname;		
	}
	
	return fullpath;
}

function shuffle(list) {
  var i = list.length;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    if (i == j) continue;
    var k = list[i];
    list[i] = list[j];
    list[j] = k;
  }
  return list;
}

function ArrangementDate(now) {
	this.year = "";
	this.month = "";
	this.day = "";
	this.hour = "";
	this.min = "";
	this.sec = "";
	var self = this;

	this._init = function(now){
		self.year = now.getYear(); 
		self.month = now.getMonth() + 1; 
		self.day = now.getDate(); 
		self.hour = now.getHours(); 
		self.min = now.getMinutes(); 
		self.sec = now.getSeconds(); 
		if(self.year < 2000) { self.year += 1900; }
		if(self.month < 10) { self.month = "0" + self.month; }
		if(self.day < 10) { self.day = "0" + self.day; }
		if(self.hour < 10) { self.hour = "0" +self.hour; }
		if(self.min < 10) { self.min = "0" + self.min; }
		if(self.sec < 10) { self.sec = "0" + self.sec; }
		return self;
	}	
	return this._init(now);
}

function replaceAll(expression, org, dest){  
	return expression.split(org).join(dest);  
} 

function dumpLog(obj) {
	Titanium.API.info(JSON.stringify(obj));
}

function ConvertQuest(quest){
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
}
