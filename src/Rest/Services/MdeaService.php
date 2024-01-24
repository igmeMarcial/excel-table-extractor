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
                FROM {$this->dbMap->mdeaComponente}";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    public function getListaSubcomponentes()
    {
        $sql = "SELECT
                  mdea_subcomponente_id id,
                  mdea_componente_id componenteId,
                  nombre
                FROM {$this->dbMap->mdeaSubcomponente}";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    public function getListaTemasEstadisticos()
    {
        $sql = "SELECT
                  mdea_tema_estadistico_id id,
                  mdea_subcomponente_id subcomponenteId,
                  nombre
                FROM {$this->dbMap->mdeaTemaEstadistico}";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
}
