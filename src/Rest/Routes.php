<?php

namespace Aesa\Rest;

use Aesa\Core\RestRouter;

use Aesa\Rest\Controllers\IndicadorController;
use Aesa\Rest\Controllers\PlantillaController;
use Aesa\Rest\Controllers\DevController;
use Aesa\Rest\Controllers\MdeaController;

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
        $this->router->get('/indicadores',              IndicadorController::class . ':listIndicadores');
        $this->router->get('/plantillas',               PlantillaController::class . ':listarPlantillas');
        $this->router->get('/mdea/componentes',         MdeaController::class . ':listarComponentes');
        $this->router->get('/mdea/subcomponentes',      MdeaController::class . ':listarSubcomponentes');
        $this->router->get('/mdea/temas-estadisticos',  MdeaController::class . ':listarTemasEstadisticos');
        $this->router->get('/dev/reset-database',       DevController::class . ':resetDatabase');
    }
}
