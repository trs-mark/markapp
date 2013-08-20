/**
 * ResultWindow for iPhone
 */
function ResultWindow(GLOBAL,navi,quizWindow,chapterTitle,userAnswers,correctCount,start,end,questionnaireObj,mistakesObjArr,willSave,loading) {
	var btnBack = Ti.UI.createButton({
		title:'戻る'
	});
	btnBack.addEventListener('click',function(e){
		if(GLOBAL.IS_ANDROID){
			navi.close(quizWindow,{animated:'true'});
			navi.close(self,{animated:'true'});
		}else{
			quizWindow.close();
			self.close();
		}
	});
	
	var self = Ti.UI.createWindow({
		exitOnClose:false
		//title:'結果表示'
		//backgroundImage:GLOBAL.IMG_PATH + 'bg.png'
		//leftNavButton: btnBack
	});
	if(GLOBAL.IS_ANDROID){
		self.title = '結果表示';
		self.backgroundImage = GLOBAL.IMG_PATH + 'bg.png';
	}
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	
		var selfView = Ti.UI.createView({
			backgroundImage:GLOBAL.IMG_PATH + 'bg.png',
			top:'44dp',
			width:Ti.UI.FILL,
			height:Ti.UI.FILL
		});
		
		//custom nav bar - solution for crash on iPod touch due to manipulation of iphone nav bar buttons and routing
		var customNavBar = Ti.UI.createView({
			top:0,
			width: Ti.UI.FILL,
			height: '44dp',
			zIndex:500,
		});
		var lblTitle = Ti.UI.createLabel({
			text: '結果表示',
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		
		if(GLOBAL.IS_ANDROID){
			customNavBar.backgroundColor='#546C90';
		}else{
			customNavBar.backgroundGradient={
				type: 'linear',
				startPoint: { x: '0%', y: '0%' },
				endPoint: { x: '0%', y: '100%' },
				colors: [ { color: '#546C90', offset: 1.0 }, { color: '#AFBED4', offset: 0.25 } ],
			};
			btnBack.left = '10dp';
			btnBack.width = '40dp';
			btnBack.height = '30dp';
			btnBack.color = '#37527D';
			btnBack.style = Ti.UI.iPhone.SystemButtonStyle.BORDERED;
			customNavBar.add(btnBack);
		}
		
		customNavBar.add(lblTitle);
		self.add(customNavBar);
		self.add(selfView);
	
	
	var resultScrollView = Titanium.UI.createScrollView({
		contentHeight:Ti.UI.SIZE,
		contentWidth:Ti.UI.SIZE,
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
	var nowDateTime = new Date();
	var lblDate = Titanium.UI.createLabel({
		color:'#666666',
		text: nowDateTime.getFullYear() + '年' + (nowDateTime.getMonth()+1) + '月' + nowDateTime.getDate() + '日　'
		 + nowDateTime.getHours() + '時' + nowDateTime.getMinutes() + '分',
		top: '50dp',
		left: '70dp',
		font:{fontSize:'18dp'}
	});
	infoView.add(lblDate);
	
	//save to database user experience
	if(willSave){
		var QuizHistory = require('models/QuizHistory');
		var quizHistory = new QuizHistory();
		var nowDateTimeStr = nowDateTime.getFullYear() + '-' + (nowDateTime.getMonth()+1) + '-' + nowDateTime.getDate() + '-' + nowDateTime.getHours() + '-' + nowDateTime.getMinutes() + '-' + nowDateTime.getSeconds();
		quizHistory.addQuizHistory(GLOBAL,chapterTitle,start,questionnaireObj,mistakesObjArr,end,userAnswers,correctCount,nowDateTimeStr);
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
			var retryQuizWindow = new QuizWindow(GLOBAL,navi,chapterTitle,start,end,willSave,loading,mistakesObjArr);
			if(GLOBAL.IS_ANDROID){
				navi.isQuiz = true;
				navi.retryOpen(retryQuizWindow,{animated:true});
			}else{
				
				//navi.open(retryQuizWindow,{animated:true});
				//navi.close(quizWindow,{animated:true});
				//navi.close(self,{animated:true});
				retryQuizWindow.open();
				quizWindow.close();
				self.close();
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
		borderColor:'#3868AC',
		borderWidth:2
	});
	var Reviewer = require('controllers/Reviewer');
	var reviewer = new Reviewer();
	reviewer.setAsResult(GLOBAL,listView,questionnaireObj,userAnswers);
	
	resultScrollView.add(listView);
	
		selfView.add(resultScrollView);
	
	
	return self;
}

module.exports = ResultWindow;