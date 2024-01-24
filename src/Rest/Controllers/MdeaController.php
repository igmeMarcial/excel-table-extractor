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
    public function listarComponentes()
    {
        $result = $this->mdeaService->getListaComponentes();
        // Return the array of objects
        return [
            'data' => $result,
            'total' => count($result)
        ];
    }
    public function listarSubcomponentes()
    {
        $result = $this->mdeaService->getListaSubcomponentes();
        // Return the array of objects
        return [
            'data' => $result,
            'total' => count($result)
        ];
    }
    public function listarTemasEstadisticos()
    {
        $result = $this->mdeaService->getListaTemasEstadisticos();
        // Return the array of objects
        return [
            'data' => $result,
            'total' => count($result)
        ];
    }
}
