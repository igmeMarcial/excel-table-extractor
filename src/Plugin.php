<?php

namespace Aesa;

use Aesa\Rest\Router;
use Aesa\Rest\Routes;

class Plugin
{
    /**
     * A reference to an instance of this class.
     */
    private static $instance;

    private Menu $menu;
    private AdminPage $adminPage;
    private Router $router;
    private Routes $routes;
    private function __construct()
    {
        $this->adminPage = new AdminPage();
        $this->menu = new Menu($this->adminPage);
        $this->router = new Router();
        $this->routes = new Routes($this->router);
    }

    /**
     * Returns an instance of this class.
     */
    public static function getInstance(): Plugin
    {
        if (self::$instance == null) {
            self::$instance = new Plugin();
        }
        return self::$instance;
    }
    public function init()
    {
        // Init Menu
        $me = self::getInstance();
        $me->menu->init();
        $me->adminPage->init();
        $me->routes->init();
    }
}
