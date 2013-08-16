/**
 * QuizHistory saves user experience into QUIZ_HISTORY
 * @param {String} chapterTitle the quiz chapter
 * @param {int} start the starting point of the quiz
 * @param {int} end the end point of the quiz
 * @param {Array} userAnswers array of answers made by user
 * @param {int} correctCount the counter for the correct answers made by user
 * @param {Date} dateTime the date time object when user finished the quiz
 */

function QuizHistory(chapterTitle,start,end,userAnswers,correctCount,dateTime) {
	
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	var dataObj = {
		answers:userAnswers
	};
	var sql = 'insert into quiz_history (chaptertitle,quiz_data,question_count,correct_count,datatime) values (?,?,?,?,?)';
	db.execute(sql,chapterTitle,JSON.stringify(dataObj),end,correctCount,dateTime);
}

module.exports = QuizHistory;