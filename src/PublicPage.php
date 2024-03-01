<?php

namespace Aesa;

class PublicPage
{
    public function init()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueInfoScript']);
    }
    public function enqueueScripts()
    {
        if (is_page(['estadisticas'])) {
            // Enqueue your custom script
            wp_enqueue_script(
                'aesa-script',
                AESA_PLUGIN_URL . '/admin/ui/public/frontpage/aesa-frontpage.js',
                [],
                AESA_PLUGIN_VERSION,
                true
            );
        }
    }
    public function enqueueInfoScript()
    {
        if (!is_page(['estadisticas'])) {
            return;
        }
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
