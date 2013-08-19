/**
 * ResultWindow for iPhone
 */
function ResultWindow(GLOBAL,navi,quizWindow,chapterTitle,userAnswers,correctCount,start,end,questionnaireObj,willSave,loading) {
	var btnBack = Ti.UI.createButton({
		title:'戻る'
	});
	btnBack.addEventListener('click',function(e){
		navi.close(quizWindow,{animated:'true'});
		navi.close(self,{animated:'true'});
	});
	
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:'結果表示',
		backgroundImage:GLOBAL.IMG_PATH + 'bg.png',
		leftNavButton: btnBack
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
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
		image:GLOBAL.IMG_PATH + 'result.png',
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
	
	//save to database user experience
	if(willSave){
		var QuizHistory = require('models/QuizHistory');
		var quizHistory = new QuizHistory();
		quizHistory.addQuizHistory(GLOBAL,chapterTitle,start,questionnaireObj,end,userAnswers,correctCount,mydate);
	}
	
	var lblChapterTitle = Titanium.UI.createLabel({
		color:'#3F0000',
		text: chapterTitle,
		font:{fontSize:'20dp'},
		top: '113dp',
		left: (GLOBAL.IS_ANDROID)?'12%':'20dp',
	});
	infoView.add(lblChapterTitle);
	
	// display quiz end number
	var lblNumberOfItems = Titanium.UI.createLabel({
		color:'#3F0000',
		text: userAnswers.length,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(GLOBAL.IS_ANDROID)?'30%': '90dp'
	});
	infoView.add(lblNumberOfItems);
	
	// display quiz correct answers
	var lblCorrectCount = Titanium.UI.createLabel({
		color:'#457CBA',
		text: correctCount,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(GLOBAL.IS_ANDROID)?'60%': '195dp',
		height: 'auto'
	});
	infoView.add(lblCorrectCount);
	
	//  create try again button
	var btnRetry = Titanium.UI.createButton({
		backgroundImage:GLOBAL.IMG_PATH + 'result_btn_tryagain.png',
		left:'30dp',
		right:'30dp',
		height:'75dp'
	});
	if (!GLOBAL.IS_ANDROID) {btnRetry.top = '226dp';}
	else{
		btnRetry.backgroundSelectedImage = GLOBAL.IMG_PATH + 'result_btn_tryagain_selected.png';
		btnRetry.top = '235dp';
	}
	//add retry button if not perfect
	if(correctCount != userAnswers.length){
		btnRetry.addEventListener('click',function(e){
			loading.showLoading(self,'Loading...',1.0);
			var QuizWindow = require('ui/QuizWindow');
			var willSave = false;
			var retryQuizWindow = new QuizWindow(GLOBAL,navi,chapterTitle,start,end,willSave,loading);
			if(GLOBAL.IS_ANDROID){
				navi.isQuiz = true;
				navi.retryOpen(retryQuizWindow,{animated:true});
			}else{
				navi.close(quizWindow,{animated:true});
				navi.close(self,{animated:true});
				navi.open(retryQuizWindow,{animated:true});
			}
		});
		infoView.add(btnRetry);
	}
	
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
	var Reviewer = require('controllers/Reviewer');
	var reviewr = new Reviewer(GLOBAL,listView,questionnaireObj,userAnswers);
	resultScrollView.add(listView);
	
	self.add(resultScrollView);
	
	return self;
}

module.exports = ResultWindow;