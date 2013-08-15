var Comment = function(){
	
	var self = this;
	
	this.getComment = function(page){
		var db;
		/*var splt_arr = page.quiz_list;
		dumpLog(page);
		for(var i=0 ; i< page.quiz_list.length; i++){
			dumpLog(page.quiz_list[i].content_id);
		}*/
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return;
		}
		var comment = new Array();
		for(var i=0;i<page.quiz_list[page.now_step-1].questions.length;i++){
			var rows = db.execute(
				'SELECT C.TYPE,C.NAME, CM.META_ID ,CM.REF_NO,CM.COMMENT as COMMENTS FROM CONTENTS_META as CM INNER JOIN CONTENTS as C ON C.ID =CM.CONTENT_ID where CM.META_ID =?',page.quiz_list[page.now_step-1].questions[i].id
			);
			var x=0;
			while (rows.isValidRow()) {
				var data = {
					comment_id:rows.fieldByName('META_ID'),
					comment_type:rows.fieldByName('TYPE'),
					comment_name:rows.fieldByName('NAME'),
					comment_ref:rows.fieldByName('REF_NO'),
					comment_comment:rows.fieldByName('COMMENTS')
				};
				comment.push(data);
				rows.next();
			}
		}
		rows.close();
		return comment;
	}
	
	this._init = function(){
		if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
		
		return self;
	}	
	return this._init();
}

module.exports = Comment;