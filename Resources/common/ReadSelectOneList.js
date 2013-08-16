
function ReadSelectOneList () {
	if (Ti.Platform.osname!=='iphone') {Ti.include('../common/common.js');}
	
	this.now_step = 1;
	this.end_step = 14;
	
	var self = this;
	
	this.getNextPage = function() {
		self.now_step++;
	};
	
	this.getPrevPage = function() {
		self.now_step--;
	};
	
	this.getPage = function(i){
		self.now_step = i;
	};

	return self;
}
module.exports = ReadSelectOneList;