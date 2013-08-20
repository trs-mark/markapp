/**
 * Window Navigation Controller
 */

function Navigator(GLOBAL,baseWindow) {
	var navi = {};
	if (GLOBAL.IS_ANDROID){
		//custom navigation controller for android
		var opening = function(win,animation){
			navi.stack.push(win);
			win.open();
		};
		var retryOpening = function(win,animation){
			if(navi.stack.length > 0){
				var resultWin = navi.stack.pop();
				var quizWin = navi.stack.pop();
				navi.isResult = false;
			}
			navi.stack.push(win);
			win.open();
			if(quizWin){
				quizWin.close();
			}
			if(resultWin){
				resultWin.close();
			}
		};
		var closing = function(win,animation){
			if(win){
				win.close();
				if(navi.stack.length > 0){
					navi.stack.pop();
				}
			}else{
				if(navi.stack.length > 0){
					if(navi.isInfo){
						//if info webview current window just normal close
						var lastWin = navi.stack.pop();
						lastWin.close();
						navi.isInfo = false;
						return false;
					}
					//if current window is quiz, do not let close immediately
					if(navi.isQuiz){
						var confirm = Titanium.UI.createAlertDialog({ 
							message: '学習を終了しますか？',
							buttonNames: ['OK','キャンセル'],
							cancel: 1 
						});
						confirm.addEventListener('click',function(event){
							if(event.index == 0){ 
								//if comment window is opened, remove it from stack and close it as well
								if(navi.isComment){
									var commentWindow = navi.stack.pop();
									var quizWindow = navi.stack.pop();
									quizWindow.close();
									commentWindow.close();
									navi.isComment = false;
									navi.isQuiz = false;
								}else{
									var lastWin = navi.stack.pop();
									lastWin.close();
									navi.isQuiz = false;
								}
							}
						});
						confirm.show();
					}else{
						//double pop if it is result page
						if (navi.isResult){
							var resultWin = navi.stack.pop();
							var quizWin = navi.stack.pop();
							quizWin.close();
							resultWin.close();
							navi.isResult = false;
						}else{//normal window closing
							var lastWin = navi.stack.pop();
							lastWin.close();
						}
					}
				}else{
					return true;
				}
			}
		};
		navi = {
			stack: [],
			isResult: false,
			isQuiz: false,
			isComment: false,
			isInfo: false,
			open : opening,
			retryOpen: retryOpening,
			close : closing
		};
	}else{
		navi = Titanium.UI.iPhone.createNavigationGroup({
			window: baseWindow
		});
	}
	return navi;
}

module.exports = Navigator;