<?php

return "CREATE TABLE {tablePrefix}marco_ordenador (
    marco_ordenador_id  INT(11) NOT NULL AUTO_INCREMENT,
    usuario_reg_id      INT(11) NOT NULL,
    usuario_mod_id      INT(11) NOT NULL,
    fecha_reg           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod           DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo              TINYINT(1) NOT NULL DEFAULT 1,
    sigla               VARCHAR(50) NOT NULL,
    nombre              VARCHAR(100) NOT NULL,
    PRIMARY KEY    (marco_ordenador_id)
) {charset};";
