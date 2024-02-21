<?php

namespace Aesa\Rest\Controllers;

use \WP_REST_Request;
use Aesa\Rest\Services\EstadisticaService;

class EstadisticaController
{
    private EstadisticaService $estadisticaService;
    public function __construct(EstadisticaService $estadisticaService)
    {
        $this->estadisticaService = $estadisticaService;
    }
    public function listarEstadisticas()
    {
        $result = $this->estadisticaService->getListaEstadisticas();
        // Return the array of objects
        return [
            'data' => $result,
            'total' => 1000
        ];
    }
    public function registrarEstadistica(WP_REST_Request $request)
    {
        $data = $request->get_body();
        $data = json_decode($data, true);
        $this->estadisticaService->registrarEstadistica($data);

        // Return the array of objects
        return [
            'data' => $data,
            'status' => 'OK'
        ];
    }

    public function onGetEstadistica(WP_REST_Request $request)
    {
        $id = $request->get_param('id');
        $result = $this->estadisticaService->getEstadistica($id);
        // Return the array of objects
        return [
            'data' => $result,
            'total' => 1
        ];
    }
}
