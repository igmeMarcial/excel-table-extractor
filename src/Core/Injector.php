<?php

/**
 * Injector
 *
 * Clase para la inyección de dependencias
 */

namespace Aesa\Core;

use Aesa\Rest\Services\MdeaService;

class Injector
{
    private static $instances = [];

    public static function getMdeaService(): MdeaService
    {
        if (!isset(self::$instances['mdeaService'])) {
            self::$instances['mdeaService'] = new MdeaService();
        }
        return self::$instances['mdeaService'];
    }
}
