function QuizHistoryListView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname=='android');
	// create quiz history list view
	var windowTitle = '履歴一覧';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		parent_window_title: windowTitle
	});
	
	// create table for quiz history list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0'
	});
	self.add(tableView);
	
	var QuizHistory = require('common/QuizHistory');
	var QuizHistoryModel = new QuizHistory();
	var historyList = QuizHistoryModel.getHistoryList(winParamObj.quiz_obj);
	
	// get quiz history and show date, correct answer and total quiz items
	for(var i=0; i < historyList.length; i++) {
		var row = Ti.UI.createTableViewRow({
			history_id:historyList[i].id,
			quiz_data:historyList[i].quiz_data,
			height:'90dp',
			selectedBackgroundColor:'#015FE7'
		});
		//var ChapTitle  = historyList[i].ChapTitle;
		var time = replaceAll(historyList[i].datetime, '-', '/');
		var mydate = new ArrangementDate(new Date(time));
		
		row.add(Ti.UI.createLabel({
			color:'#666666',
			text: mydate.year + '年' + mydate.month + '月' + mydate.day + '日 '
		 + mydate.hour + '時' + mydate.min + '分',
			top: '10dp',
			left: '10dp',
			height: 'auto',
			font:{fontSize:'16dp'}
		}));
		row.add(Ti.UI.createLabel({
			color:'#457CBA',
			text: historyList[i].correct_count,
			top: '10dp',
			right: '80dp',
			font:{fontSize:'38dp'},
			height: 'auto'
		}));
		row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: '/ ' + historyList[i].question_count,
			top: '10dp',
			right: '5dp',
			font:{fontSize:'38dp'},
			height: 'auto'
		}));
		/*row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: arr[1],
			top: '60dp',
			left: '64dp',
			height: 'auto'
		}));*/
		row.add(Ti.UI.createLabel({
			color:'#FF7F0C',
			text:historyList[i].ChapTitle,
			top: '60dp',
			left: '10dp',
			height: 'auto'
		}));
		row.add(Ti.UI.createImageView({
			image:getImagesPath('arrow.png'),
			right:0, bottom: 0,
			width:22, height: 22
		}));
		row.addEventListener('click', function(e){
			if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
			if(IS_ANDROID){
				var param = new (require('common/WindowParam'))('QuizHistoryDetailViewAndroid');
			}else{
				var param = new (require('common/WindowParam'))('QuizHistoryDetailView');
			}
			
			
			quizSelectOneList = new (require('common/QuizSelectOneList'))();
			quizSelectOneList.restorQuizSelectOneList(e.rowData.quiz_data);
			var quiz_data=JSON.parse(e.rowData.quiz_data);
			Titanium.App.Properties.setInt('num_Correct',quiz_data.correct_count);
			param.quiz_obj = quizSelectOneList;
			var activityIndicator = Ti.UI.createActivityIndicator({
				color: 'white',
				font: {fontFamily:'Helvetica Neue', fontSize:'26%',fontWeight:'bold'},
				message:'Loading..',
				width:'100%',
				textAlign:'center',
				height:Ti.UI.SIZE,
				width:Ti.UI.SIZE
			});
			var box = Titanium.UI.createView({
				opacity: 0.9,
				backgroundColor: '#0F183B',
				borderColor: '#FFFFFF',
				borderWidth: 3,
				borderRadius: 10,
				width: '80%',
				height: '20%',
				zIndex: 15
			});
			var win2 = Titanium.UI.createView({
				opacity: 0.7,
				backgroundColor: 'gray',
				width: '100%',
				height: '100%',
				zIndex: 10
			});
			if (Titanium.Platform.osname === 'iphone'){
				activityIndicator.style=Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
				box.add(activityIndicator);
				self.add(win2);
				self.add(box);
				activityIndicator.show();
				showNextWindow(param); 
					setTimeout(function(){
						self.remove(box);
						self.remove(win2);
						activityIndicator.hide();
					}, 500); 
			}else{
				activityIndicator.show();
				showNextWindow(param); 	
					setTimeout(function(){
						activityIndicator.hide();
					}, 500);
			}
		});
		tableView.appendRow(row);
	}
	return self;
};
module.exports = QuizHistoryListView;