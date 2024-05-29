<?php

namespace Aesa\Rest\Controllers;

use \WP_REST_Request;
use Aesa\Rest\Services\ClasificadorService;

class ClasificadorController
{
    private ClasificadorService $service;
    public function __construct(ClasificadorService $service)
    {
        $this->service = $service;
    }
    public function listarClasificadoresByMarcoOrdenadorId(WP_REST_Request $request)
    {
        $marcoOrdenadorId = (int)$request->get_param('marco_ordenador_id');
        $result = $this->service->getListaClasficadoresByMarcoOrdenadorId($marcoOrdenadorId);
        // Return the array of objects

        return [
            'data' => $result,
            'total' => 1000
        ];
    }
}
