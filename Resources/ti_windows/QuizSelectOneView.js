function QuizSelectOneView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	var IS_ANDROID = (Ti.Platform.osname=='android');
	var windowTitle = '第1章 生化学の基礎となる化学';
	if(Titanium.App.Properties.getString('ChapterTitle',null)!= null){
		windowTitle=Titanium.App.Properties.getString('ChapterTitle');
		//Titanium.App.Properties.setString('ChapterTitle',null);
	}
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createView({
		//width:'320dp',
		//height:'416dp',
		width:'100%',
		height:'100%',
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
	
	self.answerFlg = false; 
	
	// create left button in navigation bar to quit quiz
	addCloseButton(winParamObj, self, '終了');
	// gets the quiz item
	var QuizObj = winParamObj.quiz_obj.getNextQuiz();
	// create view to handle swipe gestures
	var x = Titanium.UI.createView({
		top: '12dp',
		left:'10dp',
		right:'10dp',
		bottom:'95dp',
		//height: '320dp', 
		//width: '320dp',
		zIndex: 2
	});
	x.addEventListener('swipe', function(e) {
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
	
		if (e.direction == 'left'){
			if (!self.answerFlg) { return; } self.answerFlg = false;
				if (winParamObj.quiz_obj.now_step == winParamObj.quiz_obj.end_step) {
					if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
						if(!IS_ANDROID){
							var param = new (require('common/WindowParam'))('QuizSelectResultView');
						}else{
							var param = new (require('common/WindowParam'))('QuizSelectResultViewAndroid');
						}
					param.quiz_obj = winParamObj.quiz_obj;
					if (param.quiz_obj == false) { return; }
					param.newnav = true;
						if (Titanium.Platform.osname === 'iphone'){
							activityIndicator.style=Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
							box.add(activityIndicator);
							self.add(box);
							self.add(win2);
							activityIndicator.show();
							showNextWindow(param);
								setTimeout(function(){
								closeWindow(winParamObj);
								activityIndicator.hide();
								}, 1000); 
						}else{
							activityIndicator.show();
							showNextWindow(param);
								setTimeout(function(){
								closeWindow(winParamObj);
								activityIndicator.hide();
									//self.remove(win2);
								}, 2000); 
						}
				} 
				else {
					if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
					var param = new (require('common/WindowParam'))('QuizSelectOneView');
					param.quiz_obj = winParamObj.quiz_obj;
					param.newnav = true;
					showNextWindow(param);
					closeWindow(winParamObj);
				}
			}
		});
	
	// create view as container for quiz item
	var s = Titanium.UI.createTableView({
		//borderColor:'red',
		left:'10dp',
		//width: '280dp',
		showVerticalScrollIndicator:true,
		backgroundColor: 'transparent',
		separatorColor: 'transparent'
	});
	x.add(s);
	// displays quiz item no
	
	var tb_row1 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
	var qn = Titanium.UI.createLabel({
		text:winParamObj.quiz_obj.quiz_list[winParamObj.quiz_obj.now_step-1].content_id + ".",
		font:{fontSize:'16dp'},
		color:'#000',
		top:'14dp',
		height:'auto',
		left: '4dp',
		right: '20dp',
		width: 'auto',
		textAlign: 'left'
	});

	// displays quiz item question
	var l = Titanium.UI.createLabel({
		text:QuizObj.question_word,
		font:{fontSize:'16dp'},
		color:'#000',
		top:'15dp',
		height:'auto',
		left: '35dp',
		right: '35dp',
		width: (IS_ANDROID)?'83%':'245dp'
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
	
	s.appendRow(tb_row1);
	
	//create quiz item choices
	var buttonPool = new Object();
	var top = 5;
	var sumTop;
	var prev=null;
	var xms;
	for (var i = 0; i < QuizObj.questions.length; i++) {
		var tb_row2 = Ti.UI.createTableViewRow({selectedBackgroundColor:'transparent'});
		var an=QuizObj.questions[i].answer;
		var sumTop = top;
		var no = i + 1;
		var a = Titanium.UI.createLabel({
			id: QuizObj.questions[i].id,
			color:'#3F0000',
			text: '(' + no + ') ',
			top:sumTop + 'dp',
			height:'auto',
			font:{fontSize:'13dp'},
			left: '5dp',
			width: '19dp'
		});
		
		var b = Titanium.UI.createLabel({
			id: QuizObj.questions[i].id,
			color:'#3F0000',
			text:'',  // + ' ' + QuizObj.questions[i].choiceno + ' ' + QuizObj.questions[i].tf,
			top:sumTop + 2 +'dp',
			height:'auto',
			font:{fontSize:'13dp'},
			left: '32dp',
			width:(IS_ANDROID)?'83%': '245dp'
		});
		if(IS_ANDROID){
			b.setHtml(ConvertQuest(QuizObj.questions[i].answer));
		}else{
			b.setText(ConvertQuest(QuizObj.questions[i].answer));
		}
		prev=b;
		//sumTop = top += 47;
		tb_row2.add(b);
		tb_row2.add(a);
		s.appendRow(tb_row2);
	}
	
	var pHeight = Ti.Platform.displayCaps.platformHeight;
	var pWidth = Ti.Platform.displayCaps.platformWidth;
	//800
	if(QUIZ_CHOICE == 1){
		self.backgroundImage = getImagesPath('chapter_quiz_bg_1.png');
		self.add(x);
		fourChoices(QuizObj);
	}
	else if(QUIZ_CHOICE == 2){
		if(pHeight>=568 ){
			self.backgroundImage = getImagesPath('chapter_quiz_bg_2_i5.png');
		}else{
			self.backgroundImage = getImagesPath('chapter_quiz_bg_2.png');
		}
		
		self.add(x);
		fiveChoices(QuizObj);
	}
	else{
		alert('Quiz Choice Not Found!');
	}
	
	// function that make four item-choice buttons
	function fourChoices(QuizObj){
		var b1 = Titanium.UI.createButton({
			buttonId: 1,
			id: QuizObj.questions[0].id,
			left: '7dp',
			height:'60dp',
			width:'60dp',
			top: '355dp',
		    backgroundImage:getImagesPath('1_b.png')
		});
		buttonPool[QuizObj.questions[0].id] = b1;
		b1.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b2 = Titanium.UI.createButton({
			buttonId: 2,
			id: QuizObj.questions[1].id,
			left: '83dp',
			height:'60dp',
			width:'60dp',
			top: '355dp',
		    backgroundImage:getImagesPath('2_b.png')
		});
		buttonPool[QuizObj.questions[1].id] = b2;
		b2.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b3 = Titanium.UI.createButton({
			buttonId: 3,
			id: QuizObj.questions[2].id,
			left: '165dp',
			height:'60dp',
			width:'60dp',
			top: '355dp',
		    backgroundImage:getImagesPath('3_b.png')
		});
		buttonPool[QuizObj.questions[2].id] = b3;
		b3.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b4 = Titanium.UI.createButton({
			buttonId: 4,
			id: QuizObj.questions[3].id,
			left: '248dp',
			height:'60dp',
			width:'60dp',
			top: '355dp',
		    backgroundImage:getImagesPath('4_b.png')
		});
		buttonPool[QuizObj.questions[3].id] = b4;
		b4.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		self.add(b1);
		self.add(b2);
		self.add(b3);
		self.add(b4);
	}
	//resize image if height greater than 568
	
	// function that make five item-choice buttons
	function fiveChoices(QuizObj){
		var bth;
		//adjust height of button in samsung
		if(pHeight>=568){
			bth='60dp';
		}else{
			bth='60dp';
		}
		var b1 = Titanium.UI.createButton({
			buttonId: 1,
			id: QuizObj.questions[0].id,
			left: '0',
			height:bth,
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
		    backgroundImage:getImagesPath('1_b.png')
		});
		buttonPool[QuizObj.questions[0].id] = b1;
		b1.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b2 = Titanium.UI.createButton({
			buttonId: 2,
			id: QuizObj.questions[1].id,
			left: '20%',
			height:bth,
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
		    backgroundImage:getImagesPath('2_b.png')
		});
		buttonPool[QuizObj.questions[1].id] = b2;
		b2.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b3 = Titanium.UI.createButton({
			buttonId: 3,
			id: QuizObj.questions[2].id,
			left: '40%',
			height:bth,
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
		    backgroundImage:getImagesPath('3_b.png')
		});
		buttonPool[QuizObj.questions[2].id] = b3;
		b3.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b4 = Titanium.UI.createButton({
			buttonId: 4,
			id: QuizObj.questions[3].id,
			left: '60%',
			height:bth,
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
		    backgroundImage:getImagesPath('4_b.png')
		});
		buttonPool[QuizObj.questions[3].id] = b4;
		b4.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		var b5 = Titanium.UI.createButton({
			buttonId: 5,
			id: QuizObj.questions[4].id,
			left: '80%',
			height:bth,
			width:'20%',
			bottom:(IS_ANDROID)?'2dp':'5dp',
		    backgroundImage:getImagesPath('5_b.png')
		});
		buttonPool[QuizObj.questions[4].id] = b5;
		b5.addEventListener('click', function(e) {
			displayAnswer(e);
		});
		
		self.add(b1);
		self.add(b2);
		self.add(b3);
		self.add(b4);
		self.add(b5);
	}
	
	
	// function that displays the correct and incorrect answers
	// displays swipe image
	// displays quiz commentary button
	function displayAnswer(e){

		if (self.answerFlg) { return; } self.answerFlg = true;
		// check correct
		var correct = winParamObj.quiz_obj.getCorrect(e.source.id);
		// display correct
		var b = buttonPool[QuizObj.answer_id];
			b.backgroundImage = getImagesPath(b.buttonId +"_bs.png");
		// display incorrect
		if (!correct) {
			var b = buttonPool[e.source.id];
			b.backgroundImage = getImagesPath(b.buttonId +"_bx.png");
		}
		// create swipe image
		var swipe = Titanium.UI.createImageView({
			image:getImagesPath('swipe.png'),
			top:'142dp',
			left:'205dp',
			width: '93dp',
			height:'47dp'
		});
		x.add(swipe);
		// create quiz commentary button
		var comment = Titanium.UI.createButton({
			backgroundImage:getImagesPath('commentary_new.png'),
			bottom:'118dp',
			left:'184dp',
			width:'116dp',
			height:'28dp',
			zIndex: 3
		});
		if (Ti.Platform.osname !=='iphone') {
			comment.backgroundSelectedImage = getImagesPath('commentary_selected_new.png');
		}
		comment.addEventListener('click', function(e) {
			var param = new (require('common/WindowParam'))('QuizCommentaryView');
			//param.quiz_obj = null;
			param.quiz_obj = winParamObj.quiz_obj;
			param.newnav = true; 
			showNextWindow(param); 
			closeWindow(winParamObj);
		});
		self.add(comment);
	}
	
	return self;
};
module.exports = QuizSelectOneView;