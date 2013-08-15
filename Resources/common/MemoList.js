var MemoList = function(){
	
	var self = this;
	
	this.getMemoList = function(){
		var db;
		try{
			db = Titanium.Database.open(DB_NAME);
		}catch(e){
			alert('データベースに接続できません');
			Titanium.API.info(e);
			return;
		}
		var rows = db.execute(
			" select * from CONTENTS"+
			" where TYPE = 'MEMO'" +
			" ORDER BY ID DESC"
		);
		var memoList = new Array();
		while (rows.isValidRow()) {
			var data = {
				memo_id:rows.fieldByName('ID'),
				memo_type:rows.fieldByName('TYPE'),
				memo_name:rows.fieldByName('NAME'),
				memo_memo:rows.fieldByName('MEMO')
			};
			memoList.push(data);
			rows.next();
		}
		rows.close();
		return memoList;
	}

	this._init = function(){
		if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
		
		return self;
	}	
	return this._init();
}

module.exports = MemoList;