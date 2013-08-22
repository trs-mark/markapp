/**
 * QuizWindow for iPhone
 */
function QuizWindow(GLOBAL,navi,windowTitle,start,end,willSave,loading,questionnaireObj) {
	var btnclik=1;
	var btnBack = Ti.UI.createButton({
		//title:'戻る',
		customClickFlag:false,
		backgroundImage: GLOBAL.IMG_PATH + 'back.png'
	});
	btnBack.addEventListener('click',function(e){
		if(!e.source.customClickFlag){
			var confirm = Titanium.UI.createAlertDialog({ 
				message: '学習を終了しますか？',
				buttonNames: ['OK','キャンセル'],
				cancel: 1 
			});
			confirm.addEventListener('click',function(event){
				if(event.index == 0){ 
					if(GLOBAL.IS_ANDROID){
						navi.close(self,{animated:true});
					}else{
						self.close();
					}
				}else{
					//custom flag for trapping only once action
					e.source.customClickFlag = false;
				}
			});
			confirm.show();
			//custom flag for trapping only once action
			e.source.customClickFlag = true;
		}
	});
	
	var self = Ti.UI.createWindow({
		exitOnClose:false
		//title:windowTitle
		//backgroundImage:(GLOBAL.DEVICE_HEIGHT>=568)?GLOBAL.IMG_PATH + 'chapter_quiz_bg_2_i5.png':GLOBAL.IMG_PATH + 'chapter_quiz_bg_2.png'
		//leftNavButton: btnBack
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
		var selfView = Ti.UI.createView({
			backgroundImage:(GLOBAL.DEVICE_HEIGHT>=568)?GLOBAL.IMG_PATH + 'chapter_quiz_bg_2_i5.png':GLOBAL.IMG_PATH + 'chapter_quiz_bg_2.png',
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
			text: windowTitle,
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		if(GLOBAL.IS_ANDROID){
			customNavBar.backgroundColor= '#546C90';
		}else{
			customNavBar.backgroundGradient= {
				type: 'linear',
				startPoint: { x: '0%', y: '0%' },
				endPoint: { x: '0%', y: '100%' },
				colors: [ { color: '#546C90', offset: 1.0 }, { color: '#AFBED4', offset: 0.25 } ],
			};
			btnBack.left = '10dp';
			btnBack.width = '48dp';
			btnBack.height = '30dp';
			btnBack.color = '#37527D';
			//btnBack.style = Ti.UI.iPhone.SystemButtonStyle.BORDERED;
			customNavBar.add(btnBack);
		}
		customNavBar.add(lblTitle);
		self.add(customNavBar);
		self.add(selfView);
	
	
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
	var questionnaireObjArr = [];
	if(questionnaireObj){
		questionnaireObjArr = questionnaireObj;
	}else{
		var QuestionSet = require('models/QuestionSet');
		questionnaireObjArr = new QuestionSet(GLOBAL,start,end);
	}
	Ti.API.info('questionnaireObjArr:'+JSON.stringify(questionnaireObjArr));
	
	
	var setSwip = questionnaire.setSwipe(GLOBAL,navi,self,loading);
	//add buttons
	var results='';
	var buttonC = [];
	var btnLefts = [0,'20%','40%','60%','80%'];
	for (var i=0; i<btnLefts.length; i++){
		var btnChoice = Titanium.UI.createButton({
			customButtonId: i,
			left: btnLefts[i],
			height:'60dp',
			width:'20%',
			bottom:(GLOBAL.IS_ANDROID)?'2dp':'5dp',
			backgroundImage:GLOBAL.IMG_PATH + (i+1) + '_b.png'
		});
		buttonC[i+1]=btnChoice;
		btnChoice.addEventListener('click',function(e){
			//Ti.API.info(questionnaire.evaluateAnswer(GLOBAL,e.source.customButtonId));
			var x =questionnaire.clickFlag;
			if(x==0){
				results=questionnaire.evaluateAnswer(GLOBAL,e.source.customButtonId,buttonC);
				if(results){
					var correctB =buttonC[results[0].correct_id];
					var selectB =buttonC[results[0].selected_ID];
					if(results[0].selected_ID==results[0].correct_id){
						correctB.backgroundImage = GLOBAL.IMG_PATH + (results[0].correct_id) + '_bs.png';
					}else{
						correctB.backgroundImage = GLOBAL.IMG_PATH + (results[0].correct_id) + '_bs.png';
						selectB.backgroundImage = GLOBAL.IMG_PATH + (results[0].selected_ID) + '_bx.png';
					}
					x=1;
					setSwip.swipe.setVisible(true);
					setSwip.comment.setVisible(true);
				}
			}
		});
		
			selfView.add(btnChoice);
		
	}
	var quizView = questionnaire.getQuizView(GLOBAL,navi,windowTitle,start,end,self,questionnaireObjArr,willSave,buttonC,loading);
	
		selfView.add(quizView);
		selfView.add(setSwip.swipe);
		selfView.add(setSwip.comment);
	
	setSwip.swipe.setVisible(false);
	setSwip.comment.setVisible(false);
	return self;
}

module.exports = QuizWindow;