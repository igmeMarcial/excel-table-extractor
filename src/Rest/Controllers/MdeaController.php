<?php

namespace Aesa\Rest\Controllers;

use Aesa\Rest\Services\MdeaService;

class MdeaController
{
    private MdeaService $mdeaService;
    public function __construct(MdeaService $mdeaService)
    {
        $this->mdeaService = $mdeaService;
    }

    public function onGetIndiceEstadisticas()
    {
        $indice = $this->mdeaService->getIndiceEstadisticas();
        // Return the array of objects
        return [
            'data' => $indice,
        ];
    }
    public function onGetIndiceClasificadores()
    {
        $indice = $this->mdeaService->getIndiceClasificadores();
        // Return the array of objects
        return [
            'data' => $indice,
        ];
    }
}
