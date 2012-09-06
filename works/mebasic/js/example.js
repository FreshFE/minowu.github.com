/*

Example Document

*/


$(document).ready(function(){
	
	//Confirm Dialog
	$('a[js="confirm"]').click(function(){
		$.confirm({
			'title'		: '确认删除',
			'message'	: '您确定要删除该内容？<br />此操作不可撤销。',
			'buttons'	: {
				'删除'	: {
					'class'	: 'blue',
					'action': function(){
						alert('删除演示');
					}
				},
				'取消'	: {
					'class'	: 'gray',
					'action': function(){}
				}
			}
		});
		return false;
	});
	
	//Datepiker
	$('input[js="datepicker"]').datepicker({format: 'yyyy-mm-dd'});
	
});