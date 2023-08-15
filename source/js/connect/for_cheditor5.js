mong9_extend_connect['cheditor5'] = {

	excute : function() {

		if (typeof(cheditor) != 'function') { return false; }

		m9_delay_checking(
			function() {
				return (jQuery(".cheditor-container").length == 0) ? false : true;
			},
			function() {
				mong9_extend_connect['cheditor5']._excute();
			}
		);

	},

	_excute : function() {

		jQuery(".cheditor-container").each(function() {

			var textarea_id = jQuery(this).parent().find('textarea').eq(0).attr("name");

			m9_delay_checking(
				function() {
					var d = eval('ed_'+textarea_id);
					var iframe_obj = jQuery(textarea_id).parent().find('iframe').eq(0);
					return (!d || !d.doc || !iframe_obj) ? false : true;
				},
				function(Dhash) {
					mong9_extend_connect['cheditor5'].int(Dhash['id']);
				},
				{ 'id' : textarea_id }
			);

		});

	},

	int : function(id) {

		var cheditor_obj = eval('ed_' + id);

		var _mong9_url = (M9_SET['mong9_url']) ? M9_SET['mong9_url'] : cheditor_obj.config.editorPath + '/mong9-editor';
		var _lang = (M9_SET['lang']) ? M9_SET['lang'] : 'ko';

		var textarea_name = '#' + cheditor_obj.inputForm;
		var iframe_obj = jQuery(textarea_name).parent().find('iframe')[0];

		mong9_connect.int({
			editor : 'cheditor5',
			name : id,
			lang : _lang,
			path : _mong9_url,
			path_editor : M9_SET['mong9_window_url'],
			iframe : iframe_obj,
			obj : cheditor_obj
		});

	},

	attach_button : function(id) {

		var _html = '<div name="Mong9_Editor" title="Mong9 Editor" onclick="mong9_connect.open(\''+ id +'\');return false;" class="cheditor-tb-bg-first __mong9_editor_btn_box_for_cheditor">'
		+ '<div class="cheditor-tb-icon __mong9_editor_btn_open __cheditor"></div>'
		+ '</div>';
		jQuery(mong9_connect.objs[id]['iframe']).parents('.cheditor-container').find('.cheditor-tb-wrapper').find('.cheditor-tb-split').last().before(_html);

	},

	editor_in : function(id,_html) {
		var _objects = mong9_connect._objects[id];
		_objects.replaceContents(_html);
	},

	get_html : function(id) {
		var _objects = mong9_connect._objects[id];
		return _objects.outputBodyHTML();
	}

};