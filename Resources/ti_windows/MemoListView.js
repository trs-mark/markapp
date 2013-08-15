function MemoListView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	// create quiz chapter list view
	var windowTitle = 'メモ一覧 第一章';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		top: '0dp',
		width:'320dp',
		height:'416dp',
		backgroundColor:'transparent',
		parent_window_title: windowTitle
	});
	
	// create left button in navigation bar to quit read
	addReturnButton(winParamObj, self, '戻る');
	
	// create table for quiz chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0',
		top: '23dp'
	});
	self.add(tableView);
	
	var ins = Titanium.UI.createImageView({
	    top: '0dp',
	    image:getImagesPath('memolist_instruction.png'),
	    height: '23dp'
	});
	self.add(ins);
	
	var MemoList = require('common/MemoList');
	var MemoListModel = new MemoList();
	var memoList = MemoListModel.getMemoList(winParamObj.quiz_obj);
	
	// get page number and memo
	for(var i=0; i < memoList.length; i++) {
		var no = memoList[i].memo_name.split('.')[0];
		var memo = memoList[i].memo_memo;
		var row = Ti.UI.createTableViewRow({
			height:'45dp',
			selectedBackgroundColor:'#015FE7'
		});
		row.add(Ti.UI.createImageView({
			image:getImagesPath('arrow.png'),
			right:0, bottom: 0,
			width:20, height: 20
		}));
		
		var view = Ti.UI.createView({
			height:'45dp',
			width: 'auto',
			id: no,
			memo: memo
		});
		row.add(view);
		
		// display page number
		var pageNo = Ti.UI.createLabel({
			color:'#FF7F0C',
			text: no + ' / 14',
			top: '10dp',
			left: '10dp',
			font:{fontSize:'20dp'},
			height: 'auto',
			id: no,
			memo: memo
		});
		view.add(pageNo);
		
		// display starting text memo
		var memoStart = Ti.UI.createLabel({
			color:'#3F0000',
			text: memo,
			top: '10dp',
			left: '70dp',
			font:{fontSize:'20dp'},
			height: '27dp',
			width: '230dp',
			id: no,
			memo: memo
		});
		view.add(memoStart);
		
		// when long press show the memo
		view.addEventListener('longpress', function(e){
			var alertDialog = Titanium.UI.createAlertDialog({ 
			    message: e.source.memo,
			    buttonNames: ['OK']
			});
			alertDialog.show();	
		});
		
		// when click go to its page
		view.addEventListener('click', function(e){
			// close parent window
			closeWindow(Ti.App.closeParentWindow);		
				
			goPage(e.source.id);		
		});
		tableView.appendRow(row);
	}
	
	// function that directs row clicked to its page
	function goPage(no){
		var param = new (require('common/WindowParam'))('ReadSelectOneView');
		param.toSource = winParamObj.toSource;
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		param.newDoc3 = true; 
		for (var i = 1; i <= 14; i++) {
			if(no == i){
				param.quiz_obj.now_step = i;
				showNextWindow(param);
				closeWindow(winParamObj);
			}
		}
	}
	
	
	return self;
};
module.exports = MemoListView;