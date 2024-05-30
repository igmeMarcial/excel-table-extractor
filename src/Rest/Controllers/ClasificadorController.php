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
    // TODO: Mover a MarcaOrdenadorController
    public function listarClasificadoresByMarcoOrdenadorId(WP_REST_Request $request)
    {
        $marcoOrdenadorId = (int)$request->get_param('marco_ordenador_id');
        $result = $this->service->getListaClasficadoresByMarcoOrdenadorId($marcoOrdenadorId);
        // Return the array of objects

        return [
            'data' => $result,
            'total' => count($result)
        ];
    }

    public function handleCreateClasificador(WP_REST_Request $request)
    {
        try {
            $data = $request->get_body();
            $data = json_decode($data, true);
            $this->service->crearIndice($data);
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

    public function handleUpdateClasificador(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('id');
            $data = $request->get_body();
            $data = json_decode($data, true);

            // Obtener la URL de la solicitud
            $url = $request->get_route();

            // Imprimir la URL en la consola de depuración
            error_log("URL de la solicitud: $url");
            error_log("controlador indices");
            $this->service->actualizarIndice($data, $id);
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
    public function handleDeleteClasificador(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('id');
            $this->service->eliminarClasificador($id);
            return [
                'data' => $id,
                'status' => 'OK'
            ];
        } catch (\Throwable $th) {
            return [
                'data' => $th->getMessage(),
                'status' => 'ERROR'
            ];
        }
    }
}