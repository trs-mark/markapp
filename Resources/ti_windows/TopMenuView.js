function TopMenuView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	// Create alert developers to display information
	//情報を表示するアラートの開発者が作成
	var verAlertDialog = Titanium.UI.createAlertDialog({
	    message: APP_NAME + "\n" +
				 APP_TEXT + "\n" +
             "version" + VERSION + "\n" +
             COPYRIGHT + "\n" +
             COMPANY + "\n",
	    buttonNames: ['開発者を表示','閉じる'], 
	    cancel: 1,
	});
	verAlertDialog.addEventListener('click',function(event){
		if(event.index == 0){
			var param = new (require('common/WindowParam'))('SearchWebView');
			showNextWindow(param);
		}
	});
	
	// The info button in the upper right navigation
	if (Ti.Platform.osname =='iphone') {
		var b = Titanium.UI.createButton({
			title:'info'
		});
		b.addEventListener('click',function() {
			verAlertDialog.show();
		});
	} else {
		var b = null;
		winParamObj.parent_window.activity.onCreateOptionsMenu = function(e) {
	        var menu = e.menu;
	        var menuItem1 = menu.add({ title: "バージョン情報",itemId:1 });
	        menuItem1.addEventListener("click",function(e) {
	       		verAlertDialog.show(); 
			});
	    };
	    //prompt message when exiting apps
	    //終了時にメッセージをプロンプト
	    winParamObj.parent_window.addEventListener('android:back',function(){
			var alertDialog = Titanium.UI.createAlertDialog({
				message: 'アプリを終了します。',
				buttonNames: ['OK','キャンセル'],
			});
			alertDialog.show();
			alertDialog.addEventListener('click', function(e){
				if(e.index==0){
					var activity = Titanium.Android.currentActivity; 
					activity.finish();
				}
			});
	    });
	}
	
	// create top menu view
	var windowTitle = 'トップメニュー'; 
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
	//	height:'416dp',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		backgroundImage:getImagesPath('bg.png'),
		parent_window_title: windowTitle,
		parent_window_rightbutton : b
	});
	
	var self1 = Ti.UI.createView({
		width:'320dp',
		height:'416dp',
		backgroundColor:'transparent',
		//backgroundImage:getImagesPath('bg.png'),
	});

	
	// create top menu image
	//トップメニューイメージを作成
	var image = Titanium.UI.createImageView({
		image:getImagesPath('top_image.png'),
		top:'5dp',
		width:'304dp',
		height:'249dp'
	});
	/*image.addEventListener('click',function(e){
		alert('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
		alert('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
	});*/
	// create label 理工図書株式会社 between image and button
	var lbl = Titanium.UI.createLabel({
		color:'#000000',
		font:{fontSize:'12dp',fontFamily:'Meiryo'},
		text:'理工図書株式会社',
		top:'248dp',
		left:'212dp',
		right:'10dp',
		zIndex:1
	});
	// create read button
	/*var btn_read = Titanium.UI.createButton({
		backgroundImage:getImagesPath('top_btn_read.png'),
		top:'275dp',
		left:'15dp',
		width:'100dp',
		height:'115dp'
	});
	if (Ti.Platform.osname !=='iphone') {
		btn_read.backgroundSelectedImage = getImagesPath('top_btn_read_selected.png');
	}
	btn_read.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('ReadChapterListView');
		showNextWindow(param);
	});*/
	
	// create quiz button - ボタンをクイズ作成
	var btn_quiz = Titanium.UI.createButton({
		backgroundImage:getImagesPath('top_btn_quiz_long.png'),
		top:'255dp',
		width:'246dp',
		height:'79dp'
	});
	if (Ti.Platform.osname !=='iphone') {
		btn_quiz.backgroundSelectedImage = getImagesPath('top_btn_quiz_long_selected.png');
	}
	btn_quiz.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('QuizChapterListView');
		showNextWindow(param);
		param =null;
	});
	
	// create history button
	var btn_history = Titanium.UI.createButton({
		backgroundImage:getImagesPath('top_btn_history_long.png'),
		top:'330dp',
		width:'246dp',
		height:'79dp'
	});
	if (Ti.Platform.osname !=='iphone') {
		btn_history.backgroundSelectedImage = getImagesPath('top_btn_history_long_selected.png');
	}
	
	btn_history.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		var param = new (require('common/WindowParam'))('QuizHistoryListView');
		showNextWindow(param);
		param =null;
	});
	
	// identify what application type
	// if APP_TYPE is equal to 1; add read button
	if(APP_TYPE === 1){
		self1.add(image);
	//	self.add(btn_read);
		self1.add(lbl);
		self1.add(btn_quiz);
		self1.add(btn_history);
		self.add(self1);
		// modify quiz button properties
	//	btn_quiz.left = '110dp';
	//	btn_quiz.width = '206dp';
		btn_quiz.backgroundImage = getImagesPath('top_btn_quiz.png');
		if (Ti.Platform.osname !=='iphone') {
			btn_quiz.backgroundSelectedImage = getImagesPath('top_btn_quiz_selected.png');
		}
		
		// modify history button properties
	//	btn_history.left = '110dp';
	//	btn_history.width = '206dp';
		btn_history.backgroundImage = getImagesPath('top_btn_history.png');
		if (Ti.Platform.osname !=='iphone') {
			btn_history.backgroundSelectedImage = getImagesPath('top_btn_history_selected.png');
		}
	}
	// if APP_TYPE is equal to 2; show quiz button and history button only
	else if(APP_TYPE === 2){
		self1.add(image);
		self1.add(btn_quiz);
		self1.add(btn_history);
		self1.add(lbl);
		self.add(self1);
	}
	// Display Error
	else{
		alert('Application Type Not Found!');
	}
	
	return self;
};
module.exports = TopMenuView;