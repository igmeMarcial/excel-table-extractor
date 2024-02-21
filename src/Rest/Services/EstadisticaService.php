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
                  A.estadistica_id id,
                  A.nombre,
                  B.mdea_componente_id medeaComponenteId,
                  B.nombre mdeaComponenteNombre,
                  A.fecha_mod fechaMod
                FROM {$this->dbMap->estadistica} A
                INNER JOIN {$this->dbMap->mdeaComponente} B ON A.mdea_componente_id = B.mdea_componente_id";
        return $this->wpdb->get_results($sql, ARRAY_A);
    }
    public function getEstadistica($id)
    {
        $sql = "SELECT * FROM {$this->dbMap->estadistica} WHERE estadistica_id = $id";
        return $this->wpdb->get_row($sql);
    }
}
