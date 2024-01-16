<?php

/**
 * Plugin Name: Anuarios Estadísticos Ambientales - MINAM
 * Description: Generador de anuarios estadísticos ambientales
 * Author:      Jaime Cruz
 * Version:     0.0.1
 * Author URI:  https://jaimecruz.pe
 */

// Composer autoload
require_once __DIR__ . '/vendor/autoload.php';

define('AESA_PLUGIN_VERSION',  '0.0.1');
define('AESA_ADMIN_PAGE_SLUG', 'aesa');
define('AESA_PLUGIN_DIR',      __DIR__);
define('AESA_PLUGIN_URL',      plugins_url('', __FILE__));
define('AESA_API_REST_NAMESPACE', 'aesa/v1');

// Init plugin
$plugin = \Aesa\Plugin::getInstance();
$plugin->init();
