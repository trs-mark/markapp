/**
 * QuizWindow for iPhone
 */
function QuizWindow(windowTitle) {
	var self = Ti.UI.createWindow({
		title:windowTitle,
		backgroundImage:(DEVICE_HEIGHT>=568)?IMG_PATH + 'chapter_quiz_bg_2_i5.png':IMG_PATH + 'chapter_quiz_bg_2.png'
	});
	
	var Questionnaire = require('controllers/Questionnaire');
	var questionnaire = new Questionnaire();
	var questionnaireObj = {
		item:[
			{
				question:'What is 1st question?',
				choices:['choice1','choice2','choice3']
			},
			{
				question:'What is 2st question?',
				choices:['choiceA','choiceB','choiceC']
			},
			{
				question:'What is 3rd question?',
				choices:['uno','dos','tres']
			}
		]
	};
	var quizView = questionnaire.getQuizView(self,questionnaireObj);
	
	//add buttons
	var btnLefts = [0,'20%','40%','60%','80%']
	for (var i=0; i<btnLefts.length; i++){
		var btnChoice = Titanium.UI.createButton({
			buttonId: i + 1,
			//id: QuizObj.questions[0].id,
			left: btnLefts[i],
			height:'60dp',
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
			backgroundImage:IMG_PATH + (i+1) + '_b.png'
		});
		self.add(btnChoice);
	}
	
	self.add(quizView);
	return self;
}

module.exports = QuizWindow;