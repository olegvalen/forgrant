<?php

class Loader
{

    protected $registry;
    protected $method = 'index';

    public function __construct($registry)
    {
        $this->registry = $registry;
    }

    public function model($path, $method, $args)
    {
        $result = array();
        $file = DIR_APPLICATION . 'model/' . strtolower($path) . '.php';
        $class = 'Model' . ucfirst($path);
        if (is_file($file)) {
            include_once($file);
            $model = new $class($this->registry);
            $result = call_user_func_array(array($model, empty($this->method) ? $this->method : $method), $args);
        }
        return $result;
    }

    public function view($path, $args)
    {
        if (file_exists('view/tpl/' . strtolower($path) . '.php')) {
            echo $this->registry->get('view')->render(strtolower($path) . '.php', $args);
        }
    }

    public function controller($path, $args)
    {
//        $array = explode('/', $path);
        $array = explode('/', preg_replace('/[^a-zA-Z0-9_\/=]/', '', (string)$path));
        if (count($array) == 1) {
            $path = $array[0];
        } elseif (count($array) == 2) {
            $path = $array[0];
            $this->method = $array[1];
        } else {
            //other params
            return;
        }
        $file = DIR_APPLICATION . 'controller/' . strtolower($path) . '.php';
        $class = 'Controller' . ucfirst($path);
        if (is_file($file)) {
            include_once($file);
            $controller = new $class($this->registry);
            call_user_func_array(array($controller, $this->method), $args);
        }
    }
}
