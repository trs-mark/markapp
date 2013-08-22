/**
 * HistoryWindow for iPhone
 */
function HistoryWindow(GLOBAL,navi,loading) {
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		backgroundImage:GLOBAL.BG_PATH,
		title:'履歴一覧'
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var QuizHistory = require('models/QuizHistory');
	var quizHistory = new QuizHistory();
	var history = quizHistory.getQuizHistory(GLOBAL);
	Ti.API.info(history);
	
	var rowData = [];
	
	for (var i=0;i<history.length;i++){
		//　create row
		var row = Ti.UI.createTableViewRow({
			customId: i,
			height:Ti.UI.SIZE,
			selectedBackgroundColor:'#015FE7',
			backgroundColor:'#FFFFFF',
			customClickFlag:false
		});
		
		//the date time
		row.add(Ti.UI.createLabel({
			color:'#666666',
			text: history[i].dateTime[0] + '年' +  history[i].dateTime[1] + '月' +  history[i].dateTime[2] + '日 '
		+  history[i].dateTime[3] + '時' +  history[i].dateTime[4] + '分',
			top: '10dp',
			left: '10dp',
			height: 'auto',
			font:{fontSize:'16dp'},
			touchEnabled: false
		}));
		//the correct count
		row.add(Ti.UI.createLabel({
			color:'#457CBA',
			text: history[i].correctCount,
			top: '10dp',
			right: '80dp',
			font:{fontSize:'38dp'},
			height: 'auto',
			touchEnabled: false
		}));
		//the total items
		row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: '/ ' + history[i].questionCount,
			top: '10dp',
			right: '5dp',
			font:{fontSize:'38dp'},
			height: 'auto',
			touchEnabled: false
		}));
		//the chapter title
		row.add(Ti.UI.createLabel({
			color:'#FF7F0C',
			text:history[i].chapterTitle,
			top: '60dp',
			left: '10dp',
			height: 'auto',
			touchEnabled: false
		}));
		row.add(Ti.UI.createImageView({
			image:GLOBAL.IMG_PATH + 'arrow.png',
			right:0, bottom: 0,
			width:22, height: 22,
			touchEnabled: false
		}));
		row.addEventListener('click', function(e){
			if(!e.source.customClickFlag){
				loading.showLoading2('Loading...',1.0,e.source);
				var x = e.source.customId;
				var HistoryViewerWindow = require('ui/HistoryViewerWindow');
				Ti.API.info(JSON.stringify(history[x].dataObj));
				var showRetry = (history[x].questionCount == history[x].correctCount)?false:true;
				var historyViewerWindow = new HistoryViewerWindow(GLOBAL,navi,history[x].chapterTitle,history[x].dataObj,showRetry,loading);
				navi.open(historyViewerWindow,{animated:true});
				//custom flag for trapping only once action
				e.source.customClickFlag = true;
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
			text: '履歴一覧',
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
module.exports = HistoryWindow;