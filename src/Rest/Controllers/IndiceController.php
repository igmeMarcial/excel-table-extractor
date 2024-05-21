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
}
