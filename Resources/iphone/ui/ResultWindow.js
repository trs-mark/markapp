/**
 * ResultWindow for iPhone
 */
function ResultWindow(iphoneNav,quizWindow,chapterTitle,userAnswers,correctCount,start,end,questionnaireObj) {
	var btnBack = Ti.UI.createButton({
		title:'戻る'
	});
	btnBack.addEventListener('click',function(e){
		iphoneNav.close(quizWindow,{animated:'true'});
		iphoneNav.close(self,{animated:'true'});
	});
	
	var self = Ti.UI.createWindow({
		title:'結果表示',
		backgroundImage:IMG_PATH + 'bg.png',
		leftNavButton: btnBack
	});
	
	var resultScrollView = Titanium.UI.createScrollView({
		showVerticalScrollIndicator:true,
		layout:'vertical'
	});
	var infoView = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	
	var imgResult = Titanium.UI.createImageView({
		image:IMG_PATH + 'result.png',
		top:'0dp',
		width:'304dp',
		height:'240dp'
	});
	infoView.add(imgResult);
	
	// display quiz result date
	var mydate = new Date();
	var lblDate = Titanium.UI.createLabel({
		color:'#666666',
		text: mydate.getFullYear() + '年' + mydate.getMonth() + '月' + mydate.getDay() + '日　'
		 + mydate.getHours() + '時' + mydate.getMinutes() + '分',
		top: '50dp',
		left: '70dp',
		font:{fontSize:'18dp'}
	});
	infoView.add(lblDate);
	
	// insert history db
	//if (!winParamObj.quiz_obj.retryFlg) {
		//var QuizHistory = require('common/QuizHistory');
		//var QuizHistoryModel = new QuizHistory();/
		//winParamObj.quiz_obj.datetime = mydate.year + '-' + mydate.month + '-' + mydate.day + ' ' + mydate.hour + ':' + mydate.min + ':' + mydate.sec;
		//QuizHistoryModel.saveQuizHistory(winParamObj.quiz_obj,Titanium.App.Properties.getString('ChapterTitle'));
	//}
	var QuizHistory = require('models/QuizHistory');
	var quizHistory = new QuizHistory(chapterTitle,start,end,userAnswers,correctCount,mydate);
	
	var lblChapterTitle = Titanium.UI.createLabel({
		color:'#3F0000',
		text: chapterTitle,
		font:{fontSize:'20dp'},
		top: '113dp',
		left: (IS_ANDROID)?'12%':'20dp',
	});
	infoView.add(lblChapterTitle);
	
	// display quiz end number
	var lblNumberOfItems = Titanium.UI.createLabel({
		color:'#3F0000',
		text: end,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'30%': '90dp'
	});
	infoView.add(lblNumberOfItems);
	
	// display quiz correct answers
	var lblCorrectCount = Titanium.UI.createLabel({
		color:'#457CBA',
		text: correctCount,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'60%': '195dp',
		height: 'auto'
	});
	infoView.add(lblCorrectCount);
	
	//  create try again button
	var btnRetry = Titanium.UI.createButton({
		backgroundImage:IMG_PATH + 'result_btn_tryagain.png',
		left:'30dp',
		right:'30dp',
		height:'75dp'
	});
	if (Ti.Platform.osname === 'iphone') {btnRetry.top = '226dp';}
	else{
		btnRetry.backgroundSelectedImage = IMG_PATH + 'result_btn_tryagain_selected.png';
		btnRetry.top = '235dp';
	}
	infoView.add(btnRetry);
	
	resultScrollView.add(infoView);
	
	//the list of questions and answers made by user
	var listView = Ti.UI.createView({
		left:'5dp',
		right:'5dp',
		height:Ti.UI.SIZE,
		layout:'vertical',
		backgroundColor: 'white',
		borderColor:'blue',
		borderWidth:2
	});
	var Reviewer = require('controllers/reviewer');
	var reviewr = new Reviewer(listView,questionnaireObj,userAnswers);
	resultScrollView.add(listView);
	
	self.add(resultScrollView);
	
	return self;
}

module.exports = ResultWindow;