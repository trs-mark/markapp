/**
 * Main Window for iphone
 */
function MainWindow() {
	//root Window
	var containerWindow = Ti.UI.createWindow();
	
	var btnInfo = Ti.UI.createButton({
		title: 'info'
	});
	
	btnInfo.addEventListener('click',function(e){
		//Ti.Platform.openURL(COMPANY_URL);
		var verAlertDialog = Titanium.UI.createAlertDialog({
			message: APP_NAME + "\n" + APP_TEXT + "\n" +
				"version" + VERSION + "\n" +
				COPYRIGHT + "\n" +
				COMPANY + "\n",
			buttonNames: ['開発者を表示','閉じる'], 
			cancel: 1,
		});
		verAlertDialog.addEventListener('click',function(event){
			if(event.index == 0){
				WebViewerWindow = require('ui/WebViewerWindow');
				var webViewerWindow = new WebViewerWindow();
				iphoneNav.open(webViewerWindow,{animated:true});
			}
		});
		verAlertDialog.show();
	});
	//base Window
	var baseWindow = Ti.UI.createWindow({
		backgroundColor: '#eeebdf',
		exitOnClose:true,
		navBarHidden:false,
		title: 'トップメニュー MKI',
		orientation: Ti.UI.PORTRAIT,
		rightNavButton: btnInfo,
		backgroundImage: BG_PATH
	});
	
	var containerView = Ti.UI.createView({
		width:'320dp',
		height:'416dp',
		backgroundColor:'transparent'
	});
	
	// create top menu image
	//トップメニューイメージを作成
	var imgTop = Titanium.UI.createImageView({
		image:IMG_PATH + 'top_image.png',
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
		backgroundImage: IMG_PATH + 'top_btn_quiz_long.png',
		top:'255dp',
		width:'246dp',
		height:'79dp'
	});
	btnQuiz.addEventListener('click',function(e){
		loading.showLoading(containerWindow,'Loading...',0.5);
		var QuizListWindow = require('ui/QuizListWindow');
		var quizListWindow = new QuizListWindow(iphoneNav,loading);
		iphoneNav.open(quizListWindow,{animated:true});
	});
	
	// create history button
	var btnHistory = Titanium.UI.createButton({
		backgroundImage: IMG_PATH + 'top_btn_history_long.png',
		top:'330dp',
		width:'246dp',
		height:'79dp'
	});
	btnHistory.addEventListener('click',function(e){
		loading.showLoading(containerWindow,'Loading...',0.5);
		var HistoryWindow = require('ui/HistoryWindow');
		var historyWindow = new HistoryWindow(iphoneNav,loading);
		iphoneNav.open(historyWindow,{animated:true});
	});
	
	containerView.add(imgTop);
	containerView.add(lblTop);
	containerView.add(btnQuiz);
	containerView.add(btnHistory);
	baseWindow.add(containerView);
	
	
	//creates navigation bar
	var iphoneNav = Titanium.UI.iPhone.createNavigationGroup({
		window: baseWindow
	});
	
	containerWindow.add(iphoneNav);
	
	return containerWindow;
}
module.exports = MainWindow;