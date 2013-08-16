function WindowParam(view_file) {
	
	this.title;

	this.newnav = false;

	this.right_button;

	this.parent_window;

	this.window_file = 'ti_windows/BaseWindow';
	
	this.view_file;

	this.quiz_obj;

	this.quiz_yasai_level;

	this.parent_category_id;

	var self = this;
	this._init = function(view_file){
		self.view_file = 'ti_windows/' + view_file;
		return self;
	};
	return this._init(view_file);
}
module.exports = WindowParam;