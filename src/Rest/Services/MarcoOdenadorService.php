<?php

namespace Aesa\Rest\Services;

use Aesa\Core\DataParser;
use Aesa\Db\DbMap;
use Aesa\Model\MarcoOrdenador;

class MarcoOdenadorService
{
    private DbMap $dbMap;
    private \wpdb $wpdb;
    public function __construct(DbMap $dbMap)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->dbMap = $dbMap;
    }

    public function getListaMarcosOrdenadores()
    {
        $sql = "SELECT
                  marco_ordenador_id id,
                  nombre,
                  sigla
                FROM {$this->dbMap->marco_ordenador}";

        // Ejecutar la consulta
        $results = $this->wpdb->get_results($sql, ARRAY_A);
        $model = new MarcoOrdenador();
        return DataParser::parseQueryRowsResult($results, $model->getFieldsDef());
    }
}
