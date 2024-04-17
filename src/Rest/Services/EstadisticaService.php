<?php

namespace Aesa\Rest\Services;

use Aesa\Core\DataParser;
use Aesa\Db\DbMap;
use Aesa\Model\Estadistica;

class EstadisticaService
{
    private DbMap $dbMap;
    private \wpdb $wpdb;
    public function __construct(DbMap $dbMap)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->dbMap = $dbMap;
    }
    public function registrarEstadistica(Estadistica $model): int
    {
        $currentUserId = get_current_user_id();
        $currentTime = current_time('mysql');
        $model->setUsuarioRegId($currentUserId);
        $model->setUsuarioModId($currentUserId);
        $model->setFechaReg($currentTime);
        $model->setFechaMod($currentTime);
        $sucess = $this->wpdb->insert($this->dbMap->estadistica, $model->getDataForDbQuery());
        if (!$sucess) {
            throw new \Exception($this->wpdb->last_error);
        }
        $newId = $this->wpdb->insert_id;
        $model->setId($newId);
        // Classificador N1
        $sucess2 = $this->wpdb->insert(
            $this->dbMap->estaClasN1,
            ['estadistica_id' => $newId, 'clasificador_id' => $model->getClasificadorN1Id()]
        );
        if (!$sucess2) {
            throw new \Exception($this->wpdb->last_error);
        }
        // Classificador N2
        $sucess3 = $this->wpdb->insert(
            $this->dbMap->estaClasN2,
            ['estadistica_id' => $newId, 'clasificador_id' => $model->getClasificadorN2Id()]
        );
        if (!$sucess3) {
            throw new \Exception($this->wpdb->last_error);
        }
        // Classificador N3
        $sucess4 = $this->wpdb->insert(
            $this->dbMap->estaClasN3,
            ['estadistica_id' => $newId, 'clasificador_id' => $model->getClasificadorN3Id()]
        );
        if (!$sucess4) {
            throw new \Exception($this->wpdb->last_error);
        }
        return $newId;
    }
    public function actualizarEstadistica(array $data, int $id)
    {

        $model = new Estadistica($data);
        $model->setId($id);
        $this->wpdb->update(
            $this->dbMap->estadistica,
            $model->getDataForDbQuery(),
            ['estadistica_id' => $id]
        );
        // Classificador N1
        $this->wpdb->update(
            $this->dbMap->estaClasN1,
            ['clasificador_id' => $model->getClasificadorN1Id()],
            ['estadistica_id' => $id]
        );
        // Classificador N2
        $this->wpdb->update(
            $this->dbMap->estaClasN2,
            ['clasificador_id' => $model->getClasificadorN2Id()],
            ['estadistica_id' => $id]
        );
        // Classificador N3
        $this->wpdb->update(
            $this->dbMap->estaClasN3,
            ['clasificador_id' => $model->getClasificadorN3Id()],
            ['estadistica_id' => $id]
        );
    }
    // TODO: corregir mdeaComponenteNombre no está listando el nombre del componente sino del clasificador
    public function getListaEstadisticas()
    {
        $sql = "SELECT
                  A.estadistica_id id,
                  A.nombre,
                  B.clasificador_id clasificadorId,
                  C.nombre mdeaComponenteNombre,
                  A.fecha_mod fechaMod
                FROM {$this->dbMap->estadistica} A
                INNER JOIN {$this->dbMap->estaClasN1} B ON A.estadistica_id = B.estadistica_id
                INNER JOIN {$this->dbMap->clasificador} C ON B.clasificador_id = C.clasificador_id";

        // Ejecutar la consulta test
        $results = $this->wpdb->get_results($sql, ARRAY_A);
        error_log(json_encode($results));

        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    public function getEstadistica($id)
    {
        $model = new Estadistica([]);
        $columns = $model->getSqlColumnNamesString();
        $sql = "SELECT $columns FROM {$this->dbMap->estadistica} WHERE estadistica_id = $id";
        $data = $this->wpdb->get_row($sql, ARRAY_A);
        if (!$data) {
            throw new \Exception("No se encontró el registro con id $id");
        }
        return DataParser::parseQueryResult($data, $model->getFieldsDef());
    }
    public function eliminarEstadistica(int $id)
    {
        $this->wpdb->update($this->dbMap->estadistica, ['eliminado' => true], ['estadistica_id' => $id]);
    }
}
