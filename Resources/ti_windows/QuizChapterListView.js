function QuizChapterListView(winParamObj) {
	//array title
	var title= ['生化学過去問 1-20','生化学過去問 21-40','生化学過去問 41-60','生化学過去問 61-80','生化学過去問 81-100','生化学過去問 101-120','生化学過去問 121-140','生化学過去問 141-161'];
	var chaptNo=['第1章','第2章','第3章','第4章','第5章','第6章','第7章','第8章'];
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname == 'android');
	// create quiz chapter list view
	var windowTitle = '問題の選択';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		parent_window_title: windowTitle
	});
	
	//self.add(activityIndicator);
	// create table for quiz chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0'
	});
	self.add(tableView);
	
	//　create row chapter 1
	var row = Ti.UI.createTableViewRow({
		id:1,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	var x = '6';
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[0],
		font:{fontSize:'20dp',},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[0],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[0]);
		Titanium.App.Properties.setString('chapNum',chaptNo[0]);
		Titanium.App.Properties.setInt('setQuestion',1);
		Titanium.App.Properties.setInt('setQEnd',20);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true;
		callIndicator(param);
		param =null;
	});
	tableView.appendRow(row);
	
	//　create row chapter 2
	var row = Ti.UI.createTableViewRow({
		id:2,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[1],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[1],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[1]);
		
		Titanium.App.Properties.setInt('setQuestion',21);
		Titanium.App.Properties.setInt('setQEnd',40);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);

	});

	tableView.appendRow(row);
	
	//　create row chapter 3
	var row = Ti.UI.createTableViewRow({
		id:3,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[2],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[2],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[2]);
		Titanium.App.Properties.setInt('setQuestion',41);
		Titanium.App.Properties.setInt('setQEnd',60);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);

	});
	tableView.appendRow(row);
	
	//　create row chapter 4
	var row = Ti.UI.createTableViewRow({
		id:4,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[3],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[3],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[3]);
		Titanium.App.Properties.setInt('setQuestion',61);
		Titanium.App.Properties.setInt('setQEnd',80);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);

	});
	tableView.appendRow(row);
	
	//　create row chapter 5
	var row = Ti.UI.createTableViewRow({
		id:5,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[4],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[4],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[4]);
		Titanium.App.Properties.setInt('setQuestion',81);
		Titanium.App.Properties.setInt('setQEnd',100);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);

	});
	tableView.appendRow(row);
	
	//　create row chapter 6
	var row = Ti.UI.createTableViewRow({
		id:6,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[5],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[5],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[5]);
		Titanium.App.Properties.setInt('setQuestion',101);
		Titanium.App.Properties.setInt('setQEnd',120);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);
	});
	tableView.appendRow(row);
	
	//　create row chapter 7
	var row = Ti.UI.createTableViewRow({
		id:7,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[6],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[6],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[6]);
		Titanium.App.Properties.setInt('setQuestion',121);
		Titanium.App.Properties.setInt('setQEnd',140);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);

	});
	tableView.appendRow(row);
	
	//　create row chapter 8
	var row = Ti.UI.createTableViewRow({
		id:8,
		height:'45dp',
		selectedBackgroundColor:'#015FE7',
		backgroundColor:'#FFFFFF'
	});
	row.add(Ti.UI.createLabel({
		color:'#3F0000',
		text: title[7],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));
	/*row.add(Ti.UI.createLabel({
		color:'#FF7F0C',
		text:chaptNo[7],
		font:{fontSize:'20dp'},
		top: '12dp',
		left: '10dp',
		height: 'auto'
	}));*/
	/*var pHeight = Titanium.Platform.displayCaps.platformWidth / (Titanium.Platform.displayCaps.dpi / 160);;
	alert(pHeight);*/
	row.add(Ti.UI.createImageView({
		image:getImagesPath('arrow.png'),
		right:0, bottom: 0,
		width:20, height: 20
	}));
	row.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		Titanium.App.Properties.setString('ChapterTitle',title[7]);
		Titanium.App.Properties.setInt('setQuestion',141);
		Titanium.App.Properties.setInt('setQEnd',161);
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		callIndicator(param);
	});
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
		left: '10dp',
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
	//tableView.appendRow(row);
	//text: 'L\u00B2 \u207A \u02D6 \u031F \u0E4B ', unicode sub and sup + sign
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
	//tableView.appendRow(row);
	
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
	//tableView.appendRow(row);
	
	//　create row chapter 12
	var row = Ti.UI.createTableViewRow({
		id:12,
		height:'10dp',
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
	//tableView.appendRow(row);
	
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
	//tableView.appendRow(row);
	
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
	//tableView.appendRow(row);
	
	//　create row chapter 15
	var row = Ti.UI.createTableViewRow({
		id:15,
		height:'10dp',
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
	//tableView.appendRow(row);
	
	//　create row chapter 16
	var row = Ti.UI.createTableViewRow({
		id:16,
		height:'10dp',
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
	//tableView.appendRow(row);
	
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
	//tableView.appendRow(row);
	
	//　create row chapter 18
	var row = Ti.UI.createTableViewRow({
		id:18,
		height:'10dp',
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
	//tableView.appendRow(row);
	
	function callIndicator(prm){
	var activityIndicator = Ti.UI.createActivityIndicator({
		color: 'white',
		font: {fontFamily:'Helvetica Neue', fontSize:'26%',fontWeight:'bold'},
		message:'Loading..',
		width:'100%',
		textAlign:'center',
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE
	});
	var box = Titanium.UI.createView({
		opacity: 0.9,
		backgroundColor: '#0F183B',
		borderColor: '#FFFFFF',
		borderWidth: 3,
		borderRadius: 10,
		width: '80%',
		height: '20%',
		zIndex: 15
	});
	var win2 = Titanium.UI.createView({
		opacity: 0.7,
		backgroundColor: 'gray',
		width: '100%',
		height: '100%',
		zIndex: 10
	});
	if (Titanium.Platform.osname === 'iphone'){
		activityIndicator.style=Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
		box.add(activityIndicator);
		self.add(win2);
		self.add(box);
		activityIndicator.show();
			setTimeout(function(){
				showNextWindow(prm);
				self.remove(win2);
				self.remove(box);
				activityIndicator.hide();
			}, 800); 
	}else{
		activityIndicator.show();
		showNextWindow(prm);
			setTimeout(function(){
				self.remove(win2);
				activityIndicator.hide();
			}, 500);
	}
		
	}
	
	return self;
};
module.exports = QuizChapterListView;