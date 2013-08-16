/**
 * QuizWindow for iPhone
 */
function QuizWindow(iphoneNav,windowTitle,start,end) {
	var btnBack = Ti.UI.createButton({
		title:'back'
	});
	btnBack.addEventListener('click',function(e){
		var confirm = Titanium.UI.createAlertDialog({ 
			message: '学習を終了しますか？',
			buttonNames: ['OK','キャンセル'],
			cancel: 1 
		});
		confirm.addEventListener('click',function(event){
			if(event.index == 0){ 
				iphoneNav.close(self,{animated:true}); 
			}
		});
		confirm.show();	
	});
	
	var self = Ti.UI.createWindow({
		title:windowTitle,
		backgroundImage:(DEVICE_HEIGHT>=568)?IMG_PATH + 'chapter_quiz_bg_2_i5.png':IMG_PATH + 'chapter_quiz_bg_2.png',
		leftNavButton: btnBack
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
	var questionnaireObjArr = new QuestionSet(start,end);
	
	var quizView = questionnaire.getQuizView(iphoneNav,windowTitle,start,end,self,questionnaireObjArr);
	
	//add buttons
	var btnLefts = [0,'20%','40%','60%','80%']
	for (var i=0; i<btnLefts.length; i++){
		var btnChoice = Titanium.UI.createButton({
			customButtonId: i,
			//id: QuizObj.questions[0].id,
			left: btnLefts[i],
			height:'60dp',
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
			backgroundImage:IMG_PATH + (i+1) + '_b.png'
		});
		btnChoice.addEventListener('click',function(e){
			Ti.API.info(questionnaire.evaluateAnswer(e.source.customButtonId));
		});
		self.add(btnChoice);
	}
	
	self.add(quizView);
	return self;
}

module.exports = QuizWindow;