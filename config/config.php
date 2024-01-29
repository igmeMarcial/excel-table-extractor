<?php


// PHP-DI configuration

use DI\Container;
use Aesa\Core\RestRouter;
use Aesa\Db\DbMap;
use Aesa\Rest\Services\AnuarioService;
use Aesa\Rest\Services\PlantillaService;

return [
    RestRouter::class       => DI\autowire()->constructor(DI\get(Container::class), AESA_API_REST_NAMESPACE),
    DbMap::class            => DI\autowire()->constructor(AESA_DB_PREFIX),
    PlantillaService::class => DI\autowire()->constructor(AESA_PLUGIN_DIR . '/uploads/plantillas'),
    AnuarioService::class   => DI\autowire()->constructor(
        DI\get(Container::class),
        AESA_PLUGIN_DIR . '/uploads/anuarios'
    ),
];
