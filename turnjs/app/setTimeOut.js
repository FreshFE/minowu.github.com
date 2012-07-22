window.objTimeoutFuncs  = [];
window.objTimeoutIds =  [];

function objTimeout(obj,func,time,id){
	window.objTimeoutFuncs[id] = function(){
		func.call(obj);
	}

	window.objTimeoutIds[id] =  setTimeout('objTimeoutFuncs[\''+ id +'\']()',500);
}


function clearObjTimeout(id){
	clearTimeout(window.objTimeoutIds[id]);
}

function  Person(nameArg,genderArg){
	this.name = nameArg;
	this.gender = genderArg;
	this.showInfo = function(){
		var str = '姓名：' +  this.name + ',性别：' + this.gender;
		alert(str); 
	};
	this.delayInfo = function(){
		objTimeout(this,this.showInfo,500,this.name);
	};
}

var cainiao = new  Person('chenzhe','male');
cainiao.delayInfo();