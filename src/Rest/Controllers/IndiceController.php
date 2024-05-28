<?php

namespace Aesa\Rest\Controllers;
use \WP_REST_Request;
use Aesa\Rest\Services\IndiceService;

class IndiceController
{
    private IndiceService $indiceService;
    public function __construct(IndiceService $indiceService)
    {
        $this->indiceService = $indiceService;
    }

    public function handleGetIndiceEstadisticasMdea()
    {
        $indice = $this->indiceService->getIndiceEstadisticasMdea();
        return $this->formatResponseData($indice);
    }
    public function handleGetIndiceEstadisticasOds()
    {
        $indice = $this->indiceService->getIndiceEstadisticasOds();
        return $this->formatResponseData($indice);
    }
    public function handleGetIndiceEstadisticasOcde()
    {
        $indice = $this->indiceService->getIndiceEstadisticasOcde();
        return $this->formatResponseData($indice);
    }

    public function handleGetIndiceEstadisticasPna()
    {
        $indice = $this->indiceService->getIndiceEstadisticasPna();
        return $this->formatResponseData($indice);
    }
    public function handleGetIndiceMdea()
    {
        $indice = $this->indiceService->getIndiceMdea();
        return $this->formatResponseData($indice);
    }

    public function handleGetIndiceOds()
    {
        $indice = $this->indiceService->getIndiceOds();
        return $this->formatResponseData($indice);
    }
    public function handleGetIndiceOcde()
    {
        $indice = $this->indiceService->getIndiceOcde();
        return $this->formatResponseData($indice);
    }
    public function handleGetIndicePna()
    {
        $indice = $this->indiceService->getIndicePna();
        return $this->formatResponseData($indice);
    }
    private function formatResponseData($data)
    {
        return [
            'data' => $data
        ];
    }
    public function actualizarIndice(WP_REST_Request $request){
        try {   
             $id = $request->get_param('id');
            $data = $request->get_body();
            $data = json_decode($data, true);

             // Obtener la URL de la solicitud
        $url = $request->get_route();

        // Imprimir la URL en la consola de depuración
        error_log("URL de la solicitud: $url");
        error_log("controlador indices");
            $this->indiceService->actualizarIndice($data, $id);
            return [
                'data' => $data,
                'status' => 'OK'
            ];
    }catch (\Throwable $th) {
            return [
                'data' => $th->getMessage(),
                'status' => 'ERROR'
            ];
        }
    }
     public function registrarIndice(WP_REST_Request $request)
    {
        try {
            $data = $request->get_body();
            $data = json_decode($data, true);
            $this->indiceService->crearIndice($data);
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
}