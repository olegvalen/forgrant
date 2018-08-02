<?php

class View
{
    protected $registry;

    public function __construct($registry)
    {
        $this->registry = $registry;
    }

    public function render($tpl, $data)
    {
        extract($data);

        ob_start();
        include(DIR_APPLICATION . 'view/tpl/' . $tpl);
        $content = ob_get_contents();
        ob_end_clean();
        return $content;
    }
}