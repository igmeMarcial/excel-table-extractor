<?php

namespace Aesa\Db;

class Schema
{
    private static $pluginTablePrefix = 'aesa_';
    private $tables = [
        'marco_ordenador',
        'clasificador',
    ];

    public static function initDatabase()
    {
        $schema = new Schema();
        $schema->createTables();
        $schema->insertInitialData();
    }
    public static function dropTables()
    {
        global $wpdb;
        $schema = new Schema();
        $sql = $schema->getDbDropSql();
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $queries = explode(';', $sql);
        foreach ($queries as $query) {
            if (empty($query) || trim($query) === '') {
                continue;
            }
            $wpdb->query($query);
        }
    }

    public function createTables()
    {
        $sql = $this->getDbCreationSql();
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    private function insertInitialData()
    {
        foreach ($this->tables as $tableName) {
            $this->insertInitialTableData($tableName);
        }
    }
    private function insertInitialTableData($tableName)
    {
        global $wpdb;
        $tablePrefix = self::getTablePrefix();
        $fullTableName = $tablePrefix . $tableName;
        $currentUserId = get_current_user_id();
        $data = $this->getInitialTableData($tableName);
        foreach ($data['data'] as $values) {
            $row = $this->getAsArrayObject($data['fields'], $values);
            $row['usuario_reg_id'] = $currentUserId;
            $row['usuario_mod_id'] = $currentUserId;
            $wpdb->insert($fullTableName, $row);
        }
    }
    private function getAsArrayObject($fields, $values)
    {
        $out = [];
        foreach ($fields as $index =>  $field) {
            $out[$field] = $values[$index];
        }
        return $out;
    }
    private function getInitialTableData($tableName)
    {
        $fileName = AESA_PLUGIN_DIR . '/files/data/' . $tableName . '.php';
        if (!file_exists($fileName)) {
            return [];
        }
        return require_once $fileName;
    }
    private function getCreateTableSql($tableName): string
    {
        global $wpdb;
        $fileName = AESA_PLUGIN_DIR . '/files/sql/' . $tableName . '.sql.php';
        if (!file_exists($fileName)) {
            return null;
        }
        $tpl = require_once $fileName;
        // Remplazar prefijo
        $out = str_replace('{tablePrefix}', self::getTablePrefix(), $tpl);
        // Remplazar charset
        $out = str_replace('{charset}', $wpdb->get_charset_collate(), $out);
        return $out;
    }
    private function getDbCreationSql()
    {
        $sqlStack = [
            $this->getCreateTableSql('marco_ordenador'),
            $this->getCreateTableSql('clasificador'),
            $this->getCreateTableSql('estadistica'),
            $this->getCreateTableSql('esta_clas_n1'),
            $this->getCreateTableSql('esta_clas_n2'),
            $this->getCreateTableSql('esta_clas_n3'),
        ];
        return implode("\n", $sqlStack);
    }

    private function getDbDropSql()
    {
        $tablePrefix = self::getTablePrefix();
        return "
DROP TABLE IF EXISTS {$tablePrefix}esta_clas_n1;
DROP TABLE IF EXISTS {$tablePrefix}esta_clas_n2;
DROP TABLE IF EXISTS {$tablePrefix}esta_clas_n3;
DROP TABLE IF EXISTS {$tablePrefix}clasificador;
DROP TABLE IF EXISTS {$tablePrefix}estadistica;
DROP TABLE IF EXISTS {$tablePrefix}marco_ordenador;
";
    }
    public static function getTablePrefix()
    {
        global $wpdb;
        return $wpdb->prefix . self::$pluginTablePrefix;
    }
}
