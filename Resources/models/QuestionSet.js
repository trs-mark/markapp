/**
 * QuestionSet generator from tables CONTENTS & CONTENTS_META
 */

function QuestionSet(start,end) {
	var questionSetObjArr = [];
	
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	var sql = 'select c.id, c.name, m.meta_id, m.content_id, m.meta_key, m.meta_value, m.quiz_choice from contents as c, contents_meta as m where c.id=m.content_id and c.id between ? and ? order by c.id';
	var rs = db.execute(sql,start,end);
	
	var questionObjArr = [];
	var choicesObjArr = [];
	var tempId = 0;
	while(rs.isValidRow()){
		if(tempId != rs.fieldByName('id')){
			questionObjArr.push({id:rs.fieldByName('id'),text:rs.fieldByName('name')});
		}
		tempId = rs.fieldByName('id');
		choicesObjArr.push({
			parentId:	rs.fieldByName('id'),
			id:			rs.fieldByName('meta_id'),
			text:		rs.fieldByName('meta_value'),
			stateStr:	rs.fieldByName('meta_key'), //correct or incorrect
			stateInt:	rs.fieldByName('quiz_choice') //2 or 1
		});
		rs.next();
	}
	var choicePerQuestion = 5;
	var questionIteration = 0;
	for (var b=0;b<choicesObjArr.length;b=b+choicePerQuestion){
		questionSetObjArr.push({
			question: questionObjArr[questionIteration],
			choices: [choicesObjArr[b],choicesObjArr[b+1],
				choicesObjArr[b+2],choicesObjArr[b+3],choicesObjArr[b+4]
			]
		});
		questionIteration++;
	}
	alert(b);
	
	rs.close();
	
	db.close();
	Ti.API.info(JSON.stringify(questionSetObjArr));
	return questionSetObjArr;
}

module.exports = QuestionSet;