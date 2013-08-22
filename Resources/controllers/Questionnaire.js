/**
 * ScrollView questionnaire
 */

function Questionnaire() {
	//the current question number
	Questionnaire.prototype.theQuestionNumber = null;
	//the current question
	Questionnaire.prototype.theQuestion = null;
	//array of current choices for the current question
	Questionnaire.prototype.theChoices = [];
	//quizTracker - tracks the current question count
	Questionnaire.prototype.quizTracker = 0;
	//quizBreadCrumps - tracks the current answer count
	Questionnaire.prototype.quizBreadCrumps = 0;
	//correctCount - tracks the number of correct answers
	Questionnaire.prototype.correctCount = 0;
	Questionnaire.prototype.clickFlag = 0;
	//userAnswers - stores the user's choice
	Questionnaire.prototype.userAnswers = [];
}

/*
 * returns the contents of the questionnaire
 * @return {Ti.UI.ScrollView} quizView the questionnaire
 */
Questionnaire.prototype.getQuizView = function(GLOBAL,navi,chapterTitle,start,end,quizWindow,questionnaireObj,willSave,btnobjct,loading){
	Ti.API.info(JSON.stringify(questionnaireObj));
	Questionnaire.prototype.quizView = Ti.UI.createScrollView({
		showVerticalScrollIndicator:true,
		contentHeight: Ti.UI.SIZE,
		contentWidth: Ti.UI.SIZE,
		top: '12dp',
		left:'10dp',
		right:'10dp',
		bottom:'95dp',
		layout:'vertical'
	});
	var nextPage = function(){
		Ti.API.info('crums:' +Questionnaire.prototype.quizBreadCrumps);
		Ti.API.info('quiz tracker:' + Questionnaire.prototype.quizTracker);
		if(Questionnaire.prototype.quizBreadCrumps >= Questionnaire.prototype.questionnaireObj.length){
			//go to result
			loading.showLoading(quizWindow,'Loading...',1.0);
			var ResultWindow = require('ui/ResultWindow');
			var resultWindow = new ResultWindow(GLOBAL,navi,quizWindow,chapterTitle,
				Questionnaire.prototype.userAnswers,
				Questionnaire.prototype.correctCount,
				start,end,
				Questionnaire.prototype.questionnaireObj,
				Questionnaire.prototype.mistakesObjArr,
				willSave,loading);
			if(GLOBAL.IS_ANDROID){
				navi.isResult = true;
				navi.isQuiz = false;
				navi.open(resultWindow,{animated:true});
			}else{
				resultWindow.open();
			}
		}else{
			if (Questionnaire.prototype.quizBreadCrumps == Questionnaire.prototype.quizTracker){
				//next question
				loading.showLoading(quizWindow,'Loading...',0.9);
				Questionnaire.prototype.nextQuestionnaireItem(GLOBAL);
				Questionnaire.prototype.swipe.setVisible(false);
				Questionnaire.prototype.comment.setVisible(false);
				Questionnaire.prototype.clickFlag=0;
				for(var i=1;i<btnobjct.length;i++){
					btnobjct[i].backgroundImage = GLOBAL.IMG_PATH + (i) + '_b.png';
				}
				loading.hideLoading();
			}else{
				Ti.API.info('not yet');
			}
		}
	};
	
	Questionnaire.prototype.quizView.addEventListener('afterComment',function(e){
		nextPage();
	});
	
	Questionnaire.prototype.quizView.addEventListener('swipe',function(e){
		var direction = (e.direction=='left')?'left':'right';
		//alert('you swung ' + direction);
		if (direction == 'left'){
			nextPage();
		}
	});
	
	Questionnaire.prototype.questionnaireObj = questionnaireObj;
	Questionnaire.prototype.mistakesObjArr = [];
	Questionnaire.prototype.setQuestionnaire(GLOBAL);
	
	return Questionnaire.prototype.quizView;
};
Questionnaire.prototype.setSwipe = function(GLOBAL,navi,quizWindow,loading){
	Questionnaire.prototype.swipe = Titanium.UI.createImageView({
		image:GLOBAL.IMG_PATH +'swipe.png',
		top:'142dp',
		left:'205dp',
		width: '93dp',
		height:'47dp',
		zIndex: 3,
		touchEnabled:false
	});
	// create quiz commentary button
	Questionnaire.prototype.comment = Titanium.UI.createButton({
		backgroundImage:GLOBAL.IMG_PATH +'commentary_new.png',
		bottom:'95dp',
		left:'184dp',
		width:'108dp',
		height:'66.5dp',
		zIndex: 3
	});
	if(GLOBAL.IS_ANDROID){
		Questionnaire.prototype.comment.backgroundSelectedImage = GLOBAL.IMG_PATH +'commentary_new_selected.png';
	}
	
	Questionnaire.prototype.comment.addEventListener('click',function(e){
		//alert(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1].question.text);
		loading.showLoading(quizWindow,'Loading...',0.5);
		var CommentaryWindow = require('ui/CommentaryWindow');
		var commentaryWindow = new CommentaryWindow(GLOBAL,navi,
			Questionnaire.prototype.quizView,
			Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1],
			Questionnaire.prototype.userAnswers[Questionnaire.prototype.userAnswers.length-1],
			loading);
		if(GLOBAL.IS_ANDROID){
			navi.isComment = true;
			navi.open(commentaryWindow,{animated:true});
		}else{
			commentaryWindow.open();
		}
	});
	
	return {'swipe':Questionnaire.prototype.swipe,'comment':Questionnaire.prototype.comment};
};
/*
 * evaluates the answer if it is correct or wrong
 * @param {int} choice the choice button clicked by the user
 * @return {boolean} result whether answer is correct or wrong
 */
Questionnaire.prototype.evaluateAnswer = function(GLOBAL,choice,btnObj){
	var result = '';
	var resultQ = new Array();
	if (Questionnaire.prototype.quizBreadCrumps < Questionnaire.prototype.quizTracker){
		var selectedChoice = Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1].choices[choice];
		var getCorrectAnsw = Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1];
		var stateStr = selectedChoice.stateStr;
		var id = selectedChoice.id;
		var parentId = selectedChoice.parentId;
		var text = selectedChoice.text;
		var stateInt = selectedChoice.stateInt;
		
		Questionnaire.prototype.userAnswers.push(choice);
		if (stateStr === 'CORRECT'){
			Questionnaire.prototype.correctCount++;
		}else{
			Questionnaire.prototype.mistakesObjArr.push({
				question: Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1].question,
				choices: Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker-1].choices
			});
		}
		result = 'you selected ' + choice +
				'\nid:' + id +
				'\ntext:' + text +
				'\nstateInt:' + stateInt +
				'\nstateStr:' + stateStr +
				'\nparentID:' + parentId;
		for(var i=0;i<getCorrectAnsw.choices.length;i++){
			var x=i;
			if(getCorrectAnsw.choices[i].stateStr=='CORRECT'){
				var cID=x+1;
			}
		}	
		resultQ.push({
				selected_ID:choice+1,
				correct_id:cID,
				choices:text,
				});		
		Questionnaire.prototype.quizBreadCrumps++;
	}else{
		result = 'no more';
	}
	return resultQ;
};

/*
 * Sets the contents of the questionnaire
 * @param {Ti.UI.ScrollView} quizView the questionnaire to modify the contents
 */
Questionnaire.prototype.setQuestionnaire = function(GLOBAL){
	var newRow = Ti.UI.createView({
		top:'20dp',
		left:'10dp',
		right:'10dp',
		height:Ti.UI.SIZE
	});
	var lblNumber = Ti.UI.createLabel({
		text: (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.id) + '. ',
		font: {fontSize:'16dp'},
		top: 0,
		left: 0,
		color:'black'
	});
	var lblText = Ti.UI.createLabel({
		text: Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.text,
		font: {fontSize:'16dp'},
		top:0,
		left: (lblNumber.text.length==3)?'19dp':(lblNumber.text.length==4)?'28dp':'44dp',
		right:'10dp',
		color:'black'
	});
	
	Questionnaire.prototype.theQuestionNumber = lblNumber;
	Questionnaire.prototype.theQuestion = lblText;
	
	newRow.add(lblNumber);
	newRow.add(lblText);
	Questionnaire.prototype.quizView.add(newRow);
	for (var a = 0; a<Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices.length; a++){
		var newRow = Ti.UI.createView({
			top:'5dp',
			left:'10dp',
			right:'10dp',
			height:Ti.UI.SIZE
		});
		var lblNumber = Ti.UI.createLabel({
			text: '(' + (a + 1) + ') ',
			font: {fontSize:'13dp'},
			top: 0,
			left: 0,
			color:'#3F0000'
		});
		var lblText = Ti.UI.createLabel({
			font: {fontSize:'13dp'},
			top: 0,
			left:'30dp',
			right: '5dp',
			color:(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[a].stateStr==='CORRECT')?'pink':'#3F0000'
		});
		if(GLOBAL.IS_ANDROID){
			lblText.html = GLOBAL.CONVERT(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[a].text);
		}else{
			lblText.text = GLOBAL.CONVERT(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[a].text);
		}
		
		Questionnaire.prototype.theChoices.push(lblText);
		newRow.add(lblNumber);
		newRow.add(lblText);
		Questionnaire.prototype.quizView.add(newRow);
	}
	
	Questionnaire.prototype.quizTracker++;
};

Questionnaire.prototype.nextQuestionnaireItem = function(GLOBAL){
	Questionnaire.prototype.theQuestionNumber.text = (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.id) + '. ';
	Questionnaire.prototype.theQuestion.text = Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.text;
	Questionnaire.prototype.theQuestion.left = (Questionnaire.prototype.theQuestionNumber.text.length==3)?'19dp':
		(Questionnaire.prototype.theQuestionNumber.text.length==4)?'28dp':'44dp';
	for (var x = 0; x<Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices.length; x++){
		var lblStr = GLOBAL.CONVERT(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[x].text);
		if (GLOBAL.IS_ANDROID){
			Questionnaire.prototype.theChoices[x].html = lblStr;
		}else{
			Questionnaire.prototype.theChoices[x].text = lblStr;
		}
		Questionnaire.prototype.theChoices[x].color = (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[x].stateStr==='CORRECT')?'pink':'#3F0000';
	}
	Questionnaire.prototype.quizTracker++;
};

Questionnaire.prototype.cleanQuestionnaire = function(){
	var viewname = Questionnaire.prototype.quizView;
	for (var d in viewname.children) {
		if (viewname.children.hasOwnProperty(d)) {
			viewname.remove(viewname.children[d]);
		}
	}
};

module.exports = Questionnaire;