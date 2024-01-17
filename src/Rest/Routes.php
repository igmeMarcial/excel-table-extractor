<?php

namespace Aesa\Rest;

use Aesa\Core\RestRouter;

use Aesa\Rest\Controllers\IndicadorController;
use Aesa\Rest\Controllers\PlantillaController;

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
        $this->router->get('/indicadores', IndicadorController::class . ':listIndicadores');
        $this->router->get('/plantillas',  PlantillaController::class . ':listarPlantillas');
    }
}
