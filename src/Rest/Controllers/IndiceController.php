<?php

namespace Aesa\Rest\Controllers;

use Aesa\Rest\Services\IndiceService;

class IndiceController
{
    private IndiceService $indiceService;
    public function __construct(IndiceService $indiceService)
    {
        $this->indiceService = $indiceService;
    }

    public function onGetIndiceEstadisticas()
    {
        $indice = $this->indiceService->getIndiceEstadisticas();
        // Return the array of objects
        return [
            'data' => $indice,
        ];
    }
    public function onGetIndiceClasificadores()
    {
        $indice = $this->indiceService->getIndiceClasificadores();
        // Return the array of objects
        return [
            'data' => $indice,
        ];
    }
}
