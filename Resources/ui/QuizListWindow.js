/**
 * QuizListWindow for iPhone
 */
function QuizListWindow(GLOBAL,navi,loading) {
	var title= ['生化学過去問 1-20','生化学過去問 21-40','生化学過去問 41-60','生化学過去問 61-80',
		'生化学過去問 81-100','生化学過去問 101-120','生化学過去問 121-140','生化学過去問 141-161',
		'生化学過去問 1-5','生化学過去問 9-11','生化学過去問 99-102'];
	var range= [{start:1,end:20},{start:21,end:40},{start:41,end:60},{start:61,end:80},
		{start:81,end:100},{start:101,end:120},{start:121,end:140},{start:141,end:161},
		{start:1,end:5},{start:9,end:11},{start:99,end:102}];
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:'問題の選択',
		backgroundImage:GLOBAL.BG_PATH
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var rowData = [];
	
	for (var i=0;i<title.length;i++){
		//　create row
		var row = Ti.UI.createTableViewRow({
			//id:i+1,
			customRange: range[i],
			height:'45dp',
			selectedBackgroundColor:'#015FE7',
			backgroundColor:'#FFFFFF'
		});
		row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: title[i],
			font:{fontSize:'20dp',},
			top: '12dp',
			left: '10dp',
			height: 'auto',
			touchEnabled: false
		}));
		row.add(Ti.UI.createImageView({
			image:GLOBAL.IMG_PATH + 'arrow.png',
			right:0, bottom: 0,
			width:20, height: 20,
			touchEnabled: false
		}));
		row.addEventListener('click', function(e){
			loading.showLoading2('Loading...',1.0);
			var QuizWindow = require('ui/QuizWindow');
			var willSave = true;
			var quizWindow = new QuizWindow(GLOBAL,navi,e.source.children[0].text,e.source.customRange.start,e.source.customRange.end,willSave,loading);
			if(GLOBAL.IS_ANDROID){
				navi.isQuiz = true;
				navi.open(quizWindow,{animated:true});
			}else{
				quizWindow.open();
			}
		});
		
		rowData.push(row);
	}
	
	// create table for quiz chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0',
		data: rowData
	});
	
	if(GLOBAL.IS_ANDROID){
		var customNavBar = Ti.UI.createView({
			top:0,
			width: Ti.UI.FILL,
			height: '44dp',
			backgroundColor: '#546C90'
		});
		var lblTitle = Ti.UI.createLabel({
			text: '問題の選択',
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		customNavBar.add(lblTitle);
		tableView.top='44dp';
		self.add(customNavBar);
	}
	
	self.add(tableView);
	
	return self;
}
module.exports = QuizListWindow;