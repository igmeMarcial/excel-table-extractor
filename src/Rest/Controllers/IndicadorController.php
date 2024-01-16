<?php

namespace Aesa\Rest\Controllers;

class IndicadorController
{
    public static function listIndicadores()
    {
        return [
            ['id' => 1, 'name'=> 'Indicador 1'],
            ['id' => 2, 'name'=> 'Indicador 2'],
            ['id' => 3, 'name'=> 'Indicador 3'],
        ];
    }
    // Agregar otras funciones aquí
}
