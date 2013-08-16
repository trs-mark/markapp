/*
 * Reviewer accepts a question set object and a scrollview pointer in which it attaches the question set
 * @param {Ti.UI.View} listView the view to attach the list
 * @param {JSON} questionnaireObj the JSON reference for the list to generate
 */
function Reviewer(listView, questionnaireObj, userAnswers){
	for (var x=0; x<questionnaireObj.length; x++){
		var newRow = Ti.UI.createView({
			top:'10dp',
			left:'5dp',
			//backgroundColor: 'blue',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		var lblNumber = Ti.UI.createLabel({
			text: (questionnaireObj[x].question.id) + '. ',
			font: {fontSize:'20dp'},
			top: 0,
			left: 0,
			color:'black'
		});
		var lblText = Ti.UI.createLabel({
			text: questionnaireObj[x].question.text,
			font: {fontSize:'20dp'},
			left: '3dp',
			color:'black'
		});
		
		newRow.add(lblNumber);
		newRow.add(lblText);
		listView.add(newRow);
		for (var a = 0; a<questionnaireObj[x].choices.length; a++){
			var newRow = Ti.UI.createView({
				top:'5dp',
				left:'5dp',
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
				text: convert(questionnaireObj[x].choices[a].text),
				font: {fontSize:'15dp'},
				left:'5dp',
				right:'5dp',
				color:'black'
			});
			
			//if user selected this choice
			if(userAnswers[x] == a){
				lblNumber.backgroundImage = (questionnaireObj[x].choices[a].stateStr === 'CORRECT')?IMG_PATH + 'small_s.png':IMG_PATH + 'small_x.png';
			}
			//regardless of correct answer by user, show correct answer
			if(questionnaireObj[x].choices[a].stateStr === 'CORRECT'){
				lblNumber.backgroundImage = IMG_PATH + 'small_s.png';
			}
			newRow.add(lblNumber);
			newRow.add(lblText);
			listView.add(newRow);
		}
	}
}
module.exports = Reviewer;
