<?php

return "CREATE TABLE {tablePrefix}estadistica (
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
    unidad_medida                  VARCHAR(255),
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
    clasificacion_mdea             VARCHAR(14),
    clasificacion_ods              VARCHAR(14),
    clasificacion_ocde             VARCHAR(14),
    clasificacion_pna              VARCHAR(14),
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
  ) {charset};";
