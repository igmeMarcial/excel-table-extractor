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
}
