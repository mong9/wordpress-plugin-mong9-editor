<?php

if(!defined("MONG9")) exit();

function mong9editor_image_upload() {

	$nonce = (isset($_REQUEST['nonce']) && $_REQUEST['nonce'] != '') ? $_REQUEST['nonce'] : '';
	if (!wp_verify_nonce($nonce,'mong9_editor_upload_nonce')) {
		print_m9_msg('error|'. m9_die_msg('Security check failed.') );	
	}

	if (!defined("MONG9_EDITOR_POSSIBLE") || MONG9_EDITOR_POSSIBLE != 1) {
		print_m9_msg('error|'. m9_die_msg('Security check failed.') );
	}

	if(!defined("MONG9_UPLOAD_DIR")) {
		print_m9_msg('error|'. m9_die_msg('The setting value does not exist.') .'[MONG9_UPLOAD_DIR]' );
	}

	if(!defined("MONG9_IMAGE_UPLOAD_SIZE")) {
		print_m9_msg('error|'. m9_die_msg('The setting value does not exist.') .'[MONG9_IMAGE_UPLOAD_SIZE]' );
	}

	if (isset($_FILES) && empty($_FILES)) {
		print_m9_msg('error|'. m9_die_msg('Upload failed.') );
	}


	if (!is_dir(MONG9_UPLOAD_DIR)) {
		if (!mkdir(MONG9_UPLOAD_DIR,0755)) {
			print_m9_msg('error|'. m9_die_msg('Failed to create the folder.') );
		}
	}

	$uploaded_img = (isset($_FILES['img_upload_file']) && $_FILES['img_upload_file'] != '') ? $_FILES['img_upload_file'] : '';
	$newfilename = sanitize_file_name($uploaded_img['name']); // 공백 -> _ 처리

	if (empty($uploaded_img)) {
		print_m9_msg('error|'. m9_die_msg('This file is empty. Please try another.'));
	}
	 
	if ($uploaded_img['error']) {
		print_m9_msg('error|'. $uploaded_img['error']);
	}

	$upload_file_size = MONG9_IMAGE_UPLOAD_SIZE;

	$max_upload_size = wp_max_upload_size();

	if ($upload_file_size > $max_upload_size) {
		$upload_file_size = $max_upload_size;
	}

	$mong9_upload_dir = m9_upload_dir(MONG9_UPLOAD_DIR);

	$new_file_path = $mong9_upload_dir .'/'. $newfilename;

	$i = 1;
	while (file_exists($new_file_path)) {
		$i++;
		$new_file_path = $mong9_upload_dir .'/'. $i .'_'. $newfilename;
	}

	$imageFileType = strtolower(pathinfo($new_file_path,PATHINFO_EXTENSION));

	// Allow certain file formats
	if ($imageFileType != 'jpg' && $imageFileType != 'png' && $imageFileType != 'jpeg' && $imageFileType != 'gif' && $imageFileType != 'bmp') {
		print_m9_msg('type|'. m9_die_msg('Sorry, only JPG, JPEG, PNG, BMP & GIF files are allowed.'));
	}

	// Check file size
	if ($uploaded_img['size'] > ($upload_file_size * (1024 * 1024))) {
		$_size = $upload_file_size * 1024;
		print_m9_msg('error|'. sprintf( m9_die_msg('This file is too big. Files must be less than %s KB in size.') ,$_size) );
	}

	//define('ALLOW_UNFILTERED_UPLOADS', true);

	if (!function_exists('wp_handle_upload')) {
		require_once(ABSPATH .'wp-admin/includes/file.php');
	}

	$new_file_mime = '';

	// If add media
	if (MONG9_IMAGE_ADD_MEDIA == 1) {

		if (!function_exists('mime_content_type')) {
			require_once( MONG9_EDITOR__PLUGIN_DIR . 'includes/functions/filters.php' );
		}

		$new_file_mime = mime_content_type( $uploaded_img['tmp_name'] );

		if (!in_array($new_file_mime,get_allowed_mime_types())) {
			print_m9_msg('error|'. m9_die_msg('Sorry, you are not allowed to upload media on this site.') );		
		}

	}

	if (move_uploaded_file($uploaded_img["tmp_name"],$new_file_path)) {

		// If add media
		if (MONG9_IMAGE_ADD_MEDIA == 1) {

			$upload_id = wp_insert_attachment(array(
				'guid'           => $new_file_path, 
				'post_mime_type' => $new_file_mime,
				'post_title'     => preg_replace( '/\.[^.]+$/', '', $uploaded_img['name'] ),
				'post_content'   => '',
				'post_status'    => 'inherit'
			),$new_file_path);
		 
			// wp_generate_attachment_metadata() won't work if you do not include this file
			require_once(ABSPATH .'wp-admin/includes/image.php');
		 
			// Generate and save the attachment metas into the database
			wp_update_attachment_metadata($upload_id,wp_generate_attachment_metadata($upload_id,$new_file_path));

		}

		// Show the uploaded file in browser
		$target_url = preg_replace("~^". preg_quote(MONG9_NOW_SITE_DIR,"~") ."~",MONG9_NOW_SITE_DOMAIN,$mong9_upload_dir);
		print_m9_msg('|'. basename($new_file_path) .'|'. $uploaded_img['size'] .'|'. $target_url);

	} else {

		print_m9_msg('error|'.m9_die_msg('Sorry, there was an error uploading your file') );

	}

	print_m9_msg('error|'. m9_die_msg('Upload failed.') );

	exit;

} // function

function m9_upload_dir($dir) {
	$newDir = rtrim($dir,'/') .'/'. date('Y/m');
	if (!is_dir($newDir)) {
		mkdir($newDir,0755,true);
	}
	return $newDir;
} // function

?>