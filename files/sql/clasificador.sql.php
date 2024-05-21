<?php

return "CREATE TABLE {tablePrefix}clasificador (
    clasificador_id     INT(11) NOT NULL AUTO_INCREMENT,
    usuario_reg_id      INT(11) NOT NULL,
    usuario_mod_id      INT(11) NOT NULL,
    fecha_reg           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo              TINYINT(1) NOT NULL DEFAULT 1,
    marco_ordenador_id  INT(11) NOT NULL,
    numeral             VARCHAR(11) NOT NULL COMMENT 'Máx 99.99.99.99(11 caracteres)',
    nombre              VARCHAR(1000) NOT NULL,
    PRIMARY KEY    (clasificador_id),
    FOREIGN KEY    (marco_ordenador_id)   REFERENCES {tablePrefix}marco_ordenador(marco_ordenador_id)
) {charset};";
