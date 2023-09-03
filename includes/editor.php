<?php

if(!defined("MONG9")) exit();

$_lang = (isset($_REQUEST['lang']) && $_REQUEST['lang'] != '') ? $_REQUEST['lang'] : ''; 
define('MONG9_SOURCE_URL',MONG9_EDITOR__PLUGIN_URL.'source/');
define('MONG9_SOURCE_DIR',MONG9_EDITOR__PLUGIN_DIR.'source/');
define('MONG9_LANG', get_mong9_language($_lang) );

function mong9editor_editor() {

	mong9_nonce_check('mong9_editor_window_nonce',$_REQUEST['nonce']);

	if (!defined("MONG9_EDITOR_POSSIBLE") || MONG9_EDITOR_POSSIBLE != 1) {
		print_m9_msg( m9_die_msg('Security check failed.') );
	}

?>

<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="<?=MONG9_LANG?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="shortcut icon" href="<?php echo MONG9_EDITOR__PLUGIN_URL ?>icons/mong9-editor-favicon.ico">
	<title><?php echo (isset($_REQUEST['title']) && $_REQUEST['title'] != '') ? $_REQUEST['title'] .' - ' : '' ?>Mong9 Editor</title>

<?php

	mong9_enqueue_script('jquery',MONG9_SOURCE_URL.'etc/jquery/jquery.min.js');
	//mong9_enqueue_script('jquery',MONG9_SOURCE_URL.'etc/jquery/jquery-migrate.min.js');
	mong9_enqueue_script('jquery-ui',MONG9_SOURCE_URL.'etc/jquery-ui/jquery-ui.min.js');
	mong9_enqueue_style('jquery-ui',MONG9_SOURCE_URL.'etc/jquery-ui/jquery-ui.min.css','');
	mong9_enqueue_script('minicolors',MONG9_SOURCE_URL.'etc/minicolors/jquery.minicolors.min.js');
	mong9_enqueue_style('minicolors',MONG9_SOURCE_URL.'etc/minicolors/jquery.minicolors.css','');

	mong9editor_enqueue_int();
	mong9editor_site_enqueue_scripts();

	mong9_enqueue_script('mong9-editor',MONG9_SOURCE_URL.'js/mong9-editor.js');
	mong9_enqueue_script('mong9-m9tab',MONG9_SOURCE_URL.'js/m9-tab.js');
	mong9_enqueue_script('mong9-input-value-check',MONG9_SOURCE_URL.'js/m9-input-value-check.js');

	$font_family = get_mong9_font_family(MONG9_LANG);
	mong9_enqueue_script('mong9-editor-font-family',MONG9_SOURCE_URL.'js/font-family/'.$font_family.'.js');
	mong9_enqueue_script('mong9-editor-lang',MONG9_SOURCE_URL.'js/langs/'.MONG9_LANG.'.js');
	mong9_enqueue_script('mong9-editor-functions',MONG9_SOURCE_URL.'js/mong9-editor-functions.js');
	mong9_enqueue_script('mong9-editor-objs',MONG9_SOURCE_URL.'js/mong9-editor-objs.js');

	mong9_enqueue_style('mong9-editor-css',MONG9_SOURCE_URL.'css/mong9-editor.css','');

	mong9_enqueue_style('codemirror-css',MONG9_SOURCE_URL.'etc/codemirror/lib/codemirror.css','');
	mong9_enqueue_script('codemirror',MONG9_SOURCE_URL.'etc/codemirror/lib/codemirror.js');
	mong9_enqueue_script('codemirror-xml',MONG9_SOURCE_URL.'etc/codemirror/mode/xml/xml.js');
	mong9_enqueue_script('codemirror-javascript',MONG9_SOURCE_URL.'etc/codemirror/mode/javascript/javascript.js');
	mong9_enqueue_script('codemirror-css',MONG9_SOURCE_URL.'etc/codemirror/mode/css/css.js');
	mong9_enqueue_script('codemirror-htmlmixed',MONG9_SOURCE_URL.'etc/codemirror/mode/htmlmixed/htmlmixed.js');
	mong9_enqueue_script('codemirror-fold',MONG9_SOURCE_URL.'etc/codemirror/addon/fold/xml-fold.js');
	mong9_enqueue_script('codemirror-matchtags',MONG9_SOURCE_URL.'etc/codemirror/addon/edit/matchtags.js');
	mong9_enqueue_script('codemirror-closetag',MONG9_SOURCE_URL.'etc/codemirror/addon/edit/closetag.js');
	mong9_enqueue_style('codemirror-dialog-css',MONG9_SOURCE_URL.'etc/codemirror/addon/dialog/dialog.css','');
	mong9_enqueue_script('codemirror-dialog',MONG9_SOURCE_URL.'etc/codemirror/addon/dialog/dialog.js');
	mong9_enqueue_script('codemirror-matchesonscrollbar',MONG9_SOURCE_URL.'etc/codemirror/addon/search/matchesonscrollbar.js');
	mong9_enqueue_script('codemirror-searchcursor',MONG9_SOURCE_URL.'etc/codemirror/addon/search/searchcursor.js');
	mong9_enqueue_script('codemirror-search',MONG9_SOURCE_URL.'etc/codemirror/addon/search/search.js');
	mong9_enqueue_script('codemirror-jump-to-line',MONG9_SOURCE_URL.'etc/codemirror/addon/search/jump-to-line.js');
	mong9_enqueue_script('codemirror-match-highlighter',MONG9_SOURCE_URL.'etc/codemirror/addon/search/match-highlighter.js');    
	mong9_enqueue_script('codemirror-annotatescrollbar',MONG9_SOURCE_URL.'etc/codemirror/addon/scroll/annotatescrollbar.js'); 

	mong9_enqueue_script('beautify-html',MONG9_SOURCE_URL.'etc/js-beautify/beautify-html.min.js'); 

	$example_url = (isset($_REQUEST['example_url']) && $_REQUEST['example_url'] != '') ? $_REQUEST['example_url'] : MONG9_SOURCE_URL .'example/'. get_example_html(MONG9_LANG) .'.html';

	$nonce = wp_create_nonce('mong9_editor_upload_nonce');
	$upload_ajax_url = MONG9_EDITOR__PLUGIN_URL .'index.php?mong9_action=image_upload&nonce='. $nonce;

	$mode_m = (isset($_REQUEST['mode_m']) && $_REQUEST['mode_m'] != '') ? $_REQUEST['mode_m'] : MONG9_SCREEN_SIZE_m;
	$mode_e = (isset($_REQUEST['mode_e']) && $_REQUEST['mode_e'] != '') ? $_REQUEST['mode_e'] : MONG9_SCREEN_SIZE_e;

?>

<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>

</body>

<script>

	jQuery(function() {
		var id = getUrlParameter('editor_id');
		set_mong9_editor(id,{
			example_html : "<?php echo $example_url ?>", // 우측 block example.html 파일 위치
			upload_url : "<?php echo $upload_ajax_url ?>", // 이미지 업로드 파일 위치
			mode : { 'm' : '<?php echo $mode_m ?>' , 'e' : '<?php echo $mode_e ?>' }
		});
	});

</script>

</html>

<?php

} // mong9editor_editor

?>
