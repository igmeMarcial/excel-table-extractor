<?php

/**
 * Router
 *
 * Esta clase envuelve la función register_rest_route de WordPress
 * para facilitar el registro de rutas de la API REST.
 */

namespace Aesa\Rest;

class Router
{
    private function registerRestRoute($route, $methods, $callback)
    {
        register_rest_route(
            AESA_API_REST_NAMESPACE,
            $route,
            [
                'methods'  => $methods,
                'callback' => $callback,
            ]
        );
    }
    public function get($route, $callback)
    {
        $this->registerRestRoute($route, 'GET', $callback);
    }
    public function post($route, $callback)
    {
        $this->registerRestRoute($route, 'POST', $callback);
    }
    public function put($route, $callback)
    {
        $this->registerRestRoute($route, 'PUT', $callback);
    }
    public function delete($route, $callback)
    {
        $this->registerRestRoute($route, 'DELETE', $callback);
    }
}
