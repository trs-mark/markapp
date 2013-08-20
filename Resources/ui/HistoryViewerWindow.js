/**
 * common HistoryViewerWindow single quiz viewer
 */
function HistoryViewerWindow(GLOBAL,navi,chapterTitle,dataObj,showRetry,loading) {
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		//title:chapterTitle
		//backgroundImage:GLOBAL.IMG_PATH + 'quiz_history_detail_bg.png'
	});
	if(GLOBAL.IS_ANDROID){
		self.addEventListener('android:back',function(e){
			self.close();
		});
	}
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	// create try again button
	var btnRetry = Titanium.UI.createButton({
		backgroundImage:GLOBAL.IMG_PATH + 'result_btn_tryagain.png',
		top:0,
		left:'30dp',
		right:'30dp',
		height:'20%'
	});
	if (GLOBAL.IS_ANDROID) {
		btnRetry.backgroundSelectedImage = GLOBAL.IMG_PATH + 'result_btn_tryagain_selected.png';
	}
	
	
	//  display quiz history details
	var historyView = Ti.UI.createScrollView({
		backgroundColor:'transparent',
		separatorColor: 'transparent',
		top:'20%',
		bottom:'15dp',
		left: '18dp',
		right: '18dp',
		layout:'vertical'
	});
	
	//var QuestionSet = require('models/QuestionSet');
	//var questionnaireObjArr = new QuestionSet(GLOBAL,dataObj.start,dataObj.end);
	
	var Reviewer = require('controllers/Reviewer');
	Ti.API.info(dataObj.answers);
	var reviewr = new Reviewer(GLOBAL,historyView,dataObj.questionnaireObjArr,dataObj.answers);
	
	if(GLOBAL.IS_ANDROID){
		var selfView = Ti.UI.createView({
			backgroundImage:GLOBAL.IMG_PATH + 'quiz_history_detail_bg.png',
			top:'44dp',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL
		});
		var customNavBar = Ti.UI.createView({
			top:0,
			width: Ti.UI.FILL,
			height: '44dp',
			backgroundColor: '#546C90'
		});
		var lblTitle = Ti.UI.createLabel({
			text: chapterTitle,
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		customNavBar.add(lblTitle);
		selfView.top='44dp';
		self.add(customNavBar);
		self.add(selfView);
		selfView.add(historyView);
	}else{
		self.add(historyView);
	}
	
	//add retry button if not perfect
	if(showRetry){
		btnRetry.addEventListener('click',function(e){
			loading.showLoading(self,'Loading...',1.0);
			var QuizWindow = require('ui/QuizWindow');
			var willSave = false;
			var quizWindow = new QuizWindow(GLOBAL,navi,chapterTitle,dataObj.start,dataObj.end,willSave,loading,dataObj.mistakesObjArr);
			if(GLOBAL.IS_ANDROID){
				navi.isQuiz = true;
				navi.open(quizWindow,{animated:true});
			}else{
				quizWindow.open();
			}
		});
		if(GLOBAL.IS_ANDROID){
			selfView.add(btnRetry);
		}else{
			self.add(btnRetry);
		}
	}else{
		historyView.top = historyView.bottom;
		if(GLOBAL.IS_ANDROID){
			selfView.backgroundImage=GLOBAL.IMG_PATH + 'memo_bg.png';
		}else{
			self.backgroundImage=GLOBAL.IMG_PATH + 'memo_bg.png';
		}
	}
	
	return self;
}
module.exports = HistoryViewerWindow;