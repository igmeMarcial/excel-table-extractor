<?php

namespace Aesa\Rest\Controllers;

class PlantillaController
{
    public function listarPlantillas()
    {
        $pathPlantillas = AESA_PLUGIN_DIR . '/files/templates';
        // Get all files in the templates directory
        $templates = scandir($pathPlantillas);
        // Remove the first two elements of the array (.) and (..)
        $templates = array_slice($templates, 2);
        // Map the array of strings to an array of objects and including the file size and modified date
        $templates = array_map(function ($template) {
            $path = AESA_PLUGIN_DIR . '/files/templates/' . $template;
            return (object) [
                'id' => $template,
                'file' => $template,
                'size' => filesize($path),
                'modified' => filemtime($path)
            ];
        }, $templates);

        // Return the array of objects
        return [
            'data' => $templates,
            'total' => count($templates)
        ];
    }
}
