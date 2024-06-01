<?php

namespace Aesa\Rest\Services;

use Aesa\Core\DataParser;
use Aesa\Core\Constantes;
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
        // Relacionar con MDEA
        $this->registrarClasificadores($newId, Constantes::MARCO_ORDENADOR_MDEA_ID, $model->getClasificacionMdea());
        // Relacionar con ODS
        $this->registrarClasificadores($newId,  Constantes::MARCO_ORDENADOR_ODS_ID, $model->getClasificacionOds());
        // Relacionar con OCDE
        $this->registrarClasificadores($newId, Constantes::MARCO_ORDENADOR_OCDE_ID, $model->getClasificacionOcde());
        // Relacionar con PNA
        $this->registrarClasificadores($newId,  Constantes::MARCO_ORDENADOR_PNA_ID, $model->getClasificacionPna());

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
    }

    public function getListaEstadisticas()
    {
        $marcoOrdenadorId = Constantes::MARCO_ORDENADOR_MDEA_ID;
        $sql = "SELECT
                  A.estadistica_id id,
                  A.nombre,
                  A.unidad_medida unidadMedida,
                  A.periodo_serie_tiempo periodoSerieTiempo,
                  A.clasificacion_mdea clasificacionMdea,
                  A.clasificacion_ods clasificacionOds,
                  A.clasificacion_ocde clasificacionOcde,
                  A.clasificacion_pna clasificacionPna,
                  B.clasificador_n1_id clasificadorId,
                  C.nombre mdeaComponenteNombre,
                  A.fecha_mod fechaMod,
                  A.activo,
                  A.vigente
                FROM {$this->dbMap->estadistica} A
                INNER JOIN {$this->dbMap->estaClas} B ON A.estadistica_id = B.estadistica_id
                INNER JOIN {$this->dbMap->clasificador} C ON B.clasificador_n1_id = C.clasificador_id AND C.marco_ordenador_id = $marcoOrdenadorId";

        // Ejecutar la consulta test
        $results = $this->wpdb->get_results($sql, ARRAY_A);
        $model = new Estadistica([]);
        return DataParser::parseQueryRowsResult($results, $model->getFieldsDef());
    }
    public function getEstadistica($id)
    {
        $model = new Estadistica([]);
        $columns = $model->getSqlColumnNamesString('A');
        $sql = "SELECT $columns,
                       B.clasificador_n1_id clasificadorN1Id,
                       B.clasificador_n2_id clasificadorN2Id,
                       B.clasificador_n3_id clasificadorN3Id,
                       C.numeral
                FROM {$this->dbMap->estadistica} A
                INNER JOIN {$this->dbMap->estaClas} B ON A.estadistica_id = B.estadistica_id
                INNER JOIN {$this->dbMap->clasificador} C ON B.clasificador_n3_id = C.clasificador_id
        WHERE A.estadistica_id = $id";
        $data = $this->wpdb->get_row($sql, ARRAY_A);
        if (!$data) {
            throw new \Exception("No se encontró el registro con id $id");
        }
        // Añadi datos de marco ordenador
        $data['marcoOrdenador'] = json_encode([
            'codigo'  => 'MDEA',
            'numeral' => $data['numeral'],
        ]);
        return DataParser::parseQueryResult($data, $model->getFieldsDef());
    }
    public function eliminarEstadistica(int $id)
    {
        $this->wpdb->update($this->dbMap->estadistica, ['eliminado' => true], ['estadistica_id' => $id]);
    }

    private function registrarClasificadores(int $estadisticaId, int $marcoOrdenadorId, ?string $fullNumeralPath)
    {
        if (!$fullNumeralPath) {
            return;
        }
        $numeralPath = explode('-', $fullNumeralPath)[0];
        $numeralPath = trim($numeralPath);
        if ($marcoOrdenadorId === Constantes::MARCO_ORDENADOR_PNA_ID) {
            $numeralPath = str_replace(Constantes::PREFIJO_CODIGO_OBJETIVO_POLITICO, '', $numeralPath);
            $numeralPath = str_replace(Constantes::PREFIJO_CODIGO_LINEAMIENTO, '', $numeralPath);
            $numeralPath = str_replace(Constantes::PREFIJO_CODIGO_SERVICIO, '', $numeralPath);
        }
        $numeralParts = explode('.', $numeralPath);
        $partsStack = [];
        $clasificadores = [];
        $ultimoClasificadorId = 0;
        foreach ($numeralParts as $index => $part) {
            $partsStack[] = $part;
            $numeral = implode(".", $partsStack);
            if ($marcoOrdenadorId === Constantes::MARCO_ORDENADOR_PNA_ID) {
                $numeral = $this->getCodigoClasificadorPna($index + 1, $numeral);
            }
            $clasificadorId = $this->getClasisificadorId($marcoOrdenadorId, $numeral);
            if (!$clasificadorId) {
                throw new \Exception("Clasficador no entrado para el númeral  $fullNumeralPath en el marco ordenador de ID: $marcoOrdenadorId");
            }
            $clasificadores["clasificador_n" . ($index + 1) . "_id"] = $clasificadorId;
            $ultimoClasificadorId = $clasificadorId;
        }
        if ($ultimoClasificadorId) {
            $clasificadores['clasificador_id'] = $ultimoClasificadorId;
        }
        $success = $this->insertClasificador($estadisticaId, $clasificadores);
        if (!$success) {
            throw new \Exception("No se pudo registrar la relación con los clasificadores");
        }
    }
    private function getCodigoClasificadorPna(int $nivel, string $numeralBase)
    {
        switch ($nivel) {
            case 1:
                return Constantes::PREFIJO_CODIGO_OBJETIVO_POLITICO . $numeralBase;
            case 2:
                return Constantes::PREFIJO_CODIGO_LINEAMIENTO . $numeralBase;
            case 3:
                return Constantes::PREFIJO_CODIGO_SERVICIO . $numeralBase;
            default:
                throw new \Exception("No existe un prfijo de código de clasificador PNA para el nivel: $nivel");
        }
    }

    private function insertClasificador(int $estadisticaId, array $clasificadores)
    {
        $data = ['estadistica_id' => $estadisticaId, ...$clasificadores];
        return $this->wpdb->insert($this->dbMap->estaClas, $data);
    }
    private function getClasisificadorId(int $marcoOrdenadorId, $numeral)
    {
        $sql = "SELECT clasificador_id FROM {$this->dbMap->clasificador}
        WHERE marco_ordenador_id =  $marcoOrdenadorId && numeral = '$numeral'";
        return $this->wpdb->get_var($sql);
    }
}
