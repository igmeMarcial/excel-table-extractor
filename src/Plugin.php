<?php

namespace Aesa;

use Aesa\Rest\Routes;
use Aesa\Core\WpFilters;

class Plugin
{
    // Singleton plugin instance
    private static $instance;
    // Flag to check if the plugin has been initialized
    private static $initialized = false;

    private \DI\Container $container;
    private Menu $menu;
    private AdminPage $adminPage;
    private PublicPage $publicPagePage;
    private Routes $apiRoutes;

    private Installer $installer;

    private function __construct()
    {
        $this->setupContainer();
        $this->installer = $this->container->get(Installer::class);
        $this->menu =      $this->container->get(Menu::class);
        $this->adminPage = $this->container->get(AdminPage::class);
        $this->publicPagePage = $this->container->get(PublicPage::class);
        $this->apiRoutes = $this->container->get(Routes::class);
    }
    private function setupContainer()
    {
        $builder = new \DI\ContainerBuilder();
        $builder->addDefinitions(AESA_PLUGIN_DIR . '/config/config.php');
        $this->container = $builder->build();
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
        $this->installer->init();
        $this->menu->init();
        $this->adminPage->init();
        $this->publicPagePage->init();
        $this->apiRoutes->init();
        self::$initialized = true;
        // Add filters
        WpFilters::addFilters();
    }
}
