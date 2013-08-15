function QuizSelectResultView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname=='android');
	// create quiz select result view
	var windowTitle = '結果表示';
	winParamObj.parent_window.title = windowTitle;
	var tableData = [];
	var self = Ti.UI.createView({
		width:'100%',
		height:'100%',
		backgroundImage:getImagesPath('bg.png'),
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
	var resultTable = Ti.UI.createScrollView({
		contentHeight: 'auto',
		contentWidth: 'auto',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		borderColor: '#457CBA',
		borderWidth: 2,
		showVerticalScrollIndicator: true,
		layout: 'vertical'
	});
	
	// create left button in navigation bar to quit quiz results
	addReturnButton(winParamObj, self, '戻る');
  	
	// display result background image
	var header_row = Ti.UI.createView({backgroundColor: 'transparent',height:Ti.UI.SIZE,width:Ti.UI.FILL});
	var image = Titanium.UI.createImageView({
		image:getImagesPath('result.png'),
		top:'0dp',
		width:'304dp',
		height:'240dp'
	});
	header_row.add(image);

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
	header_row.add(dt);
	
	// insert history db
	if (!winParamObj.quiz_obj.retryFlg) {
		var QuizHistory = require('common/QuizHistory');
		var QuizHistoryModel = new QuizHistory();
		winParamObj.quiz_obj.datetime = mydate.year + '-' + mydate.month + '-' + mydate.day + ' ' + mydate.hour + ':' + mydate.min + ':' + mydate.sec;
		QuizHistoryModel.saveQuizHistory(winParamObj.quiz_obj,Titanium.App.Properties.getString('ChapterTitle'));
	}

	var ChapTitle  = Titanium.App.Properties.getString('ChapterTitle');
	
	var t = Titanium.UI.createLabel({
		color:'#3F0000',
		text: ChapTitle,
		font:{fontSize:'20dp'},
		top: '113dp',
		left: (IS_ANDROID)?'12%':'20dp',
		height: 'auto'
	});
	header_row.add(t);
	
	// display quiz end number
	var end = Titanium.UI.createLabel({
		color:'#3F0000',
		text: winParamObj.quiz_obj.end_step,
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'30%': '90dp',
		height: 'auto'
	});
	header_row.add(end);
	
	// display quiz correct answers
	var correct = Titanium.UI.createLabel({
		color:'#457CBA',
		text: winParamObj.quiz_obj.getCorrectCount(),
		font:{fontSize:'38dp'},
		top: '173dp',
		left:(IS_ANDROID)?'60%': '195dp',
		height: 'auto'
	});
	header_row.add(correct);
	
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
	
	
	if(winParamObj.quiz_obj.getCorrectCount() == winParamObj.quiz_obj.end_step){
		Titanium.App.Properties.setInt('totalcorect',winParamObj.quiz_obj.getCorrectCount());
	}else{
		header_row.add(b);
	}
	
	//tableData.push(header_row);
	resultTable.add(header_row);
  	var j = winParamObj.quiz_obj.end_step;
	while(j>0){
		showRow(j);
		j--;
	}
	
  	// display row
  	
	function showRow(k){
		var h = winParamObj.quiz_obj.now_step - k;
		// create container for quiz item
		// displays quiz item no
		var s_3_row1 = Ti.UI.createView({selectedBackgroundColor:'transparent',backgroundColor:'#FFF',height:Ti.UI.SIZE,width:Ti.UI.FILL});
		var QuizObj = winParamObj.quiz_obj.quiz_list[h];
		var qn = Titanium.UI.createLabel({
			text:QuizObj.content_id + ".",
			font:{fontSize:'16dp'},
			color:'#000',
			top:'13dp',
			height:'auto',
			left: '12dp',
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
			left: '40dp',
			right:'20dp',
			width: (IS_ANDROID)?'82%':'245dp'
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
		//tableView.appendRow(s_3_row1);
		//tableData.push(s_3_row1);
		resultTable.add(s_3_row1);
		var top = 10;
		var ansewer_top = 0;
		var selected_top = 0;
		for (var i = 0; i < QuizObj.questions.length; i++) {
			var s_3_row2 = Ti.UI.createView({selectedBackgroundColor:'transparent',backgroundColor:'#FFF',height: Ti.UI.SIZE, width: Ti.UI.FILL});
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
				left: '15dp',
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
				left: '40dp',
				width:(IS_ANDROID)?'82%': '245dp',
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
					left: '10dp',
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
					left: '10dp',
					height: '23dp',
					width: '24dp'
				});
				s_3_row2.add(small_x);
			}
			//var sumTop = top += 47;
			//tableView.appendRow(s_3_row2);
			//tableData.push(s_3_row2);
			resultTable.add(s_3_row2);
			if(Ti.Platform.osname == 'iphone'){
				smtop=smtop + s_3_row2.toImage().height + 20;
			}else{
				smtop=smtop + 80;
			}	
			
		}

		var s_3_row3 = Ti.UI.createView({selectedBackgroundColor:'transparent',backgroundColor:'#FFF',height: Ti.UI.SIZE, width: Ti.UI.FILL});
		var line = Titanium.UI.createLabel({
		height:'1dp',
		width:'100%',
		//top:smtop + 20 + 'dp',
		left:'1dp',
		backgroundColor:'#E0E0E0'
		});
		var j = winParamObj.quiz_obj.end_step;
		j=j-1;
		if(j!=h){
			s_3_row3.add(line);
			//tableView.appendRow(s_3_row3);
			//tableData.push(s_3_row3);
			resultTable.add(s_3_row3);
		}
	}
	
	//resultTable.data = tableData;
	self.add(resultTable);
	
	return self;
};
module.exports = QuizSelectResultView;