/**
 * QuizHistory saves user experience into QUIZ_HISTORY
 */

function QuizHistory() {
}
/*
 * @param {String} chapterTitle the quiz chapter
 * @param {int} start the starting point of the quiz
 * @param {int} end the end point of the quiz
 * @param {Array} userAnswers array of answers made by user
 * @param {int} correctCount the counter for the correct answers made by user
 * @param {Date} dateTime the date time object when user finished the quiz
 */

QuizHistory.prototype.addQuizHistory = function(GLOBAL,chapterTitle,start,end,userAnswers,correctCount,dateTime){
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', GLOBAL.DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	var dataObj = {
		'start':start,
		'end':end,
		answers:userAnswers
	};
	try{
		var sql = 'insert into quiz_history (chaptertitle,quiz_data,question_count,correct_count,datatime) values (?,?,?,?,?)';
		db.execute(sql,chapterTitle,JSON.stringify(dataObj),userAnswers.length,correctCount,dateTime);
	}catch(e){
		Ti.API.info(e.toString());
		alert('Oops! something went wrong. quiz not saved!');
	}
	
	db.close();
};

QuizHistory.prototype.getQuizHistory = function(GLOBAL){
	var quizHistory = [];
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', GLOBAL.DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	try{
		var sql = 'select * from quiz_history order by id desc';
		var rs = db.execute(sql);
		
		while(rs.isValidRow()){
			quizHistory.push({
				chapterTitle:		rs.fieldByName('chaptertitle'),
				dataObj:			JSON.parse(rs.fieldByName('quiz_data')),
				questionCount:		rs.fieldByName('question_count'),
				correctCount:		rs.fieldByName('correct_count'),
				dateTime:			rs.fieldByName('datatime')
			});
			rs.next();
		}
		rs.close();
	}catch(e){
		alert(e.toString());
	}
	
	db.close();
	
	return quizHistory;
};

module.exports = QuizHistory;