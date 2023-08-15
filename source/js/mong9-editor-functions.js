var storedSelections = false;

// 드래그영역 객체 가져오기
function getSelectionStartNode(){
	var node, selection;
	if (window.getSelection){ // ie9 이상 + 모든 브라우저
		selection = getSelection();
		node = selection.anchorNode; // 드래그 시작위치의 참조값
	}
	if (!node && document.selection){ // ie전용
		selection = document.selection;
		var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
		node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
	}
	if (node){
		// 노드가 텍스트이면 부모를 그렇지 않으면 자신을 리턴
		return (node.nodeName == "#text" ? node.parentNode : node);
	}
}

// 선택영역 저장
function SaveSelection() {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();	
		if (selection.rangeCount > 0) {
			storedSelections = selection.getRangeAt(0);
		}
	} else {
		if (document.selection) {   // Internet Explorer
			var range = document.selection.createRange();
			storedSelections = range.getBookmark();
		}
	}
	return storedSelections;
}

// 선택영역 재설정
function RestoreSelection(obj) {
	var _target = false;
	if (obj) {
		_target = obj;
	} else if (!storedSelections) {
		return false;
	} else {
		_target = storedSelections;
	}

	if (!_target) { return false; }

	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();                                        
		selection.removeAllRanges();
		selection.addRange(_target);
	} else {
		if (document.body.createTextRange) {    // Internet Explorer
			var rangeObj = document.body.createTextRange();
			rangeObj.moveToBookmark(_target);
			rangeObj.select();
		}
	}
}

// 선택영역제거
function RemoveSelection() {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();                                        
		selection.removeAllRanges();
	} else {
		if (document.selection.createRange) {        // Internet Explorer
			var range = document.selection.createRange();
			document.selection.empty();
		}
	}
}

// 선택영역 텍스트 가져오기        
function GetSelectedText() {
	var selText = "";
	if (window.getSelection) {  // all browsers, except IE before version 9
		if (document.activeElement && (document.activeElement.tagName.toLowerCase() == "textarea" || document.activeElement.tagName.toLowerCase() == "input")) {
			var text = document.activeElement.value;
			selText = text.substring(document.activeElement.selectionStart,document.activeElement.selectionEnd);
		} else {
			var selRange = window.getSelection();
			selText = selRange.toString();
		}
	} else {
		if (document.selection.createRange) { // Internet Explorer
			var range = document.selection.createRange();
			selText = range.text;
		}
	}
	if (selText !== "") {
		return selText;
	}
	return false;
}

var Editor_Container = null;

function get_container() {

	var txt = GetSelectedText();

	var _ancestor; // 범위의 시작점과 끝점을 모두 포함하며 가장 깊게 중첩되어 있는 노드, 즉 조상인 Document 노드
	var _p_ancestor; // _ancestor의 부모 객체
              
	if (window.getSelection){ // ie 9 이상 + 다른 브라우져
		_ancestor = window.getSelection().getRangeAt(0).commonAncestorContainer;
		_p_ancestor = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
	} else if (document.selection){ // ie 전용
		_ancestor = document.selection.createRange();
		_p_ancestor = document.selection.createRange().parentElement();
	}

	var _type = 1;
	// 한 태그 안의 텍스트 일부를 드래그 했을때		
	if (jQuery(_ancestor).text() != txt) {					
		_type = 1;
		Editor_Container = jQuery(_ancestor);			
	// 한 태그 안의 텍스트 전체를 드래그 했을때             
	} else if (jQuery(_ancestor).text() == txt) {
		
		if (jQuery(_p_ancestor).is('tr,th,td,dt,dd')) {				
			_type = 1;
			Editor_Container = jQuery(_ancestor);
		} else {
			// 안에 태그가 존재할 경우	
			_type = 2;			
				Editor_Container = jQuery(_p_ancestor);
				
			if (jQuery(_ancestor).html()) {
				Editor_Container = jQuery(_ancestor);
			// 텍스트만일 경우
			} else {
				Editor_Container = jQuery(_p_ancestor);
			}
		}
		
	} else {
		_type = 3;
		Editor_Container = jQuery(_p_ancestor);			
	}
	return _type;
			
}

function SelectFirstLine(elemToSelect,_type) {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();
		var rangeToSelect = document.createRange();
		if (_type == 1) {
			rangeToSelect.selectNode(elemToSelect);
		} else {
			rangeToSelect.selectNodeContents(elemToSelect);
		}				
		selection.removeAllRanges();
		selection.addRange(rangeToSelect);
	} else {
		if (document.body.createTextRange) {    // Internet Explorer
			var rangeToSelect = document.body.createTextRange();
			rangeToSelect.moveToElementText(elemToSelect);
			rangeToSelect.select();
		}
	}
}

function InsertObj(_html) {
	var _html = jQuery(_html)[0];            
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();
		if (selection.rangeCount > 0) {
			var range = selection.getRangeAt(0);
			range.insertNode(_html);
		}
	} else {  // Internet Explorer before version 9
		var textRange = document.selection.createRange();
		textRange.collapse(true);
		textRange.pasteHTML(_html.outerHTML);	
	}
}
        
//============================================================================================//

 function error_msg(Ddata,evt,Dtime) {

	var evt_obj = false;
	if (evt) {
		evt_obj = evt;
	} else {
		evt_obj = m9_get_evt_obj();
	}

	if (!Dtime) { Dtime = 3000; }

	Ddata = Ddata.replace(/\n/g,"<br />");	

	jQuery("#m9_ajax_error_contents").html(Ddata);

	m9_layer_position("m9_ajax_error_view",evt_obj);
	m9_layer_view_only(
		"m9_ajax_error_view",
		{opacity:100,speed:'slow'},
		function(){ 
			m9_delay("ajax_error",Dtime,function(){ m9_layer_view_only_close("m9_ajax_error_view"); }); 
		}
	);

}

/////////////////////////////////////////////////////////////////////////////////////////////
// 파일 사이즈 변경
/////////////////////////////////////////////////////////////////////////////////////////////
function Get_File_Size(Csize) {
	if (Csize == "") { return 0;}
	return (parseInt(Csize / 1048576)) ? parseInt(Csize / 1048576)+(parseInt(Csize % 1048576) ? "."+(sprintf(6,parseInt(Csize % 1048576))+"").substr(0,2)+"MB" : "MB" ) : (parseInt(Csize / 1024)) ? parseInt(Csize / 1024)+(parseInt(Csize % 1024) ? "."+(sprintf(3,parseInt(Csize % 1024))+"").substr(0,2)+"KB" : "KB" ) : Csize+"bytes";
} // function

// 파일이름 얻기
function Get_FileName(Dfile) {
	Dfile = Dfile.replace(/\\/gi,"/");
	var file_layer = Dfile.split("/");
	return eval("file_layer["+(file_layer.length-1)+"]");
} // function

function remove_empty_line(_html,_type){

	var lines = _html.replace(/\r/g,'').split('\n');
	var lines_length = lines.length;
	var newlines = new Array();
	var newlines_length = 0;

	if(_type != true){		
		var _exp = new RegExp(/\S/);
		for(var x=0;x<lines_length;x++){
			if(_exp.test(lines[x]) == true){
				newlines[newlines_length] = lines[x];
				newlines_length++;
			}
		}
	} else {
		for(var x=0;x<lines_length;x++){
				if(lines[x] != ''){
					newlines[newlines_length] = lines[x];
					newlines_length++;
				}
		}
	}
	return newlines.join('\n');

}

function _get_box_info(_obj,_type) {

	var _h = {};

	if (!(_obj)) { return _h; }

	_h['w'] = get_box_size2(_obj,"width") + 'px';
	_h['h'] = get_box_size2(_obj,"height") + 'px';
		
	_h['l'] = (_type) ? (m9_getRealOffsetLeft(_obj) + 'px') : jQuery(_obj).css("left");
	_h['t'] = (_type) ? (m9_getRealOffsetTop(_obj) + 'px') : jQuery(_obj).css("top");
				
	_h['w2'] = m9_get_num(_h['w']);
	_h['h2'] = m9_get_num(_h['h']);
	_h['l2'] = m9_get_num(_h['l']);
	_h['t2'] = m9_get_num(_h['t']);
	
	return _h;			
			
}

function get_box_size2(Did,Dkind) {

	var Cid = m9_get_object(Did);
	var J_Cid= jQuery(Cid);
	
	var Cvar = 0;

	var boxSized = (J_Cid.css('box-sizing') == 'border-box') ? 1 : 0;

	if (Dkind == "height") {
		
		Cvar = J_Cid.height();
		Cvar += m9_get_num(J_Cid.css('padding-top'));			
		Cvar += m9_get_num(J_Cid.css('padding-bottom'));	
				
		if (boxSized == 1) {
			Cvar += m9_get_num(J_Cid.css('border-top-width'));			
			Cvar += m9_get_num(J_Cid.css('border-bottom-width'));				
		}
		
	} else {
		
		Cvar = J_Cid.width();
		Cvar += m9_get_num(J_Cid.css('padding-left'));			
		Cvar += m9_get_num(J_Cid.css('padding-right'));				
		if (boxSized == 1) {
			Cvar += m9_get_num(J_Cid.css('border-left-width'));			
			Cvar += m9_get_num(J_Cid.css('border-right-width'));				
		}
		
	}

	return Cvar;				
}

function get_browser_cover(){
	var _str = "";
	if (M9_SET["navigator"] == "chrome") {
		_str = "-web-kit";
	} else if (M9_SET["navigator"] == "firefox") {
		_str = "-moz";
	} else if (M9_SET["navigator"] == "opera") {
		_str = "-o";				
	}
	return _str;
}
			
function check_radio_by_value(Cid,Cvalue) {
 var Did = document.getElementsByName(Cid);
 if (!Did) { return false; }
 for (var i=0; i<Did.length;i++) {
 	if (Did[i].value == Cvalue) {
 		Did[i].checked = true;
 		return i;
 	}	
 }
  return -1;
} //function

/* 사용처없음 */
function text_diff(first, second) {
    var start = 0;
    while (start < first.length && first[start] == second[start]) {
        ++start;
    }
    var end = 0;
    while (first.length - end > start && first[first.length - end - 1] == second[second.length - end - 1]) {
        ++end;
    }
    end = second.length - end;

var yy = second.substr(start, end - start);

	var _return = {
		before : second.substr(0,start),
		html : second.substr(start, end - start),
		after : second.substr(end,second.length)
	};

	return _return;
}
/* 사용처없음 */
function remove_html(str) {

	var remove_char,output;
		
	remove_char = 	/(\n|\r)/g; // 리턴값 제거
	output = str.replace(remove_char,' ');
	remove_char = new RegExp('<!--(.*?)-->','g'); // 주석구문 제거	
	output = str.replace(remove_char,' ');
	remove_char = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');  // 각종태크 제거
	output = str.replace(remove_char,' ');

	// <script>..</script> 형식들 제거
	var remove_chars = ['style','script','applet','embed','noframes','noscript'];
	for(var i=0;i<remove_chars.length;i++){
 		remove_char = new RegExp('<'+remove_chars[i]+'.*?'+remove_chars[i]+'(.*?)>','gi');
 		output = output.replace(remove_char,' ');
	}	

	// style 제거
	var remove_chars = ['style'];
	for(var i=0;i<remove_chars.length;i++){
		remove_char = new RegExp(' '+remove_chars[i]+'="(.*?)"','gi');
		output = output.replace(remove_char,'');
	}		

	return output;
}

function ctrl_v_convert(_obj,_tag) {

	var _original = { 'a' : 1, 'span' : 1, 'strong' : 1, 'em' : 1, 's' : 1, 'sub' : 1, 'sup' : 1, 'u' : 1 , 'i' : 1, 'b' : 1 };
	var _original_h = { 'h1' : 1, 'h2' : 1, 'h3' : 1, 'h4' : 1, 'h5' : 1, 'h6' : 1 };

	var rands = {};
	var _rand = function() {
		var x = 0;
		while(x == 0) {
			var rand = parseInt(Math.random() * 10000);	
			if (!rands[rand]) {
				rands[rand] = 1;
				x++;
			}
		}
		return rand;
	};

	var change_rand = function(obj) {
		var rand = _rand();		
		rands[rand] = obj.outerHTML;
		obj.outerHTML = '[_' + rand + '_]';		
	}

	var change_rand2 = function(obj) {
		var rand = _rand2();		
		rands2[rand] = obj.outerHTML;
		obj.outerHTML = '[_' + rand + '_]';		
	}
		
	var convert_br = function(obj) {
		jQuery(obj).removeAttr('style').removeAttr('class');
		change_rand(obj);				
	};

	var convert_h = function(obj) {
		var _tag = jQuery(obj).prop("tagName").toLowerCase();
		var _class = 'm9-' + _tag;
		jQuery(obj).removeAttr('style').removeAttr('class').attr('class',_class);
		change_rand(obj);				
	};
	
	var convert_img = function(obj) {
		jQuery(obj).removeAttr('width').removeAttr('height').attr('class','m9-fullimg');
		change_rand(obj);				
	};

	var convert_table = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style').removeAttr('cellspacing').removeAttr('cellpadding').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').attr('class','table-1');
		change_rand(obj);				
	};

	var convert_ul = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style').attr('class','m9-list-style-1');
		obj = unlist_obj.convert(obj);
		change_rand(obj);				
	};

	var convert_ol = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style').attr('class','m9-list-style-1');
		obj = ollist_obj.convert(obj);
		change_rand(obj);				
	};

	var convert_empty = function(obj) {
		jQuery(obj).removeAttr('style').removeAttr('class');
		change_rand(obj);				
	};

	var convert_original = function(obj) {
		change_rand(obj);				
	};

	var obj = jQuery('<div />').html(_obj);

	// 이중리턴 아니면 리턴생성
	obj.children().find('div,p').each(function() {
		if (jQuery(this).html() != "<br>") {
			jQuery(this).after("<br>");
		}
	});

	obj.children().find('table').each(function() {

		var table_index = this;

		var thead_count = jQuery(this).find('thead').length;
			
		if (thead_count == 0) {

			jQuery(table_index).find('tbody').before('<thead></thead>');
			jQuery(table_index).find('thead').append(jQuery(table_index).find('tr')[0]);
			var ttt = jQuery(table_index).find('thead');			
			jQuery(ttt).find('th,td').each(function() {
				jQuery(this).attr('scope','col');						
				changeTag(this,'th');
			});
						
		}
				
		jQuery(table_index).find('tr').each(function() {

			var J_this = jQuery(this);
			
			J_this.removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');
							
			var th_count = J_this.find('th').length;
			if (th_count == 0) {
				var td_count = J_this.find('td').length;
				if (td_count > 1) {								
					changeTag(J_this.find('td')[0],'th');					
					jQuery(J_this.find('td')[0]).attr('scope','row');							
				}
			}
			
		});
						
		jQuery(table_index).find('td,th').each(function() {

			var J_this = jQuery(this);			
			var dd = J_this.text();
			J_this.html(dd);
			J_this.removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');		
			J_this.children().each(function() {
				if (jQuery(this).html() == "") { jQuery(this).remove(); }
				jQuery(this).removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');		
			});
			
		});
		
	});

		obj.find('br,img,table,ul,ol,a,h1,h2,h3,h4,h5,h6').each(function() {		
			var _tag_name = jQuery(this).prop("tagName").toLowerCase();
			if (_tag_name == 'img') {
				convert_img(this);
			} else if (_tag_name == 'table') {
				convert_table(this);			
			} else if (_tag_name == 'br') {
				convert_br(this);	
			} else if (_tag_name == 'ul') {
				convert_ul(this);
			} else if (_tag_name == 'ol') {
				convert_ol(this);		
			} else if (_original_h[_tag_name]) {
				convert_h(this);						
			} else if (_original[_tag_name]) {
				convert_original(this);
			}
		});	

	var _text = obj.text();

	for (var i in rands) {
		var _rand = '\\[\\_' + i + '\\_\\]';		
		_text = _text.replace(new RegExp(_rand,'gi'),rands[i]);				
	}

	// style 제거
	var remove_chars = ['style'];
	for(var i=0;i<remove_chars.length;i++){
		remove_char = new RegExp(' '+remove_chars[i]+'="(.*?)"','gi');
		_text = _text.replace(remove_char,'');
	}		
		
	obj.remove();
	return _text; 

} //function

//https://social.msdn.microsoft.com/forums/windowsapps/en-us/f91341cb-48b3-424b-9504-f2f569f4860f/getset-caretcursor-position-in-a-contenteditable-div
function getCaretPosition(element) {
	var ie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
	var w3 = (typeof window.getSelection != "undefined") && true;
	var caretOffset = 0;
	if (w3) {
		var range = window.getSelection().getRangeAt(0);
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
	} else if (ie) {
		var textRange = document.selection.createRange();
		var preCaretTextRange = document.body.createTextRange();
		preCaretTextRange.expand(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

function setCaretPos(el,sPos) {
 	
	var charIndex = 0, range = document.createRange();
	range.setStart(el, 0);
	range.collapse(true);
	var nodeStack = [el], node, foundStart = false, stop = false;

	while (!stop && (node = nodeStack.pop())) {
		if (node.nodeType == 3) {
			var nextCharIndex = charIndex + node.length;
			if (!foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
				range.setStart(node, sPos - charIndex);
				foundStart = true;
			}
			if (foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
				range.setEnd(node, sPos - charIndex);
				stop = true;
			}
			charIndex = nextCharIndex;
		} else {
			var i = node.childNodes.length;
			while (i--) {
				nodeStack.push(node.childNodes[i]);
			}
		}
	}
	selection = window.getSelection();                 
	selection.removeAllRanges();                       
	selection.addRange(range);

	SaveSelection();

}    
 
//http://www.webdeveloper.com/forum/showthread.php?74982-How-to-set-get-caret-position-of-a-textfield-in-IE
function doSetCaretPosition (oField, iCaretPos) {

	// IE Support
	if (document.selection) { 
		// Set focus on the element
		oField.focus ();
		  
		// Create empty selection range
		var oSel = document.selection.createRange ();
		  
		// Move selection start and end to 0 position
		//oSel.moveStart ('character', -oField.value.length);
		  
		// Move selection start and end to desired position
		oSel.moveStart ('character', iCaretPos);
		oSel.moveEnd ('character', 0);
		oSel.select ();
	}
	
	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0') {
		oField.selectionStart = iCaretPos;
		oField.selectionEnd = iCaretPos;
		oField.focus();
	}
}

 function placeCaretAtEnd(el) {
	if (!el) { return false; }
	el.focus();
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}

function Selection2Obj(_tag) {

	RestoreSelection(storedSelections);

	var txt = GetSelectedText();	
	if (!txt) { return false; }
	
	var _type = get_container();
	if (_type == 1) {

		document.execCommand("fontSize",false,"7");		
		jQuery(document).find("font").each(function() {		
			if (jQuery(this).attr("size") == "7") {
				jQuery(this).removeAttr("size");		
			}
		});

		get_container();
		editor._now = Editor_Container[0];
		if (!_tag) { _tag = 'span'; }
		editor._now = changeTag(editor._now,_tag);
		jQuery('.selected_tag').removeClass("selected_tag");		
		jQuery(editor._now).addClass("selected_tag");
		RemoveSelection();

	}

}

function changeTag(obj,tag) {
	
	var brefore_tag = jQuery(obj).prop('tagName');
	
	var _clone = jQuery(obj).clone();
	var _clone_in = jQuery(_clone).html();
	
	jQuery(_clone).html("");
	var _html = _clone[0].outerHTML;
	_html = _html.replace(new RegExp('<'+brefore_tag,'gi'),'<'+tag.toLowerCase()).replace(new RegExp('</'+brefore_tag,'gi'),'</'+tag.toLowerCase());        
	
	var re_obj = jQuery(_html).html(_clone_in);
	var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
	jQuery(re_obj).addClass(random_class);
	
	jQuery(obj).replaceWith(re_obj);
	
	obj = jQuery('.' + random_class)[0];
	jQuery(obj).removeClass(random_class);	
	
	return obj;	
	
}

function findAncestor(el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}

function get_is_parents(_now_obj,_get_obj,_range_obj) {

	if (!_now_obj) { return false; }
	var J_now_obj = jQuery(_now_obj);
	
	if (J_now_obj.is(_get_obj)) {
		if (_range_obj && J_now_obj.parents(_range_obj).length > 0) {
			return _now_obj;
		} else {
			return false;
		}
	} else {

		if (jQuery(_range_obj).length == 0) { _range_obj = jQuery('html')[0]; }
	
		var _parent = J_now_obj.parentsUntil(_range_obj,_get_obj);
		if (jQuery(_parent).parents(_range_obj).length > 0) {		
			return _parent[0];
		}
	}
	
	return false;
		
}

String.prototype.msg_format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var d = i + 1;
        var regexp = new RegExp('%'+d, 'gi');        
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var Msg_check = {};
function msg_msg(_code) {
	
	if (Msg[_code]) {
		if (!Msg_check[_code]) {
			Msg_check[_code] = 0;
		}
		Msg_check[_code]++;
		return Msg[_code];
	} else {
		return _code;	
	}
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function splitUnit(Dvar) { // 10px -> 10,px
	var a = Dvar.match(/^[0-9.]+/);
	var b = Dvar.match(/[A-Za-z%]+$/);
	return [a,b];
}

jQuery.union = function(a,b){return jQuery(a).add(b).get();};
jQuery.intersect = function(a,b){return jQuery.grep(a,function(i){return jQuery.inArray(i,b)>-1;});};
jQuery.complement = function(a,b){return jQuery(a).not(b).get()};
jQuery.sym_diff = function(a,b){return jQuery(arr1).add(arr2).not(jQuery.intersect(arr1,arr2)).get();};

var m9_code_editor = {

	beautify_options : {
		"indent_size": "1",
		"indent_char": "\t",
		"max_preserve_newlines": "2",
		"preserve_newlines": true,
		"keep_array_indentation": false,
		"break_chained_methods": false,
		"indent_scripts": "normal",
		"brace_style": "collapse",
		"space_before_conditional": true,
		"unescape_strings": false,
		"jslint_happy": false,
		"end_with_newline": false,
		"wrap_line_length": "0",
		"indent_inner_html": false,
		"comma_first": false,
		"e4x": false,
		"indent_empty_lines": false
	},

	'set' : function(_id,data) {

		data = html_beautify(data,m9_code_editor.beautify_options);

		var cm = jQuery('#'+_id).siblings()[0].CodeMirror;

		if (cm) {
			var doc = cm.getDoc();
			doc.markClean();

			m9_delay("",300,function() {
				doc.setValue(data);
				cm.refresh();
			});
		}

	},

	'get' : function(_id) {

		var cm = jQuery('#'+_id).siblings()[0].CodeMirror;
		var _html = '';

		if (cm) {
			var doc = cm.getDoc();
			_html = doc.getValue();
			doc.markClean();
		} else {
			_html = jQuery('#'+_id).val();

		}

		return _html;

	}

};

function checkbox_empty_all(_me,_ids) {
	var _checked = jQuery(_me).prop('checked');
	var _lists = _ids.split(',');
	for (var i=0;i<_lists.length;i++) {
		jQuery('#' + _lists[i]).prop('checked',_checked);
	}
} //function

function checkbox_empty(_me,_ids) {
	if (jQuery(_me).prop('checked') == false) {
		var _lists = _ids.split(',');
		for (var i=0;i<_lists.length;i++) {
			jQuery('#' + _lists[i]).prop('checked',false);	
		}
	}
} //function

function get_tag_name(obj) {
	return jQuery(obj).prop('tagName').toLowerCase();
}

function m9_json_stringify(_hash) {
	return JSON.stringify(_hash).replace(/\"/g,'\'');//.replace(/(^\{)|(\}*$)/g,""); // " => ' and 시작({)와 끝(}) 제거
}

function set_data_ani_type(obj,_type,_hash) {
	var _str = _type;
	if (Object.keys(_hash).length > 0) {
		_str += '('+ m9_json_stringify(_hash) + ')';
	}
	m9_set_data_var(obj,'m9-execute',_str);
}

function remove_ani_type_info(obj,_name) {

	var ani = m9_get_data_var(obj,'m9-execute');
	var re_ani = new Array();

	if (ani) {
		var _anis = ani.split(";");
		for (var m=0;m<_anis.length;m++) {
			var _ani = _anis[m];
			var prop = m9_get_property(_ani);
			if (prop[0] != _name) {
				re_ani.push(_ani);
			}
		}
		var _str = re_ani.join(';');
		m9_set_data_var(obj,'ani-type',_str);

	} // ani

}

function get_ani_type_info(obj,_name) {

	var ani = m9_get_data_var(obj,'m9-execute');

	if (ani) {
		var _anis = ani.split(";");
		for (var m=0;m<_anis.length;m++) {
			var _ani = _anis[m];
			var prop = m9_get_property(_ani);
			if (prop[0] == _name) {
				return prop[1];
			}
		}
	} // ani

	return;

}

function input_box_disabled(obj,_var) {

	if (_var) {
		jQuery(obj).addClass('disabled').attr('disabled',true);
	} else {
		jQuery(obj).removeClass('disabled').attr('disabled',false);
	}	

}


function process_M9ALT(obj) {
	jQuery(obj).find('a').each(function() {				
		jQuery(this).on('mouseover',function(e) {
			M9EVENT.mouseover(e.target);
		}).on('mouseout',function(e) {
			M9EVENT.mouseout(e.target);
		}); 
	});
}

function obj_fadeIn(obj,speed) {
	if (!speed) { speed = 300; }	
	if (m9_editor.cpu == 1) {
		jQuery(obj).css('display','');
	} else {	
		jQuery(obj).stop(true,true).fadeIn(speed,function(){ jQuery(this).css('opacity',1); }); /* 중요 */		
	}
}

function obj_fadeOut(obj,speed) {
	if (!speed) { speed = 300; }
	if (m9_editor.cpu == 1) {
		jQuery(obj).css('display','none');
	} else {
		jQuery(obj).stop(true,true).fadeOut(speed); /* 중요 */		
	}
}

// 엑셀 스타일의 반올림 함수 정의
function roundXL(n,digits) {
  if (digits > 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림
  digits = Math.pow(10, digits); // 정수부 반올림
  var t = Math.round(n * digits) / digits;
  return parseFloat(t.toFixed(0));
}

function match_mong9_url(Dstr) {
	return Dstr.replace(new RegExp('__mong9_url__/','gi'),M9_SET["mong9_url"]);
}
function match_mong9_url2(Dstr) {
	var _domain = M9_SET["mong9_url"].replace(new RegExp(/http\:\/\/|https\:\/\//,'gi'),'//');
	return Dstr.replace(new RegExp('__mong9_url__/','gi'),_domain);
}

function toggle_class(Dselector,Dclass,Dok) {

	if (Dok == 1) {
		jQuery(Dselector).addClass(Dclass);	
	} else {
		jQuery(Dselector).removeClass(Dclass);		
	}

}

function events_function(_event,e) {

	var et = e.target;

	var _ignore = (get_is_parents(et,editor._ignore)) ? 1 : 0;

	var event_one = editor_selector.events[_event];

	for (var _kind in event_one) { // for(1)
	
		var _events = event_one[_kind];
		var _list = [];
		var _matching = 0;
	
		if (_kind == 'is') {	

			for (var i=0;i<_events.length;i++) {
				_list[i] = 0;
				var _selector = _events[i]['_selector'];
		
				if (jQuery(et).is(_selector)) {
					if (!(_events[i]['_ignore'] != 1 && _ignore == 1)) {
						_events[i]['_func'](e,et);
						_list[i] = 1;
					}
				}
			}		
			
		} else if (_kind == 'parents') {	
							
			jQuery(et).parentsUntil('html').each(function() {
	
				for (var i=0;i<_events.length;i++) {

					if (_list[i] == 1) { continue; }
					if (_list[i] != 1) { _list[i] = 0; }
					
					var _selector = _events[i]['_selector'];
				
					if (jQuery(this).is(_selector)) {
						if (!(_events[i]['_ignore'] == 1 && _ignore == 1)) {
							_events[i]['_func'](e,this);
							_list[i] = 1;			
						}
					}
				}
				
			});
	
		} else if (_kind == 'is_parents') {	

			for (var i=0;i<_events.length;i++) {

				_list[i] = 0;
				var _selector = _events[i]['_selector'];

				if (jQuery(et).is(_selector)) {
					if (!(_events[i]['_ignore'] == 1 && _ignore == 1)) {
						_events[i]['_func'](e,et);
						_list[i] = 1;		
					}
				}
			}		
			
			jQuery(et).parentsUntil('html').each(function() {
	
				for (var i=0;i<_events.length;i++) {
					
					if (_list[i] == 1) { continue; }
					var _selector = _events[i]['_selector'];

					if (jQuery(this).is(_selector)) {

						if (!(_events[i]['_ignore'] == 1 && _ignore == 1)) {
							_events[i]['_func'](e,this);
							_list[i] = 1;
						}
					}
						
				}
					
			});
			
		}

		for (var i=0;i<_events.length;i++) {
			if (_list[i] == 1) { continue; }
			_events[i]['_func'](e,false);
		}
	
	} // for(1)
							
} // function

function get_inline_style(Dobj,Dproperty,Dempty) {
	var _style = (typeof(Dobj) == 'string') ? Dobj : jQuery(Dobj).attr('style');
	var rgExp = Dproperty+":([^\\;]+)";	
	var re = new RegExp(rgExp,'gi');
	var retVal = re.exec(_style);
	if (retVal) {
		if (Dempty && Dempty != 1) {
			return retVal[1].replace(/\s/g,"");
		} else {
			return jQuery.trim(retVal[1]);
		}
	}
	return '';
}


// Dvalue 가 undefined 이면 삭제
function change_inline_style(Dobj,Dkey,Dvalue) {

	var _style = jQuery(Dobj).attr('style');

	if (_style) {

		var lists = _style.split(';');
			
		var _array = [];
		for (var i=0;i<lists.length;i++) {
					
			var m = lists[i].split(':');	
			var _key = jQuery.trim(m[0]);
			var _value = jQuery.trim(m[1]);

			if (_key == Dkey) {
				if (Dvalue != undefined) {
					_array.push(_key +':'+ Dvalue);
				}
			} else {
				_array.push(_key +':'+ _value);
			}

		}

		var re_style = _array.join(';');
		jQuery(Dobj).attr('style',re_style);

	}

	return re_style;

} // function

function m9_convertStyleToArray(style) {

  var styleArray = [];

    var pair = style.trim();

    if (pair !== '') {
      var colonIndex = pair.indexOf(':');
      if (colonIndex !== -1) {
        var key = pair.substring(0, colonIndex).trim();
        var value = pair.substring(colonIndex + 1).trim();
//        styleArray.push(key + ': ' + value);
        styleArray.push(key);
        styleArray.push(value);
      }
    }

  return styleArray;
}

function m9_editor_convert(Dobj) {

	table_obj.remove_setting(Dobj);
	google_map_obj.remove_setting(Dobj);
	tab_obj.remove_setting(Dobj);

	var Cobj = jQuery(Dobj);

	Cobj.find('._overlay').removeClass('active').removeClass('__overlay_preview'); // 이미지 액션 속성 삭제

	if (M9_SET["navigator"] == "ie" && m9_ie_var < 8) {
		Cobj.find('.bi').each(function() {
			ie_icon_reset(this);
		});
	}

	// ie7이하에서는 column에 width,min-width 가 생성됨 => 삭제처리
	Cobj.find(grid_obj._columns).css({'width':'','min-width':'','z-index':''});

	Cobj.find('.grid-line-on').removeClass('grid-line-on');
	Cobj.find('.ui-sortable').removeClass('ui-sortable');
	Cobj.find('.selected_tag').removeClass('selected_tag');			
	Cobj.find('[contenteditable]').removeAttr('contenteditable');
	Cobj.find('*[class=""]').removeAttr('class');
	Cobj.find('*[style=""]').removeAttr('style');
	Cobj.find('style,script').remove();

	m9_mode_obj.remove_empty_style(Dobj); // 공백인 data-m9-X-style 삭제

	jQuery('.grid-mode-setting-box,._cols-setting-area').remove();

	var on_events = ['click','dbclick','mouseover','mouseout','mousedown','mouseup','mousemove','contextmenu','keydown','keyup','keypress','focus','blur','change','submit','reset','select','load','abort','unload','resize','scroll'];

	for (var i=0;i<on_events.length;i++) {
		var on_evt = 'on' + on_events[i];
		Cobj.find('[' + on_evt + ']').removeAttr(on_evt);
	}

} // function

function m9_convertStyleToArray(style) {

	var styleArray = [];

    var pair = style.trim();

	if (pair !== '') {
		var colonIndex = pair.indexOf(':');
		if (colonIndex !== -1) {
			var key = pair.substring(0, colonIndex).trim();
			var value = pair.substring(colonIndex + 1).trim();
			//styleArray.push(key + ': ' + value);
			styleArray.push(key);
			styleArray.push(value);
		}
	}

	return styleArray;
}


function get_userbox_01(options) {
	return '<div class="_ctr-n-inpt">' +
		'<div class="_ctr">' + box_html.slider.get(options) + '</div>' + // 슬라이드
		'<div class="_inpt">' + box_html.control_box(options) + '</div>' + // 폰트 사이즈
	'</div>';
}

function get_class_btn_num(sid) {
	return _class_btn_num[sid];
}

var _class_btn_num = {};
function get_userbox_class_btn(sid,options) {

	var Sarray = style_info[sid];
	if (!options) { options = {}; }
	if (!_class_btn_num[sid]) { _class_btn_num[sid] = 0; }
	_class_btn_num[sid]++;
	var _num = _class_btn_num[sid];
	
	var _html = '<ul class="_edit-ul-1';
	if (options && options.addClass) { _html += ' ' + options.addClass; }
	_html += '">';	
	var _btn_class = '_' + sid;
	for (var i=0;i<Sarray.keys.length;i++) {
		var _name = (Sarray.values[i]) ? Sarray.values[i] : Sarray.keys[i];
		var n_class = '_' + Sarray.keys[i];
		if (options.btn_addClass) { n_class += ' ' + options.btn_addClass; }		
		var onclick_function = (options.onclick_function) ? options.onclick_function : 'element_obj.edit.class2.change';	
		_html +=  '<li><button onclick="' + onclick_function + '(\'' + sid + '\',\'' + Sarray.keys[i] + '\');return false;" title="' + Sarray.keys[i] + '" data-alt-no="1" class="class-btn '+_btn_class+' ' + n_class + '">' + _name + '</button></li>';				
	}
	_html += '</ul>';
	
	return _html;
}
