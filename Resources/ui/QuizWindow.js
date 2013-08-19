/**
 * QuizWindow for iPhone
 */
function QuizWindow(GLOBAL,navi,windowTitle,start,end,willSave,loading) {
	var btnBack = Ti.UI.createButton({
		title:'戻る'
	});
	btnBack.addEventListener('click',function(e){
		var confirm = Titanium.UI.createAlertDialog({ 
			message: '学習を終了しますか？',
			buttonNames: ['OK','キャンセル'],
			cancel: 1 
		});
		confirm.addEventListener('click',function(event){
			if(event.index == 0){ 
				navi.close(self,{animated:true}); 
			}
		});
		confirm.show();
	});
	
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:windowTitle,
		backgroundImage:(GLOBAL.DEVICE_HEIGHT>=568)?GLOBAL.IMG_PATH + 'chapter_quiz_bg_2_i5.png':GLOBAL.IMG_PATH + 'chapter_quiz_bg_2.png',
		leftNavButton: btnBack
	});
	if(GLOBAL.IS_ANDROID){
		self.addEventListener('android:back',function(e){
			self.close();
		});
	}
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var Questionnaire = require('controllers/Questionnaire');
	var questionnaire = new Questionnaire();
	/*
	var questionnaireObj = {
		{
			question:'What is 1st question adsfa adsfjk ad;f akf ;akjf kajf;l j;adj fakjsf kaj; jkadsjfa;jds fjak jfakjfladjsfkja?',
			choices:['choice1','choice2asdfasdfsadfadsfadsfadsfasdfadsfafda','choice3']
		},
		{
			question:'What is 2st question?',
			choices:['choiceAadfssdfasdfasdfasdfasdfsdfasdfasdfadsfadsfasdfasdf','choiceB','choiceC']
		},
		{
			question:'What is 3rd question adsjfa;lkj akdjsfaklj; akdfjalkjf lakj lajd slkafj ljafl jalkfjakf lsajfl jalfajldjfladjfl?',
			choices:['uno','dos','tresasdfdsfsdafadfasdfasdfasdfasdfsdfasdfkjasdkfj;aksdjf;akjds;lkfja;lskdjf;lkajsd;lfjadsl;jfladjsf;sdjkf']
		}
	};
	*/
	var QuestionSet = require('models/QuestionSet');
	var questionnaireObjArr = new QuestionSet(GLOBAL,start,end);
	
	var quizView = questionnaire.getQuizView(GLOBAL,navi,windowTitle,start,end,self,questionnaireObjArr,willSave,loading);
	
	//add buttons
	var btnLefts = [0,'20%','40%','60%','80%'];
	for (var i=0; i<btnLefts.length; i++){
		var btnChoice = Titanium.UI.createButton({
			customButtonId: i,
			//id: QuizObj.questions[0].id,
			left: btnLefts[i],
			height:'60dp',
			width:'20%',
			bottom:(GLOBAL.IS_ANDROID)?'2dp':'5dp',
			backgroundImage:GLOBAL.IMG_PATH + (i+1) + '_b.png'
		});
		btnChoice.addEventListener('click',function(e){
			Ti.API.info(questionnaire.evaluateAnswer(GLOBAL,e.source.customButtonId));
		});
		self.add(btnChoice);
	}
	
	self.add(quizView);
	
	return self;
}

module.exports = QuizWindow;