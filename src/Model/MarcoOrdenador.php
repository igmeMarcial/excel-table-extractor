<?php

namespace Aesa\Model;

use Aesa\Core\DataTypes;

class MarcoOrdenador extends BaseModel
{
    protected $fields = [
        'id' => [
            'type' => DataTypes::INTEGER,
            'column' => 'clasificador_id',
        ],
        'usuarioRegId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'usuario_reg_id',
        ],
        'usuarioModId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'usuario_mod_id',
        ],
        'fechaReg' => [
            'type' => DataTypes::INTEGER,
            'column' => 'fecha_reg',
        ],
        'fechaMod' => [
            'type' => DataTypes::INTEGER,
            'column' => 'fecha_mod',
        ],
        'activo' => [
            'type' => DataTypes::BOOLEAN,
        ],
        'sigla' => [
            'type' => DataTypes::STRING,
        ],
        'nombre' => [
            'type' => DataTypes::STRING,
        ],
    ];
}
