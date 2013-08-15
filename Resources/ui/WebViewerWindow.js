/**
 * common WebViewerWindow
 */
function WebViewerWindow() {
	var self = Ti.UI.createWindow({
		title:'WEB検索',
		backgroundImage:BG_PATH
	});
	
	var webViewer = Ti.UI.createWebView({
		url:COMPANY_URL
	});
	self.add(webViewer);
	
	return self;
}
module.exports = WebViewerWindow;