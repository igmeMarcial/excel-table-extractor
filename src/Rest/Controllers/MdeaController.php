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
            'data'  => $result,
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
    public function onGetIndice()
    {
        $componentes = $this->mdeaService->getListaComponentes();
        $subComponentes = $this->mdeaService->getListaSubcomponentes();
        $temasEstadisticos = $this->mdeaService->getListaTemasEstadisticos();
        // Construir arból de índice
        $componentes = array_map(function ($componente, $index) use ($subComponentes, $temasEstadisticos) {
            $componente['numeracion'] = (string)($index + 1);
            $componente['hijos'] = array_filter($subComponentes, function ($subcomponente) use ($componente) {
                return $subcomponente['componenteId'] === $componente['id'];
            });
            $componente['hijos'] = array_map(function ($subcomponente, $index) use ($componente, $temasEstadisticos) {
                $subcomponente['numeracion'] = $componente['numeracion'] . '.' . ($index + 1);
                unset($subcomponente['componenteId']);
                $subcomponente['hijos'] = array_filter($temasEstadisticos, function ($tema) use ($subcomponente) {
                    return $tema['subcomponenteId'] === $subcomponente['id'];
                });
                $subcomponente['hijos'] = array_map(function ($tema, $index) use ($subcomponente) {
                    $tema['numeracion'] = $subcomponente['numeracion'] . '.' . ($index + 1);
                    unset($tema['subcomponenteId']);
                    return $tema;
                }, $subcomponente['hijos'], array_keys(array_values($subcomponente['hijos'])));
                return $subcomponente;
            }, $componente['hijos'], array_keys(array_values($componente['hijos'])));
            return $componente;
        }, $componentes, array_keys($componentes));
        // Return the array of objects
        return [
            'data' => $componentes,
            'total' => count($componentes)
        ];
    }
}
