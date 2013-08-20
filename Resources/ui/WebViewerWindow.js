/**
 * common WebViewerWindow
 */
function WebViewerWindow(GLOBAL,loading) {
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:'WEB検索',
		backgroundImage:GLOBAL.BG_PATH
	});
	
	
	var webViewer = Ti.UI.createWebView({
		url:GLOBAL.COMPANY_URL
	});
	self.add(webViewer);
	
	if(GLOBAL.IS_ANDROID){
		webViewer.addEventListener('load',function(e){
			loading.hideLoading();
		});
		
		var customNavBar = Ti.UI.createView({
			top:0,
			width: Ti.UI.FILL,
			height: '44dp',
			backgroundColor: '#546C90'
		});
		var lblTitle = Ti.UI.createLabel({
			text: 'WEB検索',
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		customNavBar.add(lblTitle);
		webViewer.top='44dp';
		self.add(customNavBar);
		
	}else{
		self.addEventListener('postlayout',function(e){
			loading.hideLoading();
		});
	}
	
	return self;
}
module.exports = WebViewerWindow;