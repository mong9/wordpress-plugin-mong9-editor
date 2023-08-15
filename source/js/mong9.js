// ver 1.4 //

var m9_Onload_Function = new Array();
var m9_Resize_Function = new Array();

var m9_evt; // 이벤트
var m9_ie_var = 0; // ie 버전

if (!M9_SET) { var M9_SET = {}; }

M9_SET["mobile_ok"] = 0;
M9_SET["alt_view"] = 1;
M9_SET["navigator"] = ""; // 브라우져

function m9_ImportScript(Dfile,Dfunc) {
	
	var _Dfunc_type = (typeof(Dfunc) == "function") ? 1 : 0;
	var IC = _m9_Import_script;
	
	if (!IC._Loaded_file[Dfile]) {

		if (IC._Importing_now[Dfile]) {
			IC.ready_doing(Dfile,Dfunc);
		} else {
			
			var matching = IC.match_n_get_js(Dfile);
	
			if (matching == 0) {

				IC._Importing_now[Dfile] = 1;
			
				jQuery.getScript(Dfile).done(function(script,textStatus) {
					IC.ready_doing(Dfile,Dfunc);
				}).fail(function(jqxhr,settings,exception) {
					if (_Dfunc_type) {    
		    			alert('Loading Error : ' + Dfile);
		    		}
				});
				
			} else {
				IC.ready_doing(Dfile,Dfunc);
			}

		}
			
	} else {
		if (_Dfunc_type) {
			Dfunc();
		}		
	}
	
} // function

// 자바스크립트 파일 불러오기
var _m9_Import_script = {

	_Loaded_file : {}, // 로딩된 JS 목록
	_Importing_file : {}, // 불러오기 중인 JS
	_Importing_now : {},

	// JS파일(Dfile)이 존재하는지 체크		
	match_n_get_js : function(Dfile) {

		var scripts = document.getElementsByTagName("script");
		
		var z = 0; 
		for (var i=0;i<scripts.length;i++) { 
			var src = scripts[i].getAttribute("src"); 
			if (src) { 		
				this._Loaded_file[src] = 1;
				if (src.indexOf(Dfile.substring(Dfile.lastIndexOf("/") + 1)) != -1) {
					z++;
				}
			} 
		}
		return z;
		
	},

	// JS로딩 후, 실행할 함수 저장하고 실행버튼(가상)
	ready_doing : function(Dfile,Dfunc) {

		if (typeof(Dfunc) == "function") {    
			if (!this._Importing_file[Dfile]) {
				this._Importing_file[Dfile] = new Array();
			}
			this._Importing_file[Dfile].push(Dfunc);			
    		this.excute_switch(Dfile);
		}
	
	},

	_import_timer : {},

	/// 동시에 같은 파일이 로딩시 한번만 로딩하기 위한 스위치개념
	// 마지막 스위치값만 실행
	excute_switch : function(Dfile) {
		clearTimeout(this._import_timer[Dfile]);
		this._import_timer[Dfile] = setTimeout(function() { _m9_Import_script.excute_func(Dfile); },300);	
	},

	// 로딩후, 실행
	excute_func : function(_file) {
	
		m9_delay("",200,function() {					
			_m9_Import_script._Loaded_file[_file] = 1; // 파일로딩 확인
			if (!_m9_Import_script._Importing_file[_file]) { return false; }
			for (var i=0;i<_m9_Import_script._Importing_file[_file].length;i++) {
				_m9_Import_script._Importing_file[_file][i]();
			}
			delete _m9_Import_script._Importing_file[_file];
			delete _m9_Import_script._Importing_now[_file];
		});
		
	}	

};

function m9_ImportCss(Dfile,Dfunc) {

	var _Dfunc_type = (typeof(Dfunc) == "function") ? 1 : 0;
	var IC = _m9_Import_css;
	
	if (!IC._Loaded_file[Dfile]) {

		if (IC._Importing_now[Dfile]) {
			IC.ready_doing(Dfile,Dfunc);
		} else {
			
			var matching = IC.match_n_get_js(Dfile);
	
			if (matching == 0) {

				IC._Importing_now[Dfile] = 1;

				jQuery.getStylesheet(Dfile).done(function(script,textStatus) {
					IC.ready_doing(Dfile,Dfunc);
				}).fail(function(jqxhr,settings,exception) {
					if (_Dfunc_type) {    
		    			alert('Loading Error : ' + Dfile);
		    		}
				});
								
			} else {
				IC.ready_doing(Dfile,Dfunc);
			}

		}
			
	} else {
		if (_Dfunc_type) {
			Dfunc();
		}		
	}
	
} // function

var _m9_Import_css = {

	_Loaded_file : {}, // 로딩된 JS 목록
	_Importing_file : {}, // 불러오기 중인 JS
	_Importing_now : {},

	// JS파일(Dfile)이 존재하는지 체크		
	match_n_get_js : function(Dfile) {

		var scripts = document.getElementsByTagName("link");

		var z = 0; 
		for (var i=0;i<scripts.length;i++) { 
			var src = scripts[i].getAttribute("href"); 
			if (src) { 		
				this._Loaded_file[src] = 1;
				if (src.indexOf(Dfile.substring(Dfile.lastIndexOf("/") + 1)) != -1) { z++; }
			} 
		}
		return z;
		
	},

	// JS로딩 후, 실행할 함수 저장하고 실행버튼(가상)
	ready_doing : function(Dfile,Dfunc) {

		if (typeof(Dfunc) == "function") {    
			if (!this._Importing_file[Dfile]) {
				this._Importing_file[Dfile] = new Array();
			}
			this._Importing_file[Dfile].push(Dfunc);			
    		this.excute_switch(Dfile);
		}
	
	},

	_import_timer : {},

	/// 동시에 같은 파일이 로딩시 한번만 로딩하기 위한 스위치개념
	// 마지막 스위치값만 실행
	excute_switch : function(Dfile) {
		clearTimeout(this._import_timer[Dfile]);
		this._import_timer[Dfile] = setTimeout(function() { _m9_Import_css.excute_func(Dfile); },300);	
	},

	// 로딩후, 실행
	excute_func : function(_file) {

		m9_delay("",200,function() {				
			_m9_Import_css._Loaded_file[_file] = 1; // 파일로딩 확인
			if (!_m9_Import_css._Importing_file[_file]) { return false; }
			for (var i=0;i<_m9_Import_css._Importing_file[_file].length;i++) {
				_m9_Import_css._Importing_file[_file][i]();
			}
			delete _m9_Import_css._Importing_file[_file];
			delete _m9_Import_css._Importing_now[_file];
		});
		
	}		
	
};

function m9_set_navigator() {

    var agent = navigator.userAgent.toLowerCase(),name = navigator.appName,browser;

	M9_SET["navigatorVersion"] = '';

    // MS 계열 브라우저를 구분하기 위함.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            //browser += parseInt(agent[1]);
			M9_SET["navigatorVersion"] = parseInt(agent[1]);
        } else { // IE 11+
            if(agent.indexOf('trident') > -1) { // IE 11 
                //browser += 11;
				M9_SET["navigatorVersion"] = 11;
            } else if(agent.indexOf('edge/') > -1) { // Edge
                //browser = 'edge';
				M9_SET["navigatorVersion"] = 11;
            }
        }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
        if(agent.indexOf('opr') > -1) { // Opera
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) { // Chrome
            browser = 'chrome';
        } else { // Safari
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
    }

	M9_SET["navigator"] = browser;
	if (M9_SET["navigatorVersion"] != '') {
		m9_ie_var = M9_SET["navigatorVersion"];
	}
	if (m9_ie_var == 0) { m9_ie_var = 100; } 

} // function

m9_set_navigator();
		
function m9_getObject(objectId) { 
	// checkW3C DOM, then MSIE 4, then NN 4. 
	if(document.getElementById && document.getElementById(objectId)) { 
		return document.getElementById(objectId); 
	} else if (document.layers && document.layers[objectId]) { 
		return document.layers[objectId]; 
	} else { 
		return false; 
	} 
} // function 

function m9_get_object(Did) {
	return (typeof(Did) == "object") ? Did : m9_getObject(Did);
} // function

// 브라우져에 맞게 body 오브젝트 가져오기
function m9_get_body_obj() {
	return (M9_SET["navigator"] == "safari") ? document.body : (M9_SET["navigator"] == "ie" ? m9_ietruebody() : document.documentElement);
} // function

// 익스플로러 버전에 상관 없이 사용하기
function m9_ietruebody() { 
	if (document.documentElement && document.documentElement.scrollTop) { // ie6 Strict 
		return document.documentElement; 
	} else if(document.documentElement && document.documentElement.clientHeight) { // ie6 Strict 
		return document.documentElement; 
	} else if (document.body) { // ie < ie 6 
		return document.body; 
	}
} // function

// 현재 브라우져 내용부분 사이즈 리턴
function m9_get_window_size() {
	var _w = 0;
	var _h = 0;
	var _w_page = 0;
	var _h_page = 0; 
	if (window.innerHeight) {
		var scroll_obj = m9_get_body_obj(); 	
		var s_w = window.innerWidth - scroll_obj.clientWidth; // 스크롤 크기
		_w = window.innerWidth - s_w;
		_h = window.innerHeight;// - s_w; 하위 스크롤 적용 안됨
	} else {
		// ie
		if (document.documentElement.clientHeight) {
			// 스크롤 값을 제외한 값
			_w = document.documentElement.clientWidth;
			_h = document.documentElement.clientHeight; 	
		}
	}
	return [_w,_h];
} // function

//*****************************************//
// 쿠키 저장
//*****************************************//
function m9_setCookie(name,value,expires) {
	document.cookie = name + "=" + escape(value) + ((expires == null || expires == "") ? "" : (" ; expires=" + expires.toGMTString()));
} // function

//*****************************************//
// 쿠키 얻어오기
//*****************************************//
function m9_getCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i< clen) {
		var j = i + alen;
		if (document.cookie.substring(i,j) == arg) {
			var end = document.cookie.indexOf(";",j);
			if (end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(j,end));
		}
		i = document.cookie.indexOf(" ",i) + 1;
		if (i == 0) break;
	}
	return null;
} // function

function m9_check_num(Dnum) {
	var re = RegExp("^[0-9]+$","gi");
	if (re.test(Dnum)) {
		return true;
	}
	return false;		
} // function

function m9_get_num(Dstr) {
	if (!Dstr) { return ''; }
	Dstr = Dstr +"a";
	var rgExp = /[-\d\.]+/;
	var Cstr = Dstr.match(rgExp);
	if (Cstr == null) { Cstr = ""; }
	return Cstr * 1;
} // function

function m9_get_str(Dstr) {
	if (!Dstr) { return ''; }
	var rgExp = /[^\d\.]+/g;
	var Cstr = Dstr.match(rgExp); 
	if (Cstr == null) { Cstr = ""; } 
	return Cstr;
} // function

function m9_set_select_value(Did,Dvalue) {
	var Cid = m9_get_object(Did);
	jQuery(Cid).children().each(function(i) {
		if (jQuery(this).val() == Dvalue) {
			jQuery(Cid).prop('selectedIndex',i); 	
		}
	});
} // function

function m9_set_select_index(Did,Dindex) {
	var Cid = m9_get_object(Did);
	jQuery(Cid).prop('selectedIndex',Dindex);
} // function

function m9_get_radio_index(Cid) {

	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }

	for (var i=0; i<Did.length;i++) {
		if (Did[i].checked == true) { return i; } 		
	}

	return false;

} // function

function m9_get_radio_value(Cid) {
	var Dindex = m9_get_radio_index(Cid);
	var re = RegExp("^[0-9]+$","gi"); 
	if (!re.test(Dindex)) { return ""; }
	var Did = document.getElementsByName(Cid)[Dindex].value;
	return Did;
} // function

function m9_set_radio_index(Cid,Cnum) {
	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }
	Did[Cnum].checked = true;
} // function

function m9_get_checked(Cid) {
	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }
	return Did[0].checked; 	
} // function

function m9_get_pixelLeft(Did) {
	var Cid = m9_get_object(Did); 
	return m9_get_num(jQuery(Cid).css("left"));
} // function

function m9_get_pixelTop(Did) {
	var Cid = m9_get_object(Did);
	return m9_get_num(jQuery(Cid).css("top"));
} // function

function m9_change_pixelLeft(Did,Dvalue) {
	var Cid = m9_get_object(Did); 
	jQuery(Cid).css("left",Dvalue);
} // function

function m9_change_pixelTop(Did,Dvalue) {
	var Cid = m9_get_object(Did);	
	jQuery(Cid).css("top",Dvalue);
} // function

function m9_getRealOffsetTop(Did) {
	return jQuery(m9_get_object(Did)).offset().top; 
} // function

function m9_getRealOffsetLeft(Did) {
	return jQuery(m9_get_object(Did)).offset().left;
} // function

function m9_get_xy_pos(Aw,Ah,Bw,Bh,Xdistance,Ydistance,Dpos,Epos) {

	if (!Xdistance) { Xdistance = 0; }
	if (!Ydistance) { Ydistance = 0; }
	if (!Dpos) { Dpos = 1; }
	if (!Epos) { Epos = 0; }

	var Cw,Ch = 0;

	if (Dpos == 3 || Dpos == 9) {
		Cw = Aw - (Bw + Xdistance);
	} else if (Dpos == 6) {
		Cw = (Epos == 0) ? Aw - (Bw + Xdistance) : Aw + Xdistance; 
	} else if (Dpos == 2 || Dpos == 5 || Dpos == 8) {
		Cw = (Aw - Bw) / 2;
	} else if (Dpos == 1 || Dpos == 7) {
		Cw = Xdistance;
	} else if (Dpos == 4) {
		Cw = (Epos == 0) ? Xdistance : -(Bw + Xdistance); 	
	} 
 
	if (Dpos == 4 || Dpos == 5 || Dpos == 6) {
		Ch = (Ah - Bh) / 2;
	} else if (Dpos == 7 || Dpos == 8 || Dpos == 9) {	
		Ch = (Epos == 0) ? Ah - (Bh + Ydistance) : (Ah + Ydistance);
	} else {
		Ch = (Epos == 0) ? Ydistance : -(Bh + Ydistance);  
	}

	return [Cw,Ch];

} // function

var _m9_width_columns2 = new Array("paddingLeft","paddingRight","borderLeftWidth","borderRightWidth","marginLeft","marginRight");
var _m9_height_columns2 = new Array("paddingTop","paddingBottom","borderTopWidth","borderBottomWidth","marginTop","marginBottom");

function m9_get_object_size(Did,Dkind) {

	var Cid = m9_get_object(Did);	

	var box_sizing = jQuery(Cid).css("box-sizing");

	var Dsize = 0; 
	if (Dkind == "width") {
		Dsize += m9_get_num(jQuery(Cid).css("width")); 	
		if (box_sizing != "border-box") {
			for (var i=0;i<_m9_width_columns2.length;i++) {
				Dsize += m9_get_num(jQuery(Cid).css(_m9_width_columns2[i]));
			}
		}
	} else {
		Dsize += m9_get_num(jQuery(Cid).css("height"));  	  
		for (var i=0;i<_m9_height_columns2.length;i++) {
			Dsize += m9_get_num(jQuery(Cid).css(_m9_height_columns2[i]));
		}
	}

	return Dsize;

} // function

function m9_get_object_size2(Did,Dkind) {
	var Cid = m9_get_object(Did);	
	return (Dkind == "width") ? Cid.offsetWidth : Cid.offsetHeight;
} // function

///////////////////////////////////////////////////////////////////////////////////////

var _delay_obj = {};
var _delay_empty_no = 0;
function m9_delay(Dname,Ddelay,Dfunc) {

	if (Dname == "" || Dname == undefined) {
		_delay_empty_no++;
		Dname = "_Delay_" + _delay_empty_no;
	}

	if (!_delay_obj[Dname]) { // 무조건 한번 돌리기 위해
 	
		if (!Ddelay) { Ddelay = 1000; }
		_delay_obj[Dname] = {};
		_delay_obj[Dname]["func"] = Dfunc;
		_delay_obj[Dname]["delay"] = window.setInterval("m9_delay('" + Dname + "')",Ddelay);  
    
	} else {
 	
		if (_delay_obj[Dname]["delay"] && Dfunc) { return false; }
		clearInterval(_delay_obj[Dname]["delay"]);
		_delay_obj[Dname]["func"]();
		delete _delay_obj[Dname];
  
	}

} // function

var _m9_delay_memory = {};
function m9_delay_checking(Dfunc,Dfunc2,Dhash) {
	if (Dfunc() == true) {
		Dfunc2(Dhash);	
	} else {

		if (!_m9_delay_memory[Dfunc]) {
			_m9_delay_memory[Dfunc] = 0;
		}

		_m9_delay_memory[Dfunc]++;

		if (_m9_delay_memory[Dfunc] > 20) {
			return false;
		}

		setTimeout(function(){
			m9_delay_checking(Dfunc,Dfunc2,Dhash);
		},200);		
	}
} // function


var _random_id_count = 0;
function m9_random_id(Did) {

	var Cid = m9_get_object(Did);	
	var _id = Cid.getAttribute("id");
	if (_id) {
		return _id;
	} else {
		_random_id_count++; 	
		_id = "_m9random_" + _random_id_count;
		Cid.setAttribute("id",_id);     
		return _id;
	}
} // function

var _random_id_count2 = 0;
function random_str() {
  _random_id_count2++; 	
  return "_m99random_" + _random_id_count2;	
}

var _ie_ok = (M9_SET["navigator"] == "ie" && m9_ie_var < 7) ? 1 : 0; 
  
var _animate_document_count = 0;
function m9_animate_document(Did) {

	var Cid = m9_get_object(Did); 
	var Ctarget = (!Cid) ? "body" : Cid;

	var _obj = jQuery(Ctarget).find("[data-m9-execute]");		

	if (Cid) { _obj.push(Ctarget); }

	var base_font_color = jQuery("body").css("color");

	for (var i=0;i<_obj.length;i++) { 

		var _tagName = _obj[i].tagName;

		if (jQuery(_obj[i]).parents('.m9not').length > 0) { continue; }
		
		// ani_type 처리 
		var ani = (_obj[i].getAttribute("data-m9-execute")) ? _obj[i].getAttribute("data-m9-execute") : _obj[i].getAttribute("ani_type");

		if (ani) {
			var _anis = ani.split(";");
			for (var m=0;m<_anis.length;m++) {
				var _ani = _anis[m];
				var prop = m9_get_property(_ani);
				M9ANI.reset(_obj[i],prop);
			}
		} // ani
		
	} //for
	
	_animate_document_count++;

} // function

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function m9_ajax_load_contents(Durl,Did,Dsettings,Dcallback) {

	var evt_obj = m9_get_evt_obj(m9_evt); // 이벤트 변경전 캐치
 
	var Cid = m9_get_object(Did);		
	if (!Cid) { return false; }

	if (typeof(Dsettings) != "object") { Dsettings = {}; }

	if (!Dsettings["type"]) { Dsettings["type"] = "GET"; }
 	 
	if (!Dsettings["put_kind"]) {
		var _kind = (m9_get_file_kind(Durl))[1];
		Dsettings["put_kind"] = (_kind == "txt") ? "text" : "html";
	} 
   
	if (!Cid["_data"]) { Cid["_data"] = {}; }

	if (Cid["_data"]["load"] == "error") { Cid["_data"]["load"] = undefined; }
	if (Cid["_data"]["load"]) {
		if (Dsettings["whenever"] != true) {
			if (typeof(Dcallback) == "function") { Dcallback(); } // 콜백함수 실행
			return false;
		} else {
			Cid["_data"]["load"] = undefined;
		}
	}

	// 기본한글체크 : /^[가-힣]*$/
	// UTF-8 전용한글체크 : /^[\uac00-\ud7a3]*$/
	if (Durl.match( /\?/)) {
 	
		var _f = Durl.split("?");
		var _m = _f[1].split("&");
  
		var re_url = "";
		for(var i=0;i<_m.length;i++) {
			var _h = _m[i].split("=");
			if (_h[1].match( /[가-힣]/)) { _h[1] = encodeURIComponent(_h[1]); }
			if (re_url != "") { re_url +="&"; }
			re_url += _h[0]+"="+_h[1];
		}
		Durl = _f[0] + "?" + re_url; 
	}

	var request = jQuery.ajax({
		type : Dsettings["type"],
		url : Durl,
		/* async : true , */
		  
		beforeSend: function ( xhr ) {

			m9_delay("",10,function() { //m9_ajax_loading
				if (!Cid["_data"]["load"]) {		
					if (evt_obj) { //이벤트가 존재할 때만 실행
						m9_layer_position("m9_ajax_loading",evt_obj);  
						m9_layer_view_only("m9_ajax_loading",{opacity:100,speed:'fast'});
					}
					_layer_event_obj = undefined;
					_before_layer = undefined;				
				}
			});

		} 

	});

	function _error_msg(Ddata) {

		Cid["_data"]["load"] = "error"; 	
		jQuery("#m9_ajax_loading").css("display","none");
		jQuery("#m9_ajax_error_contents").text("Loading Error : " + Ddata);
		m9_layer_position("m9_ajax_error_view",evt_obj);
		m9_layer_view_only("m9_ajax_error_view",{opacity:100,speed:'slow'},function(){ 
			m9_delay("ajax_error",2000,function(){
				m9_layer_view_only_close("m9_ajax_error_view");
			});
		});
	  
	} // function
   
	// 파일 가져오기 시작
	request.done(function( msg ) {});

	// 파일 가져오기 실패했을 경우
	request.fail(function(jqXHR,textStatus,errorThrown) {
		_error_msg(errorThrown);
	});

	// 파일 가져오기 성공했을 경우  
	request.success(function(data,textStatus,jqXHR) {

		if (data.indexOf('error|') != -1) {
			var dd = data.split("|");
			_error_msg(dd[1]);
			return false;
		}

		if (Dsettings["get_id"]) { // 추출하기
			var _name = "#" + Dsettings["get_id"];
			data = jQuery(data).find(_name);
		}

		if (Cid["_data"]["_son"]) { Cid = m9_get_object(Cid["_data"]["_son"]); } // 아들 존재하면 아들에게 붙임

		if (Dsettings["put_kind"] == "html") { jQuery(Cid).html(data); } else { jQuery(Cid).text(data); }	// 삽입
				
		m9_delay("",10, // 다른함수와 연동위한 설정
			function() {
				Cid["_data"]["load"] = (Dsettings["whenever"] != true) ? Durl : undefined;	// 중복방지  
				jQuery("#m9_ajax_loading").css("display","none");  
				m9_animate_document(Cid);
				if (typeof(Dcallback) == "function") { Dcallback(data); }  // 콜백함수 실행	
		});

	});

} // function

function m9_get_file_kind(url) {
	var _f = (url.split("?"))[0].split("/");
	var FileName = _f[_f.length-1];
	var finfo = FileName.split(".");
	return finfo;
} // function

function alert_(Dobj) {
	var msg = "";
	if (typeof(Dobj) == "object") {	
		for (var i in Dobj) {
			msg += i + "     :     " + Dobj[i] + "\n";  	
		}	
	}
	alert(msg);
	return msg;
} // function

function m9_parse_json(Dstring) {

	var Prop = {};

	if (Dstring.indexOf("{") > -1) {
		Dstring = Dstring.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":'); // key
		Dstring = Dstring.replace(/'(([^'])+)'/g, '"$1"'); // ' => "
		Prop = jQuery.parseJSON(Dstring);
	}

	return Prop;

} //function

// 속성 가져오기
function m9_get_property(Dstring) {

	var Dreturn = new Array('',{});
	var Prop = {};

	Dstring = jQuery.trim(Dstring);

	if (Dstring.indexOf("(") > -1) {

		Dreturn[0] = Dstring.substr(0,Dstring.indexOf("("));
		var Dstr = Dstring.match(/\((.*?)\)$/);

		if (Dstr[1]) {
			Prop = m9_parse_json(Dstr[1]);
		}

		Dreturn[1] = Prop;

	} else {
		Dreturn[0] = Dstring; 	
	}

	return Dreturn;

} //function

function m9_trim_quotes(Dstring) {
	return Dstring.replace(/(^\")|(\"*$)/g,"").replace(/(^\')|(\'*$)/g,"");
} // function

function loading_view() {

	var scroll_obj = m9_get_body_obj();
	jQuery("#m9_page_change_bg").css({display:"block",width:scroll_obj.scrollWidth,height:scroll_obj.scrollHeight});
	jQuery("#m9_page_change_div").css({display:"block",left:scroll_obj.scrollLeft,top:scroll_obj.scrollTop});
	var _win = m9_get_window_size(); // 화면 크기 리턴 
	jQuery("#m9_page_change").css({height:_win[1]});

	m9_delay("_loading_load",500,function() {
		location.reload();
	});
 	
} // function

function m9_get_evt_obj(e) {
	if (!e) { if (window.event) { e = window.event; } else { return false; } }
	return (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
} // function
 
// 파이어 폭스처리
if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown","mouseover","mouseout","mousemove","mousedrag","click","dblclick","keydown","keypress","keyup"]; 
	for(var i=0;i<eventNames.length;i++) {
		window.addEventListener( eventNames[i],function(e) { window.event = e; },true);
	}
}

function _set_animate_doing(Did,Ddoing) {
	Did._animate_doing = Ddoing;	
}

var _m9_w_columns = new Array("paddingLeft","paddingRight","borderLeftWidth","borderRightWidth");
var _m9_h_columns = new Array("paddingTop","paddingBottom","borderTopWidth","borderBottomWidth");

function get_box_size(Did,Dkind) {

	var Cid = m9_get_object(Did);

	var Cvar = 0;

	if (Dkind == "height") {
		Cvar = jQuery(Cid).height();
		for (var i=0;i<_m9_h_columns.length;i++) {
			Cvar -= m9_get_num(jQuery(Cid).css(_m9_h_columns[i]));
		}
	} else {
		Cvar = jQuery(Cid).width();	
		for (var i=0;i<_m9_w_columns.length;i++) {
			Cvar -= m9_get_num(jQuery(Cid).css(_m9_w_columns[i]));
		}
	}

	return Cvar;				
}

function m9_escapeHTML(str) {
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function m9_unescapeHTML(str) {
	return str.stripTags().replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}

////////////////////////////////////////////////////////////////////////////////////////////////
/*
	RGB 색상 : #FFFFFF, #000000 ..
	hex 색상 : rgb(255,255,255), rgb(0,0,0)
*/
var q_border_w = new Array("borderTopWidth","borderBottomWidth","borderLeftWidth","borderRightWidth");
var q_border_c = new Array("borderTopColor","borderBottomColor","borderLeftColor","borderRightColor");

var M9ALT = {
	
	make_over : function(Did,Dnum,Dstr) {

		if (Did._alt_over) { return Did._alt_over; }
		if (!m9_getObject("m9_alt_no_" + Dnum)) { return false; }
			
		var C_w = Did.width;
		var C_h = Did.height; 

		var _clone_id = m9_random_id(Did); // id존재하지 않으면 생성
		var clone_id = _clone_id + "_light";
		jQuery("#m9_alt_no_"+Dnum).clone().attr("id",clone_id).css({width:C_w,height:C_h}).appendTo("body");

		var clone_son_id = clone_id+"_son";
		var clone_son =jQuery("#"+clone_id).children()[0];
		jQuery(clone_son).css({width:C_w,height:C_h});

		var alt_div = jQuery(clone_son).children()[0];
		var mouse_div = jQuery(clone_son).children()[1];

		jQuery(alt_div).css({width:C_w,height:C_h});
		jQuery(mouse_div).css({width:C_w,height:C_h});
		var alt_div2 = jQuery(alt_div).children()[0];		
			
		var re = /^#/gi;
		var Dmatch = Dstr.match(re);

		if (Dmatch != null) {
			var Dstr_id = Dstr.replace(/^#/g,"");			
			if (m9_getObject(Dstr_id)) {
				jQuery(alt_div).append(m9_getObject(Dstr_id));
				jQuery(alt_div).css("padding",0);		
				m9_getObject(Dstr_id).style["display"] = "";
			} else {
				jQuery(alt_div2).append(Dstr);
			}
		} else {	
			jQuery(alt_div2).append(Dstr);
		}

		alt_div._parent = clone_id;
		mouse_div._parent = clone_id;
		mouse_div._target = alt_div;
		 				
		Did._alt_over = clone_id;

		jQuery(mouse_div).on('mouseout',function() {
			var _a = mouse_div._target;
			if (m9_getObject(this._parent)._doing == 1) {
				m9_layer_slide_stop(_a);
			}				
	
			m9_layer_slide_close(_a,{slide:'!down'},function(){
				jQuery("#"+mouse_div._parent).css("display","none");
				m9_getObject(this._parent)._doing = 0;     	 	
			});			
		});

		return clone_id;
	},
	_encode : function(Dmsg) {
		return Dmsg.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");		
	},
		
	view : function(Did) {

		if (M9_SET["alt_view"] != '1') { return false; }
		if (M9_SET["mobile_ok"] != 0) { return false; }

		if (Did._alram == undefined) {	M9ALT._reset(Did); }
		if (Did._alram == 0) { return false; }

		var alt_no ="0";
		if (Did._alram == 2) {	
			alt_no = Did.parentNode.getAttribute("data-alt-no");
			if (Did._alt) { Did.parentNode.alt = ""; }
			if (Did._title) { Did.parentNode.title = ""; }
		} else if (Did._alram == 3) {	
			alt_no = Did.childNodes[0].getAttribute("data-alt-no");
			if (Did._alt) { Did.childNodes[0].alt = ""; }
			if (Did._title) { Did.childNodes[0].title = ""; }				
		} else {
			alt_no = Did.getAttribute("data-alt-no");
			if (Did._alt) { Did.alt = ""; }
			if (Did._title) { Did.title = ""; }					
		} 	

 		if (!alt_no) { return false; } else if (alt_no == null) { return false; }

		var str = "";
		if (Did._title && Did._alt) {
			str = "<b>" + M9ALT._encode(Did._alt) + "</b><br />" + M9ALT._encode(Did._title);
		} else if (Did._title) {
			str = M9ALT._encode(Did._title);
		} else {
			str = M9ALT._encode(Did._alt);	 	
		}

		var regexp = /^[a-z]$/; // 알파벳 문자 하나				
		if (regexp.test(alt_no)) {
			
			var clone_id = M9ALT.make_over(Did,alt_no,str);

			var C_w = Did.width;
			var C_h = Did.height; 

			m9_layer_position(clone_id,Did,'!down');
			m9_layer_position_xy(clone_id,0,C_h);
			jQuery("#"+clone_id).css({"display":"block","z-index":10});

			var alt_div = jQuery("#"+clone_id).children()[0];
			alt_div = jQuery(alt_div).children()[0];						
			
			m9_getObject(clone_id)._doing = 1;
			m9_layer_slide_view(alt_div,{slide:'!up'},function(){m9_getObject(clone_id)._doing = 0;});
						
		} else {

			var _id = "m9_alt_view"+alt_no;
			if (!m9_getObject("m9_alt_view"+alt_no)) { return false; }
			
			jQuery('#' + _id + '>div>div').html(str);
			var alt_w = m9_get_object_size(_id,"width"); 
				
			if (M9_SET["navigator"] == "ie") {
				if (alt_w > 300) {
					jQuery('#' + _id).css('width','300px');
				}
			}
	
			var alt_h = m9_get_object_size(_id,"height"); 
			
			var direct = m9_layer_position(_id,Did);
				
			var _pos = [];
			if (direct == "up") {
				_pos.push("CENTER","BOTTOM");
			} else if (direct == "down") {
				_pos.push("CENTER","TOP"); 	
			} else if (direct == "left") { 	
				_pos.push("RIGHT","CENTER");  
			} else {	 	
				_pos.push("LEFT","CENTER");  
			}

			jQuery('#' + _id + '>div').css("background-position",_pos[0]+" "+_pos[1]);
			jQuery('#' + _id).css('display','block');
			
		}

	}, //view
	
	hidden : function(Did) {

		if (!Did) { return false; }

		if (M9_SET["alt_view"] != '1') { return false; }
		if (M9_SET["mobile_ok"] != 0) { return false; }		
		if (!Did._alt && !Did._title) { return false; }

		if (Did._alram == 2) {	
			alt_no = Did.parentNode.getAttribute("data-alt-no");
		} else if (Did._alram == 3) {	
			alt_no = Did.childNodes[0].getAttribute("data-alt-no");			
		} else {
			alt_no = Did.getAttribute("data-alt-no");			
		} 	

 		if (!alt_no) { return false; } else if (alt_no == null) { return false; }
		
		if (!m9_getObject("m9_alt_view"+alt_no)) { return false; }
									 
		if (M9_SET["navigator"] == "ie") {	
			m9_getObject("m9_alt_view"+alt_no).style.width = ""; // 크기 원래대로 		
		}
 
		m9_getObject("m9_alt_view"+alt_no).style.display = "none";  		

		if (Did._alram == 2) {
			if (Did._alt) { Did.parentNode.alt = Did._alt; }
			if (Did._title) { Did.parentNode.title = Did._title; }
		} else if (Did._alram == 3) {	
			if (Did._alt) { Did.childNodes[0].alt = Did._alt; }
			if (Did._title) { Did.childNodes[0].title = Did._title; }								
		} else {
			if (Did._alt) { Did.alt = Did._alt; }
			if (Did._title) { Did.title = Did._title; }			
		}
		  		
	}, //hidden

	_reset : function(Did) {

		Did._alram = 0;
		
		if (M9_SET["navigator"] == "ie" && Did.tagName == "SELECT") { return; } // 익스플로러 SELECT박스 무시
		
		if (!Did._alt) {
			var _alt = Did.getAttribute("alt");
			if (_alt) {
				Did._alt = _alt;
				Did._alram = 1;
			}
		}

		if (!Did._title) {
			var _title = Did.getAttribute("title");
			if (_title) {
				Did._title = _title; 
				Did._alram = 1;
			}
		}

		if (Did._alram == 0) {

			var Dparent = Did.parentNode;			
			if (Dparent.tagName == "A") {

				if (!Did._alt) {
					var _alt = Dparent.getAttribute("alt");
					if (_alt) {	
						Did._alt = _alt;
						Did._alram = 2;
					}
				}
 
 				if (!Did._title) {
					var _title = Dparent.getAttribute("title");
					if (_title) {  		
						Did._title = _title;
						Did._alram = 2;
					}
				}
			}	 	
			
		}
		
		if (Did._alram == 0) {
			
			if (Did.tagName == "A") {

				if (!Did._alt) {
					var _alt = jQuery(Did).find('[alt]').attr('alt');
					if (_alt) {	
						Did._alt = _alt;
						Did._alram = 3;
					}
				}
 
 				if (!Did._title) {
					var _title = jQuery(Did).find('[title]').attr('title');
					if (_title) {  		
						Did._title = _title;
						Did._alram = 3;
					}
				}
			}	 	
				
		}

	} //reset	
	
};

////////////////////////////////////////////////////////////
// 이벤트 관련
//////////////////////////////////////////////////////////// 
var M9EVENT = {
	mouseover : function(Did) {
		M9ALT.view(Did);
	},
	mouseout : function(Did) {
		M9ALT.hidden(Did);		
	}
};

jQuery(document).on('mouseover',function(e) {
	M9EVENT.mouseover(e.target); 	
}).on('mouseout',function(e) {
	M9EVENT.mouseout(e.target); 	
}); 

// 모바일체크
var m9_mobile_checking = {
	int : function() {
		var _mode = (m9_mobile_checking.isMobile()) ? "1" : "0";
		m9_setCookie("mobile_ok",_mode);		
		M9_SET["mobile_ok"] = _mode;
	},
	isMobile : function() {
		var UserAgent = navigator.userAgent;
		return (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) ? 1 : 0;
	}
};

(function(jQuery) {
	jQuery.getStylesheet = function (href) {
		var jQueryd = jQuery.Deferred();
		var jQuerylink = jQuery('<link/>',{
			rel: 'stylesheet',
			type: 'text/css',
			href: href
		}).appendTo('head');
		jQueryd.resolve(jQuerylink);
		return jQueryd.promise();
	};
})(jQuery);

//////////////////////////////////////////////////////////
// 리사이징 설정
//////////////////////////////////////////////////////////
m9_Resize_Function.push("m9_mode_obj.Responsive();");	

jQuery(function() {

	m9_mode_obj.int(1);
	m9_mode_obj.Responsive();
	m9_mobile_checking.int(); // 모바일체크

	var _before_screen_w = m9_get_num(jQuery('body').css('width'));
	var timer = null;

	jQuery(window).on('resize',function( ) {
	    clearTimeout(timer);
	    timer = setTimeout(m9_resizeDone,300);
	} );
	
	function m9_resizeDone( ) {
	
		m9_delay("resize",200,function(){	
	
			var _now_screen_w = m9_get_num(jQuery('body').css('width'));
			if (_now_screen_w == _before_screen_w) { return false; }
			m9_mobile_checking.int(); // 모바일체크
			_before_screen_w = _now_screen_w;
			
			if (m9_Resize_Function.length > 0) {
				for (var i=0;i<m9_Resize_Function.length;i++) {
					eval(m9_Resize_Function[i]);	
				}
			}
	
		});
						
	}

	var _html = '<div id="m9_page_change_bg" class="m9_page_turn_bg" style="display:none"></div>' +
	'<div id="m9_page_change_div" class="m9_page_turn_div" style="display:none"><div id="m9_page_change" class="m9_page_turn"><span class="m9-valign"><i>&nbsp;</i></span><span class="m9_page_turn_loading_bar"></span></div></div>' +
	'<div id="lightbox_area"></div>' +
	'<div id="m9_ajax_loading" style="display:none"><span id="m9_ajax_loading_contents">Loading..</span></div>' +
	'<div id="m9_ajax_error_view" style="display:none"><div id="m9_ajax_error_contents"></div></div>' +
	'<div id="m9_alt_view1" class="m9-alt-tipsy"><div><div></div></div></div>' +
	'<div id="m9_alt_view2" class="m9-alt-tipsy"><div><div></div></div></div>' +
	'<div id="m9_alt_view3" class="m9-alt-tipsy"><div><div></div></div></div>' +
	'<div id="m9_alt_view4" class="m9-alt-tipsy"><div><div></div></div></div>' +
	'<div id="m9_alt_no_a" class="m9_alt_no_a m9-alt-tipsy2" style="display:none"><div class="m9_box"><div class="m9_alt"><div class="m9_content"></div></div><div class="m9_mouse"></div></div></div>' +
	'<div id="m9_alt_no_b" class="m9_alt_no_b m9-alt-tipsy2" style="display:none"><div class="m9_box"><div class="m9_alt"><div class="m9_content"></div></div><div class="m9_mouse"></div></div></div>' +
	'<div id="m9_alt_no_c" class="m9_alt_no_c m9-alt-tipsy2" style="display:none"><div class="m9_box"><div class="m9_alt"><div class="m9_content"></div></div><div class="m9_mouse"></div></div></div>' +
	'<div id="m9_alt_no_d" class="m9_alt_no_d m9-alt-tipsy2" style="display:none"><div class="m9_box"><div class="m9_alt"><div class="m9_content"></div></div><div class="m9_mouse"></div></div></div>';

	jQuery('body').append(_html);

	m9_animate_document();

});

function remove_m9_ani_tag(Dobj) {

	var _before_html = m9_attrs_history.tags;

	for (var i=0;i<_before_html.length;i++) {

		if (jQuery(Dobj).find(_before_html[i]).length > 0) {
			m9_attrs_history.reset(_before_html[i]);
		}

	}

}

var m9_attrs_history = {
	'tags' : [],
	'set' : function(Dobj) {
		m9_attrs_history.tags.push(Dobj);
		m9_obj_set_data(Dobj,"_before_attrs",jQuery(Dobj).attrs());
	},
	'reset' : function(Dobj) {

		var all_attr = jQuery(Dobj).attrs();

		for (var z in all_attr) {
			jQuery(Dobj).removeAttr(z);
		}

		if (Dobj["_data"] && Dobj["_data"]["_before_attrs"]) {
			jQuery(Dobj).attr(Dobj["_data"]["_before_attrs"]);
		}

	},
	'change' : function(Dobj,Dattr,Dvalue) {
		if (!Dobj["_data"]) { Dobj["_data"] = {}; }
		if (!Dobj["_data"]["_before_attrs"]) { Dobj["_data"]["_before_attrs"] = {}; }
		Dobj["_data"]["_before_attrs"][Dattr] = Dvalue;
	}
};

(function(old) {
  jQuery.fn.attrs = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      jQuery.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
})(jQuery.fn.attr);

function get_m9_file_info(Durl) {

	var _f = Durl.split("?");

	var _unit = _f[0].split("/");
	var _file = _unit.pop();
	var _d = _file.split('.');

	var _path = _unit.join('/');

	var hash = {
		'path' : _path,
		'file' : _file,
		'file_name' : _d[0],
		'file_extension' : _d[1],
		'search' : _f[1]
	};

	return hash;

} // function

function m9_get_data_var(obj,_key) {
	_key = (_key == 'ani-type') ? 'ani_type' : 'data-' + _key;
	return jQuery(obj).attr(_key);
}

function m9_set_data_var(obj,_key,_value) {
	_key = (_key == 'ani-type') ? 'ani_type' : 'data-' + _key;
	jQuery(obj).attr(_key,_value);
}

if (window.addEventListener) { // W3C DOM 지원 브라우저 
 window.addEventListener("load",m9_onload_start,false);
} else if (window.attachEvent) { // W3C DO M 지원 브라우저 외(ex:MSDOM 지원 브라우저 IE) 
 window.attachEvent("onload",m9_onload_start); 
} else { 
 window.onload = m9_onload_start; 
} 

// onload되는 항목
function m9_onload_start() { 
	
 if (m9_Onload_Function.length > 0) {
  for (var i=0;i<m9_Onload_Function.length;i++) {
   eval(m9_Onload_Function[i]);	
  }
 }

 m9_animate_document(); // 문서내 애니메이션 설정

} //function

function m9_Slide_Obj(Did,Ddirect,Dfunc) {

	var _T_style = (Ddirect == "width") ? "width" : "height";
 	var _T_style_Reverse = "";
	var _T_End_Var = 0;

 	var Cid = m9_get_object(Did);	
 	var now_status = (Cid.style.display == "none") ? 0 : 1;

	Cid.style.display = "block"; // 로 설정해야 정보 알아낼수 있음

	var Cid_w = Cid.offsetWidth; // 크기 알아오기(width는 display=table전에)
	if (M9_SET["navigator"] != "ie") { Cid.style.display = "table"; } // 객체 크기 다시 설정(중간에 변할수 있으므로)
	var Cid_h = Cid.offsetHeight; // 크기 알아오기(height는 display=table후에)

	if (M9_SET["navigator"] == "ie") {
		if (Cid.children[0]) {
			var aa = new Array("marginLeft","marginRight","borderLeftWidth","borderRightWidth");
			for (var i=0;i<aa.length;i++) { Cid_w -= _get_num(Cid.currentStyle[aa[i]]); }
			var aa = new Array("marginTop","marginBottom","borderTopWidth","borderBottomWidth");
			for (var i=0;i<aa.length;i++) { Cid_h -= _get_num(Cid.currentStyle[aa[i]]); }
		}
	} else {
		Cid_w -= (Cid.offsetWidth - Cid.clientWidth); // style 의 border + margin 합 	
		Cid_h -= (Cid.offsetHeight - Cid.clientHeight); // style 의 border + margin 합
	}

	if (_T_style == "height") {
		_T_End_Var = Cid_h;
		_T_End_Var_Reverse = Cid_w;
		_T_style_Reverse = "width";  	
	} else {
		_T_End_Var = Cid_w;
		_T_End_Var_Reverse = Cid_h;
		_T_style_Reverse = "height"; 	 	 	
	}

	var _start = _end = 0;
	if (now_status == 1) {
		_start = _T_End_Var;
		_end = 0;
	} else {
		_start = 0;
		_end = _T_End_Var; 		
	}
 
	Cid.style.overflow = "hidden";
	Cid.style.display = "block"; // 트윈할려면 block 해야함

	_end = _end + "px";

	m9_slide_toggle(Cid,{speed:'slow'},function() {
		Cid.style.overflow = "visible";
		Cid.style["height"] = "auto";  // height는 무조건 auto
		if (now_status == 1) { Cid.style.display = "none"; }
		if (Dfunc) { Dfunc(); }
	});
 	
} //function

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _m9_slide_options = ["speed","opacity","slide","easing"];
function _m9_get_slide_options(Doptions) {
	var Eoptions = {};
	for (var i=0;i<_m9_slide_options.length;i++) {
		if (Doptions[_m9_slide_options[i]]) {
			Eoptions[_m9_slide_options[i]] = Doptions[_m9_slide_options[i]];
		}
	}	
	return Eoptions;
}

var _m9_opentoggle_group = {};
var _m9_opentoggle_obj_slide = {};
function m9_opentoggle(Did,Doptions) {
	
	var Cid = m9_get_object(Did);
	if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시		

	var returns = [Did];
	
	var Eoptions;
	var Dgroup = undefined;
	var Dself = 1;
	if (Doptions) {
		Eoptions = _m9_get_slide_options(Doptions);
		Dgroup = Doptions["group"];
		Dself = (Doptions["self"] == 0) ? 0 : 1;
	}

	var closed_id = _m9_opentoggle_group[Dgroup];
	if (closed_id == Did) {
		if (Dself != 1) { return false; }
	}

	if (Dgroup) {
		if (closed_id) {

			var Eid = m9_get_object(closed_id);		
			if (jQuery(Eid).css("display") != "none") {
				if (_m9_opentoggle_obj_slide[closed_id] == 1) {
					m9_layer_slide_close(Eid);		
				} else {
					jQuery(Eid).css("display","none");
				}
				_m9_opentoggle_group[Dgroup] = undefined;												
			}
			returns[1] = closed_id;
		}
	}
	
	if (jQuery(Cid).css("display") == "none") {
		
		if (Eoptions) {
			_m9_opentoggle_obj_slide[Did] = 1;
			m9_layer_slide_view(Did,Eoptions);			
		} else {
			jQuery(Cid).css("display","");				
		}

		if (Dgroup) { _m9_opentoggle_group[Dgroup] = Did; }
		returns[0] = Did;
		
	} else {
		
		if (Eoptions) {		
			_m9_opentoggle_obj_slide[Did] = 1;				
			m9_layer_slide_close(Did,Eoptions);						
		} else {
			jQuery(Cid).css("display","none");			
		}

		if (Dgroup) { _m9_opentoggle_group[Dgroup] = undefined; }
		returns[0] = "";		
	}		
	return returns;
}

var m9_layer_list = new Array();								// [레이어 리스트] 해쉬 
var m9_now_viewed_layer_list = new Array();		// [현재 보여지고 있는 레이어 리스트] 해쉬

function m9_layer_view(Dgroup,Dnum,Dbase) {

	// 객체가 존재하지 않을 경우 객체 생성
	// 최초의 m9_layer_view() 호출이 있을경우 m9_layer_list[][] 해쉬의 해쉬(2중해쉬생성)
	// m9_layer_list 처음 해쉬는 Dgroup명이고, 두번째 해쉬는 Dnum값이다.
	if (m9_layer_list[Dgroup] == undefined) {

		m9_layer_list[Dgroup] = new Array();					// [레이어 리스트] 해쉬의 해쉬 초기화
		m9_layer_list[Dgroup][Dnum] = 1;							// 레이어 저장

		m9_now_viewed_layer_list[Dgroup] = Dbase;		// [현재 보여지고 있는 레이어 리스트] 초기화
	}

	// 레이어가 존재하지 않으면 
	if (m9_layer_list[Dgroup][Dnum] == undefined) {
		m9_layer_list[Dgroup][Dnum] = 1;			// 레이어 저장
	}

	if (m9_now_viewed_layer_list[Dgroup] == Dnum) {
		return false;
	}
	 
	if (m9_now_viewed_layer_list[Dgroup] != undefined) { 
		var closed_layer = Dgroup + "" + m9_now_viewed_layer_list[Dgroup]; 
		if (m9_getObject(closed_layer)) {  	
			m9_getObject(closed_layer).style.display = "none";
		}
	}
	   
	// 레이어 보이기
	var Dgroup2 = Dgroup +""+ Dnum;
	if (m9_getObject(Dgroup2)) { 
		m9_getObject(Dgroup2).style.display = "";
		m9_now_viewed_layer_list[Dgroup] = Dnum;    
	}

} // function

function m9_layer_view2(Dname,Ddirect,Drotation) {

	var Ddoc = document.all[Dname];
	var Dlen = Ddoc.length;

	for(i=0;i<Dlen;i++) {

		if (Ddoc[i].style.display == "") {

			var target_num = 0;

			if (Ddirect == "prev") {
				target_num = i - 1;
				if (target_num < 0) {
					if (Drotation == 1) { target_num = Dlen - 1; } else { return false; }
				}
			} else {
				target_num = i + 1;
				if (target_num >= Dlen) {
					if (Drotation == 1) { target_num = 0; } else { return false; }
				}
			}

			Ddoc[i].style.display = "none";
			Ddoc[target_num].style.display = "";
			return false;
		}

	} //for
 
} // function

var m9_before_id = "";
function m9_layer_view3(Dname) {

	if (m9_before_id != "" && m9_before_id != Dname) { jQuery(m9_getObject(m9_before_id)).css('display','none'); }

	var obj = m9_getObject(Dname);
	jQuery(obj).css('display',( (jQuery(obj).css('display') != "none") ? "none" : "block") );
	m9_before_id = (jQuery(obj).css('display') != "none") ? Dname : "";
 
} // function

function m9_layer_view_slide(Dgroup,Dnum,Dbase) {

	// 객체가 존재하지 않을 경우 객체 생성
	// 최초의 m9_layer_view() 호출이 있을경우 m9_layer_list[][] 해쉬의 해쉬(2중해쉬생성)
	// m9_layer_list 처음 해쉬는 Dgroup명이고, 두번째 해쉬는 Dnum값이다.
	if (m9_layer_list[Dgroup] == undefined) {
		m9_layer_list[Dgroup] = new Array();					// [레이어 리스트] 해쉬의 해쉬 초기화
		m9_layer_list[Dgroup][Dnum] = 1;							// 레이어 저장
		m9_now_viewed_layer_list[Dgroup] = Dbase;		// [현재 보여지고 있는 레이어 리스트] 초기화
	}

	// 레이어가 존재하지 않으면 
	if (m9_layer_list[Dgroup][Dnum] == undefined) {
		m9_layer_list[Dgroup][Dnum] = 1;			// 레이어 저장
	}

	if (m9_now_viewed_layer_list[Dgroup] == Dnum) {
		return false;
	}
 
	if (m9_now_viewed_layer_list[Dgroup] != undefined) { 
		var closed_layer = Dgroup + "" + m9_now_viewed_layer_list[Dgroup]; 
		if (m9_getObject(closed_layer)) {  	

			m9_Slide_Obj(closed_layer,"height",function() {
				var rr4 = closed_layer + "_parent";
				if (m9_getObject(rr4)) {
					m9_getObject(rr4).style.display = "none";
				}
			});   
   
		}
	}
   
	// 레이어 보이기
	var Dgroup2 = Dgroup +""+ Dnum;
	 
	if (m9_getObject(Dgroup2)) { 
		var rr5 = Dgroup2 + "_parent";
		if (m9_getObject(rr5)) {
			m9_getObject(rr5).style.display = "";
		}
		m9_Slide_Obj(Dgroup2);  
		m9_now_viewed_layer_list[Dgroup] = Dnum;    
	}

} // function

function m9_layer_position(target_id,click_id,Ddirect,Drange) {

 if (!click_id) { click_id = m9_get_evt_obj(m9_evt); }

 target_id = m9_get_object(target_id);

 var out_obj = _m9_get_layer_range(Drange);

 jQuery(target_id).after('<span id="_x_xx" style="position:absolute;display:inline-block;width:1px;height:1px"></span>'); // 20221015 수정

 var t_w = m9_get_object_size(target_id,"width"); 
 var t_h = m9_get_object_size(target_id,"height"); 

 var m_w = m9_get_object_size(click_id,"width");  
 var m_h = m9_get_object_size(click_id,"height"); 

 var m_x = m9_getRealOffsetLeft(click_id);
 var m_y = m9_getRealOffsetTop(click_id);

 if (!Ddirect || !_m9_direct[Ddirect]) { Ddirect = "up"; }

 var _pos = _m9_direct_get(Ddirect,out_obj,[m_w,m_h,m_x,m_y],[t_w,t_h]);

 var t_obj = jQuery('#_x_xx').offsetParent()[0];//.parent()[0]; // 20221015 수정
 _pos[1] -= m9_getRealOffsetLeft(t_obj); // 20220830 수정(추가3)
 _pos[2] -= m9_getRealOffsetTop(t_obj); // 20220830 수정(추가3)

 jQuery('#_x_xx').remove(); // 20221015 수정

 if (jQuery(target_id).css('position') == 'fixed') {
	_pos[1] -= m9_get_body_obj().scrollLeft;
	_pos[2] -=  m9_get_body_obj().scrollTop;
	if (_pos[1] < 0) { _pos[1] = 0; }
	if (_pos[2] < 0) { _pos[2] = 0; }
 }

 m9_change_pixelLeft(target_id,_pos[1]);
 m9_change_pixelTop(target_id,_pos[2]);

 m9_obj_set_data(target_id,"layer_direct",_pos[0]);

 return _pos[0]; // 방향 리턴

}	//function

function m9_layer_position_xy(target_id,Dx,Dy) {

 var Cid = m9_get_object(target_id);
 var direct = (Cid["_layer_direct"]) ? Cid["_layer_direct"] : "up" // 레이어 출력방향

 var t_w = m9_get_object_size(target_id,"width") / 2; 
 var t_h = m9_get_object_size(target_id,"height") / 2; 

	if (Dx) {
   var _l = m9_get_pixelLeft(Cid);
   if (direct == "up") { _l = _l + t_w;	}
   _l = (direct == "left") ? (_l - Dx) : (_l + Dx);	   	
   m9_change_pixelLeft(target_id,_l);
	}

	if (Dy) {
   var _t = m9_get_pixelTop(Cid);
   _t = (direct == "up" || direct == "left") ? (_t - Dy) : (_t + Dy);	   	
   m9_change_pixelTop(target_id,_t);   
	}
}	//function

function m9_obj_toggle(Did,DCallback) {
 
 var Cid = m9_get_object(Did);		
 if (!Cid) { return false; }
 
 var Dvalue, Dreturn;
 if (jQuery(Cid).css("display") == "none") {
 	Dvalue = "block";
 	Dreturn = 1;
 } else {
 	Dvalue = "none";
 	Dreturn = 0; 	
 }

 jQuery(Cid).css("display",Dvalue) 
 if (typeof(DCallback) == "function") { DCallback(); }
 return Dreturn;
 
} //function

function m9_slide_toggle(Did,Dhow,DCallback) {

 var Cid = m9_get_object(Did);		
 if (!Cid) { return false; }

 if (!Dhow) { Dhow = {}; } 
 if (!Dhow["slide"]) { Dhow["slide"] = "down"; }
  
 var Dreturn;

 if (jQuery(Cid).css("display") == "none") {
  m9_layer_slide_view(Did,Dhow,DCallback);
  Dreturn = 1;
 } else {  	
  m9_layer_slide_close(Did,Dhow,DCallback);  
  Dreturn = 0;  
 }
 return Dreturn; 
 
} //function

function m9_layer_slide_view(Did,Dhow,DCallback) {

 var Cid = m9_get_object(Did);		
 if (!Cid) { return false; }

 if (jQuery(Cid).css("display") != "none") { return false; }

 m9_obj_set_data(Cid); // 데이터 초기화
 var _data = Cid["_data"];

 if (Dhow) {
  Cid = _m9_layer_reset(Cid);
  _m9_layer_slide(Cid,Dhow,0);
 }

 if (_data["_son"]) {

  var son_obj = m9_getObject(_data["_son"]);  

  // 애니메이션 준비
  jQuery(son_obj).css(_data["ani_reset_tag"]);
  jQuery(Cid).css({"display":"block"});
  // 애니메이션

  jQuery(son_obj).animate(_data["ani_tag"],_data["ani_speed"],_data["ani_easing"],DCallback);
 	
 } else { // Dhow 존재하지 않으면
  jQuery(Cid).css("display","block"); 	
 }

} //function

function m9_layer_slide_stop(Did) {
	
 var Cid = m9_get_object(Did);		
 if (!Cid) { return false; }

 if (jQuery(Cid).css("display") == "none") { return false; }
 
 m9_obj_set_data(Cid); // 데이터 초기화
 
 var _data = Cid["_data"];

 if (_data["_son"]) { 
  var son_obj = m9_getObject(_data["_son"]);   	
  jQuery(son_obj).stop();
 }
}

function m9_layer_slide_close(Did,Dhow,DCallback) {
	
 var Cid = m9_get_object(Did);		
 if (!Cid) { return false; }

 if (jQuery(Cid).css("display") == "none") { return false; }

 m9_obj_set_data(Cid); // 데이터 초기화

 if (Dhow) {
  Cid = _m9_layer_reset(Cid);
  _m9_layer_slide(Cid,Dhow,0);
 }
 
 var _data = Cid["_data"];

 if (_data["_son"]) {
  
  var son_obj = m9_getObject(_data["_son"]);  
 
  // 애니메이션 준비
  jQuery(son_obj).css(_data["ani_tag"]);

  // 애니메이션
  jQuery(son_obj).animate(
	_data["ani_reset_tag"],
	_data["ani_speed"],
	_data["ani_easing"],
	function() {	
		jQuery("#"+this["_data"]["parent"]).css("display","none");		
		jQuery(this).css(_data["ani_tag"]);		
		_m9_reset_sss(this);				
		if (DCallback) { eval(DCallback()); }

	}		
  );

 } else { // Dhow 존재하지 않으면
  jQuery(Cid).css("display","none"); 	
 }
 
} //function

var _m9_before_layer;		// 이전 레이어
function m9_layer_view_only(Did,Dhow,DCallback) {

 var Cid = m9_get_object(Did);		

 // 열려진 레이어 존재하면 닫기
 if (_m9_before_layer != undefined) {
  if (_m9_before_layer == Cid) {
   return false;  	
  } else {
   if (_m9_before_layer._DCallback) {
   	m9_layer_view_only_close(_m9_before_layer,'',_m9_before_layer._DCallback);
   } else {
   	m9_layer_view_only_close(_m9_before_layer);  	   	
   }

  }	
 }

 m9_layer_slide_view(Did,Dhow,DCallback);
 _m9_before_layer = Cid;		// 현재보여진 레이어
 _m9_before_layer._DCallback = DCallback;
 
} //function

function m9_layer_view_only2(Did,Dhow,DCallback) {
 var _copy = _m9_before_layer;
 m9_layer_view_only(Did,Dhow,DCallback);
 _m9_before_layer = _copy;
} //function

function m9_layer_view_only_close(Did,Dhow,DCallback) {
	
 var Cid = m9_get_object(Did);		
 m9_layer_slide_close(Did,Dhow,DCallback);
 _m9_before_layer = undefined;		// 현재보여진 레이어

} //function

function m9_obj_set_data(Did,Dkey,Dvalue) {
 var Cid = m9_get_object(Did);
 if (!Cid["_data"]) { Cid["_data"] = {}; }
 if (Dkey) { Cid["_data"][Dkey] = Dvalue; }
}

function m9_obj_get_data(Did,Dkey) {
 if (!Did) { return false; }
 var Cid = m9_get_object(Did);
 if (!Cid["_data"]) { Cid["_data"] = {}; }
 if (Cid["_data"][Dkey]) { return Cid["_data"][Dkey]; }
 return false;
}

function _m9_layer_view_only_close(evt) {	
 if (_m9_before_layer == undefined) { return false; }
 m9_layer_view_only_close(_m9_before_layer,'',_m9_before_layer._DCallback);
} //function

function _m9_layer_slide(Did,Dhow) {

 var Cid = m9_get_object(Did);	
 
 Cid.style.display = "block"; // 필요
 
 // 내용물 크기 변경될 경우 방지 여기서 크기 알아옴
 var son_obj = m9_getObject(Cid["_data"]["_son"]);  

 var _w = m9_get_object_size(son_obj,"width") + "px";
 var _h = m9_get_object_size(son_obj,"height") + "px";  

 var _w2 = jQuery(son_obj).css("width");

 var ani_tag = {};
 var ani_reset_tag = {};

 var direct = (_m9_direct[Dhow["slide"]]) ? Dhow["slide"] : (Cid["_data"]["layer_direct"]) ? Cid["_data"]["layer_direct"] : "down" // 레이어 출력방향
     	
 // 슬라이드 적용     
 if (Dhow["slide"] != undefined) {
  if (direct == "down") {
   ani_reset_tag["marginTop"] = "-" + _h;   
   ani_tag["marginTop"] = son_obj["_data"]["marginTop"];

  } else if (direct == "left") {
   ani_reset_tag["marginLeft"] = _w;      
   ani_tag["marginLeft"] = son_obj["_data"]["marginLeft"];   
   
  } else if (direct == "right") {
   ani_reset_tag["marginLeft"] = "-" + _w;      
   ani_tag["marginLeft"] = son_obj["_data"]["marginLeft"];   
  } else {
   ani_reset_tag["marginTop"] = _h;            
   ani_tag["marginTop"] = son_obj["_data"]["marginTop"]; 	      
  }
  
 }

 // 투명도 적용
 if (Dhow["opacity"] != undefined) {
  ani_reset_tag["opacity"] = 0;            
  ani_tag["opacity"] = Dhow["opacity"] / 100;  
 }

 if (!Dhow["speed"]) { Dhow["speed"] = "fast"; }
 if (!Dhow["easing"]) { Dhow["easing"] = "linear"; }

 if (M9_SET["navigator"] == "ie") {
  ani_tag = _m9_change_animate_var(ani_tag);
  ani_reset_tag = _m9_change_animate_var(ani_reset_tag);
 }

 // 애니메이션 toggle위한 설정
 m9_obj_set_data(Cid,"ani_tag",ani_tag);
 m9_obj_set_data(Cid,"ani_reset_tag",ani_reset_tag);
 m9_obj_set_data(Cid,"ani_speed",Dhow["speed"]);
 m9_obj_set_data(Cid,"ani_easing",Dhow["easing"]);
 
} //function

var m9_obj_css = new Array("left","top","right","bottom","marginTop","marginBottom","marginLeft","marginRight");

function _m9_html_reset(Did) {
	
	var Cid = m9_get_object(Did);		

	if (Cid["_data"]) {
 		if (Cid["_data"]["_before_html"]) {
 			alert(Cid["_data"]["_before_html"]);
 		}
	} 	
}

function _m9_reset_sss(Did) {

	var Cid = m9_get_object(Did);		

	if (Cid["_data"]) {
 		if (Cid["_data"]["_before_html"]) {		
 			var cc = jQuery('<div />').html(Cid["_data"]["_before_html"]);
 			jQuery(Cid).unwrap();
 			
 			var dd = new Array('id','class');
 			for (var i=0;i<dd.length;i++) {
 				
 				var tt = jQuery(cc).children().attr(dd[i]);
 				jQuery(Cid).attr(dd[i],tt);
 			}
 			
 			jQuery(Cid).removeAttr('style');
 			
 			jQuery(Cid).css('display','none');
			Cid["_data"]["animate_div"] = undefined;
 		}
	} 	
		
}

function _m9_layer_reset(Did) {

 var Cid = m9_get_object(Did);		

 // 슬라이드를 위한 초기화
 if (Cid["_data"]["animate_div"]) { return Cid; }

 var _memory = jQuery('<div />').html(jQuery(Cid)[0].outerHTML);
 jQuery(_memory).children().html("");
 m9_obj_set_data(Cid,"_before_html",jQuery(_memory).html());

 var real_css = {};
 for (var i=0;i<m9_obj_css.length;i++) {
  var Cvalue = m9_obj_css[i];
  real_css[Cvalue] = jQuery(Cid).css(Cvalue);
 }

 var _h = jQuery(Cid).outerHeight();
 var _w = jQuery(Cid).outerWidth();
 
 m9_obj_set_data(Cid,"animate_div",1); // 에니매이션 처리 됨

 var _zIndex = jQuery(Cid).css("z-index");
 var _position = jQuery(Cid).css("position");   
 var _float = jQuery(Cid).css("float");

 jQuery(Cid).css("position","static");
 var zd = (M9_SET["navigator"] == "ie") ? 0 : "auto";
 zd = 0;

 jQuery(Cid).css("z-index",zd);
 var _o_data = Cid["_data"];
 
 var _clone_id = m9_random_id(Cid); // id존재하지 않으면 생성
 var _clone_son_id = _clone_id + "_son";
 
 jQuery(Cid).attr("id",_clone_son_id);			// ID변경 ID + "_son"
 jQuery(Cid).wrap('<div class="slide_empty" id="'+ _clone_id + '" style="display:none"></div>');//.css({offsetWidth:_w});		// ID변경
 jQuery(Cid).css("display","block");
 
 for (var i in real_css) {
  var Cvalue = real_css[i];
  jQuery("#"+_clone_id).css(i,Cvalue);
  var Dvalue = (Cvalue != "auto") ? 0 : "auto";
  jQuery(Cid).css(i,Dvalue);	
 }

 m9_obj_set_data(Cid,"parent",_clone_id);      
 m9_obj_set_data(Cid,"marginTop",0);
 m9_obj_set_data(Cid,"marginLeft",0); 
 
 Cid = m9_getObject(_clone_id);  // Cid 교체 
 Cid["_data"] = _o_data;
 m9_obj_set_data(Cid,"_son",_clone_son_id);   

_w += 1; // 에러때문에 ??????????

 if (_position == "absolute") {
  jQuery(Cid).css({width:_w,height:_h}); 
 }

 jQuery(Cid).css({"overflow":"hidden"}); // 보이기 범위 설정
 if (_zIndex) { jQuery(Cid).css("z-index",_zIndex); }
 if (_position) { jQuery(Cid).css("position",_position); }   
 jQuery(Cid).css("float",_float);

 return Cid;
 
}	//function

var _m9_direct = {
 "up" : ["a","b","c","d","x"],
 "down" : ["b","a","c","d","x"],
 "left" : ["c","d","a","b","x"], 
 "right" : ["d","c","a","b","x"],
 "!up" : ["a","x"],
 "!down" : ["b","x"],
 "!left" : ["c","x"], 
 "!right" : ["d","x"] 
};
function _m9_direct_get(Ddirct,a,b,c) {

	var scroll_obj = m9_get_body_obj();

	var Dx = 0;
	var Dy = 0;
						
	var _get_direct = {
		a:function() {
			Dx = b[2] + (b[0] / 2) - (c[0] / 2);
			Dy = b[3] - c[1];
		
			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"up",Dx,Dy]; }

			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (m9_get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;			
			if ((Dx + c[0]) > _x) { return [0,"up",Dx,Dy]; }
												
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"up",Dx,Dy]; }

			return [1,"up",Dx,Dy];
		},
		b:function() {
			Dx = b[2] + (b[0] / 2) - (c[0] / 2);
			Dy = b[3] + b[1];

			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"down",Dx,Dy]; }

			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (m9_get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;			
			if ((Dx + c[0]) > _x) { return [0,"down",Dx,Dy]; }
					
			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (m9_get_window_size())[1] + scroll_obj.scrollTop;

			var _y = (_y1 > _y2) ? _y2 : _y1;		
			if ((Dy + c[1]) > _y) { return [0,"down",Dx,Dy]; }
			
			return [1,"down",Dx,Dy];			
		},
		c:function() {
			Dx = b[2] - c[0];
			Dy = b[3] + (b[1] / 2) - (c[1] / 2);
			
			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"left",Dx,Dy]; }
			
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"left",Dx,Dy]; }

			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (m9_get_window_size())[1] + scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y2 : _y1;
			if ((Dy + c[1]) > _y) { return [0,"left",Dx,Dy]; }

			return [1,"left",Dx,Dy];	
		},
		d:function() {  
			Dx = b[2] + b[0];
			Dy = b[3] + (b[1] / 2) - (c[1] / 2);
			
			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (m9_get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;		
			var aa = Dx +c[0];
			
			if ((Dx + c[0]) > _x) { return [0,"right",Dx,Dy]; }
			
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"right",Dx,Dy]; }

			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (m9_get_window_size())[1] + scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y2 : _y1;
			if ((Dy + c[1]) > _y) { return [0,"right",Dx,Dy]; }
					
			return [1,"right",Dx,Dy];		
		},
		x:function() {  
			var _x2 = (m9_get_window_size())[0] + scroll_obj.scrollLeft;		
			var _y2 = (m9_get_window_size())[1] + scroll_obj.scrollTop;
			var Dx = (_x2 - c[0]) / 2;
			var Dy = (_y2 - c[1]) / 2;
			
			return [1,"down",Dx,Dy];			
		}	
	};

	var _first_k = [];
	var _d = [];
	var _ok = 0;
	for (var i=0;i<_m9_direct[Ddirct].length;i++) {
		var _k = _m9_direct[Ddirct][i];
		_d = _get_direct[_k]();
		if (i == 0) { _first_k = _d; } // 에러방지 무조건 처음값으로 설정
		if (_d[0] == 1) {
			_ok = 1;
			break;
		}
	}
 
	if (_ok == 0) { _d = _first_k; }
	return [_d[1],_d[2],_d[3]];

}

function _m9_get_layer_range(Did) {

 if (!Did) { Did = jQuery('body')[0] } 

 var _out_obj = m9_get_object(Did);

 var m_x = m9_getRealOffsetLeft(_out_obj);
 var m_y = m9_getRealOffsetTop(_out_obj);

 var m_w = m9_get_object_size(_out_obj,"width");  
 var m_h = m9_get_object_size(_out_obj,"height"); 

 var as = new Array(m_w,m_h,m_x,m_y);  

 return as;

} //function

function _m9_change_animate_var(Dhash) {
 for(var i in Dhash) {
 	Dhash[i] = String(Dhash[i]);
 }
 return Dhash;
}

jQuery(document).on("dblclick",function(){ _m9_layer_view_only_close(m9_evt); });

////////////////////////////////////////////////////////////////////////

var M9SLIDE,M9MOVIE,M9TAB,M9SELECTBOX,M9RESIZE_IMG,M9GOOGLE_MAP,M9BANNER,M9LIGHTBOX;

var m9_size_etc_w = new Array("marginLeft","marginRight");
var m9_size_etc_h = new Array("marginTop","marginBottom");

function m9_get_size_etc(Did,Dtype) {

	var Cid = m9_get_object(Did);
	if (!Cid) { return false; }
	
	var w = jQuery(Cid).outerWidth() - m9_get_num(jQuery(Cid).css("width"));
	var h = jQuery(Cid).outerHeight() - m9_get_num(jQuery(Cid).css("height"));	

	if (Dtype == 1) {
		for (var i=0;i<m9_size_etc_w.length;i++) {
			w += m9_get_num(jQuery(Cid).css(m9_size_etc_w[i]));
		}
		for (var i=0;i<m9_size_etc_h.length;i++) {
			h += m9_get_num(jQuery(Cid).css(m9_size_etc_h[i]));
		}
	}
	return [w,h];
} // function

function m9_get_vars(Dvars,Dint) {

	var new_vars = {};
 
	if (Dvars) {
		for (var i in Dint) {
			new_vars[i] = (Dvars[i] && Dvars[i] != "undefined") ? Dvars[i] : Dint[i];
		}
		return new_vars;
	} else {
		return Dint;
	}
	
} // function

var M9ANI = {

	reset : function(Did,Deffect) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시

		var ani_name = Deffect[0];

		if (ani_name == "btn") { ani_name = "fade"; Deffect[1] = {}; }		
		
		if (!M9ANI[ani_name]) {
			return false; // 존재하지 않은 애니메이션 호출시 무시
		} else {
			if (M9ANI[ani_name]["extend"]) { M9ANI[ani_name]["extend"](Did,Deffect); return false; }		// 외부 파일 확장 슬롯			
		}

		if (M9ANI[ani_name].setting) { M9ANI[ani_name].setting(Did); }
		
		M9ANI.ani_reset(Did,ani_name,Deffect[1]);

		if (M9ANI[ani_name].aftersetting) { M9ANI[ani_name].aftersetting(Did); }
		   		
	},
 
	effect : function(Did) {

		var evt_obj = window.event;
		var o = Did._ani[evt_obj.type];
			  
 		for(var i=0;i<o.length;i++) {
 			var ex = o[i];
			M9ANI[ex][evt_obj.type](Did); // 애니메이션 실행
		}

	},

	ani_reset : function(Did,ani_name,Deffects) {

		if (!Did._ani) { Did._ani = {};	}
		if (!Did._ani_property) { Did._ani_property = {};	}

		if (Deffects) {

			var aa = M9ANI[ani_name].vars;
			aa["type"] = "load"; // load항목 추가
			Did._ani_property[ani_name] = {};
			var bb = Did._ani_property[ani_name];
			for (var z in aa) {
				bb[z] = (!Deffects[z]) ? aa[z] : Deffects[z];
			}			

			if (Deffects["type"] == "event") {
				return false; // 이벤트 부여 안함
			}
					
		} else {
			Did._ani_property[ani_name] = M9ANI[ani_name].vars;
			Did._ani_property[ani_name]["type"] = "load"; // load항목 추가			
		}

		var ev = M9ANI[ani_name].events; // 이벤트 종류

		var event_selecter = (Did._selecter) ? Did._selecter : Did;
		
		for (var i=0;i<ev.length;i++) {
			
			var e_kind = ev[i];

			if (!Did._ani[e_kind]) {
				
				Did._ani[e_kind] = [];

				var e_kind2 = e_kind;
				if (e_kind2 == "mouseover") {
					e_kind2 = "mouseenter";
				} else if (e_kind2 == "mouseout") {
					e_kind2 = "mouseleave";	
				}

				// 이벤트 활성화
				jQuery(event_selecter).on(e_kind2,function() {
					var ee = window.event.type;
					if (Did._lastevent == ee) { return false; }
					Did._lastevent = ee;
					M9ANI.effect(Did); 
				});
			
			}
			
			Did._ani[e_kind].push(ani_name); // 이벤트 추가
				
		}

	},	
	propertys : function(Did,ani_name,Deffects) {
		
		var Cid = m9_get_object(Did);
		if(!Cid) { return false; }

		if (!Deffects) { return false; }
		
			var Dprop = Cid._ani_property[ani_name];
			if (!Dprop) { return false; }
			for (var i in Deffects) {
				if (Deffects[i] == "undefined") { Deffects[i] = undefined; }
				Dprop[i] = Deffects[i];
				if (i == "o_time" || i == "a_time") { Dprop[i] = Dprop[i]*1; }
			}

	},
	
	_load_stay_obj : {},
	_load_stay : function(Deffect) {
		if (M9ANI._load_stay_obj[Deffect]) {	
			for (var i=0;i<M9ANI._load_stay_obj[Deffect].length;i++) {
				M9ANI._load_stay_obj[Deffect][i]();
			}
			M9ANI._load_stay_obj[Deffect] = undefined;	
		}		
	}

} //M9ANI

var _m9_ANI = {

	_ani_list : {
		"slide" : M9SLIDE,
		"movie" : M9MOVIE,
		"tab" : M9TAB,
		"selectbox" : M9SELECTBOX,
		"resize" : M9RESIZE_IMG,
		"banner" : M9BANNER,
		"lightbox" : M9LIGHTBOX
	},

	run : function(Dani_kind,Did,Dhash) {

		if (typeof(_m9_ANI._ani_list[Dani_kind]) == "undefined") {	
			return false;
		}
		var Pid = jQuery(Did);
		if (Pid.length == 0) {
			var obj = m9_getObject(Did);
			if (typeof(obj) == "object") { Pid.push(Did); }  
		}
		for(var i=0;i<Pid.length;i++) {	
			M9ANI.reset(Pid[i],[Dani_kind,Dhash]);	
		}

	},

	propertys : function(Dani_kind,Did,Dhash) {

		if (typeof(_m9_ANI._ani_list[Dani_kind]) == "undefined") {	
			return false;
		}
		var Pid = jQuery(Did);
		if (Pid.length == 0) {
			var obj = m9_getObject(Did);
			if (typeof(obj) == "object") { Pid.push(Did); }  
		}
		for(var i=0;i<Pid.length;i++) {	
			M9ANI.propertys(Pid[i],Dani_kind,Dhash);	
		}

	}

}; // _m9_ANI

M9ANI["google_map"] = {
	extend : function(Did,Deffect) {
		m9_delay("",1000,function() {		
			if (typeof(M9GOOGLE_MAP) != "undefined") {
				M9GOOGLE_MAP.int(Did,Deffect);
			} else {		
				if (!M9ANI._load_stay_obj["google_map"]) { M9ANI._load_stay_obj["google_map"] = [];	}
				M9ANI._load_stay_obj["google_map"].push(function() { M9GOOGLE_MAP.int(Did,Deffect); });
			}
		});
	}	
};

// 편집기 설정창에서 에러남
M9ANI["tab"] = {
	extend : function(Did,Deffect) {
		m9_ImportScript(M9_SET["mong9_url"] + "/source/js/m9-tab.js",function() {
			m9_delay("",500,function() {				
				M9TAB.int(Did,Deffect);
			});
		});
	}	
};

M9ANI["lightbox"] = {

	'hash' : {},
	'count' : 0,
	extend : function(Did,Deffect) {

		if (M9ANI.lightbox.count == 0) { // if(1)

			m9_ImportCss("//javascript.mong9.com/5.2/etc/TosRUs/css/jquery.tosrus.all.css");
			m9_ImportScript(M9_SET["mong9_url"] + "/source/etc/hammer.min.js");
			m9_ImportScript(M9_SET["mong9_url"] + "/source/etc/FlameViewportScale.js");
			m9_ImportScript(M9_SET["mong9_url"] + "/source/etc/TosRUs/js/jquery.tosrus.all.min.js",function() {

				m9_delay("",1000,function() {	

					for (var i in M9ANI.lightbox.hash) {

						if (i == '_lightbox_') {
							jQuery("."+i).tosrus();
						} else {
							jQuery("."+i).tosrus({
								pagination : {
									add        : true,
									type       : "thumbnails",
								},
								caption    : {
									add        : true
								}  
							});
						}

					}

				});
			});

			M9ANI.lightbox.count++;

		} // if(1)

		var _name = '_lightbox_' + Deffect[1]['group'];

		jQuery('.'+_name).each(function() {
			jQuery(this).prop('href',jQuery(this).data('m9-href'));
		});

		if (!M9ANI.lightbox.hash[_name]) {
			M9ANI.lightbox.hash[_name] = 1;
		}

		jQuery(Did).addClass(_name);

	} // extend

}; // M9ANI["lightbox"]

M9GOOGLE_MAP = {

	vars : {
		'x' : 126.9753042,		
		'y' : 37.5599416,
		'zoom' : 17,
		'title' : 'Sungnyemun',
		'address' : '40, Sejong-daero, Jung-gu, Seoul, Republic of Korea'
	},

	int : function(Did,Deffect,_type) {

		var _func = function() {
			var Cid = m9_get_object(Did);
			if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시
			Cid._resize_property = m9_get_vars(Deffect[1],M9GOOGLE_MAP.vars);
			M9GOOGLE_MAP.set(Did,Cid._resize_property,_type);
		};

		var google_token = (M9_SET['google_token']) ? M9_SET['google_token'] : '';
		if (google_token != '') {
			m9_ImportScript('//maps.googleapis.com/maps/api/js?key=' + google_token + '&callback=M9GOOGLE_MAP._empty_callback&language='+get_mong9_lang(),_func);					
		} else {
			m9_ImportScript('//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language='+get_mong9_lang(),_func);	
		}
	
	},

	set : function(Did,Deffect,_type) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시	

		jQuery(Cid).data('original_style',jQuery(Cid).attr('style'));

		var Y_point        = Deffect['y'] * 1;    // lat 값 
		var X_point        = Deffect['x'] * 1;  // lng 값 

		var zoomLevel      = Deffect['zoom'] * 1;  // 첫 로딩시 보일 지도의 확대 레벨 
	
		var markerTitle    = Deffect['title'];  // 현재 위치 마커에 마우스를 올렸을때 나타나는 이름 
		var markerMaxWidth = 300;  // 마커를 클릭했을때 나타나는 말풍선의 최대 크기 
	
		// 말풍선 내용 
		var contentString	= '<div>' + 
			'<div>'+ 
				'<span class="m9-map-head">'+markerTitle+'</span>'+ 
			'</div>'+ 
			'<div class="m9-map-content">'+ 
				Deffect['address'] + 
			'</div>'+ 
		'</div>'; 

		var myLatlng = new google.maps.LatLng(Y_point,X_point); 

		var mapOptions = { 
			zoom: zoomLevel, 
			center: myLatlng, 
			mapTypeId: google.maps.MapTypeId.ROADMAP
	 	};

		var map = new google.maps.Map(Cid, mapOptions); 	

		var draggabled =  (_type == 1) ? true : false;
		var marker = new google.maps.Marker({ 
			position: myLatlng, 
			map: map, 
			draggable:draggabled, 
			panControl: true,
			animation: google.maps.Animation.DROP
			//title: markerTitle 
		}); 

		var infowindow = new google.maps.InfoWindow({ 
			content: contentString, 
			maxWidth: markerMaxWidth 
		}); 
	
		infowindow.open(map,marker); 

		jQuery(Cid).data('google_map',{ 'lang' : myLatlng, 'map' : map , 'marker' : marker });	

		google.maps.event.addDomListener(window,"resize",function() { //리사이즈에 따른 마커 위치
			var center = map.getCenter();
			google.maps.event.trigger(map,"resize");
			map.setCenter(center); 
		});

		google.maps.event.addListenerOnce(map,'idle',function() {
			google.maps.event.trigger(map,'resize');
		});
	
		if (_type == 1) {
			google.maps.event.addListener(marker,"drag",function() {			
				jQuery('#_google_y_pos').val(this.position.lat());
				jQuery('#_google_x_pos').val(this.position.lng());			  
			});
			google.maps.event.addListener(map,'zoom_changed',function() {
		      jQuery('#_google_zoom').val(map.getZoom());
				var latLng = marker.getPosition(); // returns LatLng object
				map.setCenter(latLng); // setCenter takes a LatLng object
		    });			
		}	
	
	},
	_empty_callback : {
		// https://maps.googleapis.com/maps/api/js callback
	}

};

///////////////////////////////////////////

var m9_mode_obj = {
	
	mode : '',
	order : [],
	_type : 'master',

	info : [	
		{ 'name' : 'm', 'width' : '768' , 'url' : M9_SET["mong9_url"] + 'source/css/mong9-m.css' , 'p_width' : '683' },		
		{ 'name' : 'e', 'width' : '576' , 'url' : M9_SET["mong9_url"] + 'source/css/mong9-e.css' , 'p_width' : '439' }					
	],

	change_info : function(Dhash) {
		for (var i=0;i<m9_mode_obj.info.length;i++) {
			var name = m9_mode_obj.info[i]['name'];
			if (Dhash[name]) {
				m9_mode_obj.info[i]['width'] = Dhash[name];
			}

		}

	},

	int : function(_type) { // 초기화

		if (m9_mode_obj.order.length == 0) { m9_mode_obj._get_order(); } // 모드 설정 가져오기

		if (_type != 1) {
			// 최초는 PC모드이므로 다른 모드의 스타일시트들 삭제
			// 만약 다른 기기에서도 가능하려면 변경해야함.
			for (var i=0;i<m9_mode_obj.order.length;i++) {
				m9_mode_obj.remove_stylesheet(i); // 초기화	
			}
		}

	},
	
	_get_order : function() { // m9_mode_obj.info의 값을 넓이값으로 정렬해서 m9_mode_obj.order 생성

		m9_mode_obj.info.sort(function(a,b) {
			return a.width > b.width ? -1 : (a.width < b.width ? 1 : 0);			
		});
		
		for (var i=0;i<m9_mode_obj.info.length;i++) {
			m9_mode_obj.order[i] = m9_mode_obj.info[i]['name'];
		}

	},

	get : function() { // 모드 가져오기(e,m,...)
		return m9_mode_obj.mode;	
	},
		
	change : function(_mode) { // 모드변경(상단 모드버튼)

		if (m9_mode_obj.mode == _mode) { return false; } // 모드가 같으면 무시(_mode => '','m','e')

		var _now = 0;
		var _btn = '';

		if (_mode == '') {

			jQuery('#example').css('display','');
			jQuery('._drag-btn-3,._drag-element-3').removeClass('disabled').prop('disabled','');
			jQuery('#_editor_font_convert').removeClass('disabled').prop('disabled','');
			_btn = 'pc';

		} else {

			jQuery('#example').css('display','none');					
			jQuery('._drag-btn-3,._drag-element-3').addClass('disabled').prop('disabled','disabled');					
			jQuery('#_editor_font_convert').addClass('disabled').prop('disabled','disabled').prop('checked',false);
			_btn = _mode;

		}		

		jQuery('._mode-btn').removeClass('active');
		jQuery('.btn-mode-' + _btn).addClass('active');
		
		if (_mode == '') { _now = 1; }
				
		index = -1;
		for (var i=0;i<m9_mode_obj.order.length;i++) {

			if (_now == 0) {
				m9_mode_obj.attach_stylesheet(i); // 스타일시트 붙여넣기
			} else {			
				m9_mode_obj.remove_stylesheet(i); // 스타일시트 삭제
			}
			if (m9_mode_obj.order[i] == _mode) {
				_now = 1;
				index = i;
			}

		}

		var _w = (_mode == '') ? '100%' : ( (m9_mode_obj.info[index]['p_width'] * 1) + (m9_get_num(jQuery('._editor-wrap').css('padding-left')) * 1) + (m9_get_num(jQuery('._editor-wrap').css('padding-right')) * 1) ) + 'px';       
		editor.event_doing.set(1);
		jQuery('._editor-wrap').animate({width:_w},300,function(){
			jQuery(this).css('overflow','');
			editor.event_doing.set(0);	
		});

		m9_mode_obj.reset_by_change(); // 모드변경시 화면 reset // hidden etc objects(img,video..) layer

		m9_mode_obj.change_data_by_mode(_mode);

		m9_mode_obj.mode = _mode;
		editor.mode._mode = _mode;

		jQuery(element_obj._now).trigger('mousedown');
		jQuery('#editMenu-grid').css('display','none');

	},

	reset_by_change : function() { // 모드변경시 화면 reset // hidden etc objects(img,video..) layer
		jQuery('._setting_area_box,.handle_width,.m9-alt-tipsy').css('display','none');		
	},

	_mode_kind_code : ['style','src'],

	get_m9_mode_name : function(_mode,_code) { // e -> m9-e-style

		var _name = 'm9-';
		if (_mode != '') {
			_name += _mode + '-';		
		}

		if (_code == '' || _code == undefined) {
			_code = 'style';
		}

		_name += _code;

		return _name;
	},

	// style to m9 data style
	// pc 모드 처리
	change_data_by_mode : function(_mode) { // 모드에 의한 style 변경

		if (m9_mode_obj.mode == _mode) { return false; }

		var mode_kind = m9_mode_obj._mode_kind_code;

		if (m9_mode_obj.mode == '') { // pc -> other mode

			var orders = m9_mode_obj.order;

			for (var z=0;z<mode_kind.length;z++) {

				var _key = 'data-' + m9_mode_obj.get_m9_mode_name('',mode_kind[z]); // m9-style

				var kinds = '';
				for (var i=0;i<orders.length;i++) {
					if (kinds != '') { kinds += ','; }
					kinds += '[data-' + m9_mode_obj.get_m9_mode_name(orders[i],mode_kind[z]) + ']';
				}

				// kinds => [data-m9-m-style],[data-m9-e-style]
				jQuery(kinds).each(function() {						
					var _style = jQuery(this).attr(mode_kind[z]);
					if (_style == undefined) { _style = ''; }			
					jQuery(this).attr(_key,_style);	
				});

			}

		} else if (_mode == '') { // other mode -> pc

			for (var z=0;z<mode_kind.length;z++) {

				var _key = 'data-' + m9_mode_obj.get_m9_mode_name('',mode_kind[z]); // m9-style
				var kinds = '[' + _key + ']';

				jQuery(kinds).each(function() {						
					var _style = jQuery(this).attr(_key);				
					jQuery(this).attr(mode_kind[z],_style);		
					jQuery(this).removeAttr(_key);
					
				});

			}

		}

		m9_mode_obj.change_all_data_by_mode(_mode); // 모드에 의한 style들 변경
			
	},

	change_all_data_by_mode : function(_mode) { // 모드에 의한 style들 변경

		if (_mode == '') { return false; }

		var _orders = [''];
		var orders = _orders.concat(m9_mode_obj.order);
		var mode_kind = m9_mode_obj._mode_kind_code;

		for (var z=0;z<mode_kind.length;z++) {

			var kinds = '';

			for (var i=0;i<orders.length;i++) {
				if (kinds != '') { kinds += ','; }
				kinds += '[data-' + m9_mode_obj.get_m9_mode_name(orders[i],mode_kind[z]) + ']';
			}

			jQuery(kinds).each(function() {
				var str = m9_mode_obj.get_data_str_by_mode(this,_mode,mode_kind[z]); // 모드에 의한 style 문자열 얻어오기
				jQuery(this).attr(mode_kind[z],str);		
			});

		}

	},

	get_data_str_by_mode : function(obj,_mode,_code) { // 모드에 의한 style 문자열 얻어오기

		var _orders = [''];
		var orders = _orders.concat(m9_mode_obj.order);

		var modes = [];
		
		var _now = 0;
		var _styles = {};
	
		for (var i=0;i<orders.length;i++) {

			var d = m9_mode_obj.get_m9_mode_name(orders[i],_code);
			var e = jQuery(obj).attr('data-'+d);
			if (e) {
				modes.push(e);
			}

			if (orders[i] == _mode) { break; }
				
		}

		var Dvar = '';

		if (_code == 'style') {
			Dvar = m9_mode_obj.get_style_by_str_array(modes); // 스타일 합치기
		} else {
			Dvar = modes[modes.length-1];
		}

		if (Dvar == undefined) { Dvar = ''; }

		return Dvar;
						
	},			

	get_orders_mode : function() {

		if (m9_mode_obj.order.length == 0) { m9_mode_obj._get_order(); } // 모드 설정 가져오기
		
		var orders = [''];
		if (m9_mode_obj.get() == '') { return orders; }
		
		for (var i=0;i<m9_mode_obj.info.length;i++) {	
			orders.push(m9_mode_obj.info[i]['name']);
			if (m9_mode_obj.info[i]['name'] == m9_mode_obj._mode) { break; }
		}

		return orders.reverse();
	},

	get_style_by_str_array : function(style_str_array) { // 스타일 합치기

		var _styles = {};
		for (var i=0;i<style_str_array.length;i++) {

			if (style_str_array[i] == '' || style_str_array[i] == undefined) { continue; }

			var f = style_str_array[i].split(';');
	
			for (var z=0;z<f.length;z++) {
				var g = f[z].split(':');				
				var _k = jQuery.trim(g[0]);
				_styles[_k] = jQuery.trim(g[1]);
			}	

		}

		var Dvar = '';
		for (var i in _styles) {
			if (Dvar != '') { Dvar += ';'; }
			if (i != '' && _styles[i] != undefined) {
				Dvar += i +':'+_styles[i];
			}
		}

		return Dvar;
				
	},
					
	attach_stylesheet : function(index) { // 스타일시트 붙여넣기
		var _url = m9_mode_obj.info[index]['url'];
		if (jQuery('head').find('[href=\''+_url+'\']').length == 0) {
			var max_width = m9_mode_obj.info[index]['width'];
			jQuery('head').append(jQuery('<link rel="stylesheet" href="'+ _url +'" type="text/css" />'));			
		}
	},
	
	remove_stylesheet : function(index) { // 스타일시트 삭제
		var _url = m9_mode_obj.info[index]['url'];
		var hrefs = jQuery('head').find('[href=\''+_url+'\']');
		if (hrefs.length > 0) {	
			hrefs.remove();
		}
	},
	
	edit_wrap : function(obj) {
		if (!jQuery(obj).parent().hasClass('._editor-wrap')) {
			jQuery(obj).wrap('<div class="_editor-wrap"></div>');
		}
	},
	
	remove_empty_style : function(obj) { // 공백인 data-m9-X-style 삭제

		var _orders = [''];
		var orders = _orders.concat(m9_mode_obj.order);
		var J_obj = jQuery(obj);			
		for (var i=0;i<orders.length;i++) {
			var _style = orders[i] + '-style';
			var _style = 'data-' + m9_mode_obj.get_m9_mode_name(orders[i]);
			J_obj.find('*['+_style+'=""]').removeAttr(_style);
		}
					
	},

	Responsive : function() {

		if (m9_mode_obj.order.length == 0) { m9_mode_obj._get_order(); } // 모드 설정 가져오기
		
		var bw = m9_get_num(jQuery('body').css('width'));

		var _mode = '';

		if (m9_mode_obj._type == 'master') { // 전문가 모드에서만 처리하기

			// 편집기 첫 로딩시 _m9_editor_canvas 가 생성되기도 전에 this.Responsive 함수가 실행될수 있음
			// 크기(width)를 못 알아올수 있음
			// 그래서 첫로딩시 body 크기로 대처하여 _mode 값이 '' 되도록 함.
			if (jQuery('._m9_editor_canvas').length > 0) {
				bw = m9_get_num(jQuery('._m9_editor_canvas').css('width'));
			}

			for (var i=m9_mode_obj.info.length;i>0;i--) {
				var num = i - 1;
				var _w = m9_mode_obj.info[num]['width'];
				if (_w >= bw) {
					_mode = m9_mode_obj.info[num]['name'];
					break;
				}
			}

		}

		m9_mode_obj.change_data_by_mode(_mode);
		m9_mode_obj.mode = _mode;

		if (jQuery('.m9editor-layout').length > 0) {

			var w_h = m9_get_num(jQuery(window).outerHeight());

			jQuery('.m9editor-layout').each(function() {

				var edit_obj = jQuery(this).find('div.m9_editor_box');
				var edit_h = jQuery.data(edit_obj[0],'min-height');
				var e_1 = m9_get_num(jQuery(this).find('._edit_menu_in').css('height')) + 100;

				var re_size = edit_h;
				if (edit_h > (w_h - e_1)) {
					re_size = w_h - e_1;
					edit_obj.css({'min-height':re_size,'height':re_size,'overflow-y':'auto'});
				} else {
					edit_obj.css({'min-height':re_size,'height':'auto','overflow-y':'none'});
				}

			});
		}

	} // Responsive
	
}; // m9_mode_obj

function get_mong9_lang(Dlang) {
	var _lang_str = (Dlang) ? Dlang : jQuery('html').prop('lang');
	var _lang = _lang_str.split('_')[0];
	return (_lang) ? _lang : 'en';
} // function

function m9_editor_be_check() {

	if (!M9_SET || M9_SET['mong9_editor_use'] != 1) { return false; }

	var editor_names = [];

	if (typeof(tinyMCE) == 'object') { editor_names.push('tinymce4'); } // TinyMCE
	if (typeof(CKEDITOR) == 'object') { editor_names.push('ckeditor4'); } // Ckeditor4
	if (typeof(oEditors) == 'object') { editor_names.push('smarteditor2'); } // Smart Editor2
	if (typeof(cheditor) == 'function') { editor_names.push('cheditor5'); } // Cheditor5
	if (typeof(xe) == 'object' && typeof(xe.Editors) == 'object') { editor_names.push('xpresseditor'); } // XE editor

	if (editor_names.length > 0) {

		m9_ImportScript(M9_SET["mong9_url"] + "source/js/mong9-connect.js",function() {
			mong9_btn_attach(editor_names);
		});
	}

} // function

jQuery(function() {

	if (M9_SET['mong9_editor_use'] == '1') {

		if (window.CKEDITOR) {
			CKEDITOR.config.allowedContent = { $1: { elements: CKEDITOR.dtd, attributes: true, styles: true, classes: true } };
			CKEDITOR.config.disallowedContent = 'style;script; *[on*]';
		}

		m9_delay('',200,function() {
			m9_editor_be_check();
		});

	}

});