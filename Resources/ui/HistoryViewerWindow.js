/**
 * common HistoryViewerWindow single quiz viewer
 */
function HistoryViewerWindow(chapterTitle,dataObj) {
	var self = Ti.UI.createWindow({
		title:chapterTitle,
		backgroundImage:IMG_PATH + 'quiz_history_detail_bg.png'
	});
	
	// create try again button
	var btnRetry = Titanium.UI.createButton({
		backgroundImage:IMG_PATH + 'result_btn_tryagain.png',
		top:0,
		left:'30dp',
		right:'30dp',
		height:'20%'
	});
	if (IS_ANDROID) {
		btnRetry.backgroundSelectedImage = getImagesPath('result_btn_tryagain.png');
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
	var questionnaireObjArr = new QuestionSet(dataObj.start,dataObj.end);
	
	var Reviewer = require('controllers/reviewer');
	Ti.API.info(dataObj.answers);
	var reviewr = new Reviewer(historyView,questionnaireObjArr,dataObj.answers);
	
	self.add(historyView);
	
	return self;
}
module.exports = HistoryViewerWindow;