var QuizHistory = function(){
	
	var self = this;
	
	this.getHistoryList = function(){
		var db;
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return;
		}
		var rows = db.execute(
			' select * from QUIZ_HISTORY'+
			' ORDER BY ID DESC'
		);
		var historyList = new Array();
		while (rows.isValidRow()) {
			var data = {
				ChapTitle:rows.fieldByName('CHAPTERTITLE'),
				history_id:rows.fieldByName('ID'),
				quiz_data:rows.fieldByName('QUIZ_DATA'),
				question_count:rows.fieldByName('QUESTION_COUNT'),
				correct_count:rows.fieldByName('CORRECT_COUNT'),
				datetime:rows.fieldByName('DATATIME')
			};
			historyList.push(data);
			rows.next();
		}
		rows.close();
		return historyList;
	}

	this.saveQuizHistory = function(QuizSelectOne,chapT){
		
		var db;
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return;
		}
		db.execute('begin transaction');
		db.execute(
			'INSERT INTO QUIZ_HISTORY (QUIZ_DATA, QUESTION_COUNT, CORRECT_COUNT, DATATIME,CHAPTERTITLE) VALUES(?,?,?,?,?)',
			JSON.stringify(QuizSelectOne),
			QuizSelectOne.end_step,
			QuizSelectOne.correct_count,
			QuizSelectOne.datetime,
			chapT
		);
		db.execute('commit');
		db.close();
		db = null;
		return;
	}

	this._init = function(){
		if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
		
		return self;
	}	
	return this._init();
}

module.exports = QuizHistory;