<?php

namespace Aesa\Rest\Services;

use Aesa\Core\DataParser;
use Aesa\Db\DbMap;
use Aesa\Model\Clasificador;

class ClasificadorService
{
    private DbMap $dbMap;
    private \wpdb $wpdb;
    public function __construct(DbMap $dbMap)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->dbMap = $dbMap;
    }

    public function getListaClasficadoresByMarcoOrdenadorId(int $marcoOrdenadorId)
    {
        $query = "SELECT
                    clasificador_id clasificadorId,
                    marco_ordenador_id marcoOrdenadorId,
                    nivel,
                    numeral,
                    nombre,
                    fecha_mod fechaMod,
                    activo
                  FROM {$this->dbMap->clasificador}
                  WHERE marco_ordenador_id = $marcoOrdenadorId";
        // Ejecutar la consulta
        $results =  $this->wpdb->get_results($query, ARRAY_A);
        $model = new Clasificador();
        return DataParser::parseQueryRowsResult($results, $model->getFieldsDef());
    }
}
