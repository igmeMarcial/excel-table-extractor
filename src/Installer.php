<?php

namespace Aesa;

use Aesa\Db\Schema;

class Installer
{
    public function init()
    {
        register_activation_hook(AESA_PLUGIN_FILE, [$this, 'activate']);
        register_deactivation_hook(AESA_PLUGIN_FILE, [$this, 'deactivate']);
    }

    public function activate()
    {
        Schema::initDatabase();
    }

    public function deactivate()
    {
        Schema::dropTables();
    }
}
