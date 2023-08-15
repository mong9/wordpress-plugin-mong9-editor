var mong9_extend_connect = {};

function mong9_btn_attach(editor_names) {

	if (!M9_SET || M9_SET['mong9_editor_use'] != '1') { return false; }

	for (var i=0;i<editor_names.length;i++) {

		var editor_name = editor_names[i];
		var file_name = 'for_' + editor_name;

		m9_ImportScript(M9_SET["mong9_url"] + "source/js/connect/" + file_name + ".js",function() {
			if (mong9_extend_connect[editor_name]) {
				mong9_extend_connect[editor_name].excute();
			}
		});

	}

} // function

var mong9_connect = {

	objs : {},
	targets : {},
	_objects : {},

	file_list : [
		'__mong9_url__/source/etc/bootstrap-icons/bootstrap-icons.min.css',
		'__mong9_url__/source/css/mong9-base.css',
		'__mong9_url__/source/css/mong9.css'
	],

	int : function(Eref) {

		var id = Eref['name'];

		if (!mong9_connect.objs[id]) {
			var _target = random_str();
			mong9_connect.objs[id] = {
				target : _target,
				editor : Eref['editor']
			};
			mong9_connect.targets[_target] = id;
			if (Eref['obj']) {
				mong9_connect._objects[id] = Eref['obj'];
			}
		}

		if (!M9_SET) { var M9_SET = {}; }

		mong9_connect.objs[id]['iframe'] = Eref['iframe'];
		mong9_connect.objs[id]['lang'] = (Eref['lang']) ? Eref['lang'] : 'en';
		mong9_connect.objs[id]['path'] = (Eref['path']) ? Eref['path'] : M9_SET['mong9_url'];
		mong9_connect.objs[id]['google_token'] = (Eref['google_token']) ? Eref['google_token'] : M9_SET['google_token'];
		mong9_connect.objs[id]['mode_m'] = (Eref['mode_m']) ? Eref['mode_m'] : (M9_SET['mong9_screen_size'] && M9_SET['mong9_screen_size']['m']) ? M9_SET['mong9_screen_size']['m'] : '';
		mong9_connect.objs[id]['mode_e'] = (Eref['mode_e']) ? Eref['mode_e'] : (M9_SET['mong9_screen_size'] && M9_SET['mong9_screen_size']['e']) ? M9_SET['mong9_screen_size']['e'] : '';
		mong9_connect.objs[id]['path_editor'] = (Eref['path_editor']) ? Eref['path_editor'] : mong9_connect.objs[id]['path'] + 'index.php?mong9_action=editor';

		if (Eref['be'] != 1) {
			mong9_extend_connect[Eref['editor']].attach_button(id);
			mong9_connect.addFile_editor(id);
		}

	},

	addFile_editor : function(E_name) {

		var Dhash = mong9_connect.objs[E_name];

		jQuery(Dhash['iframe']).contents().find('body').addClass('m9-content').addClass('_m9editor');
		var _path = Dhash['path'].replace(/\/$/,'');

		for (var z=0;z<mong9_connect.file_list.length;z++) {
			var Dfile = mong9_connect.file_list[z];
			Dfile = Dfile.replace(new RegExp('__mong9_url__','gi'),_path);
			jQuery(Dhash['iframe']).contents().find('head').append('<link rel="stylesheet" type="text/css" href="' + Dfile + '">');
		}

	},

	open : function(id) {

		var Dhash = mong9_connect.objs[id];
		var url = Dhash['path_editor']+'&editor_id='+Dhash['target']+'&lang='+Dhash['lang'];
		if (Dhash['mode_m']) { url += '&mode_m=' + Dhash['mode_m']; }
		if (Dhash['mode_e']) { url += '&mode_e=' + Dhash['mode_e']; }
		if (Dhash['google_token']) { url += '&google_token=' + Dhash['google_token']; }

		openWindow(url,{'fullscreen':1,'scrollbars':1,'resizable':1});

	},

	editor_in : function(id,_html) {
		var E_name = mong9_connect.targets[id];
		var editor_name = mong9_connect.objs[E_name]['editor'];
		mong9_extend_connect[editor_name].editor_in(E_name,_html);
	},

	get_html : function(id) {
		var E_name = mong9_connect.targets[id];
		var editor_name = mong9_connect.objs[E_name]['editor'];
		return mong9_extend_connect[editor_name].get_html(E_name);
	}

}; // mong9_connect

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
*  Javascript open window
*  http://www.webtoolkit.info/
**/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openWindow_full(anchor,name) {
 window.open(anchor,name,"");
} // function

function openWindow(anchor, options) {

	var args = '';

	if (typeof(options) == 'undefined') { var options = new Object(); }
	if (typeof(options.name) == 'undefined') { options.name = 'win' + Math.round(Math.random()*100000); }

	if (typeof(options.height) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "height=" + options.height + ",";
	}

	if (typeof(options.width) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "width=" + options.width + ",";
	}

	if (typeof(options.fullscreen) != 'undefined') {
		args += "width=" + screen.availWidth + ",";
		args += "height=" + screen.availHeight + ",";
	}

	if (typeof(options.center) == 'undefined') {
		options.x = 0;
		options.y = 0;
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}

	if (typeof(options.center) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		options.y=Math.floor((screen.availHeight-(options.height || screen.height))/2)-(screen.height-screen.availHeight);
		options.x=Math.floor((screen.availWidth-(options.width || screen.width))/2)-(screen.width-screen.availWidth);
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
	args += "status=no,"; 

	if (typeof(options.location) != 'undefined') { args += "location=" + options.location + ","; }
	if (typeof(options.directories) != 'undefined') { args += "directories=" + options.directories + ","; }
	if (typeof(options.scrollbars) != 'undefined') { args += "scrollbars=" + options.scrollbars + ","; }
	if (typeof(options.menubar) != 'undefined') { args += "menubar="+options.menubar+","; }
	if (typeof(options.locationbar) != 'undefined') { args += "location="+options.locationbar+","; }
	if (typeof(options.resizable) != 'undefined') { args += "resizable=" + options.resizable + ","; }
	if (typeof(options.statusbar) != 'undefined') { args += "statusbars=" + options.statusbar + ","; }

	var win = window.open(anchor, options.name, args);

	return false;

} // function