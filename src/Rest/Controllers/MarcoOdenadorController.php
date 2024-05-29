<?php

namespace Aesa\Rest\Controllers;

use Aesa\Rest\Services\MarcoOdenadorService;

class MarcoOdenadorController
{
    private MarcoOdenadorService $service;
    public function __construct(MarcoOdenadorService $service)
    {
        $this->service = $service;
    }
    public function listarMarcosOrdenadores()
    {
        $result = $this->service->getListaMarcosOrdenadores();
        // Return the array of objects

        return [
            'data' => $result,
            'total' => 1000
        ];
    }
}
