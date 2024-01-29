<?php

namespace Aesa\Rest\Controllers;

use WP_REST_Request;
use WP_REST_Response;
use Aesa\Rest\Services\PlantillaService;

class PlantillaController
{
    private PlantillaService $service;
    public function __construct(PlantillaService $service)
    {
        $this->service = $service;
    }
    public function listar()
    {
        $plantillas = $this->service->listar();
        return [
            'data' => $plantillas,
            'total' => count($plantillas)
        ];
    }
    public function guardarArchivo(WP_REST_Request $request)
    {
        $files = $request->get_file_params();
        if (empty($files)) {
            return new WP_REST_Response('No file uploaded', 400);
        }

        $plantilla = $files['file'];

        if (!$this->service->guardarArchivo($plantilla)) {
            return new WP_REST_Response('Error moving the uploaded file', 500);
        }

        return new WP_REST_Response();
    }
    public function descargarArchivo(WP_REST_Request $request)
    {
        // Get the hash path parameter
        $hash = $request->get_param('hash');
        $archivo = $this->service->getArchivoFullInfoByHash($hash);
        if (!$archivo) {
            return new WP_REST_Response('File not found', 404);
        }
        // Set headers for file download
        header('Content-Type: application/octet-stream');
        header("Content-Transfer-Encoding: Binary");
        header('Content-Disposition: attachment; filename="' . $archivo->name . '"');
        // Send the file content
        readfile($archivo->path);
        exit();
    }
    public function eliminarArchivo(WP_REST_Request $request)
    {
        // Get the hash path parameter
        $hash = $request->get_param('hash');
        if (!$this->service->eliminarArchivo($hash)) {
            return new WP_REST_Response('Error deleting the file', 500);
        }
        return new WP_REST_Response();
    }
}
