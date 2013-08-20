/**
 * Commentary gets the commentary for the current question
 */

function Commentary() {
}

Commentary.prototype.getCommentary = function(GLOBAL,questionnaireObj){
	try{
		var db = Ti.Database.install('eiyoushi.sqlite', GLOBAL.DB_NAME);
	}catch(e){
		alert('cannot install database');
	}
	
	var commentsObjArr = [];
	var tempCommentsObjArr = [];
	
	try{
		var sql = 'select content_id,meta_id,ref_no,comment from contents_meta where content_id = ?';
		var rs = db.execute(sql,questionnaireObj.choices[0].parentId);
		while(rs.isValidRow()){
			tempCommentsObjArr.push({
				id		:rs.fieldByName('meta_id'),
				ref_no	:rs.fieldByName('ref_no'),
				comment	:rs.fieldByName('comment')
			});
			rs.next();
		}
		rs.close();
	}catch(e){
		Ti.API.info(e.toString());
		alert('Oops! something went wrong. Failed to get comments!');
	}
	
	db.close();
	
	//sort the object array according to meta_id and questionnaireObj.choices[x].id before sending
	var arrangement = [questionnaireObj.choices[0].id,questionnaireObj.choices[1].id,
		questionnaireObj.choices[2].id,questionnaireObj.choices[3].id,questionnaireObj.choices[4].id];
	var index = 0;
	while(tempCommentsObjArr.length > 0){
		var current = tempCommentsObjArr.pop();
		var index = arrangement.indexOf(current.id);
		commentsObjArr[index] = current;
	}
	
	
	return commentsObjArr;
};

module.exports = Commentary;