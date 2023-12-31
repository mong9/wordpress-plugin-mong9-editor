<?php
/*
Plugin Name: Mong9 Editor
Plugin URI: https://mong9editor.com/
Description: The most advanced frontend drag & drop content editor. Mong9 Editor is a responsive page builder which can be used to extend the Classic Editor.
Tags: post, wysiwyg, content editor, drag & drop builder, page builder.
Version: 1.2.1
Author: Mong9 Team
Author URI: https://mong9editor.com/
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Text Domain: mong9-editor

	Mong9 Editor is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	any later version.

	Mong9 Editor is distributed in the hope that it will be useful,
	Mong9 Editorbut WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	Copyright (c) 2019 Mong9 Team. All rights reserved.
*/

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// You can set the constants below according to your own needs.
// 아래 상수는 본인에 맞게 설정하시면 됩니다.
$mode_m = 768; // mobile phone landscape settings(휴대폰 가로 설정값)
$mode_e = 576; // mobile phone vertical settings(휴대폰 세로 설정값)
$google_token = ''; // Google Maps Token (When using Google Maps, an authentication token is required.) // 구글지도 토큰(구글지도 사용시, 인증토큰이 필요합니다.)
$image_upload_size = 5; // Image upload capacity (5M) // 이미지 업로드 용량(5M)

$m9_folder = basename(__DIR__);

define('MONG9','true');
define('MONG9_EDITOR_VERSION','1.2.1');
define('MONG9_EDITOR__MINIMUM_WP_VERSION','4.9');
define('MONG9_NOW_SITE_DOMAIN',site_url() .'/');
define('MONG9_NOW_SITE_DIR',ABSPATH);
define('MONG9_EDITOR__PLUGIN_URL',MONG9_NOW_SITE_DOMAIN .'wp-content/plugins/'. $m9_folder .'/');
define('MONG9_EDITOR__PLUGIN_DIR',MONG9_NOW_SITE_DIR .'wp-content/plugins/'. $m9_folder .'/');
define('MONG9_EDITOR_DELETE_LIMIT',100000);
define('MONG9_SCREEN_SIZE_m',(isset($_REQUEST['mode_m']) && $_REQUEST['mode_m'] != '') ? $_REQUEST['mode_m'] : $mode_m );
define('MONG9_SCREEN_SIZE_e',(isset($_REQUEST['mode_e']) && $_REQUEST['mode_e'] != '') ? $_REQUEST['mode_e'] : $mode_e );
define('MONG9_GOOGLE_TOKEN',(isset($_REQUEST['google_token']) && $_REQUEST['google_token'] != '') ? $_REQUEST['google_token'] : $google_token );
define('MONG9_UPLOAD_DIR',MONG9_NOW_SITE_DIR .'wp-content/uploads/mong9/'); // Image upload folder name(이미지 업로드 폴더명)
define('MONG9_IMAGE_UPLOAD_SIZE',$image_upload_size);
define('MONG9_IMAGE_ADD_MEDIA',0); // Add to Image Media// (업로드된) 이미지 미디어에 추가

require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/functions/editor-function.php');

add_action('init','mong9editor_int');

function mong9editor_int() {

	add_filter("mce_buttons",'mce_buttons_mong9editor');
	add_filter("mce_external_plugins",'mce_external_plugins_mong9editor');

	// Add body class
	add_filter('body_class','mong9_add_body_class');

	$mong9_editor_use = 0;
	if (current_user_can('administrator')) {
		$mong9_editor_use = 1; // 사용가능
	}

	define('MONG9_EDITOR_POSSIBLE',$mong9_editor_use);

	// Remove empty p
	remove_filter('the_content','wpautop');

	// Mong9 Filter
	add_filter('the_content','Mong9_Html_Convert_Filter');

	// mong9_action
	if (isset($_REQUEST['mong9_action']) && $_REQUEST['mong9_action'] != '') {

		mong9editor_parse_request($_REQUEST['mong9_action']);

	} else {

		// common
		mong9editor_enqueue_int();

		// Not admin mode
		if (!is_admin()) {
			// Add custom js,css in user mode
			mong9editor_site_enqueue_scripts();
		}

	}

} // function

// Mong9 Filter
function Mong9_Html_Convert_Filter($html) {
	require_once(MONG9_EDITOR__PLUGIN_DIR . 'includes/functions/content-filter.php');
	return Mong9_Html_Convert($html);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions used only in WordPress from below
// 아래부터는 워드프레스에만 사용되는 함수들
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mce_external_plugins_mong9editor($plugin_array) {
	$plugin_array['mong9editor'] = MONG9_EDITOR__PLUGIN_URL .'etc/for_tinymce.js';
	return $plugin_array;
}

function mce_buttons_mong9editor($buttons) {
	array_push($buttons, "|", "mong9editor");
	return $buttons;
}

// Check nonce
function mong9_nonce_check($_handle,$value = '') {
	if (!wp_verify_nonce($value,$_handle)) {
		die(__('Security check failed.'));
	}
}

?>