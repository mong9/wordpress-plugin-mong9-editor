<?php

//if (!defined('MONG9')) exit; // 개별 페이지 접근 불가

if( !class_exists('HTMLPurifier_AttrTypes') ){

//echo '없다';

}

class CustomAttributeType extends HTMLPurifier_AttrTypes
{
    // Override the method to define your custom attribute type validation
    public function validate($string, $config, $context)
    {

echo '~~~~~~~~~~~';

		return 1;

        // Custom attribute type validation logic goes here
        // Return true if the attribute value is valid, false otherwise
        return /* your validation logic */;
    }
}


class HTMLPurifier_AttrDef_Text2 extends HTMLPurifier_AttrDef_Text
{
    public function validate($string, $config, $context)
    {

echo $string;
//echo '<BR>'.$context;
//var_dump($config);

        return $this->parseCDATA($string);
    }
}



class HTMLPurifier_AttrDef_CSS2 extends HTMLPurifier_AttrDef_CSS
{
    public function validate($string, $config, $context)
    {

echo $string;
//echo '<BR>'.$context;
//var_dump($config);

        return $this->parseCDATA($string);
    }
}

