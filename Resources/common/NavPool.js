function NavPool() {

	var navList = new Array();

	var key = 0;

	this.addNav = function (nav) {
		key = navList.length;
		navList[key] = nav;
	}

	this.getNav = function (nav) {
		return navList[key];
	}

	this.removeNav = function () {
		navList.splice(key, 1);
		key --;
	}
}
module.exports = NavPool;