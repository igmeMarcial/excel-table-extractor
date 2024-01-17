<?php

namespace Aesa;

class Installer
{
    public function init()
    {
        register_activation_hook(AESA_PLUGIN_FILE, [$this, 'activate']);
        register_deactivation_hook(AESA_PLUGIN_FILE, [$this, 'deactivate']);
    }

    public function activate()
    {
        $this->createTables();
    }

    public function deactivate()
    {
        $this->dropTables();
    }

    private function createTables()
    {
        global $wpdb;
        $charsetCollate = $wpdb->get_charset_collate();
        $table = AESA_PREFIX . '_indicador';
        $sql = "CREATE TABLE IF NOT EXISTS $table (
            id int(11) NOT NULL AUTO_INCREMENT,
            id_componente int(11) NOT NULL,
            nombre varchar(255) NOT NULL,
            PRIMARY KEY  (id)
        ) $charsetCollate;";
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
        // Tabla componente
        $table = AESA_PREFIX . '_componente';
        $sql = "CREATE TABLE IF NOT EXISTS $table (
            id int(11) NOT NULL AUTO_INCREMENT,
            nombre varchar(255) NOT NULL,
            PRIMARY KEY  (id)
        ) $charsetCollate;";
        dbDelta($sql);
        // Insert initial data
        $this->insertInitialData();
    }

    private function insertInitialData()
    {
        global $wpdb;
        $table = AESA_PREFIX . '_indicador';
        $data = require_once AESA_PLUGIN_DIR . '/files/data/indicadores.php';
        foreach ($data as $row) {
            $wpdb->insert($table, $row);
        }
        $table = AESA_PREFIX . '_componente';
        $data = require_once AESA_PLUGIN_DIR . '/files/data/componentes.php';
        foreach ($data as $row) {
            $wpdb->insert($table, $row);
        }
    }

    private function dropTables()
    {
        global $wpdb;
        $table = AESA_PREFIX . '_indicador';
        $sql = "DROP TABLE IF EXISTS $table;";
        $table = AESA_PREFIX . '_componente';
        $sql .= "DROP TABLE IF EXISTS $table;";
        $wpdb->query($sql);
    }
}
