<?php

namespace Aesa\Rest\Controllers;

use Aesa\Model\Estadistica;
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
        try {
            $data = $request->get_body();
            $data = json_decode($data, true);
            $estadistica = new Estadistica($data);
            $id = $this->estadisticaService->registrarEstadistica($estadistica);
            $newRecord = $this->estadisticaService->getEstadistica($id);
            return [
                'data' => array_merge($data, $newRecord),
                'status' => 'OK'
            ];
        } catch (\Throwable $th) {
            return [
                'data' => $th->getMessage(),
                'detail' => $th->getTrace(),
                'status' => 'ERROR'
            ];
        }
    }
    public function actualizarEstadistica(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('id');
            $data = $request->get_body();
            $data = json_decode($data, true);
            $this->estadisticaService->actualizarEstadistica($data, $id);
            return [
                'data' => $data,
                'status' => 'OK'
            ];
        } catch (\Throwable $th) {
            return [
                'data' => $th->getMessage(),
                'status' => 'ERROR'
            ];
        }
    }
    public function obtenerEstadistica(WP_REST_Request $request)
    {
        $id = $request->get_param('id');
        $result = $this->estadisticaService->getEstadistica($id);
        // Return the array of objects
        return [
            'data' => $result,
        ];
    }
    public function eliminarEstadistica(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('id');
            $this->estadisticaService->eliminarEstadistica($id);
            return [
                'message' => "Estadística con ID $id eliminada",
                'status' => 'OK'
            ];
        } catch (\Throwable $th) {
            return [
                'error' => $th->getMessage(),
                'status' => 'ERROR'
            ];
        }
    }
}
