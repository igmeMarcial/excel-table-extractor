<?php

namespace Aesa\Rest\Services;

use Aesa\Core\Constantes;
use Aesa\Db\DbMap;
use Clasificador;

class IndiceService
{
    private DbMap $dbMap;
    private \wpdb $wpdb;
    public function __construct(DbMap $dbMap)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->dbMap = $dbMap;
    }

    public function getIndiceEstadisticasMdea()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_MDEA_ID);
        $estadisticas = $this->getListaEstadisticas();
        return $this->formatIndiceEstadisticas($clasificadores, $estadisticas);
    }
    public function getIndiceEstadisticasOds()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_ODS_ID);
        $estadisticas = $this->getListaEstadisticas();
        return $this->formatIndiceEstadisticas($clasificadores, $estadisticas);
    }
    public function getIndiceEstadisticasOcde()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_OCDE_ID);
        $estadisticas = $this->getListaEstadisticas();
        return $this->formatIndiceEstadisticas($clasificadores, $estadisticas);
    }
    public function getIndiceEstadisticasPna()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_PNA_ID);
        $estadisticas = $this->getListaEstadisticas();
        return $this->formatIndiceEstadisticas($clasificadores, $estadisticas);
    }
    public function getIndiceMdea()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_MDEA_ID);
        return $this->formatIndice($clasificadores);
    }

    public function getIndiceOds()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_ODS_ID);
        return $this->formatIndice($clasificadores);
    }

    public function getIndiceOcde()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_OCDE_ID);
        return $this->formatIndice($clasificadores);
    }

    public function getIndicePna()
    {
        $clasificadores = $this->getListaClasificadores(Constantes::MARCO_ORDENADOR_PNA_ID);
        return $this->formatIndice($clasificadores);
    }

    private function getListaEstadisticas()
    {
        $query = "SELECT
                    A.estadistica_id estadisticaId,
                    B.clasificador_id clasificadorId,
                    nombre
                  FROM {$this->dbMap->estadistica} A INNER JOIN {$this->dbMap->estaClas} B ON A.estadistica_id = B.estadistica_id";
        return $this->wpdb->get_results($query, ARRAY_A);
    }

    private function formatIndice($records)
    {
        return array_map(function ($record) {
            return [
                'id'      => (int) $record['clasificadorId'],
                'numeral' => $record['numeral'],
                'nombre'  => $record['nombre'],
            ];
        }, $records);
    }
    private function formatIndiceEstadisticas($clasificadores, $estadisticas)
    {
        $out = [];
        foreach ($clasificadores as $clasificador) {
            $item = [
                'numeral'        => $clasificador['numeral'],
                'nombre'         => $clasificador['nombre'],
            ];
            $clasificadorEstadisticas = array_filter($estadisticas, function ($estadistica) use ($clasificador) {
                return $estadistica['clasificadorId'] === $clasificador['clasificadorId'];
            });
            $clasificadorEstadisticas = array_map(function ($estadistica, $index) use ($clasificador) {
                return [
                    'numeral'        => $clasificador['numeral'] . '.' . ($index + 1),
                    'nombre'         => $estadistica['nombre'],
                    'estadisticaId'  => (int) $estadistica['estadisticaId'],
                    'clasificadorId' => (int) $estadistica['clasificadorId'],
                ];
            }, $clasificadorEstadisticas, array_keys(array_values($clasificadorEstadisticas)));
            array_push($out, $item);
            // Añadir estadisticas
            array_push($out, ...$clasificadorEstadisticas);
        }
        return $out;
    }
    private function getListaClasificadores(int $marcoOrdenadorId)
    {
        $query = "SELECT
                    clasificador_id clasificadorId,
                    numeral,
                    nombre
                  FROM {$this->dbMap->clasificador}
                  WHERE marco_ordenador_id = $marcoOrdenadorId";
        return $this->wpdb->get_results($query, ARRAY_A);
    }
    public function actualizarIndice(array $data, int $id){
       $model  = new Clasificador($data);
       $model->setId($id);
       $this->wpdb->update($this->dbMap->clasificador, $model->getDataForDbQuery(),["clasificador_id"=> $id]);

    }
      public function crearIndice(array $data)
    {
        $model = new Clasificador($data);
        $this->wpdb->insert(
            $this->dbMap->clasificador,
            $model->getDataForDbQuery()
        );
    }
}