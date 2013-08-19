/**
 * Main Window for iphone
 */
function MainWindow(GLOBAL) {
	//root Window
	var containerWindow = Ti.UI.createWindow();
	
	var btnInfo = Ti.UI.createButton({
		title: 'info'
	});
	
	var infoAction = function(events){
		//Ti.Platform.openURL(COMPANY_URL);
		var verAlertDialog = Titanium.UI.createAlertDialog({
			message: GLOBAL.APP_NAME + "\n" + GLOBAL.APP_TEXT + "\n" +
				"version" + GLOBAL.VERSION + "\n" +
				GLOBAL.COPYRIGHT + "\n" +
				GLOBAL.COMPANY + "\n",
			buttonNames: ['開発者を表示','閉じる'], 
			cancel: 1,
		});
		verAlertDialog.addEventListener('click',function(event){
			if(event.index == 0){
				loading.showLoading(containerWindow,'Loading...',0.5);
				WebViewerWindow = require('ui/WebViewerWindow');
				var webViewerWindow = new WebViewerWindow(GLOBAL,loading);
				if(GLOBAL.IS_ANDROID){
					navi.isInfo = true;
				}
				navi.open(webViewerWindow,{animated:true});
			}
		});
		verAlertDialog.show();
	};
	
	btnInfo.addEventListener('click',infoAction);
	//base Window
	var baseWindow = Ti.UI.createWindow({
		backgroundColor: '#eeebdf',
		exitOnClose:true,
		navBarHidden:(GLOBAL.IS_ANDROID),
		title: 'トップメニュー MKI',
		orientation: Ti.UI.PORTRAIT,
		rightNavButton: btnInfo,
		backgroundImage: GLOBAL.BG_PATH
	});
	
	if(GLOBAL.IS_ANDROID){
		baseWindow.addEventListener('android:back',function(e){
			//alert('main back');
			if (navi.close()){
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
			}
		});
		var activity = baseWindow.activity;
		
		activity.onCreateOptionsMenu = function(e){
			var menu = e.menu;
			var menuItem = menu.add({ 
				title: "Info", 
				//icon:  "item1.png"
			});
			menuItem.addEventListener("click", infoAction);
		};
	}
	
	var containerView = Ti.UI.createView({
		width:'320dp',
		height:'416dp',
		backgroundColor:'transparent'
	});
	
	// create top menu image
	//トップメニューイメージを作成
	var imgTop = Titanium.UI.createImageView({
		image:GLOBAL.IMG_PATH + 'top_image.png',
		top:'5dp',
		width:'304dp',
		height:'249dp'
	});
	// create label 理工図書株式会社 between image and button
	var lblTop = Titanium.UI.createLabel({
		color:'#000000',
		font:{fontSize:'12dp',fontFamily:'Meiryo'},
		text:'理工図書株式会社',
		top:'248dp',
		left:'212dp',
		right:'10dp',
		zIndex:1
	});
	
	var ActivityIndicator = require('controllers/ActivityIndicator');
	var loading = new ActivityIndicator();
	
	// create quiz button - ボタンをクイズ作成
	var btnQuiz = Titanium.UI.createButton({
		backgroundImage: GLOBAL.IMG_PATH + 'top_btn_quiz_long.png',
		top:'255dp',
		width:'246dp',
		height:'79dp'
	});
	btnQuiz.addEventListener('click',function(e){
		loading.showLoading(containerWindow,'Loading...',0.5);
		var QuizListWindow = require('ui/QuizListWindow');
		var quizListWindow = new QuizListWindow(GLOBAL,navi,loading);
		navi.open(quizListWindow,{animated:true});
	});
	
	// create history button
	var btnHistory = Titanium.UI.createButton({
		backgroundImage: GLOBAL.IMG_PATH + 'top_btn_history_long.png',
		top:'330dp',
		width:'246dp',
		height:'79dp'
	});
	btnHistory.addEventListener('click',function(e){
		loading.showLoading(containerWindow,'Loading...',0.5);
		var HistoryWindow = require('ui/HistoryWindow');
		var historyWindow = new HistoryWindow(GLOBAL,navi,loading);
		navi.open(historyWindow,{animated:true});
	});
	
	if(GLOBAL.IS_ANDROID){
		btnQuiz.backgroundSelectedImage = GLOBAL.IMG_PATH + 'top_btn_quiz_long_selected.png';
		btnHistory.backgroundSelectedImage = GLOBAL.IMG_PATH + 'top_btn_history_long_selected.png';
	}
	containerView.add(imgTop);
	containerView.add(lblTop);
	containerView.add(btnQuiz);
	containerView.add(btnHistory);
	baseWindow.add(containerView);
	
	var Navigator = require('controllers/Navigator');
	var navi = new Navigator(GLOBAL,baseWindow);
	
	if(GLOBAL.IS_ANDROID){
		return baseWindow;
	}else{
		containerWindow.add(navi);
	
		return containerWindow;
	}
	
}
module.exports = MainWindow;