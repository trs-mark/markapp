
function QuizSelectOneList () {
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}

	this.now_step = 0;

	this.correct_count = 0;

	this.datetime = '';

	this.quiz_list = new Array();

	var self = this;

		var numStarQ=Titanium.App.Properties.getInt('setQuestion');
		//Titanium.App.Properties.setString('ChapterTitle',null);
		var numEndQ = Titanium.App.Properties.getInt('setQEnd');
		var totolSE = numEndQ - (numStarQ-1);
		if(totolSE==21){
			this.end_step=21;
		}else{
			this.end_step = 20;
		}
	this.getNextQuiz = function() {
		self.now_step ++;
		return self.quiz_list[self.now_step - 1];
	};

	this.getCorrect = function (selected_id) {
		var nowObj = self.quiz_list[self.now_step - 1];
		nowObj.selected_id = selected_id;
		nowObj.correct = (nowObj.answer_id == selected_id);
		if (nowObj.correct) {
			self.correct_count ++;
		}
		return nowObj.correct;
	};

	this.getCorrectCount = function (){
		return self.correct_count;
	};
	
	this.restorQuizSelectOneList = function(jsonString) {
		var quiz_obj = JSON.parse(jsonString);
		self.quiz_list = quiz_obj.quiz_list;
	};
	
	this.quizSelectOneList4retry = function() {
		var incorrect_list = new Array();
		for(var i=0; i < self.quiz_list.length; i++) {
			if (self.quiz_list[i].correct) { continue; }
			self.quiz_list[i].questions = shuffle(self.quiz_list[i].questions);
			incorrect_list.push(self.quiz_list[i]);
		}
		self.quiz_list = shuffle(incorrect_list);
		self.end_step = incorrect_list.length;
		self.correct_count = 0;
		self.now_step = 0;
		self.retryFlg = true;
	};
	
	this._init = function(){

		var db;
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return false;
		}

		var QuestionData = new Array();
		var rows = db.execute(
		/*	'select * from CONTENTS c' +
			' inner join CATEGORY_RELATIONSHIPS cr on cr.CONTENT_ID = c.ID' +
			' where cr.CATEGORY_ID = 101' + 
			' ORDER BY RANDOM()'+
			'LIMIT 10'*/
			'select * from CONTENTS where ID BETWEEN "'+ numStarQ +'" and "'+ numEndQ +'"'
		);
		while (rows.isValidRow()) {
			QuestionData.push({
				content_id:rows.fieldByName('ID'),
				question:rows.fieldByName('NAME'),
				icon_path:rows.fieldByName('ICON_PATH')
			});
			rows.next();
		}
		rows.close();
		rows = null;
		var placeholder = new Array();
		var AnsewerData = new Array();
		
		// where contents id
		var tmp = new Array();
		for(var i=0; i < QuestionData.length; i++) {
			if(QUIZ_CHOICE == 1){
			placeholder.push(QuestionData[i].content_id);
			tmp.push('?');
			}
		}
		// where += ' CONTENT_ID in (' + tmp.join(',') + ')';
		
		if(QUIZ_CHOICE == 1){
			var where = ' where QUIZ_CHOICE = ?';
			var rows = db.execute(
				'select * from CONTENTS_META' + where, QUIZ_CHOICE// placeholder
			);
		}
		else if(QUIZ_CHOICE == 2){
			var where = ' where QUIZ_CHOICE = 2 OR QUIZ_CHOICE = ?';
			var rows = db.execute(
				'select * from CONTENTS_META'// placeholder
			);
		}
		else{
			alert('Quiz Choice Not Found!');
		}
		
		while (rows.isValidRow()) {
			AnsewerData.push({
				meta_id:rows.fieldByName('META_ID'),
				content_id:rows.fieldByName('CONTENT_ID'),
				right_or_wrong:rows.fieldByName('META_KEY'),
				answer:rows.fieldByName('META_VALUE'),
				quiz_choice: rows.fieldByName('QUIZ_CHOICE'),
				icon_path: rows.fieldByName('ICON_PATH')
			});
			rows.next();
		}
		rows.close();
		rows = null;
		db.close();
		db = null;
		// make quiz list data
		var QuizSelectOne = require('common/QuizSelectOne');
		for(var i=0; i < QuestionData.length; i++) {
			var oneQuiz = new QuizSelectOne(QuestionData[i], AnsewerData);
			self.quiz_list.push(oneQuiz);	
		}

		return self;
	};
	
	return this._init();
}
module.exports = QuizSelectOneList;