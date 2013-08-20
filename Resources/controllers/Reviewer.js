/*
 * Reviewer accepts a question set object and a scrollview pointer in which it attaches the question set
 * @param {Ti.UI.View} listView the view to attach the list
 * @param {JSON} questionnaireObj the JSON reference for the list to generate
 */
function Reviewer(){};

Reviewer.prototype.setAsResult = function(GLOBAL,listView, questionnaireObj, userAnswers){
	for (var x=0; x<questionnaireObj.length; x++){
		var newRow = Ti.UI.createView({
			top:'10dp',
			left:'5dp',
			//backgroundColor: 'blue',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE
			//layout:'horizontal'
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
			top:0,
			left: (lblNumber.text.length==3)?'19dp':(lblNumber.text.length==4)?'28dp':'44dp',
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
				height:Ti.UI.SIZE
				//layout:'horizontal'
			});
			var lblNumber = Ti.UI.createLabel({
				text: (a + 1) + '. ',
				font: {fontSize:'15dp'},
				top: 0,
				left: '10dp',
				color:'black'
			});
			var lblText = Ti.UI.createLabel({
				font: {fontSize:'15dp'},
				top:0,
				left:'30dp',
				right:'10dp',
				color:'black'
			});
			if(GLOBAL.IS_ANDROID){
				lblText.html = GLOBAL.CONVERT(questionnaireObj[x].choices[a].text);
			}else{
				lblText.text = GLOBAL.CONVERT(questionnaireObj[x].choices[a].text);
			}
			
			//if user selected this choice
			if(userAnswers[x] == a){
				lblNumber.backgroundImage = (questionnaireObj[x].choices[a].stateStr === 'CORRECT')?GLOBAL.IMG_PATH + 'small_s.png':GLOBAL.IMG_PATH + 'small_x.png';
			}
			//regardless of correct answer by user, show correct answer
			if(questionnaireObj[x].choices[a].stateStr === 'CORRECT'){
				lblNumber.backgroundImage = GLOBAL.IMG_PATH + 'small_s.png';
			}
			newRow.add(lblNumber);
			newRow.add(lblText);
			listView.add(newRow);
		}
		
		var separatorRow = Ti.UI.createView({
			top:'10dp',
			//backgroundColor: 'pink',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE
		});
		var separatorLine = Ti.UI.createView({
			width:'100%',
			height:'1dp',
			borderWidth:1,
			borderColor:'#4C4C4C'
		});
		separatorRow.add(separatorLine);
		listView.add(separatorRow);
	}
};

Reviewer.prototype.setAsCommentary = function(GLOBAL,listView, questionnaireObj, userAnswers){
	//instantiate a new commentary model
	var Commentary = require('models/Commentary');
	var commentary = new Commentary();
	var commentsObjArr = commentary.getCommentary(GLOBAL,questionnaireObj[0]);
	
	//add commentary
	for (var c=0; c<commentsObjArr.length; c++){
		var newRow = Ti.UI.createView({
			top:'2dp',
			left:'5dp',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			//backgroundColor: 'green'
			//layout:'horizontal'
		});
		var lblNumber = Ti.UI.createLabel({
			text: '(' + (c+1) + ')',
			font: {fontSize:'10dp'},
			top: 0,
			left: 0,
			color:'black'
		});
		var lblStr = ' ';
		//add comments if exist and convert the superscripts and subscripts
		lblStr = (commentsObjArr[c].comment!=null&&commentsObjArr[c].comment.length>0)?
			lblStr + GLOBAL.CONVERT(commentsObjArr[c].comment):
			lblStr;
		//add reference numbers if exist
		lblStr = (commentsObjArr[c].ref_no == null || commentsObjArr[c].ref_no.length <= 0 || commentsObjArr[c].ref_no == "")?
			lblStr:
			lblStr + ' (P' + commentsObjArr[c].ref_no + ')';
			
		var lblText = Ti.UI.createLabel({
			font: {fontSize:'10dp'},
			top:0,
			left: '15dp',
			color:'black'
		});
		if(GLOBAL.IS_ANDROID){
			lblText.html = lblStr;
		}else{
			lblText.text = lblStr;
		}
		
		newRow.add(lblNumber);
		newRow.add(lblText);
		listView.add(newRow);
	}
	Ti.API.info(JSON.stringify(questionnaireObj[0].choices[0]));
	Ti.API.info(JSON.stringify(questionnaireObj[0].choices[1]));
	Ti.API.info(JSON.stringify(questionnaireObj[0].choices[2]));
	Ti.API.info(JSON.stringify(questionnaireObj[0].choices[3]));
	Ti.API.info(JSON.stringify(questionnaireObj[0].choices[4]));
	var separatorRow = Ti.UI.createView({
		top:'10dp',
		//backgroundColor: 'pink',
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE
	});
	var separatorLine = Ti.UI.createView({
		width:'100%',
		height:'1dp',
		borderWidth:1,
		borderColor:'#4C4C4C'
	});
	separatorRow.add(separatorLine);
	listView.add(separatorRow);
	
	
	for (var x=0; x<questionnaireObj.length; x++){
		var newRow = Ti.UI.createView({
			top:'10dp',
			left:'5dp',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			//backgroundColor:'blue'
			//layout:'horizontal'
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
			top:0,
			left: (lblNumber.text.length==3)?'19dp':(lblNumber.text.length==4)?'28dp':'44dp',
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
				height:Ti.UI.SIZE
				//layout:'horizontal'
			});
			var lblNumber = Ti.UI.createLabel({
				text: (a + 1) + '. ',
				font: {fontSize:'15dp'},
				top: 0,
				left: '10dp',
				color:'black'
			});
			var lblText = Ti.UI.createLabel({
				font: {fontSize:'15dp'},
				top:0,
				left:'25dp',
				right:'10dp',
				color:'black'
			});
			if(GLOBAL.IS_ANDROID){
				lblText.html = GLOBAL.CONVERT(questionnaireObj[x].choices[a].text);
			}else{
				lblText.text = GLOBAL.CONVERT(questionnaireObj[x].choices[a].text);
			}
			
			//if user selected this choice
			if(userAnswers[x] == a){
				lblNumber.backgroundImage = (questionnaireObj[x].choices[a].stateStr === 'CORRECT')?GLOBAL.IMG_PATH + 'small_s.png':GLOBAL.IMG_PATH + 'small_x.png';
			}
			//regardless of correct answer by user, show correct answer
			if(questionnaireObj[x].choices[a].stateStr === 'CORRECT'){
				lblNumber.backgroundImage = GLOBAL.IMG_PATH + 'small_s.png';
			}
			newRow.add(lblNumber);
			newRow.add(lblText);
			listView.add(newRow);
		}
	}
};

module.exports = Reviewer;
