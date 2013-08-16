/**
 * ScrollView questionnaire
 */

function Questionnaire() {}

Questionnaire.prototype.theQuestionNumber = null;
Questionnaire.prototype.theQuestion = null;
Questionnaire.prototype.theChoices = [];
/*
 * returns the contents of the questionnaire
 * @return {Ti.UI.ScrollView} quizView the questionnaire
 */
Questionnaire.prototype.getQuizView = function(self,questionnaireObj){
	Questionnaire.prototype.quizView = Ti.UI.createScrollView({
		top: '12dp',
		left:'10dp',
		right:'10dp',
		bottom:'95dp',
		layout:'vertical',
		zIndex: 2
	});
	Questionnaire.prototype.quizView.addEventListener('swipe',function(e){
		var direction = (e.direction=='left')?'left':'right';
		//alert('you swung ' + direction);
		if (direction == 'left'){
			if(Questionnaire.prototype.quizTracker >= 3){
				alert('nothing');
			}else{
				Questionnaire.prototype.nextQuestionnaireItem();
			}
		}
	});
	
	Questionnaire.prototype.quizTracker = 0;
	Questionnaire.prototype.questionnaireObj = questionnaireObj;
	Questionnaire.prototype.setQuestionnaire();
	
	return Questionnaire.prototype.quizView;
}

/*
 * Sets the contents of the questionnaire
 * @param {Ti.UI.ScrollView} quizView the questionnaire to modify the contents
 */
Questionnaire.prototype.setQuestionnaire = function(){
	var newRow = Ti.UI.createView({
		left:'10dp',
		//backgroundColor: 'blue',
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout:'horizontal'
	});
	var lblNumber = Ti.UI.createLabel({
		text: (Questionnaire.prototype.quizTracker + 1) + '. ',
		font: {fontSize:'20dp'},
		top: 0,
		left: 0,
		color:'black'
	});
	var lblText = Ti.UI.createLabel({
		text: Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].question,
		font: {fontSize:'20dp'},
		left: '3dp',
		color:'black'
	})
	
	Questionnaire.prototype.theQuestionNumber = lblNumber;
	Questionnaire.prototype.theQuestion = lblText;
	
	newRow.add(lblNumber);
	newRow.add(lblText);
	Questionnaire.prototype.quizView.add(newRow);
	
	for (var a = 0; a<Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices.length; a++){
		var newRow = Ti.UI.createView({
			top:'5dp',
			left:'10dp',
			//backgroundColor: 'red',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		var lblNumber = Ti.UI.createLabel({
			text: (a + 1) + '. ',
			font: {fontSize:'15dp'},
			top: 0,
			left: '10dp',
			color:'black'
		});
		var lblText = Ti.UI.createLabel({
			text: Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices[a],
			font: {fontSize:'15dp'},
			left:'5dp',
			color:'black'
		});
		
		Questionnaire.prototype.theChoices.push(lblText);
		newRow.add(lblNumber);
		newRow.add(lblText);
		Questionnaire.prototype.quizView.add(newRow);
	}
	
	Questionnaire.prototype.quizTracker++;
}

Questionnaire.prototype.nextQuestionnaireItem = function(){
	Questionnaire.prototype.theQuestionNumber.text = (Questionnaire.prototype.quizTracker + 1) + '. ';
	Questionnaire.prototype.theQuestion.text = Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].question;
	for (var x = 0; x<Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices.length; x++){
		Questionnaire.prototype.theChoices[x].text = Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices[x];
	}
	Questionnaire.prototype.quizTracker++;
}

Questionnaire.prototype.cleanQuestionnaire = function(){
	var viewname = Questionnaire.prototype.quizView;
	for (var d in viewname.children) {
		if (viewname.children.hasOwnProperty(d)) {
			viewname.remove(viewname.children[d]);
		}
	}
}

module.exports = Questionnaire;