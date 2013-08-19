/**
 * common HistoryViewerWindow single quiz viewer
 */
function HistoryViewerWindow(GLOBAL,chapterTitle,dataObj,loading) {
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:chapterTitle,
		backgroundImage:GLOBAL.IMG_PATH + 'quiz_history_detail_bg.png'
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
		btnRetry.backgroundSelectedImage = GLOBAL.IMG_PATH + 'result_btn_tryagain.png';
	}
	self.add(btnRetry);
	
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
	
	var QuestionSet = require('models/QuestionSet');
	var questionnaireObjArr = new QuestionSet(GLOBAL,dataObj.start,dataObj.end);
	
	var Reviewer = require('controllers/Reviewer');
	Ti.API.info(dataObj.answers);
	var reviewr = new Reviewer(GLOBAL,historyView,questionnaireObjArr,dataObj.answers);
	
	self.add(historyView);
	
	return self;
}
module.exports = HistoryViewerWindow;