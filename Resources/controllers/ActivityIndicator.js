/**
 * Activity Indicator
 */

function ActivityIndicator() {
}

//activitiy indicator reference
ActivityIndicator.prototype.loading = null;
//osname of device
ActivityIndicator.prototype.osname = Ti.Platform.osname;

/**
 * Creates activity indicator with message
 * @param {Ti.UI.window} win
 * @param {String} message
 * @param {float} transparency
 */
ActivityIndicator.prototype.createActInd = function(win, message, transparency){
	var actInd = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		height:'100dp',
		font: {fontSize:'20dp',fontWeight:'bold'},
		"message":message,
		color:'white'
	});
	var vCover = Ti.UI.createView({
		backgroundColor:'#4C4C4C',
		opacity: transparency,
		zIndex:1
	});
	if(ActivityIndicator.prototype.osname==='iphone' || ActivityIndicator.prototype.osname==='ipad'){
		vCover.add(actInd);
		win.add(vCover);
	}
	return [vCover,actInd];
};

/**
 * Show activity indicator
 * @param {Ti.UI.window} win
 * @param {String} message
 * @param {float} transparency
 */
ActivityIndicator.prototype.showLoading = function(win, message,transparency){
	ActivityIndicator.prototype.loading = ActivityIndicator.prototype.createActInd(win, message, transparency);
	if(ActivityIndicator.prototype.osname==='iphone' || ActivityIndicator.prototype.osname==='ipad'){
		ActivityIndicator.prototype.loading[0].visible = true;
	}
	ActivityIndicator.prototype.loading[1].show();
};
	
/**
 * Hide actity indicator
 */
ActivityIndicator.prototype.hideLoading = function(){
	if(ActivityIndicator.prototype.loading){
		if(ActivityIndicator.prototype.osname==='iphone' || ActivityIndicator.prototype.osname==='ipad'){
			ActivityIndicator.prototype.loading[0].visible = false;
		}
		ActivityIndicator.prototype.loading[1].hide();
	};
};
module.exports = ActivityIndicator;