<?php

namespace Aesa\Db;

class Schema
{
    private static $pluginTablePrefix = 'aesa_';

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
        global $wpdb;
        $tablePrefix = self::getTablePrefix();
        $table = $tablePrefix . 'estadistica';
        $currentUserId = get_current_user_id();
        $data = require_once AESA_PLUGIN_DIR . '/files/data/estadisticas.php';
        foreach ($data as $row) {
            $row['id_usuario_reg'] = $currentUserId;
            $row['id_usuario_mod'] = $currentUserId;
            $wpdb->insert($table, $row);
        }
        $table = $tablePrefix . 'nivel_mda';
        $data = require_once AESA_PLUGIN_DIR . '/files/data/niveles_mda.php';
        foreach ($data as $row) {
            $row['id_usuario_reg'] = $currentUserId;
            $row['id_usuario_mod'] = $currentUserId;
            $wpdb->insert($table, $row);
        }
    }
    private function getDbCreationSql()
    {
        global $wpdb;
        $tablePrefix = self::getTablePrefix();
        $charset = $wpdb->get_charset_collate();

        return "
CREATE TABLE {$tablePrefix}mdea_componente (
    mdea_componente_id  INT(11) NOT NULL AUTO_INCREMENT,
    id_usuario_reg      INT(11) NOT NULL,
    id_usuario_mod      INT(11) NOT NULL,
    fecha_reg           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo              TINYINT(1) NOT NULL DEFAULT 1,
    nombre              VARCHAR(255) NOT NULL,
    PRIMARY KEY  (mdea_componente_id)
) $charset;
CREATE TABLE {$tablePrefix}mdea_subcomponente (
    mdea_subcomponente_id  INT(11) NOT NULL AUTO_INCREMENT,
    mdea_componente_id     INT(11) NOT NULL,
    id_usuario_reg         INT(11) NOT NULL,
    id_usuario_mod         INT(11) NOT NULL,
    fecha_reg              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo                 TINYINT(1) NOT NULL DEFAULT 1,
    nombre                 VARCHAR(255) NOT NULL,
    PRIMARY KEY (mdea_subcomponente_id),
    FOREIGN KEY (mdea_componente_id) REFERENCES {$tablePrefix}mdea_componente(mdea_componente_id)
) $charset;
CREATE TABLE {$tablePrefix}mdea_tema_estadistico (
    mdea_tema_estadistico_id  INT(11) NOT NULL AUTO_INCREMENT,
    mdea_subcomponente_id     INT(11) NOT NULL,
    id_usuario_reg         INT(11) NOT NULL,
    id_usuario_mod         INT(11) NOT NULL,
    fecha_reg              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo                 TINYINT(1) NOT NULL DEFAULT 1,
    nombre                 VARCHAR(255) NOT NULL,
    PRIMARY KEY (mdea_tema_estadistico_id),
    FOREIGN KEY (mdea_subcomponente_id) REFERENCES {$tablePrefix}mdea_subcomponente(mdea_subcomponente_id)
) $charset;
CREATE TABLE {$tablePrefix}estadistica (
  estadistica_id    INT(11) NOT NULL AUTO_INCREMENT,
  nivel_mdea_id     INT(11) NOT NULL,
  nivel_mdea_n1_id  INT(11) NOT NULL,
  id_usuario_reg    INT(11) NOT NULL,
  id_usuario_mod    INT(11) NOT NULL,
  fecha_reg         DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  fecha_mod         DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  activo            TINYINT(1) NOT NULL DEFAULT 1,
  archivado         TINYINT(1) NOT NULL DEFAULT 0,
  eliminado         TINYINT(1) NOT NULL DEFAULT 0,
  nombre            VARCHAR(255) NOT NULL,
  PRIMARY KEY (estadistica_id)
  REFERENCES {$tablePrefix}nivel_mdea (nivel_mdea_id)
) $charset;
CREATE TABLE {$tablePrefix}nivel_mdea (
    nivel_mdea_id    INT(11) NOT NULL AUTO_INCREMENT,
    id_usuario_reg  INT(11) NOT NULL,
    id_usuario_mod  INT(11) NOT NULL,
    fecha_reg       DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod       DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo          TINYINT(1) NOT NULL DEFAULT 1,
    archivado       TINYINT(1) NOT NULL DEFAULT 0,
    eliminado       TINYINT(1) NOT NULL DEFAULT 0,
    nombre          VARCHAR(255) NOT NULL,
    PRIMARY KEY  (nivel_mda_id)
) $charset;";
    }

    private function getDbDropSql()
    {
        $tablePrefix = self::getTablePrefix();
        return "
DROP TABLE IF EXISTS {$tablePrefix}mdea_componente;
DROP TABLE IF EXISTS {$tablePrefix}mdea_subcomponente;
DROP TABLE IF EXISTS {$tablePrefix}mdea_tema_estadistico;
DROP TABLE IF EXISTS {$tablePrefix}estadistica;
DROP TABLE IF EXISTS {$tablePrefix}nivel_mda;";
    }
    public static function getTablePrefix()
    {
        global $wpdb;
        return $wpdb->prefix . self::$pluginTablePrefix;
    }
}
