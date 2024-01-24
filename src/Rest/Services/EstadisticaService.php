<?php

namespace Aesa\Rest\Services;

use Aesa\Db\DbMap;

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
    public function registrarEstadistica($data)
    {
        $currentUserId = get_current_user_id();
        $data['usuario_reg_id'] = $currentUserId;
        $data['usuario_mod_id'] = $currentUserId;
        $this->wpdb->insert($this->dbMap->estadistica, $data);
    }
    public function getListaEstadisticas()
    {
        $sql = "SELECT
                  estadistica_id id,
                  nombre
                FROM {$this->dbMap->estadistica}";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    public function getEstadistica($id)
    {
        $sql = "SELECT * FROM {$this->dbMap->estadistica} WHERE estadistica_id = $id";
        return $this->wpdb->get_results($sql);
    }
}
