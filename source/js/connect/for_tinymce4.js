mong9_extend_connect['tinymce4'] = {

	excute : function() {

		if (!tinyMCE) { return false; }

		m9_delay_checking(
			function() {
				return (!tinyMCE.editors || tinyMCE.editors.length == 0) ? false : true;
			},
			function() {
				mong9_extend_connect['tinymce4']._excute();
			}
		);

	},

	_excute : function() {

		for (var i=0;i<tinyMCE.editors.length;i++) {

			var id = tinyMCE.editors[i].id;

			m9_delay_checking(
				function() {
					return (!id || !tinyMCE.editors[id].iframeElement) ? false : true;
				},
				function(Dhash) {
					mong9_extend_connect['tinymce4'].int(Dhash['id']);
				},
				{ 'id' : id }
			);

		}
	},

	int : function(id) {

		tinyMCE.editors[id].settings.relative_urls = false;
		tinyMCE.editors[id].settings.remove_script_host = false;
		tinyMCE.editors[id].settings.convert_urls = false;

		var _mong9_url = (M9_SET['mong9_url']) ? M9_SET['mong9_url'] : tinyMCE.editors[id].baseURI.source + '/plugins/mong9-editor';
		var _lang = (M9_SET['lang']) ? M9_SET['lang'] : get_mong9_lang(tinyMCE.editors[id].settings.language);

		var _iframe = jQuery(tinyMCE.editors[id].iframeElement)[0];
		var _be = (tinyMCE.editors[id].plugins && tinyMCE.editors[id].plugins['mong9editor']) ? 1 : 0;

		mong9_connect.int({
			editor : 'tinymce4',
			name : id,
			lang : _lang,
			path : _mong9_url,
			path_editor : M9_SET['mong9_window_url'],
			iframe : _iframe,
			be : _be,
		});

	},

	attach_button : function(id) {

		tinyMCE.ui.Factory.create({
			image: mong9_connect.objs[id]['path'] + '/icons/mong9-editor.png',
			type: 'button',
			tooltip : 'Mong9 Editor',
		}).on('click', function(e){
			mong9_connect.open(id);
		})
		.renderTo(jQuery(tinyMCE.editors[id].editorContainer).find('.mce-container-body .mce-toolbar').not('[style*="display:none"]').find('.mce-btn-group:last > div').eq(0));

	},

	editor_in : function(id,_html) {
		tinyMCE.editors[id].setContent(_html);
	},

	get_html : function(id) {
		return tinyMCE.editors[id].getContent();
	}

};
