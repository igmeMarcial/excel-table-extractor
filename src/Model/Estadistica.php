<?php

namespace Aesa\Model;

use Aesa\Core\DataTypes;
class Estadistica extends BaseModel
{
    protected $fields = [
        'id' => [
            'type' => DataTypes::INTEGER,
            'column' => 'estadistica_id',
        ],
        'componenteId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'mdea_componente_id',
        ],
        'subcomponenteId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'mdea_subcomponente_id',
        ],
        'temaEstadisticoId' => [
            'type' => DataTypes::INTEGER,
            'column' => 'mdea_tema_estadistico_id',
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
        'archivado' => [
            'type' => DataTypes::BOOLEAN,
            'default' => false,
        ],
        'eliminado' => [
            'type' => DataTypes::BOOLEAN,
            'default' => false,
        ],
        'nombre' => [
            'type' => DataTypes::STRING,
            'required' => true,
        ],
        'finalidad' => [
            'type' => DataTypes::STRING,
        ],
        'descripcion' => [
            'type' => DataTypes::STRING,
        ],
        'unidadMedida' => [
            'type' => DataTypes::STRING,
            'column' => 'unidad_medida',
        ],
        'formulaCalculo' => [
            'type' => DataTypes::STRING,
            'column' => 'formula_calculo',
        ],
        'metodologiaCalculo' => [
            'type' => DataTypes::STRING,
            'column' => 'metodologia_calculo',
        ],
        'fuente' => [
            'type' => DataTypes::STRING,
        ],
        'unidadOrganicaGeneradora' => [
            'type' => DataTypes::STRING,
            'column' => 'unidad_organica_generadora',
        ],
        'url' => [
            'type' => DataTypes::STRING,
        ],
        'periodicidadGeneracion' => [
            'type' => DataTypes::STRING,
            'column' => 'periodicidad_generacion',
        ],
        'periodicidadEntrega' => [
            'type' => DataTypes::STRING,
            'column' => 'periodicidad_entrega',
        ],
        'periodoSerieTiempo' => [
            'type' => DataTypes::STRING,
            'column' => 'periodo_serie_tiempo',
        ],
        'ambitoGeografico' => [
            'type' => DataTypes::STRING,
            'column' => 'ambito_geografico',
        ],
        'limitaciones' => [
            'type' => DataTypes::STRING,
        ],
        'relacionObjetivosNacionales' => [
            'type' => DataTypes::STRING,
            'column' => 'relacion_objetivos_nacionales',
        ],
        'relacionIniciativasInternacionales' => [
            'type' => DataTypes::STRING,
            'column' => 'relacion_iniciativas_internacionales',
        ],
        'correoElectronico' => [
            'type' => DataTypes::STRING,
            'column' => 'correo_electronico',
        ],
        'datosContacto' => [
            'type' => DataTypes::STRING,
            'column' => 'datos_contacto',
        ],
        'telefonoCelular' => [
            'type' => DataTypes::STRING,
            'column' => 'telefono_celular',
        ],
        'datos' => [
            'type' => DataTypes::ARRAY,
        ],
        'datosInformacion' => [
            'type' => DataTypes::ARRAY,
            'column' => 'datos_informacion',
        ],
        'parametrosPublicacion' => [
            'type' => DataTypes::ARRAY,
            'column' => 'parametros_publicacion',
        ],
    ];
}
