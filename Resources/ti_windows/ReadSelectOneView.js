function ReadSelectOneView(winParamObj) {
	
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	// create read select one view
	var windowTitle = '第１章　'+ winParamObj.quiz_obj.now_step +'/' + winParamObj.quiz_obj.end_step;
	winParamObj.parent_window.title = windowTitle;
	var self = Ti.UI.createScrollableView({
		backgroundColor:'transparent',
		parent_window_title: windowTitle,
		parent_window_rightbutton : null
	});
	
	// set parent window
	Ti.App.closeParentWindow = winParamObj;
	
	// create left button in navigation bar to quit read
	addReturnButton(winParamObj, self, '戻る');
	
	var src = winParamObj.toSource;
	// create right button in navigation bar for memo list
	addMemoListButton(winParamObj, self, src);
	
	var dbtapScrollFlag = false;
	var scrollViewList = new Array();
	var imgList = [ "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", "1-9", "1-10", "1-11", "1-12", "1-13", "1-14" ];
	for (var i=0; i < imgList.length; i++) {
		if (Ti.Platform.osname === 'iphone'){
			
			// create container for image when zoom
			var scrollView = Titanium.UI.createScrollView({
				contentWidth:'auto',
				contentHeight:'auto',
				top:0,
				showVerticalScrollIndicator:true,
				showHorizontalScrollIndicator:true,
				maxZoomScale:3,
				minZoomScale:1,
				disableBounce: true,
				height:'417dp',
				scrollViewIndex:i
			});
			
			// create container for image
			var imageView = Ti.UI.createView({
			    backgroundImage: getImagesPath(imgList[i] + ".jpg"),
			    width:'320dp',
				height:'416dp',
				imageViewIndex:i
			});
			scrollView.add(imageView);
			
			// when double tap, zoom 
			scrollView.addEventListener('doubletap', function(e){
				var index = e.source.imageViewIndex;
			    if (scrollViewList[index].zoomScale == 3) {
			    	scrollViewList[index].zoomScale = 1;
			    	dbtapScrollFlag = false;
			    } else {
			    	dbtapScrollFlag = true;
			    	scrollViewList[index].zoomScale = 3;
			    	var newX = 640 * e.x / 320;
			    	var newY = 868 * e.y / 416;
			    	scrollViewList[index].scrollTo(newX, newY);
			    }
			});
			
			// displays/hides menu bar and arrows
			scrollView.addEventListener('scale', function(e){
				var index = e.source.scrollViewIndex;
				if (e.source.zoomScale == 1) {
					scrollViewList[index].showMenu();
					scrollViewList[index].showArrow(index, scrollViewList.length);
				} else {
					scrollViewList[index].hideMenu();
					scrollViewList[index].hideArrow();
				}
			});
			
			// checks view source
			if(src == 'ti_windows/QuizCommentaryView' || src == 'ti_windows/QuizSelectResultView' || src == 'ti_windows/QuizHistoryDetailView'){
				var no = i+1;
				twoButton(winParamObj, scrollView, no);
				arrow(scrollView);
			}
			if(src == 'ti_windows/ReadChapterListView'){
				var no = i+1;
				threeButton(winParamObj, scrollView, no);
				arrow(scrollView);
			}
			
			// check from add memo view
			if(src == 'ti_windows/AddMemoView3'){
				var no = i+1;
				threeButton(winParamObj, scrollView, no);
				arrow(scrollView);
			}
			if(src == 'ti_windows/AddMemoView2'){
				var no = i+1;
				twoButton(winParamObj, scrollView, no);
				arrow(scrollView);
			}
			
		
			scrollViewList.push(scrollView);
		}
		else
		{ 
			// create container for image
			var view = Ti.UI.createView({
				width:'320dp',
				height:'416dp'
			});
			
			// create image that can scale and enable zoom
			var imageView = Ti.UI.createImageView({
			    image: getImagesPath(imgList[i] + ".jpg"),
				imageViewIndex:i,
				width:'auto',
				height:'auto',
				canScale: true,
				enableZoomControls: true,
				keepScreenOn: true
			});
			view.add(imageView);
			
			// checks view source			
			if(src == 'ti_windows/QuizCommentaryView' || src == 'ti_windows/QuizSelectResultView'){
				var no = i+1;
				twoButton(winParamObj, view, no);
				arrow(view);
			}
			if(src == 'ti_windows/ReadChapterListView'){
				var no = i+1;
				threeButton(winParamObj, view, no);
				arrow(view);
			}
			
			// check from add memo view
			if(src == 'ti_windows/AddMemoView3'){
				var no = i+1;
				threeButton(winParamObj, view, no);
				arrow(view);
			}
			if(src == 'ti_windows/AddMemoView2'){
				var no = i+1;
				twoButton(winParamObj, view, no);
				arrow(view);
			}
			
			scrollViewList.push(view);
		}
	}
	
	// determines the page number and gives the image its standard size when scroll
	self.addEventListener('scrollEnd', function(e) {
	    i = e.currentPage + 1;
	    if(e.currentPage == null){return;}
	    scrollViewList[e.currentPage].zoomScale = 1;
	    pageNo(winParamObj, i);
	    memoAlert(winParamObj, i);
	});
	
	self.views = scrollViewList;
	
	// setting the image to its current page
	for (var i=0; i < winParamObj.quiz_obj.end_step; i++) {
	var o = i+1;
		if(winParamObj.quiz_obj.now_step == o){
			self.setCurrentPage(i);
		}
	}
	
	return self;
};
module.exports = ReadSelectOneView;

// gets the page number for title bar
function pageNo(winParamObj, i){
	winParamObj.quiz_obj.getPage(i);
	if (Ti.Platform.osname === 'iphone') {
		Ti.App.thisTarget.window.title = '第１章　'+ i +'/' + winParamObj.quiz_obj.end_step;
	}
	else{
		winParamObj.parent_window.title = '第１章　'+ i +'/' + winParamObj.quiz_obj.end_step;
  	}
  	
}

// creates the arrow images	
function arrow(sv){
	var left = Titanium.UI.createImageView({
		image:getImagesPath('left_arrow.png'),
		left: '5dp',
		width:'50dp',
		height:'50dp',
		top: '160dp',
		zIndex: 2,
		visible: false
	});
	sv.add(left);
	
	var right = Titanium.UI.createImageView({
		image:getImagesPath('right_arrow.png'),
		right: '5dp',
		width:'50dp',
		height:'50dp',
		top: '160dp',
		zIndex: 2,
		visible: false
	});
	sv.add(right);
	
	// hide the arrow images
	sv.hideArrow = function() {
		left.hide();
		right.hide();
	}
	
	// show the arrow images
	sv.showArrow = function(index, allCount) {
		var thisPage = index + 1;
		if (thisPage == 1){
			left.hide();
			right.show();
		}
		else if(thisPage == allCount){
			right.hide();
			left.show();
		}
		else if(thisPage >= 1 || thisPage <= allCount){
			left.show();
			right.show();
		}
		else{
			left.hide();
			right.hide();
		}
	}
	
}

// create the three-button menu bar	
function threeButton(winParamObj, sv, i){
	var btn_bg = Titanium.UI.createImageView({
		image:getImagesPath('read_btn_bg.png'),
		width:'320dp',
		height:'50dp',
		zIndex: 2
	});
	sv.add(btn_bg);
	// create add memo button
	var b1 = Titanium.UI.createButton({
		buttonId: 1,
		left: '5dp',
		height:'50dp',
		width:'100dp',
		top: '366dp',
	    backgroundImage:getImagesPath('read_btn_add.png'),
		zIndex: 2
	});
	if (Ti.Platform.osname !=='iphone') {
		b1.backgroundSelectedImage = getImagesPath('read_btn_add_selected.png');
	}
	b1.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('AddMemoView');
		
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		param.toSource = 3; 
		param.quiz_obj.now_step = winParamObj.quiz_obj.now_step;
		showNextWindow(param);
	});
	sv.add(b1);
	
	// create view memo button
	var b2 = Titanium.UI.createButton({
		buttonId: 2,
		height:'50dp',
		width:'100dp',
		top: '366dp',
		backgroundImage: getImagesPath('read_btn_view.png'),
		zIndex: 2
	});
	if (Ti.Platform.osname !=='iphone') {
		b2.backgroundSelectedImage = getImagesPath('read_btn_view_selected.png');
	}
	Ti.App.memoAlert = b2;
	memoAlert(winParamObj, i);
	
	b2.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('ViewMemoView');
		
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		param.quiz_obj = winParamObj.quiz_obj;
		param.newnav = true; 
		showNextWindow(param);
	});
	sv.add(b2);
	
	// create quiz button
	var b3 = Titanium.UI.createButton({
		buttonId: 3,
		left: '217dp',
		height:'50dp',
		width:'100dp',
		top: '366dp',
	    backgroundImage:getImagesPath('read_btn_quiz.png'),
	    zIndex: 2
	});
	if (Ti.Platform.osname !=='iphone') {
		b3.backgroundSelectedImage = getImagesPath('read_btn_quiz_selected.png');
	}
	b3.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true; 
		var param = new (require('common/WindowParam'))('QuizSelectOneView');
		
		param.quiz_obj = new (require('common/QuizSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		showNextWindow(param); 
	});
	sv.add(b3);
	
	if (Ti.Platform.osname === 'iphone') {
		btn_bg.top = '367dp';
		b1.top = '366dp';
		b2.top = '366dp';
		b3.top = '366dp';
	}
	else{
		btn_bg.top = '0dp';
		b1.top = '2dp';
		b2.top = '2dp';
		b3.top = '2dp';
  	}
	
	sv.showMenu = function() {
		btn_bg.show();
		b1.show();
		b2.show();
		b3.show();
	}
	sv.hideMenu = function() {
		btn_bg.hide();
		b1.hide();
		b2.hide();
		b3.hide();
	}
}

// create two-button menu bar
function twoButton(winParamObj, sv, i){
	var btn_bg = Titanium.UI.createImageView({
		image:getImagesPath('read_btn_bg2.png'),
		width:'320dp',
		height:'50dp',
		zIndex: 2
	});
	sv.add(btn_bg);
	
	// create add memo button
	var b1 = Titanium.UI.createButton({
		buttonId: 1,
		left: '33dp',
		height:'50dp',
		width:'100dp',
	    backgroundImage:getImagesPath('read_btn_add.png'),
		zIndex: 2
	});
	if (Ti.Platform.osname !=='iphone') {
		b1.backgroundSelectedImage = getImagesPath('read_btn_add_selected.png');
	}
	b1.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('AddMemoView');
		
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		if (param.quiz_obj == false) { return; }
		param.newnav = true; 
		param.toSource = 2; 
		param.quiz_obj.now_step = winParamObj.quiz_obj.now_step;
		showNextWindow(param);
	});
	sv.add(b1);
	
	// create view memo button
	var b2 = Titanium.UI.createButton({
		buttonId: 1,
		left: '193dp',
		height:'50dp',
		width:'100dp',
	    backgroundImage:getImagesPath('read_btn_view.png'),
		zIndex: 2
	});
	if (Ti.Platform.osname !=='iphone') {
		b2.backgroundSelectedImage = getImagesPath('read_btn_view_selected.png');
	}
	Ti.App.memoAlert = b2;
	memoAlert(winParamObj, i);
	
	b2.addEventListener('click', function(e) {
		if (Ti.App.OnceSelectedFlag) {return;} Ti.App.OnceSelectedFlag = true;
		var param = new (require('common/WindowParam'))('ViewMemoView');
		
		param.quiz_obj = new (require('common/ReadSelectOneList'))();
		param.quiz_obj = winParamObj.quiz_obj;
		param.newnav = true; 
		showNextWindow(param);
	});
	sv.add(b2);
	
	if (Ti.Platform.osname === 'iphone') {
		btn_bg.top = '367dp';
		b1.top = '366dp';
		b2.top = '366dp';
	}
	else{
		btn_bg.top = '0dp';
		b1.top = '2dp';
		b2.top = '2dp';
  	}
	
	sv.showMenu = function() {
		btn_bg.show();
		b1.show();
		b2.show();
	}

	sv.hideMenu = function() {
		btn_bg.hide();
		b1.hide();
		b2.hide();
	}
}
