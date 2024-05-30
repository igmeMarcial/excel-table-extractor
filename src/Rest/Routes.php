<?php

namespace Aesa\Rest;

use Aesa\Core\RestRouter;

use Aesa\Rest\Controllers\DevController;
use Aesa\Rest\Controllers\EstadisticaController;
use Aesa\Rest\Controllers\IndiceController;
use Aesa\Rest\Controllers\MarcoOdenadorController;
use Aesa\Rest\Controllers\ClasificadorController;

class Routes
{
    private RestRouter $router;

    public function __construct(RestRouter $router)
    {
        $this->router = $router;
    }

    public function init()
    {
        add_action('rest_api_init', function () {
            $this->doRegisterRoutes();
        });
    }

    /**
     * Registra las rutas de la API REST
     */
    private function doRegisterRoutes()
    {
        $this->router->get('/estadisticas',                   EstadisticaController::class . ':listarEstadisticas');
        $this->router->post('/estadisticas',                  EstadisticaController::class . ':registrarEstadistica');
        $this->router->get('/estadisticas/(?P<id>[\d]+)',     EstadisticaController::class . ':obtenerEstadistica');
        $this->router->put('/estadisticas/(?P<id>[\d]+)',     EstadisticaController::class . ':actualizarEstadistica');
        $this->router->delete('/estadisticas/(?P<id>[\d]+)',  EstadisticaController::class . ':eliminarEstadistica');
        // Indices
        $this->router->get('/admin/marcos-ordenadores/mdea/indice-clasificadores', IndiceController::class . ':handleGetIndiceMdea');
        $this->router->get('/admin/marcos-ordenadores/ods/indice-clasificadores',  IndiceController::class . ':handleGetIndiceOds');
        $this->router->get('/admin/marcos-ordenadores/ocde/indice-clasificadores', IndiceController::class . ':handleGetIndiceOcde');
        $this->router->get('/admin/marcos-ordenadores/pna/indice-clasificadores',  IndiceController::class . ':handleGetIndicePna');

        // Marcos ordenadores
        $this->router->get('/admin/marcos-ordenadores',  MarcoOdenadorController::class . ':listarMarcosOrdenadores');
        $this->router->get('/admin/marcos-ordenadores/(?P<marco_ordenador_id>[\d]+)/clasificadores', ClasificadorController::class . ':listarClasificadoresByMarcoOrdenadorId');
        // Clasificadores
        $this->router->post('/admin/clasificadores',              ClasificadorController::class . ':handleCreateClasificador');
        $this->router->put('/admin/clasificadores/(?P<id>[\d]+)', ClasificadorController::class . ':handleUpdateClasificador');
        $this->router->delete('/admin/clasificadores/(?P<id>[\d]+)', ClasificadorController::class . ':handleDeleteClasificador');
        // Indices estadisticas
        $this->router->get('/website/marcos-ordenadores/mdea/indice-estadisticas',  IndiceController::class . ':handleGetIndiceEstadisticasMdea');
        $this->router->get('/website/marcos-ordenadores/ods/indice-estadisticas',   IndiceController::class . ':handleGetIndiceEstadisticasOds');
        $this->router->get('/website/marcos-ordenadores/ocde/indice-estadisticas',  IndiceController::class . ':handleGetIndiceEstadisticasOcde');
        $this->router->get('/website/marcos-ordenadores/pna/indice-estadisticas',   IndiceController::class . ':handleGetIndiceEstadisticasPna');
        $this->router->get('/dev/reset-database',             DevController::class . ':resetDatabase');
    }
}