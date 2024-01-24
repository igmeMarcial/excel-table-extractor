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

    private function registerRestRoute($route, $methods, $callback, $args)
    {
        register_rest_route(
            $this->basePath,
            $route,
            [
                'methods'  => $methods,
                'callback' => $this->getRouteCallback($callback),
                'args'     => $args,
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

    public function get($route, $callback, $args = [])
    {
        $this->registerRestRoute($route, 'GET', $callback, $args);
    }
    public function post($route, $callback, $args = [])
    {
        $this->registerRestRoute($route, 'POST', $callback, $args);
    }
    public function put($route, $callback, $args = [])
    {
        $this->registerRestRoute($route, 'PUT', $callback, $args);
    }
    public function delete($route, $callback, $args = [])
    {
        $this->registerRestRoute($route, 'DELETE', $callback, $args);
    }
}
