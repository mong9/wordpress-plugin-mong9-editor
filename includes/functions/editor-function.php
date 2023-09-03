<?php

if(!defined("MONG9")) exit();

// 몽9 action 처리
function mong9editor_parse_request($mong9_action = '') {

	if (MONG9_EDITOR_POSSIBLE == 1) {

		if ($mong9_action != '') {

			if (file_exists(MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php')) {

				include MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php';
				$func = 'mong9editor_' . $mong9_action;
				$func();
				exit();

			}

		}

    }

	print_m9_msg( m9_die_msg('Security check failed.') );
	exit();

} // function

function mong9editor_enqueue_int() {

	wp_enqueue_script('jquery');

	$rn = "\n";
	$_script = '<script>'. $rn;
	$_script .= "if (!M9_SET) { var M9_SET = {}; }". $rn;
	$_script .= "M9_SET['mong9_editor_use'] = '". MONG9_EDITOR_POSSIBLE . "'; // Mong9 에디터 사용". $rn;
	$_script .= "M9_SET['mong9_url'] = '". MONG9_EDITOR__PLUGIN_URL ."'; // Mong9 에디터 주소". $rn;
	$_script .= "M9_SET['mong9_screen_size'] = { 'm' : '". MONG9_SCREEN_SIZE_m ."' , 'e' : '". MONG9_SCREEN_SIZE_e ."' };". $rn;
	$_script .= "M9_SET['google_token'] = '". MONG9_GOOGLE_TOKEN ."'; // 구글지도 토큰(구글지도 사용시, 인증토큰이 필요합니다.)". $rn;

	$nonce = wp_create_nonce('mong9_editor_window_nonce');
	$mong9_window_url = MONG9_NOW_SITE_DOMAIN .'index.php?mong9_action=editor&nonce='. $nonce;

	$_script .= "M9_SET['mong9_window_url'] = '". $mong9_window_url . "';". $rn;
	$_script .= '</script>'. $rn;

	mong9_enqueue_html_script('jquery',$_script);

	mong9_enqueue_script('mong9-js',MONG9_EDITOR__PLUGIN_URL.'source/js/mong9.js');

} // function

// Add custom js,css in user mode
function mong9editor_site_enqueue_scripts() {

	mong9_enqueue_style('bootstrap-icons-css',MONG9_EDITOR__PLUGIN_URL.'source/etc/bootstrap-icons/bootstrap-icons.min.css');
	mong9_enqueue_style('mong9-base-css',MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-base.css');
	mong9_enqueue_style('mong9-css',MONG9_EDITOR__PLUGIN_URL.'source/css/mong9.css');
	mong9_enqueue_style('mong9-m-css',MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-m.css','media="all and (max-width: '. MONG9_SCREEN_SIZE_m .'px)"');
	mong9_enqueue_style('mong9-e-css',MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-e.css','media="all and (max-width: '. MONG9_SCREEN_SIZE_e .'px)"');

} // function

// get language
function get_mong9_language($language) {
	return (file_exists(MONG9_SOURCE_DIR.'js/langs/'. $language .'.js')) ? $language : 'en';
}

// get font family
function get_mong9_font_family($language) {
	return (file_exists(MONG9_SOURCE_DIR.'js/font-family/'. $language .'.js')) ? $language : 'en';
}

function get_example_html($language) {
	return (file_exists(MONG9_SOURCE_DIR.'example/'. $language .'.html')) ? $language : 'en';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 아래부터는 그누보드에만 사용되는 함수들
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mong9_enqueue_html_script($front,$string) {
	if (defined('MONG9_PRINT') && MONG9_PRINT == '1') {
		echo $string;
	} else {
		wp_add_inline_script($front,$string);
	}
}

function mong9_enqueue_script($Dname,$Durl) {
	if (defined('MONG9_PRINT') && MONG9_PRINT == '1') {
		echo '<script src="'. $Durl .'"></script>'."\n";
	} else {
		wp_enqueue_script($Dname,$Durl);
	}
}

function mong9_enqueue_style($Dname,$Durl,$Detc='') {
	if (defined('MONG9_PRINT') && MONG9_PRINT == '1') {
		echo '<link rel="stylesheet" href="'. $Durl .'" '. ( ($Detc) ? $Detc : '' ) .'>'."\n";
	} else {
		wp_enqueue_style($Dname,$Durl,'','',$Detc);
	}
}

// print ajax message
function print_m9_msg($msg = '') {
	echo $msg;
	exit();
}

function m9_die_msg($msg) {
	return __($msg);
} // function

// Add body class
function mong9_add_body_class($classes) {
	$classes[] = 'm9-content';
	return $classes;
}

?>