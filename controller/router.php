<?php

class ControllerRouter extends Controller
{
    public function index()
    {
        $get = $this->registry->get('request')->get;
        if (count($get)) {
            if (count($get) == 1 && !$get['data']) {
                $keys = array_keys($get);
                $key = $keys[0];
                $value = $get[$key];
                if (!empty($value)) {
                    $id = (int)$value;
                    $loader = new Loader($this->registry);
                    $loader->controller('home/edit', array($id));
                } else {
                    $loader = new Loader($this->registry);
                    $loader->controller($key, array());
                }
            } elseif ($get['method']) {
                $id = (int)$get['id'];
                $loader = new Loader($this->registry);
                $loader->controller('home/' . $get['method'], array($id));
            } elseif ($get['data']) {
                $loader = new Loader($this->registry);
                $loader->controller('home/'.$get['data']['method'], $get);
            }
        } else {
            $loader = new Loader($this->registry);
            $loader->controller('home', array());
        }
    }
}