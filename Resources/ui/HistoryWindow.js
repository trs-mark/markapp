/**
 * HistoryWindow for iPhone
 */
function HistoryWindow(iphoneNav,loading) {
	var self = Ti.UI.createWindow({
		backgroundImage:BG_PATH,
		title:'履歴一覧'
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var QuizHistory = require('models/QuizHistory');
	var quizHistory = new QuizHistory();
	var history = quizHistory.getQuizHistory();
	Ti.API.info(history);
	
	var rowData = [];
	
	for (var i=0;i<history.length;i++){
		//　create row
		var row = Ti.UI.createTableViewRow({
			customId: i,
			height:Ti.UI.SIZE,
			selectedBackgroundColor:'#015FE7',
			backgroundColor:'#FFFFFF'
		});
		row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: history[i].chapterTitle +'\n' +
					history[i].correctCount + '/' + history[i].questionCount + '\n' +
					history[i].dateTime,
			font:{fontSize:'20dp',},
			top: '12dp',
			left: '10dp',
			touchEnabled: false
		}));
		row.add(Ti.UI.createImageView({
			image:IMG_PATH + 'arrow.png',
			right:0, bottom: 0,
			width:20, height: 20,
			touchEnabled: false
		}));
		row.addEventListener('click', function(e){
			loading.showLoading(self,'Loading...',1.0);
			var x = e.source.customId;
			var HistoryViewerWindow = require('ui/HistoryViewerWindow');
			Ti.API.info(JSON.stringify(history[x].dataObj));
			var historyViewerWindow = new HistoryViewerWindow(history[x].chapterTitle,history[x].dataObj,loading);
			iphoneNav.open(historyViewerWindow,{animated:true});
		});
		
		rowData.push(row);
	}
	
	// create table for quiz chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0',
		data: rowData
	});
	
	self.add(tableView);
	
	return self;
}
module.exports = HistoryWindow;