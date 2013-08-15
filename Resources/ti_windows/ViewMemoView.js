function ViewMemoView(winParamObj) {

	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	// create view memo view
	var windowTitle = 'メモの確認';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		top: '0dp',
		width:'320dp',
		height:'416dp',
		backgroundImage:getImagesPath('memo_bg.png'),
		parent_window_title: windowTitle
	});
	
	// create left button in navigation bar to quit view memo
	addReturnButton(winParamObj, self, '戻る');
	
	// create scroll view for text
	var s = Titanium.UI.createScrollView({
		contentHeight:'auto', 
		top: '12dp',
		bottom: '15dp',
		width: '280dp',
		showVerticalScrollIndicator:true
	})
	self.add(s);
	
	var Memo = require('common/Memo');
	var MemoModel = new Memo();
	var MemoList = MemoModel.getMemo(winParamObj.quiz_obj);
	
	// get memo from database and show
	for(var i=0; i < MemoList.length; i++) {
		if(winParamObj.quiz_obj.now_step == MemoList[i].memo_name){
			var text = Titanium.UI.createTextArea({
				focusable: false,
			    backgroundColor:'#F5F4FA',
			    color:'black',
			    height:'385dp',
			    width:'280dp',
				bottom: '12dp',
			    font:{fontSize:'16dp'},
			    enabled:false,
			    value:MemoList[i].memo_comment
			});
		    s.add(text);
		}
	}
	    
	return self;
};
module.exports = ViewMemoView;
