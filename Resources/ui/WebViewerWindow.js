/**
 * common WebViewerWindow
 */
function WebViewerWindow(loading) {
	var self = Ti.UI.createWindow({
		title:'WEB検索',
		backgroundImage:BG_PATH
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var webViewer = Ti.UI.createWebView({
		url:COMPANY_URL
	});
	self.add(webViewer);
	
	return self;
}
module.exports = WebViewerWindow;