/**
 * QuestionSet generator from tables CONTENTS & CONTENTS_META
 */

function QuestionSet(GLOBAL,start,end) {
	var questionSetObjArr = [];
	
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', GLOBAL.DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	var shuffle = function(arr){
		var currentIndex = arr.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			Ti.API.info('randomIndex:'+randomIndex);
			currentIndex -= 1;
			
			// And swap it with the current element.
			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}
		return arr;
	};
	try{
		//var sql = 'select c.id, c.name, m.meta_id, m.content_id, m.meta_key, m.meta_value, m.quiz_choice from contents as c, contents_meta as m where c.id=m.content_id and c.id between ? and ? order by c.id';
		var sql = 'select c.id, c.name, m.meta_id, m.content_id, m.meta_key, m.meta_value, m.quiz_choice from contents as c, contents_meta as m where c.id=m.content_id and c.id between ? and ?';
		var rs = db.execute(sql,start,end);
		
		var questionObjArr = [];
		var choicesObjArr = [];
		var tempId = 0;
		var index = 0;
		var indexChoice = 0;
		while(rs.isValidRow()){
			if(tempId != rs.fieldByName('id')){
				questionObjArr[index] = {id:rs.fieldByName('id'),text:rs.fieldByName('name')};
				index++;
			}
			tempId = rs.fieldByName('id');
			choicesObjArr[indexChoice] = {
				parentId:	rs.fieldByName('id'),
				id:			rs.fieldByName('meta_id'),
				text:		rs.fieldByName('meta_value'),
				stateStr:	rs.fieldByName('meta_key'), //correct or incorrect
				stateInt:	rs.fieldByName('quiz_choice') //2 or 1
			};
			indexChoice++;
			rs.next();
		}
		var choicePerQuestion = 5;
		var questionIteration = 0;
		for (var b=0;b<choicesObjArr.length;b=b+choicePerQuestion){
			var choicesInOrder = [choicesObjArr[b],choicesObjArr[b+1],
					choicesObjArr[b+2],choicesObjArr[b+3],choicesObjArr[b+4]
				];
			var choicesRandom = shuffle(choicesInOrder);
			questionSetObjArr.push({
				question: questionObjArr[questionIteration],
				choices: choicesRandom
			});
			questionIteration++;
		}
		
		rs.close();
	}catch(e){
		alert(e.toString());
	}
	
	db.close();
	Ti.API.info(JSON.stringify(questionSetObjArr));
	return questionSetObjArr;
}

module.exports = QuestionSet;