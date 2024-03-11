<?php

namespace Aesa\Rest\Services;

use Aesa\Db\DbMap;

class MdeaService
{
    private DbMap $dbMap;
    private \wpdb $wpdb;
    public function __construct(DbMap $dbMap)
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->dbMap = $dbMap;
    }
    public function getListaComponentes()
    {
        $sql = "SELECT
                  mdea_componente_id id,
                  nombre
                FROM {$this->dbMap->clasificador}";
        $out = $this->wpdb->get_results($sql, ARRAY_A);
        $out = array_map(function ($item) {
            $item['id'] = (int) $item['id'];
            return $item;
        }, $out);
        return $out;
    }
    public function getListaSubcomponentes()
    {
        $sql = "SELECT
                  mdea_subcomponente_id id,
                  mdea_componente_id componenteId,
                  nombre
                FROM {$this->dbMap->clasificador}";
        $out = $this->wpdb->get_results($sql, ARRAY_A);
        $out = array_map(function ($item) {
            $item['id'] = (int) $item['id'];
            $item['componenteId'] = (int) $item['componenteId'];
            return $item;
        }, $out);
        return $out;
    }
    public function getListaTemasEstadisticos()
    {
        $sql = "SELECT
                  mdea_tema_estadistico_id id,
                  mdea_subcomponente_id subcomponenteId,
                  nombre
                FROM {$this->dbMap->clasificador}";
        $out = $this->wpdb->get_results($sql, ARRAY_A);
        $out = array_map(function ($item) {
            $item['id'] = (int) $item['id'];
            $item['subcomponenteId'] = (int) $item['subcomponenteId'];
            return $item;
        }, $out);
        return $out;
    }
    public function getIndiceEstadisticas()
    {
        $clasificadores = $this->getListaClasificadores();
        $estadisticas = $this->getListaEstadisticas();
        $out = [];
        foreach ($clasificadores as $clasificador) {
            $item = [
                'numeral'        => $clasificador['numeral'],
                'nombre'         => $clasificador['nombre'],
            ];
            $clasificaorEstadisticas = array_filter($estadisticas, function ($estadistica) use ($clasificador) {
                return $estadistica['clasificadorId'] === $clasificador['clasificadorId'];
            });
            $clasificaorEstadisticas = array_map(function ($estadistica, $index) use ($clasificador) {
                return [
                    'numeral'        => $clasificador['numeral'] . '.' . ($index + 1),
                    'nombre'         => $estadistica['nombre'],
                    'estadisticaId'  => (int) $estadistica['estadisticaId'],
                    'clasificadorId' => (int) $estadistica['clasificadorId'],
                ];
            }, $clasificaorEstadisticas, array_keys(array_values($clasificaorEstadisticas)));
            array_push($out, $item);
            // Añadir estadisticas
            array_push($out, ...$clasificaorEstadisticas);
        }
        return $out;
    }
    public function getIndiceClasificadores()
    {
        $clasificadores = $this->getListaClasificadores();
        return array_map(function ($clasificador) {
            return [
                'id'      => (int) $clasificador['clasificadorId'],
                'numeral' => $clasificador['numeral'],
                'nombre'  => $clasificador['nombre'],
            ];
        }, $clasificadores);
    }
    private function getListaEstadisticas()
    {
        $query = "SELECT
                    estadistica_id estadisticaId,
                    clasificador_id clasificadorId,
                    nombre
                  FROM {$this->dbMap->estadistica}";
        return $this->wpdb->get_results($query, ARRAY_A);
    }
    private function getListaClasificadores()
    {
        $query = "SELECT
                    clasificador_id clasificadorId,
                    numeral,
                    nombre
                  FROM {$this->dbMap->clasificador}";
        return $this->wpdb->get_results($query, ARRAY_A);
    }
}
