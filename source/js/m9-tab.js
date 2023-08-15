var M9TAB = {

	vars : {
		id : undefined ,
		type : "click" ,
		on_class : 'm9-tab-btn-on' ,
		off_class : 'm9-tab-btn-off' ,
		slide : undefined ,
		speed : 300 ,
		color_effect : 0,
		url : undefined ,
		resize : 1,
		accordion : 0
	},

	reverse_slide : {
		up : "up" , down : "down" , left : "left" , right : "right"			
	},
		
	_SlideName : "_M9slide" ,
	_SlideCount : 1 ,

	int : function(Did,Deffect) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시		
		if (jQuery(Cid).data('_tab') == 1) { return false; }

		jQuery(Cid).data('_tab',1);

		var tab_id = m9_random_id(Cid); // id존재하지 않으면 생성
						
		Cid._tab_property = m9_get_vars(Deffect[1],M9TAB.vars);

		Cid._tab_list = {};
		Cid._tab_btn = {};		
		Cid._tab_content = {};

		var ul_obj = jQuery(Cid).children('ul')[0];
		m9_obj_set_data(ul_obj,'_kind','tab');

		var li_objs = jQuery(ul_obj).children('li');

		var _open_btn = '';

		for (var z=0;z<li_objs.length;z++) {

			var open_li = M9TAB._set_a_li(li_objs[z],Cid);
			if (open_li != '') {
				_open_btn = open_li;
			}

		}

		if (_open_btn) {

			var a_btn_obj = Cid._tab_btn[_open_btn];

			jQuery(a_btn_obj).removeClass(a_btn_obj["_data"]["tab_property"]["on_class"]).addClass(a_btn_obj["_data"]["tab_property"]["off_class"]);
			jQuery(Cid._tab_content[_open_btn]).css("display","none");	
			M9TAB.btn_onclick(a_btn_obj,1);	

		}

		m9_Resize_Function.push("M9TAB.resize('"+tab_id+"')");

	}, //int

	_set_a_li : function(li_obj,Cid) {

		var _open_btn = '';

		var _obj = jQuery(li_obj).find("[data-m9-tab-type],[tab_type]");

		var Tid = random_str();

		for (var i=0;i<_obj.length;i++) {

			var _ani = (jQuery(_obj[i]).attr("data-m9-tab-type")) ? jQuery(_obj[i]).attr("data-m9-tab-type") : jQuery(_obj[i]).attr("tab_type");
			if (!_ani) { continue; }

			var prop = m9_get_property(_ani);  		
			var ani = prop[0];

			var btn = _obj[i];

			var _property = m9_get_vars(prop[1],Cid._tab_property);		
			_property["speed"] = _property["speed"] * 1;		
			_property["id"] = Tid;

			m9_obj_set_data(btn,"tab_property",_property);
			m9_obj_set_data(btn,"tab_parent",Cid);	// 아버지 객체

			if (ani == "btn") {

				m9_attrs_history.set(btn);

				// 버튼 하나 설정
				if (Cid._tab_property["type"] == "over") {
					jQuery(btn).on("mouseover",function(){ M9TAB.btn_onclick(this);return false; });					
				} else {		
					jQuery(btn).on("click",function(){ M9TAB.btn_onclick(this);return false; });
				}

				if (Cid._tab_property['accordion'] != 1) {
					jQuery(btn).on("focus",function(){ M9TAB.btn_onclick(this);return false; });
				}	

				var _url = jQuery(btn).attr("url");
				if (_url) { btn["_data"]["tab_property"]["url"] = _url; }

				Cid._tab_btn[Tid] = btn;

				if (jQuery(btn).hasClass(Cid._tab_property["on_class"])) {
					_open_btn = Tid;
				}

			} else if (ani == "content") {

				m9_attrs_history.set(btn);

				btn._zindex = jQuery(btn).css("z-index");
				jQuery(btn).wrapInner('<div class="_tab_slide" style="display:block;width:100%"></div>');

				Cid._tab_content[Tid] = btn;	

			}

		}

		return _open_btn;

	},

	_reset_a_li : function(li_obj) {

		var _open_btn = '';

		var _obj = jQuery(li_obj).find("[data-m9-tab-type],[tab_type]");

		var Tid = random_str();

		for (var i=0;i<_obj.length;i++) {

			var _ani = (jQuery(_obj[i]).attr("data-m9-tab-type")) ? jQuery(_obj[i]).attr("data-m9-tab-type") : jQuery(_obj[i]).attr("tab_type");
			if (!_ani) { continue; }

			var prop = m9_get_property(_ani);  		
			var ani = prop[0];

			var btn = _obj[i];

			if (ani == "btn") {

				m9_attrs_history.reset(btn);

			} else if (ani == "content") {

				var _html = jQuery(btn).find('._tab_slide').html();
				jQuery(btn).html(_html);

				m9_attrs_history.reset(btn);

			}

		}

	},

	btn_onclick : function(Did,Dnum) {

		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }
	
		var _data = Cid["_data"];
		var _parent = _data["tab_parent"];		

		if (_parent["_tab_doing"] == 1) { return false; }

		var Tprop = _data["tab_property"];
		var group_id = Tprop["id"];

		var a_btn_obj = _parent._tab_btn[group_id];		
		var a_cont_obj = _parent._tab_content[group_id];

		var btn_prop = a_btn_obj["_data"]["tab_property"];

		if (btn_prop["url"]) {

			m9_ajax_load_contents(btn_prop["url"],a_cont_obj,'',function(){
				m9_delay("",500,function(){					
					M9TAB._btn_onclick(Did);
				});
			});

		} else {
			M9TAB._btn_onclick(Did,Dnum);
		}					
	},
		
	_btn_onclick : function(Did,Dnum) {
		
		var Cid = m9_get_object(Did);
		if (!Cid) { return false; }

		var _data = Cid["_data"];
		
		var _parent = _data["tab_parent"];

		if (_parent["_tab_doing"] == 1) { return false; }
		
		var Tprop = _data["tab_property"];
		var group_id = Tprop["id"];

		var close_group_id = _parent._tab_now;

		if (Tprop['accordion'] == 0 && group_id == close_group_id) { return false; }

		// 앞에 열려진것 닫기		
		if (close_group_id) {

			var a_btn_close_obj = _parent._tab_btn[close_group_id];	
			var a_cont_close_obj = _parent._tab_content[close_group_id];

			M9TAB.btn_change(a_btn_close_obj,"off");

			var cont_prop = a_cont_close_obj["_data"]["tab_property"];
	
			if (cont_prop["slide"]) {
		
				jQuery(a_cont_close_obj).css("z-Index",0);		
				var a_cont_close_slide_obj = jQuery(a_cont_close_obj).find('._tab_slide')[0]; 
						
				var _slide = M9TAB.reverse_slide[cont_prop["slide"]]; // 반대적용			

				var Dresize = (jQuery(a_cont_close_obj).css("position") == "absolute") ? 1 : 0;
				var direct = (Dresize == 1) ? _slide : "down";							
				m9_layer_slide_close(a_cont_close_slide_obj,{slide:direct,speed:cont_prop["speed"],ani_easing:'linear'},function(){						
					jQuery(a_cont_close_obj).css("display","none");	
				});
				
			} else {			
				jQuery(a_cont_close_obj).css({display:"none"});	
			}
	
		}

		if (Tprop['accordion'] == 1 && group_id == close_group_id) {
			_parent["_tab_doing"] = 0;		
			_parent._tab_now = '';
			 return false;
		}
		
		// 열기
		var a_btn_obj = _parent._tab_btn[group_id];			
		var a_cont_obj = _parent._tab_content[group_id];
		
		M9TAB.btn_change(a_btn_obj,"on");

		var cont_prop = a_cont_obj["_data"]["tab_property"];

		var _w,_h = 0;

		var Dresize = (jQuery(a_cont_obj).css("position") == "absolute") ? 1 : 0;

		_parent["_tab_doing"] = 1;

		jQuery(a_cont_obj).css("visibility","visible");	
		var _tab_ul = jQuery(a_cont_obj["_data"]["tab_parent"]).children("ul");

		if (cont_prop["slide"]) {
	
			jQuery(a_cont_obj).css("z-Index",a_cont_obj._zindex);	
							
			var a_cont_slide_obj = jQuery(a_cont_obj).children('._tab_slide')[0];
				
			jQuery(a_cont_obj).css("display","block");  // tab-content
			jQuery(a_cont_slide_obj).css("display","block"); //
			jQuery(a_cont_obj).css({height:"auto",overflow:"hidden"});				

			if (cont_prop["resize"] == 1) {			
				var _cap = m9_getRealOffsetTop(a_cont_obj) - m9_getRealOffsetTop(_tab_ul);
				if (_cap < 0) { _cap = m9_get_num(jQuery(a_cont_obj).css("bottom")); } // tab-4 일경우
				_h += _cap;
				_h += m9_get_object_size(a_cont_obj,"height");
			}	

			jQuery(a_cont_slide_obj).css("display","none");
			var direct = (Dresize == 1) ? cont_prop["slide"] : "down";
			var Dspeed = (Dnum == 1) ? 10 : cont_prop["speed"];
			m9_layer_slide_view(a_cont_slide_obj,{slide:direct,speed:Dspeed,ani_easing:'linear'},function(){
				if (Dnum != 1) {				
  					if (M9_SET["mobile_ok"] == "Mobile") {  						
						slide_focus_obj(a_btn_obj);		
					}
				}
			});

			if (cont_prop["resize"] == 1) {
				if (Dresize == 1) { //absolute 일경우만					
					jQuery(_parent).animate({"height":_h},cont_prop["speed"],function(){													
						_parent["_tab_doing"] = 0;
					});				
				} else {
					jQuery(_parent).css("height","auto");					
					_parent["_tab_doing"] = 0;					
				}							
			} else {
				_parent["_tab_doing"] = 0;				
			}			

		} else {

			jQuery(a_cont_obj).css({"display":"block"});		

			if (cont_prop["resize"] == 1) {
								
				if (Dresize == 1) { //absolute 일경우만											
					if (cont_prop["resize"] == 1) {
						var _cap = m9_getRealOffsetTop(a_cont_obj) - m9_getRealOffsetTop(_tab_ul);
						if (_cap < 0) { _cap = m9_get_num(jQuery(a_cont_obj).css("bottom")); } // tab-4 일경우
						_h += _cap;
						_h += m9_get_object_size(a_cont_obj,"height");						
					}
					jQuery(_parent).css({"height":_h});						
				} else {
					jQuery(_parent).css("height","auto");						
				}
				
			}
			_parent["_tab_doing"] = 0;			
		}

		_parent._tab_now = group_id;
	},

	btn_change : function(Cid,Dswith) {

		var Tprop = Cid["_data"]["tab_property"];

		if (Tprop["color_effect"] == 1) {
			
			if (Dswith == "on") {
				M9COLOR.toggle(Cid,{"class":Tprop["on_class"],"time":Tprop["speed"]},function(){
					jQuery(Cid).removeClass(Tprop["off_class"]).addClass(Tprop["on_class"]);	
				});
			} else {
				M9COLOR.toggle(Cid,{"class":Tprop["off_class"],"time":Tprop["speed"]},function(){
					jQuery(Cid).removeClass(Tprop["on_class"]).addClass(Tprop["off_class"]);
				});		
			}
			
		} else {

			if (Dswith == "on") {
				jQuery(Cid).removeClass(Tprop["off_class"]).addClass(Tprop["on_class"]);			
			} else {
				jQuery(Cid).removeClass(Tprop["on_class"]).addClass(Tprop["off_class"]);					
			}
						
		}
	},

	resize : function(Did) {

		var Cid = m9_get_object(Did);		
		if (!Cid) { return false; }
	
		var group_id = Cid._tab_now;

		var a_btn_obj = Cid._tab_btn[group_id];	
		var a_cont_id = Cid._tab_content[group_id];
		var a_cont_obj = m9_getObject(a_cont_id);		
					
		var Dresize = (jQuery(a_cont_obj).css("position") == "absolute") ? 1 : 0;
		
		if (Dresize == 1) { //absolute 일경우만		
			var _h = m9_get_object_size(a_cont_obj,"height");
			jQuery(Cid).css("height",_h);
		} else {
			jQuery(Cid).css("height","auto");			
		}				
															
	}	

};