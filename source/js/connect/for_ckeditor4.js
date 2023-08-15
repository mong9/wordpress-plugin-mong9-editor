mong9_extend_connect['ckeditor4'] = {

	excute : function() {

		if (!CKEDITOR) { return false; }

		m9_delay_checking(
			function() {
				return (!CKEDITOR.instances || Object.keys(CKEDITOR.instances).length == 0) ? false : true;
			},
			function() {
				mong9_extend_connect['ckeditor4']._excute();
			}
		);

	},

	_excute : function() {

		for (var id in CKEDITOR.instances) {

			m9_delay_checking(
				function() {
					return (!jQuery('#cke_'+id).find('.cke_wysiwyg_frame').length > 0) ? false : true;
				},
				function(Dhash) {
					mong9_extend_connect['ckeditor4'].int(Dhash['id']);
				},
				{ 'id' : id }
			);

		}

	},

	int : function(id) {

		var _mong9_url = (M9_SET['mong9_url']) ? M9_SET['mong9_url'] : CKEDITOR.instances[id].document.$.location.origin + '/plugins/mong9-editor';
		var _lang = (M9_SET['lang']) ? M9_SET['lang'] : get_mong9_lang(CKEDITOR.instances[id].langCode);

		mong9_connect.int({
			editor : 'ckeditor4',
			name : id,
			lang : _lang,
			path : _mong9_url,
			path_editor : M9_SET['mong9_window_url'],
			iframe : jQuery('#cke_'+id).find('.cke_wysiwyg_frame').eq(0)[0],
		});

	},

	attach_button : function(id) {

		var editor = CKEDITOR.instances[id];
		var config = editor.config;

		editor.config.bodyClass += ' m9-content _m9editor';

		if (typeof(editor.config.contentsCss) == 'string') {
			var _array = [];
			_array.push(editor.config.contentsCss);
			editor.config.contentsCss = _array;
		}

		for (var z=0;z<mong9_connect.file_list.length;z++) {
			var Dfile = mong9_connect.file_list[z];
			Dfile = Dfile.replace(new RegExp('__mong9_url__','gi'),mong9_connect.objs[id]['path']);
			editor.config.contentsCss.push(Dfile);
		}

		var target = jQuery(editor.container.$).find('.cke_toolbox').find('.cke_toolbar_break').eq(0);

		var Dhash = mong9_connect.objs[id];

		var _html = '<span id="cke_m9b" class="cke_toolbar" aria-labelledby="cke_m9b_label" role="toolbar"><span id="cke_m9b_label" class="cke_voice_label">Mog9 Editor</span><span class="cke_toolbar_start"></span><span class="cke_toolgroup" role="presentation">'
		+ '<a id="cke_m9c" class="cke_button cke_button__mong9editor cke_button_off" href="javascript:void(\'Mong9Editor\')" title="" tabindex="-1" hidefocus="true" role="button" aria-labelledby="cke_m9c_label" aria-describedby="cke_m9c_description" aria-haspopup="false" aria-disabled="false" onclick="mong9_connect.open(\''+id+'\');return false;"><span class="cke_button_icon cke_button__mong9editor_icon __mong9_editor_btn_open">&nbsp;</span><span id="cke_m9c_label" class="cke_button_label cke_button__mong9editor_label" aria-hidden="false">Mong9 Editor</span><span id="cke_m9c_description" class="cke_button_label" aria-hidden="false"></span></a>'
		+ '</span><span class="cke_toolbar_end"></span></span>';

		if (target.length == 0) {
			jQuery(editor.container.$).find('.cke_toolbox').append(_html);
		} else {
			target.before(_html);
		}

	},

	editor_in : function(id,_html) {
		CKEDITOR.instances[id].setData(_html);
	},

	get_html : function(id) {
		return CKEDITOR.instances[id].getData();
	}

};