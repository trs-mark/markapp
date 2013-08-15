function SearchWebView(winParamObj) {
	var windowTitle = 'WEB検索';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		parent_window_title: windowTitle
	});
	var webview = Titanium.UI.createWebView({url:'http://www.technosquare.co.jp'});
	self.add(webview);
	
	return self;
};
module.exports = SearchWebView;