function QuizSelectResultView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname=='android');
	// create quiz select result view
	var windowTitle = '結果表示';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		width:'100%',
		height:'100%',
		backgroundImage:getImagesPath('bg.png'),
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
	
	// create left button in navigation bar to quit quiz results
	addReturnButton(winParamObj, self, '戻る');
	
	// create container for quiz result contents
	var s = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		top: '0dp',
		width: 'auto',
		showVerticalScrollIndicator:true
	});
	if (Ti.Platform.osname === 'iphone') {s.height = 'auto';}
	else{s.height = '100%';}
  	self.add(s);
	
	// display result background image
	var image = Titanium.UI.createImageView({
		image:getImagesPath('result.png'),
		top:'0dp',
		width:'304dp',
		height:'240dp'
	});
	s.add(image);
	
	// display quiz result date
	var mydate = new ArrangementDate(new Date());
	var dt = Titanium.UI.createLabel({
		color:'#666666',
		text: mydate.year + '年' + mydate.month + '月' + mydate.day + '日　'
		 + mydate.hour + '時' + mydate.min + '分',
		top: '50dp',
		left: '70dp',
		height: 'auto',
		font:{fontSize:'18dp'}
	});
	s.add(dt);
	
	// insert history db
	if (!winParamObj.quiz_obj.retryFlg) {
		var QuizHistory = require('common/QuizHistory');
		var QuizHistoryModel = new QuizHistory();
		winParamObj.quiz_obj.datetime = mydate.year + '-' + mydate.month + '-' + mydate.day + ' ' + mydate.hour + ':' + mydate.min + ':' + mydate.sec;
		QuizHistoryModel.saveQuizHistory(winParamObj.quiz_obj,Titanium.App.Properties.getString('ChapterTitle'));
	}

	var ChapTitle  = Titanium.App.Properties.getString('ChapterTitle');
	// display chapter title
	/*var no = Titanium.UI.createLabel({
		color:'#FF7F0C',
		text:arr[0],
		font:{fontSize:'20dp'},
		top: '113dp',
		left: '20dp',
		height: 'auto'
	});
	s.add(no);*/
	var t = Titanium.UI.createLabel({
		color:'#3F0000',
		text: ChapTitle,
		font:{fontSize:'20dp'},
		top: '113dp',
		left: (IS_ANDROID)?'12%':'20dp',
		height: 'auto'
	});
	s.add(t);
	
	// display quiz end number
	var end = Titanium.UI.createLabel({
		color:'#3F0000',
		text: winParamObj.quiz_obj.end_step,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'30%': '90dp',
		height: 'auto'
	});
	s.add(end);
	
	// display quiz correct answers
	var correct = Titanium.UI.createLabel({
		color:'#457CBA',
		text: winParamObj.quiz_obj.getCorrectCount(),
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'60%': '195dp',
		height: 'auto'
	});
	s.add(correct);
	
	//  create try again button
	var b = Titanium.UI.createButton({
		backgroundImage:getImagesPath('result_btn_tryagain.png'),
		left:'30dp',
		right:'30dp',
		height:'75dp'
	});
	if (Ti.Platform.osname === 'iphone') {b.top = '226dp';}
	else{
		b.backgroundSelectedImage = getImagesPath('result_btn_tryagain_selected.png');
		b.top = '235dp';
  	}
	b.addEventListener('click', function(e){
		var e = winParamObj.quiz_obj.end_step;
 		var c = winParamObj.quiz_obj.getCorrectCount();
 		if (e == c) {
 			var alertDialog = Titanium.UI.createAlertDialog({
			    message: '間違った問題はありません',
			    buttonNames: ['OK'],
			    cancel: 1 
			});
			alertDialog.addEventListener('click',function(event){
			    if(event.index == 0){ closeWindow(winParamObj); }
			});
			alertDialog.show();	
 			return;
 		}
 		else{
 			var param = new (require('common/WindowParam'))('QuizSelectOneView');
			winParamObj.quiz_obj.quizSelectOneList4retry();
			param.quiz_obj = winParamObj.quiz_obj;
			param.newnav = true; 
			showNextWindow(param);
			closeWindow(winParamObj);
 		}
	});
	
	// create table for container of quiz items
	var tableView = Ti.UI.createTableView({
		left: '15dp',
		right: '15dp',
		backgroundColor: '#F5F4FA',
	    borderColor: '#457CBA',
	    borderWidth: 2,
    	separatorColor: '#E0E0E0',
    	allowsSelection: false,
		scrollable : false
	});
	
	if (Ti.Platform.osname === 'iphone') {
		tableView.top = '300dp';
		tableView.height = 'auto';
	}
	else{
		tableView.top = '310dp';
		tbSizeAndroid(winParamObj.quiz_obj.end_step);
  	}
  	s.add(tableView);
  	if(winParamObj.quiz_obj.getCorrectCount() == winParamObj.quiz_obj.end_step){
		tableView.top='230dp';
		Titanium.App.Properties.setInt('totalcorect',winParamObj.quiz_obj.getCorrectCount());
	}else{
		s.add(b);
	}
	
  	// determines and show how many rows
  	var j = winParamObj.quiz_obj.end_step;
	while(j>0){
		showRow(j);
		j--;
	}
  	
  	// determines table size for Android
  	function tbSizeAndroid(j){
		if(APP_TYPE === 1){
			if(QUIZ_CHOICE === 1){var p = 435 * j;}
			else if(QUIZ_CHOICE === 2){var p = 495 * j;}
			else{alert('Quiz Choice Not Found!');}
		}
		if(APP_TYPE === 2){
			if(QUIZ_CHOICE === 1){var p = 365 * j;}
			else if(QUIZ_CHOICE === 2){var p = 425 * j;}
			else{alert('Quiz Choice Not Found!');}
		}
		p=p-1760;
		var pStr = p + 'dp';
		tableView.height = pStr;
	}
	
  	// display row
  	
	function showRow(k){
		var h = winParamObj.quiz_obj.now_step - k; 
		var row = Ti.UI.createTableViewRow({selectedBackgroundColor:'#015FE7'});
		var row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'#015FE7'});
		// create container for quiz item
		var tableView_q = Ti.UI.createTableView({
			backgroundColor:'transparent',
			top:'8dp',
			left: '6dp',
			right: '6dp',
			height:'400dp',
			scrollable:false,
			separatorColor: 'transparent'
		});
		/*var s_3 = Titanium.UI.createTableView({
			top: '0dp',
			width: '280dp',
			backgroundColor: 'transparent',
			separatorColor: 'pink',
			scrollable : false
		});*/
		//row.add(s_3);
		
		// displays quiz item no
		var s_3_row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
		var QuizObj = winParamObj.quiz_obj.quiz_list[h];
		var qn = Titanium.UI.createLabel({
			text:QuizObj.content_id + ".",
			font:{fontSize:'16dp'},
			color:'#000',
			top:'13dp',
			height:'auto',
			left: '5dp',
			right: '20dp',
			width: 'auto',
			textAlign: 'right'
		});
		s_3_row1.add(qn);
		// displays quiz item question
		var l = Titanium.UI.createLabel({
			text:QuizObj.question_word,
			font:{fontSize:'16dp'},
			color:'#000',
			top:'13dp',
			height:'auto',
			left: '35dp',
			width: (IS_ANDROID)?'85%':'245dp'
		});
		s_3_row1.add(l);
		var scrolltop = Math.ceil(QuizObj.question_word.length / 16) * 20 + 30;
		var img = Titanium.UI.createImageView({
			image:getImagesPath(QuizObj.icon_path),
			height: '150dp',
			top: scrolltop + 'dp'
		});
		if (Titanium.Platform.osname ==='iphone') {img.width = 'auto';}
		else{img.width = '150dp';}
		if(QuizObj.icon_path != ''){
		}else{	
			s_3_row1.add(img);
		}
		var smtop=0;
		tableView_q.appendRow(s_3_row1);
		var top = 10;
		var ansewer_top = 0;
		var selected_top = 0;
		for (var i = 0; i < QuizObj.questions.length; i++) {
			var s_3_row2 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
			var sumTop = top;
			var no = i + 1;
			//question choices number
			var a = Titanium.UI.createLabel({
				id: QuizObj.questions[i].id,
				color:'#3F0000',
				text: '(' + no + ') ',
				top:sumTop + 'dp',
				height:'19dp',
				font:{fontSize:'13dp'},
				left: '10dp',
				width: '19dp',
			});
			//question choices
			var b = Titanium.UI.createLabel({
				id: QuizObj.questions[i].id,
				color:'#3F0000',
				text: '',
				top:sumTop + 2 + 'dp',
				height:'auto',
				font:{fontSize:'13dp'},
				left: '30dp',
				width:(IS_ANDROID)?'85%': '245dp',
			});
			s_3_row2.add(b);
			s_3_row2.add(a);
			// identify what application type
			// if APP_TYPE is equal to 1; add read button
			if(IS_ANDROID){
				b.setHtml(ConvertQuest(QuizObj.questions[i].answer)); 
			}else{
				b.setText(ConvertQuest(QuizObj.questions[i].answer));
			}
			// get answer top
			if (QuizObj.answer_id == QuizObj.questions[i].id) {
				//ansewer_top = sumTop;
				var small_s = Titanium.UI.createImageView({
					image:getImagesPath('small_s.png'),
					top:sumTop + 'dp',
					left: '5dp',
					height: '23dp',
					width: '24dp'
				});
				s_3_row2.add(small_s);
			}
			
			// get selected top
			if (QuizObj.selected_id == QuizObj.questions[i].id && QuizObj.answer_id != QuizObj.questions[i].id) {
				//selected_top = sumTop;
				var small_x = Titanium.UI.createImageView({
					image:getImagesPath('small_x.png'),
					top:sumTop + 'dp',
					left: '5dp',
					height: '23dp',
					width: '24dp'
				});
				s_3_row2.add(small_x);
			}
			//var sumTop = top += 47;
			tableView_q.appendRow(s_3_row2);
			if(Ti.Platform.osname == 'iphone'){
				smtop=smtop + s_3_row2.toImage().height + 20;
			}else{
				smtop=smtop + 80;
			}	
		}
		//s.add(tableView_q);
		row1.add(tableView_q);
		tableView_q.height =smtop + 'dp';
		tableView.appendRow(row1);
		/*var dummy = Titanium.UI.createLabel({
			top:sumTop +'dp',
			height:'10dp'
		});
		s_3_row2.add(dummy);*/
		
		/*var small_s = Titanium.UI.createImageView({
		    image:getImagesPath('small_s.png'),
		    height: '23dp',
			width: '23dp',
		});
		s_3_row2.add(small_s);
		if (Ti.Platform.osname ==='iphone') {small_s.left = '6.5dp';small_s.top = ansewer_top - 2.5 + 'dp';}
		else{small_s.left = '6dp';small_s.top = ansewer_top - 1 + 'dp';}
		if (!QuizObj.correct) {
			var small_x = Titanium.UI.createImageView({
			    image:getImagesPath('small_x.png'),
			    height: '23dp',
				width: '23dp',
			});
			s_3_row2.add(small_x);
			if (Ti.Platform.osname ==='iphone') {small_x.left = '6.5dp'; small_x.top = selected_top - 3 + 'dp';}
			else{small_x.left = '6dp';small_x.top = selected_top - .5 + 'dp';}
		}
		*/
		//get the lenght of choices
		/*var sumtop1=60;
		if(b.text.length > 50){
			sumtop1=sumtop1+(b.text.length/2);
		}
		//line separtor between question and button 
		// create read button
		var btn_read = Titanium.UI.createButton({
			backgroundImage:getImagesPath('result_btn_read.png'),
			top:sumtop1+'dp',
			left:'9dp',
			width:'260dp',
			height:'75dp'
		});
		if(APP_TYPE === 1){
			s_3_row2.add(btn_read);
		}*/
		/*if (Ti.Platform.osname !=='iphone') {
			btn_read.backgroundSelectedImage = getImagesPath('result_btn_read_selected.png');
		}*/
		/*btn_read.addEventListener('click', function(e){
			if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
			var param = new (require('common/WindowParam'))('ReadSelectOneView');
			param.toSource = winParamObj.view_file; 
			param.quiz_obj = new (require('common/ReadSelectOneList'))();
			if (param.quiz_obj == false) { return; }
			param.newnav = true; 
			param.newDoc2 = true; 
			
			if(QuizObj.content_id == 1){
				param.quiz_obj.now_step = 7;
			}
			if(QuizObj.content_id == 2){
				param.quiz_obj.now_step = 3;
			}
			if(QuizObj.content_id == 3){
				param.quiz_obj.now_step = 5;
			}
			if(QuizObj.content_id == 4){
				param.quiz_obj.now_step = 12;
			}
			if(QuizObj.content_id == 5){
				param.quiz_obj.now_step = 14;
			}
			if(QuizObj.content_id == 6){
				param.quiz_obj.now_step = 11;
			}
			if(QuizObj.content_id == 7){
				param.quiz_obj.now_step = 10;
			}
			if(QuizObj.content_id == 8){
				param.quiz_obj.now_step = 8;
			}
			if(QuizObj.content_id == 9){
				param.quiz_obj.now_step = 4;
			}
			if(QuizObj.content_id == 10){
				param.quiz_obj.now_step = 13;
			}
			showNextWindow(param); 
		});*/
		
		
		
		/*if (Ti.Platform.osname === 'iphone') {s_3.height = s_3_row1.toImage().height + s_3_row2.toImage().height;}
		else{
			if(QuizObj.icon_path != ''){
				if(QUIZ_CHOICE === 1){s_3.height = '520dp'}
				else if(QUIZ_CHOICE === 2){s_3.height = '570dp'}
				else{alert('Quiz Choice Not Found!');}
			}
			else{
				if(QUIZ_CHOICE === 1){s_3.height = '370dp'}
				else if(QUIZ_CHOICE === 2){s_3.height = '420dp'}
				else{alert('Quiz Choice Not Found!');}
			}
		}*/
	
		//s_3.appendRow(s_3_row1);
		//s_3.appendRow(s_3_row2);
		
		//tableView.appendRow(row);
	}
	
	return self;
};
module.exports = QuizSelectResultView;