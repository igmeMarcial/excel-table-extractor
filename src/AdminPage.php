<?php

namespace Aesa;

class AdminPage
{
    public function init()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminScripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueInfoScript']);
        add_action('admin_menu', [$this, 'desactivar_estilos_admin_wordpress']);
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
        $entrypoints = $json['entrypoints'];
        // CSS Regex
        $cssRegex = '/\.css$/';
        // JS Regex
        $jsRegex = '/\.js$/';
        // Filter css files
        $cssFiles = array_filter($entrypoints, function ($file) use ($cssRegex) {
            return preg_match($cssRegex, $file);
        });
        // Filter js files
        $jsFiles = array_filter($entrypoints, function ($file) use ($jsRegex) {
            return preg_match($jsRegex, $file);
        });
        foreach ($cssFiles as $cssFile) {
            wp_enqueue_style(
                'aesa-admin-css-' . $cssFile,
                AESA_PLUGIN_URL . '/admin/ui/build/' . $cssFile,
                [],
                AESA_PLUGIN_VERSION
            );
        }
        foreach ($jsFiles as $jsFile) {
            wp_enqueue_script(
                'aesa-admin-js-' . $jsFile,
                AESA_PLUGIN_URL . '/admin/ui/build/' . $jsFile,
                [],
                AESA_PLUGIN_VERSION,
                true
            );
        }
    }
    public function desactivar_estilos_admin_wordpress() {
        global $wp_styles;

        // Desencola los estilos que pueden interferir
        //wp_dequeue_style('wp-block-library'); // Desencola los estilos del editor de bloques
        //wp_dequeue_style('wp-block-library-theme'); // Desencola los estilos del tema del editor de bloques

        // Desactiva los estilos de WordPress admin
        $styles_to_remove = array(
            //'wp-admin',
            //'buttons',
            //'forms',
           // 'dashicons',
            //'admin-bar',
        );

        foreach ($styles_to_remove as $style) {
            if (isset($wp_styles->registered[$style])) {
                //wp_dequeue_style($style);
                wp_deregister_style($style);
            }
        }
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
