<?php

namespace Aesa\Model;

use Aesa\Core\DataTypes;

class Clasificador extends BaseModel
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
            'default' => true,
        ],
        'vigente' => [
            'type' => DataTypes::BOOLEAN,
            'default' => true,
        ],
        'eliminado' => [
            'type' => DataTypes::BOOLEAN,
            'default' => false,
        ],
        'marcoOrdenadorId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'marco_ordenador_id',
        ],
        'nivel' => [
            'type' => DataTypes::STRING,
            'column' => 'nivel',
        ],
        'numeral' => [
            'type' => DataTypes::STRING,
            'length' => 11,
            'column' => 'numeral',
            'comment' => 'Máx 99.99.99.99(11 caracteres)',
        ],
        'nombre' => [
            'type' => DataTypes::STRING,
            'length' => 1000,
            'column' => 'nombre',
        ],
    ];
}