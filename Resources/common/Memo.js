var Memo = function(){
	
	var self = this;
	
	this.getMemo = function(page){
		var db;
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return;
		}
		var rows = db.execute(
			' select * from CONTENTS'+
			' ORDER BY ID ASC'
		);
		var memo = new Array();
		while (rows.isValidRow()) {
			var data = {
				memo_id:rows.fieldByName('ID'),
				memo_type:rows.fieldByName('TYPE'),
				memo_name:rows.fieldByName('NAME'),
				memo_comment:rows.fieldByName('MEMO')
			};
			memo.push(data);
			rows.next();
		}
		rows.close();
		return memo;
	}

	this.saveMemo = function(page, text){
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
			'INSERT INTO CONTENTS (ID, TYPE, NAME, MEMO) VALUES(?,?,?,?)', 200+page, "MEMO", page, text
		);
		db.execute('commit');
		db.close();
		db = null;
		return;
	}
	
	this.updateMemo = function(page, text){
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
			'UPDATE CONTENTS SET MEMO = ? WHERE NAME = ? AND TYPE = ?', text, page, "MEMO"
		);
		db.execute('commit');
		db.close();
		db = null;
		return;
	}
	
	this.deleteMemo = function(page, text){
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
			'DELETE FROM CONTENTS WHERE MEMO = ? AND NAME = ? AND TYPE = ? ', "", page, "MEMO"
		);
		db.execute('commit');
		db.close();
		db = null;
		return;
	}
	
	this._init = function(){
		if (Ti.Platform.osname!=='iphone') {
			Ti.include('../common/common.js');
			Ti.include('../common/Memo.js');
		} 
		return self;
	}	
	return this._init();
}

module.exports = Memo;