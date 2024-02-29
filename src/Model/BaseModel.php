<?php

namespace Aesa\Model;

use Aesa\Core\DataTypes;

abstract class BaseModel
{
    protected $idFieldName = 'id';
    protected $usuarioRegIdFieldName = 'usuarioRegId';
    protected $usuarioModIdFieldName = 'usuarioModId';
    protected $fechaRegFieldName = 'fechaReg';
    protected $fechaModFieldName = 'fechaMod';
    protected $fields = [];
    private $data = [];

    public function __construct(array $data)
    {
        $this->setData($data);
    }
    public function getFieldsDef(): array
    {
        return $this->fields;
    }
    public function setFieldValue($fieldName, $value)
    {
        if (!array_key_exists($fieldName, $this->fields)) {
            throw new \InvalidArgumentException("Field '$fieldName' does not exist.");
        }
        $this->data[$fieldName] = $value;
    }
    public function setId($id)
    {
        $this->setFieldValue($this->idFieldName, $id);
    }
    public function getId()
    {
        return $this->getFieldValue($this->idFieldName);
    }
    public function getPrimaryKeyColumn(): string
    {
        return $this->fields[$this->idFieldName]['column'] ?? $this->idFieldName;
    }
    public function setUsuarioRegId($id)
    {
        $this->setFieldValue($this->usuarioRegIdFieldName, $id);
    }
    public function setUsuarioModId($id)
    {
        $this->setFieldValue($this->usuarioModIdFieldName, $id);
    }
    public function setFechaReg($fecha)
    {
        $this->setFieldValue($this->fechaRegFieldName, $fecha);
    }
    public function setFechaMod($fecha)
    {
        $this->setFieldValue($this->fechaModFieldName, $fecha);
    }
    public function getFieldValue($fieldName)
    {
        return $this->data[$fieldName];
    }
    public function getData(): array
    {
        return $this->data;
    }
    public function getDataForDbQuery(): array
    {
        $out = [];
        $data = $this->data;
        foreach ($this->fields as $fieldName => $fieldDef) {
            if (!array_key_exists($fieldName, $data)) {
                continue;
            }
            $column = $fieldDef['column'] ?? $fieldName;
            $value = $data[$fieldName];
            if ($fieldDef['type'] === DataTypes::ARRAY) {
                $out[$column] = json_encode($value);
                continue;
            }
            $out[$column] = $value;
        }
        return $out;
    }
    public function setData(array $data): void
    {
        foreach ($this->fields as $fieldName => $fieldDef) {
            $defaultValue = $fieldDef['default'] ?? null;
            if (!array_key_exists($fieldName, $data)) {
                $this->data[$fieldName] = $defaultValue;
                continue;
            }
            $value = $data[$fieldName];
            $providedType = gettype($value);
            $expectedType = $fieldDef['type'];
            if (!is_null($value) && $providedType !== $expectedType) {
                throw new \InvalidArgumentException(
                    "Invalid type provided for field '$fieldName'. Expected '$expectedType', got '$providedType'."
                );
            }
            $this->data[$fieldName] = $value;
        }
    }

    public function getSqlColumnNamesString(): string
    {
        $columns = array_map(function ($fieldName, $fieldDef) {
            $column = $fieldDef['column'] ?? $fieldName;
            if ($column === $fieldName) {
                return $column;
            }
            return "$column AS $fieldName";
        }, array_keys($this->fields), $this->fields);

        return implode(', ', $columns);
    }
}
