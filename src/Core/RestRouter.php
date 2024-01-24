<?php

/**
 * RestRouter
 *
 * Esta clase envuelve la función register_rest_route de WordPress
 * para facilitar el registro de rutas API REST.
 */

namespace Aesa\Core;

use Psr\Container\ContainerInterface;

class RestRouter
{
    private ContainerInterface $container;
    private $basePath;

    public function __construct(ContainerInterface $container, string $basePath)
    {
        $this->container = $container;
        $this->basePath = $basePath;
    }

    private function registerRestRoute($route, $methods, $callback)
    {
        register_rest_route(
            $this->basePath,
            $route,
            [
                'methods'  => $methods,
                'callback' => $this->getRouteCallback($callback),
            ]
        );
    }

    private function getRouteCallback($callback)
    {
        // Case when callback is a string like 'MyClass:myMethod'
        if (is_string($callback) && preg_match('/^([a-zA-Z0-9_\\\]+):(\w+)$/', $callback, $matches)) {
            $class    = $matches[1];
            $method   = $matches[2];
            $controller   = $this->container->get($class);
            return [$controller, $method];
        }
        return $callback;
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
