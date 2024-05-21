<?php

return "CREATE TABLE {tablePrefix}esta_clas_n3 (
    esta_clas_n3_id    INT(11) NOT NULL AUTO_INCREMENT,
    usuario_reg_id     INT(11) NOT NULL,
    usuario_mod_id     INT(11) NOT NULL,
    fecha_reg          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_mod          DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    activo             TINYINT(1) NOT NULL DEFAULT 1,
    estadistica_id     INT(11) NOT NULL,
    clasificador_id    INT(11) NOT NULL,
    PRIMARY KEY    (esta_clas_n3_id),
    FOREIGN KEY    (estadistica_id)   REFERENCES {tablePrefix}estadistica(estadistica_id),
    FOREIGN KEY    (clasificador_id)  REFERENCES {tablePrefix}clasificador(clasificador_id)
  ) {charset};";
