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
	}else{
		self.addEventListener('postlayout',function(e){
			loading.hideLoading();
		});
	}
	
	return self;
}
module.exports = WebViewerWindow;