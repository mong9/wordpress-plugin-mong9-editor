(function ($) {

	if (M9_SET && M9_SET['mong9_editor_use'] == '1') {

		tinymce.PluginManager.add('mong9editor',function(editor,url) {

			editor.on('init', function() {
				var b = editor.getBody();
				if (b) { b.className = b.className + " m9-content _m9editor"; }
			});

			var id = editor.id;
			var mong9_url = url.replace(/\/etc$/,'/');

			editor.addButton( 'mong9editor', {
				image: mong9_url + '/icons/mong9-editor.png',
				tooltip : 'Mong9 Editor',
				onclick : function() {
					if (typeof(mong9_extend_connect) != 'object') {
						alert('Cannot connect with Mong9 Editor.');
						return false;
					}
					mong9_extend_connect['tinymce4'].int(id);
					mong9_connect.open(id);
				},
			});

			editor.contentCSS.push(
				mong9_url + 'source/etc/bootstrap-icons/bootstrap-icons.min.css',
				mong9_url + 'source/css/mong9-base.css',
				mong9_url + 'source/css/mong9.css'
			);

		});

	}

})(jQuery);