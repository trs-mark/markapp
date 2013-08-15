function ReadChapterListView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	// create read chapter list view
	var windowTitle = '章の選択';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		width:'320dp',
		height:'416dp',
		backgroundColor:'transparent',
		parent_window_title: windowTitle
	});
	
	// create table for read chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0',
		top: '45dp'
	});
	self.add(tableView);
	
	// create search bar
	var search = Titanium.UI.createSearchBar({
	    barColor:'#B4BEC6', 
	    height: '45dp',
	    top: '0dp',
	    hintText: 'ページを指定',
	    keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION   ,
  		returnKeyType: Titanium.UI.RETURNKEY_SEARCH  
	});
	search.addEventListener('cancel', function(e)
	{
		search.showCancel = false;
		search. hintText = 'ページを指定';
		search.value = '';
		search.blur();
	});
	search.addEventListener('return', function(e)
	{
		var param = new (require('common/WindowParam'))('ReadSelectOneView');
		param.toSource = winParamObj.view_file;
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		for (var i = 1; i <= 14; i++) {
			if(e.value == i){
				search.blur();
				param.quiz_obj.now_step = i;
				showNextWindow(param); 
			}
		}
		if(e.value <= 0 || e.value > 14){
			search.showCancel = false;
			search.blur();
			search.value = '';
			search. hintText = 'ページを指定';
			Titanium.UI.createAlertDialog({
				message:'ページが見つかりません。',
				buttonNames: ['OK']
			}).show();
		}
	});
	search.addEventListener('focus', function(e)
	{
		search.showCancel = true;
		self.top = '0dp';
	});
	self.add(search);
	
	//　create row chapter 1
	var row = Ti.UI.createTableViewRow({
		id:1,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '生化学の基礎となる化学',
		font:{fontSize:'20dp',},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第1章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		search.blur();
		var param = new (require('common/WindowParam'))('ReadSelectOneView');
		param.toSource = winParamObj.view_file; 
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		param.newnav = true; 
		param.newDoc = true; 
		showNextWindow(param); 
	});
	tableView.appendRow(row);
	
	//　create row chapter 2
	var row = Ti.UI.createTableViewRow({
		id:2,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '細胞の構造と機能',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第2章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 3
	var row = Ti.UI.createTableViewRow({
		id:3,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '糖質(gulcide)',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第3章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 4
	var row = Ti.UI.createTableViewRow({
		id:4,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '脂質(lipid)',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第4章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 5
	var row = Ti.UI.createTableViewRow({
		id:5,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: 'アミノ酸とたんぱく質',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第5章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 6
	var row = Ti.UI.createTableViewRow({
		id:6,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '酵素',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第6章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 7
	var row = Ti.UI.createTableViewRow({
		id:7,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '核酸とヌクレオチド',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第7章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 8
	var row = Ti.UI.createTableViewRow({
		id:8,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: 'ビタミンとミネラル',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第8章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 9
	var row = Ti.UI.createTableViewRow({
		id:9,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '生体エネルギー学',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '70dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第9章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 10
	var row = Ti.UI.createTableViewRow({
		id:10,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '糖質の代謝',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第10章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 11
	var row = Ti.UI.createTableViewRow({
		id:11,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '脂質の代謝',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第11章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 12
	var row = Ti.UI.createTableViewRow({
		id:12,
		height:'70dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: 'たんぱく質・アミノ酸\nの代謝',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第12章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 13
	var row = Ti.UI.createTableViewRow({
		id:13,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: 'ヌクレオチド代謝',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第13章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 14
	var row = Ti.UI.createTableViewRow({
		id:14,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '中間代謝の概要',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第14章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 15
	var row = Ti.UI.createTableViewRow({
		id:15,
		height:'70dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '特定の生体環境下\nでの代謝',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第15章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 16
	var row = Ti.UI.createTableViewRow({
		id:16,
		height:'70dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '個体の恒常性と\nその調節機構',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第16章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 17
	var row = Ti.UI.createTableViewRow({
		id:17,
		height:'45dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '遺伝子の発掘と制御',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第17章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	//　create row chapter 18
	var row = Ti.UI.createTableViewRow({
		id:18,
		height:'70dp',
		selectedBackgroundColor:'#015FE7'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: '栄養と遺伝子・\n遺伝子の組み換え技術',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '80dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:'第18章',
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	tableView.appendRow(row);
	
	return self;
};
module.exports = ReadChapterListView;