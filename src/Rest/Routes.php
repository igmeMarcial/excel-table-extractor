<?php

namespace Aesa\Rest;

use Aesa\Core\RestRouter;

use Aesa\Rest\Controllers\PlantillaController;
use Aesa\Rest\Controllers\DevController;
use Aesa\Rest\Controllers\EstadisticaController;
use Aesa\Rest\Controllers\MdeaController;
use Aesa\Rest\Controllers\AnuarioController;

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
        $this->router->get('/plantillas',                     PlantillaController::class . ':listar');
        $this->router->get('/plantillas',                     PlantillaController::class . ':listar');
        $this->router->get(
            '/plantillas/(?P<hash>[\w]+):descargar',
            PlantillaController::class . ':descargarArchivo'
        );
        $this->router->post('/plantillas',                    PlantillaController::class . ':guardarArchivo');
        $this->router->delete('/plantillas/(?P<hash>[\w]+)',  PlantillaController::class . ':eliminarArchivo');
        $this->router->get('/anuarios',                       AnuarioController::class . ':listar');
        $this->router->get(
            '/anuarios/(?P<hash>[\w]+):descargar',
            AnuarioController::class . ':descargarArchivo'
        );
        $this->router->post('/anuarios',                      AnuarioController::class . ':guardarArchivo');
        $this->router->post('/anuarios:generar-version-base', AnuarioController::class . ':generarAnuario');
        $this->router->delete('/anuarios/(?P<hash>[\w]+)',    AnuarioController::class . ':eliminarArchivo');
        $this->router->get('/mdea/componentes',               MdeaController::class . ':listarComponentes');
        $this->router->get('/mdea/subcomponentes',            MdeaController::class . ':listarSubcomponentes');
        $this->router->get('/mdea/temas-estadisticos',        MdeaController::class . ':listarTemasEstadisticos');
        $this->router->get('/mdea/indice',                    MdeaController::class . ':onGetIndice');
        $this->router->get('/dev/reset-database',             DevController::class . ':resetDatabase');
    }
}
