/**
 * Commentary Window
 */
function CommentaryWindow(GLOBAL,navi,quizView,questionnaireObj,selectedAnswer,loading) {
	Ti.API.info(JSON.stringify(questionnaireObj));
	var self = Ti.UI.createWindow({
		exitOnClose:false,
		title:'解説',
		backgroundImage:GLOBAL.BG_PATH
	});
	self.addEventListener('postlayout',function(e){
		loading.hideLoading();
	});
	
	var selfView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundImage:GLOBAL.IMG_PATH + 'commentary_bg.png'
	});
	self.add(selfView);
	
	if(GLOBAL.DEVICE_HEIGHT < 800){
		if(GLOBAL.DEVICE_HEIGHT==568 && GLOBAL.DEVICE_WIDTH==320){//if iphone5 size
			var btm = '115dp';
		}else{//if normal iphone4 size
			var btm ='95dp';
		}
	}else{//if android Samsung S3 like height
		var btm ='110dp';
	}
	
	var selfScrollView = Ti.UI.createScrollView({
		showVerticalScrollIndicator:true,
		contentHeight:Ti.UI.SIZE,
		contentWidth:Ti.UI.SIZE,
		top:'15dp',
		left: '13dp',
		right: '13dp',
		bottom:btm,
		layout:'vertical'
	});
	selfView.add(selfScrollView);
	
	var Reviewer = require('controllers/Reviewer');
	var reviewer = new Reviewer();
	reviewer.setAsCommentary(GLOBAL,selfScrollView,[questionnaireObj],[selectedAnswer]);
	
	var btnQuiz = Titanium.UI.createButton({
		backgroundImage:GLOBAL.IMG_PATH + 'commentary_b1_long.png',
		top:'81%',
		width:'246dp',
		height:'20%',
		customClickFlag:false
	});
	if (GLOBAL.IS_ANDROID) {
		btnQuiz.backgroundSelectedImage = GLOBAL.IMG_PATH + 'commentary_b1_long_selected.png';
	}
	btnQuiz.addEventListener('click',function(e){
		if(!e.source.customClickFlag){
			quizView.fireEvent('afterComment');
			if(GLOBAL.IS_ANDROID){
				navi.close(self,{animated:true});
				navi.isComment = false;
			}else{
				self.close();
			}
			//custom flag for trapping only once action
			e.source.customClickFlag = true;
		}
	});
	selfView.add(btnQuiz);
	
	if(GLOBAL.IS_ANDROID){
		var customNavBar = Ti.UI.createView({
			top:0,
			width: Ti.UI.FILL,
			height: '44dp',
			backgroundColor: '#546C90'
		});
		var lblTitle = Ti.UI.createLabel({
			text: '解説',
			color: 'white',
			font:{fontSize:'20dp',fontWeight:'BOLD'}
		});
		customNavBar.add(lblTitle);
		selfView.top='44dp';
		self.add(customNavBar);
		
	}else{
		
	}
	
	return self;
}

module.exports = CommentaryWindow;