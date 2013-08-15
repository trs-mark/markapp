/**
 * HistoryWindow for iPhone
 */
function HistoryWindow() {
	var self = Ti.UI.createWindow({
		backgroundImage:BG_PATH
	});
	
	var webViewer = Ti.UI.createWebView({
		url:COMPANY_URL
	});
	self.add(webViewer);
	
	return self;
}
module.exports = HistoryWindow;