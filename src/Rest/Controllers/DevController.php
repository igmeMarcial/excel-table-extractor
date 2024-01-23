<?php

namespace Aesa\Rest\Controllers;

use Aesa\Db\Schema;

class DevController
{
    public function resetDatabase()
    {
        Schema::dropTables();
        Schema::initDatabase();
        // Return the array of objects
        return [
            'data' => 'OK',
        ];
    }
}
