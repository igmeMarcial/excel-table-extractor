<?php

namespace Aesa;

class AdminPage
{
    private $aesaCssHandler;
    private $wpMinimalStyles = [
        'dashicons',
        'admin-bar',
        'common',
        'admin-menu',
    ];
    public function init()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminScripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueInfoScript']);
        add_filter('print_styles_array',    [$this, 'filterPrintStylesArray']);
    }
    public function renderAppWrapper()
    {
        print '<div id="aesa-wrapper"></did>';
    }
    public function enqueueAdminScripts($hook)
    {
        if ($hook == 'toplevel_page_' . AESA_ADMIN_PAGE_SLUG) {
            $this->enqueuePluginAdminPageScripts();
        }
    }
    private function enqueuePluginAdminPageScripts()
    {
        // Get json file contents
        $json = file_get_contents(AESA_PLUGIN_DIR . '/admin/ui/build/asset-manifest.json');
        // Decode json
        $json = json_decode($json, true);

        // Get js and css files
        $files = $json['files'];
        // main css file
        $this->aesaCssHandler = AESA_ADMIN_PAGE_SLUG . '-admin-css' . $files['main.css'];

        wp_enqueue_style(
            $this->aesaCssHandler,
            AESA_PLUGIN_URL . '/admin/ui/build/' . $files['main.css'],
            [],
            AESA_PLUGIN_VERSION
        );
        // main js file
        wp_enqueue_script(
            AESA_ADMIN_PAGE_SLUG . '-admin-js-' . $files['main.js'],
            AESA_PLUGIN_URL . '/admin/ui/build/' . $files['main.js'],
            [],
            AESA_PLUGIN_VERSION,
            true
        );
    }
    /**
     * Remueve aquellos estilos de wordpress que no son necesarios en la página de administración
     */
    public function filterPrintStylesArray($styles)
    {
        global $plugin_page;
        if ($plugin_page == AESA_ADMIN_PAGE_SLUG  && !empty($styles)) {
            $newStyles = array_merge([], $this->wpMinimalStyles);
            // Mantenter css de la página de administración
            if (in_array($this->aesaCssHandler, $styles)) {
                $newStyles[] = $this->aesaCssHandler;
            }
            $styles = $newStyles;
        }
        return $styles;
    }
    public function enqueueInfoScript()
    {
        $data = $this->getPluginBasicInfo();
        $configScriptName = AESA_PREFIX . '-config-script';
        // Variables de configuración usadas en el front
        wp_register_script(
            $configScriptName,
            AESA_PLUGIN_URL . '/public/assets/js/info.js',
            array(),
            AESA_PLUGIN_VERSION,
            false
        );
        wp_localize_script($configScriptName, AESA_JS_INFO_VAR, $data);
        wp_enqueue_script($configScriptName);
    }
    private function getPluginBasicInfo()
    {
        return array(
            'pluginVersion' => AESA_PLUGIN_VERSION,
            'pluginUrl'     => AESA_PLUGIN_URL,
            'apiUrl'        => get_rest_url(null, AESA_API_REST_NAMESPACE),
        );
    }
}
