/**
 * ScrollView questionnaire
 */

function Questionnaire() {}

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
				Questionnaire.prototype.setQuestionnaire();
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
	Questionnaire.prototype.cleanQuestionnaire();
	var newRow = Ti.UI.createView({
		left:'10dp',
		backgroundColor: 'blue',
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE
	});
	var lblText = Ti.UI.createLabel({
		text: Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].question,
		color:'green'
	})
	newRow.add(lblText);
	Questionnaire.prototype.quizView.add(newRow);
	
	for (var a = 0; a<Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices.length; a++){
		var newRow = Ti.UI.createView({
			top:'3dp',
			left:'10dp',
			backgroundColor: 'red',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE
		});
		var lblText = Ti.UI.createLabel({
			text: Questionnaire.prototype.questionnaireObj.item[Questionnaire.prototype.quizTracker].choices[a],
			color:'green'
		})
		newRow.add(lblText);
		Questionnaire.prototype.quizView.add(newRow);
	}
	
	Questionnaire.prototype.quizTracker++;
}

Questionnaire.prototype.cleanQuestionnaire = function(){
	for (var b=0; b<Questionnaire.prototype.quizView.children.length; b++){
		var child = Questionnaire.prototype.quizView.children[b];
		Questionnaire.prototype.quizView.remove(child);
	}
}

module.exports = Questionnaire;