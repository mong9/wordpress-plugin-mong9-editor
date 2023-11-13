<?php

if(!defined("MONG9")) exit();

global $allowedTags;
$allowedTags = array('a','b','blockquote','br','button','canvas','dd','div','dl','dt','em','h1','h2','h3','h4','h5','h6','i','iframe','img','ol','p','pre','s','span','strong','table','tbody','td','tfoot','th','thead','u','ul');

function Mong9_Html_Convert($html) {

    $f = file(MONG9_EDITOR__PLUGIN_DIR.'etc/htmlpurifier/safeiframe.txt');
    $domains = array();
    foreach($f as $domain){
        // 첫행이 # 이면 주석 처리
        if (!preg_match("/^#/", $domain)) {
            $domain = trim($domain);
            if ($domain)
                array_push($domains, $domain);
        }
    }
    array_push($domains, $_SERVER['HTTP_HOST'].'/');
    $safeiframe = implode('|',$domains);

	if(!class_exists('HTMLPurifier')){
		include_once(MONG9_EDITOR__PLUGIN_DIR . 'etc/htmlpurifier/library/HTMLPurifier.safe-includes.php');
	}

    $config = HTMLPurifier_Config::createDefault();
    // /cache 디렉토리에 CSS, HTML, URI 디렉토리 등을 만든다.
    $config->set('Cache.SerializerPath', MONG9_UPLOAD_DIR);
    $config->set('HTML.SafeEmbed', false);
    $config->set('HTML.SafeObject', false);
    $config->set('Output.FlashCompat', false);
    $config->set('HTML.SafeIframe', true);
	$config->set('HTML.Nofollow', true);    // rel=nofollow 으로 스팸유입을 줄임
    $config->set('URI.SafeIframeRegexp','%^(https?:)?//('.$safeiframe.')%');
    $config->set('Attr.AllowedFrameTargets', array('_blank'));

	// ------------------------------------------------------------ //
	// 몽9 에디터 관련 변환 설정
	// ------------------------------------------------------------ //
	// 역활 : 몽9 에티터에서 사용가능한 태그들 허용하기 위함.
	// ~/gnuboard5/lib/common.lib.php 파일을 열어,
	// html_purifier 함수 중
	// $purifier = new HTMLPurifier($config); 구문 바로 위에 위치
	// ------------------------------------------------------------ //
	if (MONG9 && function_exists('Mong9_Html_Filter')) {
		if ($html != '') {
			$config = Mong9_Html_Filter($config);
			$html = Mong9_Convert_Check($html);
		}
	}

    $purifier = new HTMLPurifier($config);

	return $purifier->purify($html);

} // function

function Mong9_Html_Filter($conv_config) {

	global $allowedTags;

	// HTMLPurifier 가 7 이상 지원 안함.
	if (phpversion() >= 8.0) {
		return $conv_config;
	}

    $conv_config->set('CSS.Trusted', true); // postion,z-index,top,left,right,bottom
    $conv_config->set('CSS.AllowTricky', true); // display,visibility,overflow

	$css_definition = $conv_config->getDefinition('CSS');

	$trusted_wh = new HTMLPurifier_AttrDef_CSS_Composite(
		array(
			new HTMLPurifier_AttrDef_CSS_Length('0'),
			new HTMLPurifier_AttrDef_CSS_Percentage(true),
			new HTMLPurifier_AttrDef_Enum(array('auto', 'initial', 'inherit'))
		)
	);

	$css_definition->info['width'] = $css_definition->info['max-width'] = $css_definition->info['min-width'] = $trusted_wh;

	$border_radius = new HTMLPurifier_AttrDef_CSS_Composite(
		array(
			new HTMLPurifier_AttrDef_CSS_Percentage(true), // disallow negative
			new HTMLPurifier_AttrDef_CSS_Length('0') // disallow negative
		)
	);

	$css_definition->info['border-top-left-radius'] =
	$css_definition->info['border-top-right-radius'] =
	$css_definition->info['border-bottom-right-radius'] =
	$css_definition->info['border-bottom-left-radius'] = new HTMLPurifier_AttrDef_CSS_Multiple($border_radius, 2);

	$css_definition->info['border-radius'] = new HTMLPurifier_AttrDef_CSS_Multiple($border_radius, 4);

	$def = $conv_config->getHTMLDefinition(true);

	foreach ($allowedTags as $tag) {
		$def->addAttribute($tag,'data-m9-m-style',new HTMLPurifier_AttrDef_CSS());
		$def->addAttribute($tag,'data-m9-e-style',new HTMLPurifier_AttrDef_CSS());
	}

	$def->addAttribute('div','data-m9-execute','Text');
	$def->addAttribute('div','data-m9-tab-type','Text');
	$def->addAttribute('a','data-m9-tab-type','Text');
	$def->addAttribute('a','data-m9-href','Text');
	$def->addAttribute('a','data-m9-execute','Text');
	
	$def->addAttribute('iframe', 'allowfullscreen', 'Bool');

	$def->addAttribute('img','data-m9-m-src','Text');
	$def->addAttribute('img','data-m9-e-src','Text');

	return $conv_config;

} // function

$m9_font_familys = array();
function add_mong9_web_font($content) {

	global $m9_font_familys;

	if (preg_match('/\<\!\-\-\s*\/\/\s*Mong9\s*Editor\s*\/\/\s*\-\-\>/i',$content,$check)) {

		if (preg_match('/\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i',$content,$matches)) {

			$font_familys = explode(',',$matches[1]);

			for ($i=0;$i<count($font_familys);$i++) {

				$font_family = $font_familys[$i];

				if (!$m9_font_familys[$font_family]) {

					$path_parts = pathinfo($font_family);

					mong9_enqueue_style($path_parts['filename'],$font_family,'');
					$m9_font_familys[$font_family]++;

				}

			} // for

			$content = str_replace($matches[0],'',$content); # Remove => <!--//m9_font_family(XXX1,XXX2,XXX3)//-->

		}

	}

} // function

function Mong9_Convert_Check($html) {
	add_mong9_web_font($html);
	return $html;
} // function

?>
