function QuizSelectOne(question, ansewerList) {

	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}

	var question_word = '';
	
	var icon_path = '';

	var content_id;

	var answer_id;

	var questions = new Array();

	var correct;

	var selected_id;
	
		
	this._init = function(question, ansewerList){
		var self = this;
		// set question
		self.content_id = question.content_id;
		self.question_word = question.question;
		self.icon_path = question.icon_path;
		// set answer
		for(var i=0; i < ansewerList.length; i++) {
			if (ansewerList[i].content_id != question.content_id) { continue; }
				questions.push({
					id:ansewerList[i].meta_id,
					answer:ansewerList[i].answer,
					choiceno:ansewerList[i].quiz_choice,
					tf:ansewerList[i].right_or_wrong,
					img:ansewerList[i].icon_path
				});
			
			if (ansewerList[i].right_or_wrong == 'CORRECT') {
				self.answer_id = ansewerList[i].meta_id;
			}
			
		}
		self.questions = shuffle(questions);
		return self;
	}
	
	return this._init(question, ansewerList);
}

function shuffle(list) {
  var i = list.length;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    if (i == j) continue;
    var k = list[i];
    list[i] = list[j];
    list[j] = k;
  }
  return list;
}

module.exports = QuizSelectOne;