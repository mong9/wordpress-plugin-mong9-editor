mong9_extend_connect['smarteditor2'] = {

	excute : function() {

		m9_delay_checking(
			function() {
				return (!oEditors || !oEditors.getById) ? false : true;
			},
			function() {
				mong9_extend_connect['smarteditor2']._excute();
			}
		);

	},

	_excute : function() {

		for (var id in oEditors.getById) {

			m9_delay_checking(
				function() {
					return (!oEditors.getById[id].getWYSIWYGWindow || !oEditors.getById[id].getWYSIWYGWindow().name) ? false : true;
				},
				function(Dhash) {
					mong9_extend_connect['smarteditor2'].int(Dhash['id']);
				},
				{ 'id' : id }
			);

		}
	},

	int : function(id) {

		var _mong9_url = (M9_SET['mong9_url']) ? M9_SET['mong9_url'] : get_m9_file_info(oEditors.getById[id].elEditingAreaContainer.baseURI)['path'] + '/mong9-editor';
		var _lang = (M9_SET['lang']) ? M9_SET['lang'] : get_mong9_lang(oEditors.getById[id].htOptions.I18N_LOCALE);

		var _iframe = false;
		var _target = jQuery('#'+id).siblings('iframe').eq(0);
		if (jQuery(_target).contents().find('body').find('iframe').length > 0) {
			_iframe = jQuery(_target).contents().find('body').find('iframe');
		}

		mong9_connect.int({
			editor : 'smarteditor2',
			name : id,
			lang : _lang,
			path : _mong9_url,
			path_editor : M9_SET['mong9_window_url'],
			iframe : _iframe
		});

	},

	attach_button : function(id) {
		// 이중 IFRAME 으로 inline style 처리
		var _html = '<ul><li class="husky_seditor_ui_mong9_editor single_child">'
		+ '<button type="button" title="Mong9 Editor" onclick="window.parent.mong9_connect.open(\''+ id +'\');return false;" style="background-image: url(\'' + mong9_connect.objs[id]['path'] + '/icons/mong9-editor.png\');background-repeat:no-repeat;background-position:center;background-size:contain"><span class="_buttonRound tool_bg">Mong9 Editor</span></button>'
		+ '</li></ul>';
		jQuery('#'+id).siblings('iframe').contents().find('.husky_seditor_text_tool').append(_html);

	},

	editor_in : function(id,_html) {
		oEditors.getById[id].setIR(_html);
	},

	get_html : function(id) {
		return oEditors.getById[id].getIR();
	}

};