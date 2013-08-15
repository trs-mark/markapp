function QuizHistoryDetailView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname=='android');
	// create quiz history detail view
	var windowTitle = '履歴詳細';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundImage:getImagesPath('quiz_history_detail_bg.png'),
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
	
	// create try again button
	var b = Titanium.UI.createButton({
		backgroundImage:getImagesPath('result_btn_tryagain.png'),
		top:'-3dp',
		left:'30dp',
		right:'30dp',
		//width:'260dp',
		height:'20%'
	});
	if (Ti.Platform.osname !=='iphone') {
		b.backgroundSelectedImage = getImagesPath('result_btn_tryagain.png');
	}
	b.addEventListener('click', function(e){
 		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
 		var e = winParamObj.quiz_obj.end_step;
 		var c = winParamObj.quiz_obj.getCorrectCount();
 		if (e == 1 && c == 1) {
 			var alertDialog = Titanium.UI.createAlertDialog({
			    message: '間違えた問題はありません',
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
		}
	});
	self.add(b);
	
	//  display quiz history details
	var tableView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		separatorColor: 'transparent',
		top:'20%',
		bottom:'15dp',
		left: '18dp',
		right: '18dp',
		height:'auto',
	});
	self.add(tableView);
	var corect=Titanium.App.Properties.getInt('num_Correct') ;
	if (corect == winParamObj.quiz_obj.end_step){
		tableView.top = '3%';
		self.backgroundImage=getImagesPath('memo_bg.png'),
		self.remove(b);
	}
	var num=0;
	for (var h = 0; h < winParamObj.quiz_obj.quiz_list.length; h++) {
		var row = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
		
		// create view as container for quiz item
		var s = Titanium.UI.createTableView({
			width: '280dp',
			backgroundColor: 'transparent',
			separatorColor: 'transparent',
			scrollable : false
		})
		row.add(s);
			
		// displays quiz item no
			
		var tb_row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
		var QuizObj = winParamObj.quiz_obj.quiz_list[h];
		var qn = Titanium.UI.createLabel({
		text:winParamObj.quiz_obj.quiz_list[num].content_id + ".",
		font:{fontSize:'16dp'},
		color:'#000',
		top:'13dp',
		height:'auto',
		left: '0dp',
		right: '20dp',
		width: 'auto',
		textAlign: 'right'
		});
		num++;
		// displays quiz item question
		var l = Titanium.UI.createLabel({
			text:QuizObj.question_word,
			font:{fontSize:'16dp'},
			color:'#000',
			top:'13dp',
			height:'auto',
			left: '30dp',
			right: '20dp',
			width: (IS_ANDROID)?'85%':'245dp'
		});
		
		var scrolltop = Math.ceil(QuizObj.question_word.length / 16) * 20 + 30;
		
		var img = Titanium.UI.createImageView({
			image:getImagesPath(QuizObj.icon_path),
			height: '150dp',
			top: scrolltop + 'dp'
		});
		if (Ti.Platform.osname ==='iphone') {img.width = 'auto';}
		else{img.width = '150dp';}
		
		
		tb_row1.add(qn);
		tb_row1.add(l);
		
		if(QuizObj.icon_path != ''){
		}else{
		tb_row1.add(img);
		}
		
		tableView.appendRow(tb_row1);
	
		//create quiz item choices
		var top = 10;
		var ansewer_top = 0;
		var selected_top = 0;
		for (var i = 0; i < QuizObj.questions.length; i++) {
			var tb_row2 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent',selectionStyle:'none'});
			var sumTop = top;
			var no = i + 1;
			var a = Titanium.UI.createLabel({
				id: QuizObj.questions[i].id,
				color:'#3F0000',
				text: '(' + no + ') ',
				top:sumTop + 'dp',
				height:'19dp',
				font:{fontSize:'13dp'},
				left: '5dp',
				width: '19dp'
			});
			var b = Titanium.UI.createLabel({
				id: QuizObj.questions[i].id,
				color:'#3F0000',
				text: '',
				top:sumTop + 2 + 'dp',
				height:'auto',
				font:{fontSize:'13dp'},
				left: '30dp',
				width:(IS_ANDROID)?'85%': '250dp'
			});
			if(IS_ANDROID){
				b.setHtml(ConvertQuest(QuizObj.questions[i].answer));
			}else{
				b.setText(ConvertQuest(QuizObj.questions[i].answer));
			}
			tb_row2.add(b);
			tb_row2.add(a);
			
			// get answer top
			if (QuizObj.answer_id == QuizObj.questions[i].id) {
				//ansewer_top = sumTop;
				var small_s = Titanium.UI.createImageView({
					image:getImagesPath('small_s.png'),
					top:sumTop + 'dp',
					left: '0dp',
					height: '23dp',
					width: '24dp'
				});
				tb_row2.add(small_s);
			}
			// get selected top
			if (QuizObj.selected_id == QuizObj.questions[i].id && QuizObj.answer_id != QuizObj.questions[i].id) {
				//selected_top = sumTop;
				var small_x = Titanium.UI.createImageView({
					image:getImagesPath('small_x.png'),
					top:sumTop + 'dp',
					left: '0dp',
					height: '23dp',
					width: '24dp',
				});
				tb_row2.add(small_x);
			}
			//var sumTop = top += 47;
			tableView.appendRow(tb_row2);
		}
		/*var dummy = Titanium.UI.createLabel({
			top:sumTop +'dp',
			height:'10dp'
		});
		tb_row2.add(dummy);
		
		// create image 'o' if answer is correct
		var small_s = Titanium.UI.createImageView({
		    image:getImagesPath('small_s.png'),
		    left: '.5dp',
		    height: '23dp',
			width: '23dp',
		});
		tb_row2.add(small_s);
		if (Ti.Platform.osname ==='iphone') {small_s.left = '.5dp';small_s.top = ansewer_top - 2.5 + 'dp';}
		else{small_s.left = '1dp';small_s.top = ansewer_top - 1 + 'dp';}
		if (!QuizObj.correct) {
			// create image 'x' if answer is incorrect
			var small_x = Titanium.UI.createImageView({
			    image:getImagesPath('small_x.png'),
			    left: '.5dp',
			    height: '23dp',
				width: '23dp',
			});
			tb_row2.add(small_x);
			if (Ti.Platform.osname ==='iphone') {small_x.left = '.5dp'; small_x.top = selected_top - 3 + 'dp';}
			else{small_x.left = '1dp';small_x.top = selected_top - .5 + 'dp';}
		}*/
		var sumtop1=60;
		if(b.text.length > 50){
			sumtop1=sumtop1+(b.text.length/2);
		}
		// create read button
		var btn_read = Titanium.UI.createButton({
			backgroundImage:getImagesPath('result_btn_read.png'),
			top:sumtop1 +'dp',
			width:'260dp',
			height:'75dp'
		});
		//line separator between question and read button
		var line = Titanium.UI.createLabel({
		height:'.5dp',
		width:'100%',
		top:sumtop1 + 20 + 'dp',
		left:'1dp',
		backgroundColor:'#E0E0E0'
		});
		tb_row2.add(line);
		if (Ti.Platform.osname !=='iphone') {
			btn_read.backgroundSelectedImage = getImagesPath('result_btn_read_selected.png');
		}
		/*btn_read.addEventListener('click', function(e){
			if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
			var param = new (require('common/WindowParam'))('ReadSelectOneView');
			param.toSource = winParamObj.view_file; 
			param.quiz_obj = new (require('common/ReadSelectOneList'))();
			if (param.quiz_obj == false) { return; }
			param.newnav = true; 
			param.newDoc5 = true; 
			
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
		});
		
		// identify what application type
		// if APP_TYPE is equal to 1; add read button
		if(APP_TYPE === 1){
			tb_row2.add(btn_read);
		}*/
		
		//s.appendRow(tb_row2);
		
		
		/*if (Ti.Platform.osname === 'iphone') {s.height = tb_row1.toImage().height + tb_row2.toImage().height;}
		else{
			if(QuizObj.icon_path != ''){
				if(QUIZ_CHOICE === 1){s.height = '520dp';}
				else if(QUIZ_CHOICE === 2){s.height = '570dp';}
				else{alert('Quiz Choice Not Found!');}
			}
			else{
				if(QUIZ_CHOICE === 1){s.height = '370dp';}
				else if(QUIZ_CHOICE === 2){s.height = '420dp';}
				else{alert('Quiz Choice Not Found!');}
			}
		}*/
		
		//tableView.appendRow(row);
		
	}
	return self;
};
module.exports = QuizHistoryDetailView;