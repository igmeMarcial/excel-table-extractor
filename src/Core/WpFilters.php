<?php

namespace Aesa\Core;

class WpFilters
{
    private static $instance;
    private static $filtersAdded = false;
    /**
     * Returns the plugin instance.
     */
    public static function getInstance(): WpFilters
    {
        if (self::$instance == null) {
            self::$instance = new WpFilters();
        }
        return self::$instance;
    }
    public static function addFilters()
    {
        if (self::$filtersAdded) {
            return;
        }
        $instance = self::getInstance();
        // Permite subir archivos SVG
        add_filter('wp_check_filetype_and_ext', [$instance, 'allowSvgUploadFilter'], 10, 4);
        add_filter('upload_mimes', [$instance, 'addSvgMime']);

        self::$filtersAdded = true;
    }

    public function allowSvgUploadFilter($data, $file, $filename, $mimes, $real_mime)
    {
        $filetype = wp_check_filetype($filename, $mimes);
        if ($filetype['ext'] == 'xml' && $real_mime == 'text/xml') {
            return [
                'ext' => $filetype['ext'],
                'type' => $filetype['type'],
                'proper_filename' => $data['proper_filename']
            ];
        }
        return $data;
    }

    public function addSvgMime($mimes)
    {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
}
