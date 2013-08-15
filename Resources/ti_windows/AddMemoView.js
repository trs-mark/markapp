function AddMemoView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	// create add memo view
	var windowTitle = 'メモの編集';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		top: '0dp',
		width:'320dp',
		height:'416dp',
		backgroundImage:getImagesPath('memo_bg.png'),
		parent_window_title: windowTitle
	});
	if (Ti.Platform.osname!=='iphone') { 
		self.backgroundImage = getImagesPath('memo_bg_android.png');
	}
	
	// create scroll view for text
	var s = Titanium.UI.createScrollView({
		contentHeight:'auto', 
		bottom: '15dp',
		width:'280dp',
		showVerticalScrollIndicator:true
	})
	if (Ti.Platform.osname === 'iphone') {s.top = '12dp';}
  	else{s.top = '70dp';}
	self.add(s);
	
	// create text area
	var text = Titanium.UI.createTextArea({
	    backgroundColor:'#F5F4FA',
		bottom: '12dp',
	    width: '280dp',
	    font:{fontSize:'16dp'},
	    suppressReturn:false
	});
    s.add(text);
    if (Ti.Platform.osname === 'iphone') {text.height = '385dp';}
    else{
		text.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		text.height = 'auto';
		text.top =  '1dp';
		text.so
  	}
  	
    var page = winParamObj.quiz_obj.now_step;
    var Memo = require('common/Memo');
	var MemoModel = new Memo();
	var MemoList = MemoModel.getMemo(winParamObj.quiz_obj);
	
	for(var i=0; i < MemoList.length; i++) {
		if(winParamObj.quiz_obj.now_step == MemoList[i].memo_name){
			text.value = MemoList[i].memo_comment;
		}
	}
    
	var oldtmp = text.value;
	
	// create left button in navigation bar to quit add memo
	addReturnButton(winParamObj, self, 'キャンセル');
	// in iOS, create right button in navigation bar to save memo
	// in Android, create button to save memo
	addSaveButton(winParamObj, self, text, page, oldtmp);
	
	return self;
};
module.exports = AddMemoView;
