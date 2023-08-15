mong9_extend_connect['xpresseditor'] = {

	excute : function() {
		for (var id in xe.Editors) {

			m9_delay_checking(
				function() {
					return (!xe.Editors[id].getFrame()) ? false : true;
				},
				function() {
					mong9_extend_connect['xpresseditor'].int(id);
				}
			);

		}
	},

	int : function(id) {

		var _mong9_url = (M9_SET['mong9_url']) ? M9_SET['mong9_url'] : get_m9_file_info(xe.Editors[id].elEditingAreaContainer.baseURI)['path'] + '/mong9-editor';
		var _lang = (M9_SET['lang']) ? M9_SET['lang'] : get_mong9_lang();

		mong9_connect.int({
			editor : 'xpresseditor',
			name : id,
			lang : _lang,
			path : _mong9_url,
			path_editor : M9_SET['mong9_window_url'],
			iframe : xe.Editors[id].getFrame(),
		});

	},

	attach_button : function(id) {

		var _html = '<ul class="mong9editor"><li class="left xpress_xeditor_ui_mong9editor">'
		+ '<button type="button" title="Mong9 Editor" onclick="mong9_connect.open(\''+ id +'\');return false;" class="__mong9_editor_btn_open __xpresseditor"><span>Mong9 Editor</span></button>'
		+ '</li></ul>';
		jQuery('#xe-editor-container-' + id).parents('.xpress-editor').find('.tool').append(_html);

	},

	editor_in : function(id,_html) {
		var E_name = mong9_connect.targets[id];
		var oEditor = xe.Editors[id] || null;
		oEditor.setIR(_html,true);
	},

	get_html : function(id) {
		var oEditor = xe.Editors[id] || null;
		return oEditor.getIR();
	}

};