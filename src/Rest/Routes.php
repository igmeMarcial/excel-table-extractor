<?php

namespace Aesa\Rest;

use Aesa\Rest\Controllers\IndicadorController;

class Routes
{
    private Router $router;

    public function __construct(Router $router)
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
        $this->router->get('/indicadores', IndicadorController::class . '::listIndicadores');
    }
}
