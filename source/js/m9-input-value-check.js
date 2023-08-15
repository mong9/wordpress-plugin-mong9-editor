
/******************************
*  기능 :  정규 표현식 사용	*
*  수정일 : 2005-02-08		*
*  parameter : field,pattern,flag	*
*******************************/

function _RegExp(input,pattern,flag){

	var str = (m9_get_object(input)) ? input.value : input;
	//var str=input.value;
	var re=RegExp(pattern,flag);

	if(re.test(str)){
		return true;
	}
	return false;

}

/******************************
*  기능 :  입력값이 NULL인지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isNull(input) {
    if (input.value == null || input.value == "") {
        return true;
    }
    return false;
}

/******************************
*  기능 :  입력값에 스페이스 이외의 의미있는 값이 있는지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isEmpty(input) {
    if (input.value == null || input.value.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}

/******************************
*  기능 :  입력값이 코드에 적합한지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isCode(input){
	return _RegExp(input,"^[0-9A-Za-z_]+$","gi");
}

/******************************
*  기능 :  입력값이 숫자로 구성되어 있는지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isNum(input){
	return _RegExp(input,"^[0-9]+$","gi");
}

function isInt(input){
	return _RegExp(input,"^[-0-9]+$","gi");
}

/******************************
*  기능 :  입력값이 알파벳로 구성되어 있는지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isAlpabet(input){
	return _RegExp(input,"^[A-Za-z]+$","gi");
}

/******************************
*  기능 :  입력값이 이메일 형식인지 체크*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function isEmail(input) {

	 var pattern1="(@.*@)|(\\.\\.)|(@\\.)|(^\\.)";
	 var pattern2="^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$";

	if(!(_RegExp(input,pattern1,"")) && (_RegExp(input,pattern2,""))){
		return true;
	}
	return false;
}

/******************************
*  기능 :  입력값의 바이트 길이를 리턴*
*  수정일 : 2005-02-08		*
*  parameter : field		*
*******************************/

function getByteLength(input) {
	var byteLength = 0;
	for (var i=0; i<input.value.length;i++){
		var oneChar=escape(input.value.charAt(i));
		if(oneChar.length == 1 ){
			byteLength ++;
		}else if(oneChar.indexOf("%u") != -1){
			byteLength += 2;
		}else if(oneChar.indexOf("%") != -1){
			byteLength += oneChar.length/3;
		}
	}
	return byteLength;
}

var input_box = {

	_settime : null,
	_target : false,
	_add : 0,
	_setting : {
		'max' : 20, // 최대값
		'min' : 0, // 최소값
		'num' : 1 // 증감값
	},
	_objs : {},
	_functions : {},
		
	plus : function(Did,Doptions,Dfunction) {
		
		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }

		if (!input_box._objs[Did]) {
			if (jQuery(Cid).prop("tagName").toLowerCase() == "select") {
				Doptions = { 'max' : Cid.options.length - 1 , 'min' : 0 , 'num' : 1 };
			}
			input_box._objs[Did] = m9_get_vars(Doptions,input_box._setting);			
		}
		if (!input_box._functions[Did]) { input_box._functions[Did] = Dfunction; }
			
		input_box._target = Did;
		input_box._add = 1;
		input_box._num_add();
		//input_box._settime = window.setInterval(input_box._num_add,500);
	},

	minus : function(Did,Doptions,Dfunction) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }

		if (!input_box._objs[Did]) {
			if (jQuery(Cid).prop("tagName").toLowerCase() == "select") {
				Doptions = { 'max' : Cid.options.length - 1 , 'min' : 0 , 'num' : 1 };
			}
			input_box._objs[Did] = m9_get_vars(Doptions,input_box._setting);			
		}
		
		if (!input_box._functions[Did]) { input_box._functions[Did] = Dfunction; }
						
		input_box._target = Did;
		input_box._add = -1;
		input_box._num_add();		
		//input_box._settime = window.setInterval(input_box._num_add,500);
		
	},

	stop : function(Did) {
		clearInterval(input_box._settime);	
		input_box._target = false;		
	},

	change_options : function(Did,Doptions) {
		if (input_box._objs[Did]) {
			input_box._objs[Did] = m9_get_vars(Doptions,input_box._objs[Did]);						
		} else {
			input_box._objs[Did] = m9_get_vars(Doptions,input_box._setting);	
		}
	},
	set_plus_event : function(Did,Dtarget,Doptions) {
		
		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }

		var Ctarget = m9_get_object(Dtarget);
		if (!Ctarget) { return false; }

		jQuery("#"+Did).live("mousedown",function() {
			input_box.plus(Dtarget,Doptions);
		});
		jQuery("#"+Did).live("mouseup",function() {
			input_box.stop(Dtarget);
		});
						
	},

	set_minus_event : function(Did,Dtarget,Doptions) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }

		var Ctarget = m9_get_object(Dtarget);
		if (!Ctarget) { return false; }
		
		jQuery("#"+Did).live("mousedown",function() {
			input_box.minus(Dtarget,Doptions);
		});
		jQuery("#"+Did).live("mouseup",function() {
			input_box.stop(Dtarget);
		});
		
	},
					
	_num_add : function() {

		if (!jQuery("#"+input_box._target)) { return false; }

		var box_type = jQuery("#"+input_box._target).prop("tagName");//.toString().toLowerCase();
		if (!box_type) { input_box.stop();return false; }
		box_type = box_type.toLowerCase();

		var _var = (box_type == "select") ? jQuery("#"+input_box._target).prop('selectedIndex') : jQuery("#"+input_box._target).val();

		var Ds = input_box._objs[input_box._target];
		var Dvar = roundXL((_var * 1) + ((input_box._add * 1) * (Ds['num'] * 1)),2); // 소숫점 2자리까지
		if (Dvar <= Ds['min']*1) {
			Dvar = Ds['min'];		
		} else if (Dvar >= Ds['max']*1) {
			Dvar = Ds['max'];				
		}

		if (box_type == "select") {
			if (jQuery("#"+input_box._target).children('option').length <= 1) { return false; }
			jQuery("#"+input_box._target).prop('selectedIndex',Dvar);
		} else {
			jQuery("#"+input_box._target).val(Dvar);		
		}
		
		if (input_box._functions[input_box._target]) {
			input_box._functions[input_box._target]();
		}
	}

};