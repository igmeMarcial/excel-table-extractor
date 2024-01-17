<?php

namespace Aesa\Rest\Controllers;

class IndicadorController
{
    public function listIndicadores()
    {
        global $wpdb;
        $tabla_nombre = AESA_PREFIX . '_indicador';
        $tabla_nombre_componente = AESA_PREFIX . '_componente';

        $resultados = $wpdb->get_results("SELECT INDI.id, INDI.id_componente idComponente, INDI.nombre, COMP.nombre componenteNombre FROM $tabla_nombre INDI LEFT JOIN $tabla_nombre_componente COMP ON INDI.id_componente = COMP.id", ARRAY_A);

        // Return the array of objects
        return [
            'data' => $resultados,
            'total' => count($resultados)
        ];
    }
}
