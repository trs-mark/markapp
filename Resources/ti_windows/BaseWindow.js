function BaseWindow(winParamObj) {
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var self = Ti.UI.createWindow({
		exitOnClose:true,
		navBarHidden:false,
		backgroundColor:'#eeebdf'
	});
	if (Ti.Platform.osname=='iphone') {
		self.backgroundImage = getImagesPath('bg.png');
	}
	winParamObj.parent_window = self;
	var add_target = getAddTarget(winParamObj); 
	if (add_target == false) { return false; }
	self.add(add_target);
	self.addEventListener('focus', function(e) {
		Ti.App.OnceSelectedFlag = false;
	});
	return self;
};
module.exports = BaseWindow;
