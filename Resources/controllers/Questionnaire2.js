/**
 * ScrollView questionnaire
 */

function Questionnaire() {
	Questionnaire.prototype.theQuestionNumber = null;
	Questionnaire.prototype.theQuestion = null;
	Questionnaire.prototype.theChoices = [];
	Questionnaire.prototype.quizTracker = 0;
	Questionnaire.prototype.quizBreadCrumps = 0;
	Questionnaire.prototype.correctCount = 0;
	Questionnaire.prototype.clickFlag = 0;
	Questionnaire.prototype.userAnswers = [];
}

/*
 * returns the contents of the questionnaire
 * @return {Ti.UI.ScrollView} quizView the questionnaire
 */
Questionnaire.prototype.getQuizView = function(GLOBAL,iphoneNav,chapterTitle,start,end,quizWindow,questionnaireObj,loading,btnobjct){
	Ti.API.info(JSON.stringify(questionnaireObj));
	Questionnaire.prototype.quizView = Ti.UI.createScrollView({
		top: '12dp',
		left:'10dp',
		right:'10dp',
		bottom:'95dp',
		layout:'vertical',
		zIndex: 1
	});
	Questionnaire.prototype.quizView.addEventListener('swipe',function(e){
		var direction = (e.direction=='left')?'left':'right';
		//alert('you swung ' + direction);
		if (direction == 'left'){
			if(Questionnaire.prototype.quizBreadCrumps >= Questionnaire.prototype.questionnaireObj.length){
				//go to result
				loading.showLoading(quizWindow,'Loading...',1.0);
				var ResultWindow = require('ui/ResultWindow');
				var resultWindow = new ResultWindow(GLOBAL,iphoneNav,quizWindow,chapterTitle,Questionnaire.prototype.userAnswers,Questionnaire.prototype.correctCount,start,end,Questionnaire.prototype.questionnaireObj,loading);
				iphoneNav.open(resultWindow,{animated:'true'});
			}else{
				if (Questionnaire.prototype.quizBreadCrumps == Questionnaire.prototype.quizTracker){
					//next question
					loading.showLoading(quizWindow,'Loading...',0.9);
					Questionnaire.prototype.nextQuestionnaireItem();
					Questionnaire.prototype.swipe.setVisible(false);
					Questionnaire.prototype.comment.setVisible(false);
					Questionnaire.prototype.clickFlag=0;
					loading.hideLoading();
				}else{
					Ti.API.info('not yet');
				}
				for(var i=0;i<5;i++){
						var b = btnobjct[i+1];
						b.backgroundImage = GLOBAL.IMG_PATH + (i+1) + '_b.png';
				}
			}
		}
	});
	
	Questionnaire.prototype.questionnaireObj = questionnaireObj;
	Questionnaire.prototype.setQuestionnaire(GLOBAL);
	
	return Questionnaire.prototype.quizView;
};
Questionnaire.prototype.setSwipe = function(){
	Questionnaire.prototype.swipe = Titanium.UI.createImageView({
		image:GLOBAL.IMG_PATH +'swipe.png',
		top:'142dp',
		left:'205dp',
		width: '93dp',
		height:'47dp'
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
	
	return {'swipe':Questionnaire.prototype.swipe,'comment':Questionnaire.prototype.comment};
};
/*
 * evaluates the answer if it is correct or wrong
 * @param {int} choice the choice button clicked by the user
 * @return {boolean} result whether answer is correct or wrong
 */
Questionnaire.prototype.evaluateAnswer = function(choice,btnObj){
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
		left:'10dp',
		backgroundColor: 'blue',
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout:'horizontal',
		zIndex: 2
	});
	var lblNumber = Ti.UI.createLabel({
		//text: (Questionnaire.prototype.quizTracker + 1) + '. ',
		text: (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.id) + '. ',
		font: {fontSize:'20dp'},
		top: 0,
		left: 0,
		color:'black',
		zIndex: 2
	});
	var lblText = Ti.UI.createLabel({
		text: Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.text,
		font: {fontSize:'20dp'},
		left: '3dp',
		right:'3dp',
		color:'black',
		zIndex: 2
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
			backgroundColor: 'red',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		var lblNumber = Ti.UI.createLabel({
			text: '('+(a + 1)+')' + ' ',
			font: {fontSize:'15dp'},
			top: 0,
			left: '10dp',
			color:'black',
			zIndex: 2
		});
		var lblText = Ti.UI.createLabel({
			text: GLOBAL.CONVERT(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[a].text),
			font: {fontSize:'15dp'},
			left:'5dp',
			right:'5dp',
			color:(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[a].stateStr==='CORRECT')?'pink':'black',
			zIndex: 2
		});
		
		Questionnaire.prototype.theChoices.push(lblText);
		newRow.add(lblNumber);
		newRow.add(lblText);
		Questionnaire.prototype.quizView.add(newRow);
	}
	
	Questionnaire.prototype.quizTracker++;
};

Questionnaire.prototype.nextQuestionnaireItem = function(){
	//Questionnaire.prototype.theQuestionNumber.text = (Questionnaire.prototype.quizTracker + 1) + '. ';
	Questionnaire.prototype.theQuestionNumber.text = (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.id) + '. ';
	Questionnaire.prototype.theQuestion.text = Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].question.text;
	for (var x = 0; x<Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices.length; x++){
		Questionnaire.prototype.theChoices[x].text = GLOBAL.CONVERT(Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[x].text);
		Questionnaire.prototype.theChoices[x].color = (Questionnaire.prototype.questionnaireObj[Questionnaire.prototype.quizTracker].choices[x].stateStr==='CORRECT')?'pink':'black';
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