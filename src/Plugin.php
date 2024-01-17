<?php

namespace Aesa;

use Aesa\Core\RestRouter;
use Aesa\Rest\Routes;

class Plugin
{
    // Singleton plugin instance
    private static $instance;
    // Flag to check if the plugin has been initialized
    private static $initialized = false;

    private Menu $menu;
    private AdminPage $adminPage;
    private Routes $apiRoutes;

    private function __construct()
    {
        $this->adminPage = new AdminPage();
        $this->menu = new Menu($this->adminPage);
        $this->apiRoutes = new Routes(new RestRouter(AESA_API_REST_NAMESPACE));
    }

    /**
     * Returns the plugin instance.
     */
    public static function getInstance(): Plugin
    {
        if (self::$instance == null) {
            self::$instance = new Plugin();
        }
        return self::$instance;
    }

    /**
     * Initializes the plugin.
     */
    public function init()
    {
        if (self::$initialized) {
            return;
        }
        $this->menu->init();
        $this->adminPage->init();
        $this->apiRoutes->init();
        self::$initialized = true;
    }
}
