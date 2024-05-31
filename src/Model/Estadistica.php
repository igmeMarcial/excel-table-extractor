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
        'clasificadorN1Id' => [
            'type' => DataTypes::INTEGER,
            'persist' => false,
        ],
        'clasificadorN2Id' => [
            'type' => DataTypes::INTEGER,
            'persist' => false,
        ],
        'clasificadorN3Id' => [
            'type' => DataTypes::INTEGER,
            'persist' => false,
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
        'clasificacionMdea' => [
            'type' => DataTypes::STRING,
            'column' => 'clasificacion_mdea',
        ],
        'clasificacionOds' => [
            'type' => DataTypes::STRING,
            'column' => 'clasificacion_ods',
        ],
        'clasificacionOcde' => [
            'type' => DataTypes::STRING,
            'column' => 'clasificacion_ocde',
        ],
        'clasificacionPna' => [
            'type' => DataTypes::STRING,
            'column' => 'clasificacion_pna',
        ],
        'datos' => [
            'type' => DataTypes::ARRAY,
        ],
        'datosInformacion' => [
            'type' => DataTypes::ARRAY,
            'column' => 'datos_informacion',
        ],
        'graficos' => [
            'type' => DataTypes::ARRAY,
        ],
        'presentacionTablaFormato' => [
            'type' => DataTypes::ARRAY,
            'column' => 'pres_tabla_formato',
        ],
        'marcoOrdenador' => [
            'type' => DataTypes::ARRAY,
            'persist' => false,
        ],
        'presentacionTablaTitulo' => [
            'type' => DataTypes::STRING,
            'column' => 'pres_tabla_titulo',
        ],
        'presentacionTablaSubtitulo' => [
            'type' => DataTypes::STRING,
            'column' => 'pres_tabla_subtitulo',
        ],
        'presentacionTablaNota' => [
            'type' => DataTypes::STRING,
            'column' => 'pres_tabla_nota',
        ],
        'presentacionTablaFuente' => [
            'type' => DataTypes::STRING,
            'column' => 'pres_tabla_fuente',
        ],
        'presentacionTablaElaboracion' => [
            'type' => DataTypes::STRING,
            'column' => 'pres_tabla_elaboracion',
        ],
        'mdeaComponenteNombre' => [
            'type' => DataTypes::STRING,
            'persist' => false,
        ],
    ];

    // Getters
    public function getClasificadorN1Id(): int
    {
        return $this->getFieldValue('clasificadorN1Id');
    }

    public function getClasificadorN2Id(): int
    {
        return $this->getFieldValue('clasificadorN2Id');
    }

    public function getClasificadorN3Id(): int
    {
        return $this->getFieldValue('clasificadorN3Id');
    }

    public function getClasificacionMdea(): string
    {
        return $this->getFieldValue('clasificacionMdea');
    }

    public function getClasificacionOds(): ?string
    {
        return $this->getFieldValue('clasificacionOds');
    }

    public function getClasificacionOcde(): ?string
    {
        return $this->getFieldValue('clasificacionOcde');
    }

    public function getClasificacionPna(): ?string
    {
        return $this->getFieldValue('clasificacionPna');
    }
}