<?php

namespace Aesa\Db;

class Schema
{
    private static $pluginTablePrefix = 'aesa_';
    private $tables = [
        'clasificador',
        'esta_clas_n1',
        'esta_clas_n2',
        'esta_clas_n3',
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
        foreach ($data as $row) {
            $row['usuario_reg_id'] = $currentUserId;
            $row['usuario_mod_id'] = $currentUserId;
            $wpdb->insert($fullTableName, $row);
        }
    }
    private function getInitialTableData($tableName)
    {
        $fileName = AESA_PLUGIN_DIR . '/files/data/' . $tableName . '.php';
        if (!file_exists($fileName)) {
            return [];
        }
        return require_once $fileName;
    }
    private function getDbCreationSql()
    {
        global $wpdb;
        $tablePrefix = self::getTablePrefix();
        $charset = $wpdb->get_charset_collate();

        return "
CREATE TABLE {$tablePrefix}clasificador (
    clasificador_id     INT(11) NOT NULL AUTO_INCREMENT,
    marco_ordenador_id  INT(11) NOT NULL,
    usuario_reg_id      INT(11) NOT NULL,
    usuario_mod_id      INT(11) NOT NULL,
    fecha_reg           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo              TINYINT(1) NOT NULL DEFAULT 1,
    numeral             VARCHAR(11) NOT NULL COMMENT 'Máx 99.99.99.99(11 caracteres)',
    nombre              VARCHAR(255) NOT NULL,
    PRIMARY KEY    (clasificador_id)
) $charset;
CREATE TABLE {$tablePrefix}estadistica (
  estadistica_id            INT(11) NOT NULL AUTO_INCREMENT,
  usuario_reg_id            INT(11) NOT NULL,
  usuario_mod_id            INT(11) NOT NULL,
  fecha_reg                 DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  fecha_mod                 DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  activo                    TINYINT(1) NOT NULL DEFAULT 1,
  archivado                 TINYINT(1) NOT NULL DEFAULT 0,
  eliminado                 TINYINT(1) NOT NULL DEFAULT 0,
  nombre                    VARCHAR(1000) NOT NULL,
  finalidad                      VARCHAR(1000),
  descripcion                    TEXT,
  unidad_medida                  VARCHAR(50),
  formula_calculo                TEXT,
  metodologia_calculo            TEXT,
  fuente                         VARCHAR(1000),
  unidad_organica_generadora     VARCHAR(1000),
  url                            VARCHAR(1000),
  periodicidad_generacion        VARCHAR(1000),
  periodicidad_entrega           VARCHAR(1000),
  periodo_serie_tiempo           CHAR(20),
  ambito_geografico              VARCHAR(1000),
  limitaciones                   VARCHAR(1000),
  relacion_objetivos_nacionales  VARCHAR(1000),
  relacion_iniciativas_internacionales  VARCHAR(1000),
  correo_electronico             VARCHAR(255),
  datos_contacto                 VARCHAR(1000),
  telefono_celular               VARCHAR(255),
  datos                          TEXT,
  pres_tabla_titulo              VARCHAR(500),
  pres_tabla_subtitulo           VARCHAR(255),
  pres_tabla_nota                TEXT,
  pres_tabla_fuente              VARCHAR(1000),
  pres_tabla_elaboracion         VARCHAR(1000),
  pres_tabla_formato             TEXT,
  datos_informacion              TEXT,
  graficos                       TEXT,
  PRIMARY KEY    (estadistica_id)
) $charset;
CREATE TABLE {$tablePrefix}esta_clas_n1 (
  esta_clas_n1_id    INT(11) NOT NULL AUTO_INCREMENT,
  usuario_reg_id     INT(11) NOT NULL,
  usuario_mod_id     INT(11) NOT NULL,
  fecha_reg          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  fecha_mod          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  activo             TINYINT(1) NOT NULL DEFAULT 1,
  estadistica_id     INT(11) NOT NULL,
  clasificador_id    INT(11) NOT NULL,
  PRIMARY KEY    (esta_clas_n1_id),
  FOREIGN KEY    (estadistica_id)   REFERENCES {$tablePrefix}estadistica(estadistica_id),
  FOREIGN KEY    (clasificador_id)  REFERENCES {$tablePrefix}clasificador(clasificador_id)
) $charset;
CREATE TABLE {$tablePrefix}esta_clas_n2 (
  esta_clas_n2_id    INT(11) NOT NULL AUTO_INCREMENT,
  usuario_reg_id     INT(11) NOT NULL,
  usuario_mod_id     INT(11) NOT NULL,
  fecha_reg          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  fecha_mod          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  activo             TINYINT(1) NOT NULL DEFAULT 1,
  estadistica_id     INT(11) NOT NULL,
  clasificador_id    INT(11) NOT NULL,
  PRIMARY KEY    (esta_clas_n2_id),
  FOREIGN KEY    (estadistica_id)   REFERENCES {$tablePrefix}estadistica(estadistica_id),
  FOREIGN KEY    (clasificador_id)  REFERENCES {$tablePrefix}clasificador(clasificador_id)
) $charset;
CREATE TABLE {$tablePrefix}esta_clas_n3 (
  esta_clas_n3_id    INT(11) NOT NULL AUTO_INCREMENT,
  usuario_reg_id     INT(11) NOT NULL,
  usuario_mod_id     INT(11) NOT NULL,
  fecha_reg          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  fecha_mod          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  activo             TINYINT(1) NOT NULL DEFAULT 1,
  estadistica_id     INT(11) NOT NULL,
  clasificador_id    INT(11) NOT NULL,
  PRIMARY KEY    (esta_clas_n3_id),
  FOREIGN KEY    (estadistica_id)   REFERENCES {$tablePrefix}estadistica(estadistica_id),
  FOREIGN KEY    (clasificador_id)  REFERENCES {$tablePrefix}clasificador(clasificador_id)
) $charset;";
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
";
    }
    public static function getTablePrefix()
    {
        global $wpdb;
        return $wpdb->prefix . self::$pluginTablePrefix;
    }
}
