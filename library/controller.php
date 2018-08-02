<?php

abstract class Controller
{
    public $registry;
    protected $method = 'index';

    public function __construct($registry)
    {
        $this->registry = $registry;

    }
}