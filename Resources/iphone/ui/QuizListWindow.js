/**
 * QuizListWindow for iPhone
 */
function QuizListWindow(iphoneNav) {
	var title= ['生化学過去問 1-20','生化学過去問 21-40','生化学過去問 41-60','生化学過去問 61-80','生化学過去問 81-100','生化学過去問 101-120','生化学過去問 121-140','生化学過去問 141-161'];
	var self = Ti.UI.createWindow({
		title:'問題の選択',
		backgroundImage:BG_PATH
	});
	
	var rowData = [];
	
	for (var i=0;i<title.length;i++){
		//　create row
		var row = Ti.UI.createTableViewRow({
			id:i+1,
			height:'45dp',
			selectedBackgroundColor:'#015FE7',
			backgroundColor:'#FFFFFF'
		});
		row.add(Ti.UI.createLabel({
			color:'#3F0000',
			text: title[i],
			font:{fontSize:'20dp',},
			top: '12dp',
			left: '10dp',
			height: 'auto',
			touchEnabled: false
		}));
		row.add(Ti.UI.createImageView({
			image:IMG_PATH + 'arrow.png',
			right:0, bottom: 0,
			width:20, height: 20,
			touchEnabled: false
		}));
		row.addEventListener('click', function(e){
			var QuizWindow = require('ui/QuizWindow');
			var quizWindow = new QuizWindow(e.source.children[0].text);
			iphoneNav.open(quizWindow,{animated:true});
		});
		
		rowData.push(row);
	}
	
	// create table for quiz chapter list
	var tableView = Ti.UI.createTableView({
		backgroundColor:'white',
		separatorColor: '#E0E0E0',
		data: rowData
	});
	
	self.add(tableView);
	
	return self;
}
module.exports = QuizListWindow;