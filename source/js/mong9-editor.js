function set_mong9_editor(_id,Dhash) {

	var ok = set_m9editor(_id);

	if (ok) {

		// Dhash = { example_html : '', upload_url : '' };
		m9_editor.int(_id,Dhash);

		var code_boxs = ['html_textarea'];

		for (var i=0;i<code_boxs.length;i++) {
			m9_attach_CodeMirror(code_boxs[i]);
		} // for

	}

} // function

function send_parent_editor(editor_id) {
	from_mong9_editor_to_classic_editor(editor_id);
	window.close();
}

function from_mong9_editor_to_classic_editor(editor_id) {
	var editor_value = m9_editor.get_value(editor_id);	
	window.opener.mong9_connect.editor_in(editor_id,editor_value);
}

function set_m9editor(_id) {

	var ok = 1;

	if (M9_SET["mobile_ok"] == 1) {

		var _html = '<div class="m9editor-layout _error">' + msg_msg('msg_82') + '</div>';
		jQuery('body').append(_html);
		ok = 0;

	} else if (jQuery(opener).length > 0) {

		var _html = '<div class="m9editor-layout">' + '<textarea id="'+ _id + '" name="'+ _id + '" class="m9_editor_box"></textarea>' + '</div>';
		jQuery('body').append(_html);

		var _val = window.opener.mong9_connect.get_html(_id);
		jQuery('#'+_id).val(_val);

	} else {

		var _html = '<div class="m9editor-layout _error">CONNECTION ERROR</div>';
		jQuery('body').append(_html);
		ok = 0;

	}

	return ok;

} // function

function m9_attach_CodeMirror(Did) {

	CodeMirror.fromTextArea(document.getElementById(Did), {
		mode: "htmlmixed",
		matchTags: {bothTags: true},
		styleActiveLine: true,
		lineNumbers: true,
		lineWrapping: true,
		autoCloseTags: true,
		viewportMargin: Infinity,
		highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}
	});

} // function