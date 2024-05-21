<?php


// PHP-DI configuration

use DI\Container;
use Aesa\Core\RestRouter;
use Aesa\Db\DbMap;

return [
    RestRouter::class       => DI\autowire()->constructor(DI\get(Container::class), AESA_API_REST_NAMESPACE),
    DbMap::class            => DI\autowire()->constructor(AESA_DB_PREFIX),
];
