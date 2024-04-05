<?php

namespace Aesa;

class Menu
{
    private AdminPage $adminPage;
    public function __construct(AdminPage $adminPage)
    {
        $this->adminPage = $adminPage;
    }

    public function init()
    {
        add_action('admin_menu', [$this, 'addMenu']);
    }

    public function addMenu()
    {
        add_menu_page(
            'Estadisticas',                         // page title
            'Estadisticas',                         // menu title
            'manage_options',                       // capability
            AESA_ADMIN_PAGE_SLUG,                   // menu slug
            [$this->adminPage, 'renderAppWrapper'], // callback function
            'dashicons-welcome-widgets-menus',
            2
        );
    }
}
