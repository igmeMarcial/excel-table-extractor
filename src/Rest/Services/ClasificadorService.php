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
                    clasificador_id id,
                    marco_ordenador_id marcoOrdenadorId,
                    nivel,
                    numeral,
                    nombre,
                    fecha_mod fechaMod,
                    activo
                  FROM {$this->dbMap->clasificador}
                  WHERE marco_ordenador_id = $marcoOrdenadorId AND eliminado = 0";
        // Ejecutar la consulta
        $results =  $this->wpdb->get_results($query, ARRAY_A);
        $model = new Clasificador();
        return DataParser::parseQueryRowsResult($results, $model->getFieldsDef());
    }
    public function actualizarIndice(array $data, int $id)
    {
        $model  = new Clasificador($data);
        $model->setId($id);
        $this->wpdb->update($this->dbMap->clasificador, $model->getDataForDbQuery(), ["clasificador_id" => $id]);
    }
    public function crearIndice(array $data)
    {
        $model = new Clasificador($data);
        $this->wpdb->insert(
            $this->dbMap->clasificador,
            $model->getDataForDbQuery()
        );
    }
    public function eliminarClasificador(int $id)
    {
        $this->wpdb->update($this->dbMap->clasificador, ['eliminado' => true], ['clasificador_id' => $id]);
    }
}
