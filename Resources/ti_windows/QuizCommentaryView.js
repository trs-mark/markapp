function QuizCommentaryView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname == 'android');
	// create quiz commentary view
	var windowTitle = '解説';
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundImage:getImagesPath('commentary_bg.png'),
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
//	var pheight=Titanium.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160);
	var pheight=Titanium.Platform.displayCaps.platformHeight;
	if(pheight < 800){
		var btm ='95dp';
	}else{
		var btm ='110dp';
	}
	// create left button in navigation bar to quit quiz
	if(IS_ANDROID){
		addCloseButton(winParamObj, self, '終了');
	}
	
	//  create container for comments and quiz items
	var tableView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		top:'15dp',
		left: '13dp',
		right: '13dp',
		//height:'318dp',
		minRowHeight:'50dp',
		bottom:(IS_ANDROID)?btm:'95dp',
		separatorColor: '#E0E0E0'
	});
	var tableView_c = Ti.UI.createTableView({
		top:'10dp',
		bottom:'10dp',
		height:'auto',
		scrollable:false,
		backgroundColor:'transparent',
		separatorColor: 'transparent'
	});
	//question container
	var tableView_comment = Ti.UI.createTableView({
		backgroundColor:'transparent',
		top:'10dp',
		left: '5dp',
		right: '5dp',
		//height:'auto',
		scrollable:false,
		separatorColor: 'transparent'
	});
	
	// get text value in the database for comments
	var Comment = require('common/Comment');
	var CommentModel = new Comment();
	var CommentList = CommentModel.getComment(winParamObj.quiz_obj);
	var h = winParamObj.quiz_obj.now_step - 1; 
	// get comment from database
	var x=1;
	var ctop = 2;
	var tabh=0;
	var pageRef;
	var htmText;
	var QuizObj = winParamObj.quiz_obj.quiz_list[h];
	var row_c = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
	for(var i=0; i < CommentList.length; i++) {
		// create row one for comments
		var sumcTop = ctop;
		var row = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
		// create comments
		var c = Titanium.UI.createLabel({
			font:{fontSize:'13dp'},
			color:'#000',
			top:sumcTop + 'dp',
			bottom:'0',
			left:'30dp',
			width:'85%',
			height:'auto',
		});
		var nc = Titanium.UI.createLabel({
			font:{fontSize:'13dp'},
			color:'#000',
			//bottom:'10dp',
			top:sumcTop  + 'dp',
			left:'10dp',
			height:'auto',
			width: '25dp',
			text: ''
		});
		if(QuizObj.content_id == CommentList[i].comment_name || CommentList[i].comment_type == "SELECT_ONE"){
			if(CommentList[i].comment_ref !== "" && CommentList[i].comment_ref !==null){
				pageRef="(P" +CommentList[i].comment_ref+")";
			}else{
				pageRef = "";
			}
			if(CommentList[i].comment_comment !== null){
				if(IS_ANDROID){
					c.html = ConvertQuest(CommentList[i].comment_comment) + pageRef + "\n";	
				}else{
					c.text = ConvertQuest(CommentList[i].comment_comment) + pageRef + "\n";	
				}
			}else{
				if(CommentList[i].comment_ref !== "" && CommentList[i].comment_ref !==null){
					pageRef="(P" +CommentList[i].comment_ref+")";
					if(IS_ANDROID){
						c.html =  pageRef +" \n";
					}else{
						c.text =  pageRef +" \n";
					}
				}else{
					if(IS_ANDROID){
						c.html = " --- \t"+ pageRef +" \n";
					}else{
						c.text = " --- \t"+ pageRef +" \n";
					}		
				}
			}
			nc.text="(" +x+ ")";
			if(IS_ANDROID){
				tabh = tabh + c.html.length+13;
				//c.height =c.text.length+9+'dp';
				//tabh = tabh + row.toImage().height;
			}
			row.add(nc);
			row.add(c);
			x++;
		}
		if(!IS_ANDROID){
				tabh = tabh +c.text.length + (row.toImage().height/2);
		}
		tableView_c.appendRow(row);
	}
	
	tableView_c.height = tabh+'dp';
	row_c.add(tableView_c);
	tableView.appendRow(row_c);
	
	// create row two for quiz items
	var row2 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});	
	
	// create view as container for quiz item
	var s = Titanium.UI.createTableView({
		width: '280dp',
		backgroundColor: 'transparent',
		separatorColor: 'transparent',
		scrollable : false
	});
	row2.add(s);

	// displays quiz item no
	var tb_row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
	var qn = Titanium.UI.createLabel({
		text:winParamObj.quiz_obj.quiz_list[winParamObj.quiz_obj.now_step-1].content_id + ".",
		font:{fontSize:'16dp'},
		color:'#000',
		top:'13dp',
		height:'auto',
		left: '4dp',
		//right: '20dp',
		width: 'auto',
		textAlign: 'left'
	});
	
	// displays quiz item question
	var l = Titanium.UI.createLabel({
		text:QuizObj.question_word,
		font:{fontSize:'16dp'},
		color:'#000',
		top:'13dp',
		height:'auto',
		left: '35dp',
		right: '35dp',
		bottom:'10dp',
		width:(IS_ANDROID)?'85%':'250dp'
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
	
	tableView_comment.appendRow(tb_row1);
	
	//create quiz item choices
	var top = 10;
	var ansewer_top = 0;
	var selected_top = 0;
	var sumheightR = 0; //sum of row height
	var row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
	for (var i = 0; i < QuizObj.questions.length; i++) {
		var tb_row2 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
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
			width:(IS_ANDROID)?'85%':'235dp'
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
	//	var sumTop = top += 47;
		tableView_comment.appendRow(tb_row2);
		if(Ti.Platform.osname === 'iphone') {
			sumheightR = sumheightR + tb_row2.toImage().height + 23;
		}else{
			sumheightR = sumheightR + 88;
		}	
	}
	tableView_comment.height = sumheightR  + 'dp';
	row1.add(tableView_comment);
	tableView.appendRow(row1);
	/*var dummy = Titanium.UI.createLabel({
		top:sumTop +'dp',
		height:'10dp'
	});
	tb_row2.add(dummy);*/
	
	// create image 'o' if answer is correct
	/*var small_s = Titanium.UI.createImageView({
	    image:getImagesPath('small_s.png'),
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
	
	
	
	
	if (Ti.Platform.osname === 'iphone') {s.height = tb_row1.toImage().height + tb_row2.toImage().height;}
	else{
		if(QuizObj.icon_path != ''){
			if(QUIZ_CHOICE === 1){s.height = '450dp';}
			else if(QUIZ_CHOICE === 2){s.height = '500dp';}
			else{alert('Quiz Choice Not Found!');}
		}
		else{
			if(QUIZ_CHOICE === 1){s.height = '300dp';}
			else if(QUIZ_CHOICE === 2){s.height = '350dp';}
			else{alert('Quiz Choice Not Found!');}
		}
	}
	
	// add rows 1,2
	//tableView.appendRow(row);
	//tableView.appendRow(row2);
	
	// create quiz button	
	var btn_quiz = Titanium.UI.createButton({
		backgroundImage:getImagesPath('commentary_b1_long.png'),
		//top:'338dp',
		top:'81%',
		//bottom:'2%',
		// left:'0dp',
		width:'246dp',
		height:'20%'
		//height:'79dp'
	});
	if (Ti.Platform.osname !=='iphone') {
		btn_quiz.backgroundSelectedImage = getImagesPath('commentary_b1_long_selected.png');
	}
	btn_quiz.addEventListener('click', function(){
		var e = winParamObj.quiz_obj.end_step;
 		var c = winParamObj.quiz_obj.getCorrectCount();
 		/*if (e == c) {
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
 		else{*/
			if (winParamObj.quiz_obj.now_step == winParamObj.quiz_obj.end_step) {
				if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
				if(IS_ANDROID){
					var param = new (require('common/WindowParam'))('QuizSelectResultViewAndroid');
				}else{
					var param = new (require('common/WindowParam'))('QuizSelectResultView');
				}	
				param.quiz_obj = winParamObj.quiz_obj;
				if (param.quiz_obj == false) { return; }
				param.newnav = true;
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
					self.add(box);
					self.add(win2);
					activityIndicator.show();
						setTimeout(function(){
							showNextWindow(param);
							self.remove(win2);
							self.remove(box);
							closeWindow(winParamObj);
							activityIndicator.hide();
						},3000); 
				}else{
					activityIndicator.show();
						setTimeout(function(){
							showNextWindow(param);
							closeWindow(winParamObj);	
							activityIndicator.hide();
							//self.remove(win2);
						}, 6000);
				}
			} 
			else{
	 			var param = new (require('common/WindowParam'))('QuizSelectOneView');
				param.quiz_obj = winParamObj.quiz_obj;
				param.newnav = true; 
				showNextWindow(param); 
				closeWindow(winParamObj);
			}
 		//}
	});
	
	// create read button
	/*var btn_read = Titanium.UI.createButton({
		backgroundImage:getImagesPath('commentary_b2.png'),
		top:'338dp',
		right:'0dp',
		width:'166dp',
		height:'79dp'
	});
	if (Ti.Platform.osname !=='iphone') {
		btn_read.backgroundSelectedImage = getImagesPath('commentary_b2_selected.png');
	}
	btn_read.addEventListener('click', function(e){
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		var param = new (require('common/WindowParam'))('ReadSelectOneView');
		param.toSource = winParamObj.view_file; 
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		param.newDoc1 = true;
		
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
	
	// identify what application type
	// if APP_TYPE is equal to 1; add read button
	if(APP_TYPE === 1){
		self.add(tableView);
		self.add(btn_quiz);
	//	self.add(btn_read);
		
		//modify quiz button
		//btn_quiz.left = '0dp';
		//btn_quiz.width = '166dp';
		btn_quiz.backgroundImage = getImagesPath('commentary_b1_long.png');
		if (Ti.Platform.osname !=='iphone') {
			btn_quiz.backgroundSelectedImage = getImagesPath('commentary_b1_long_selected.png');
		}
	}
	// if APP_TYPE is equal to 2; show quiz button only
	else if(APP_TYPE === 2){
		self.add(tableView);
		self.add(btn_quiz);
	}
	// Display Error
	else{
		alert('Application Type Not Found!');
	}
	
	return self;
};
module.exports = QuizCommentaryView;