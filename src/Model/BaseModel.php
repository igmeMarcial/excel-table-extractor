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
            // By default, we persist the field
            $persist = $fieldDef['persist'] ?? true;
            // Persist is false, so we don't include this field in the query
            if (!$persist) {
                continue;
            }
            $column = $fieldDef['column'] ?? $fieldName;
            $value = $data[$fieldName];
            if ($fieldDef['type'] === DataTypes::ARRAY) {
                $value = json_encode($value);
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

    public function getSqlColumnNamesString($tableAlias = ''): string
    {
        $persistedFields = $this->getPersistedFields();
        $columns = array_map(function ($fieldName, $fieldDef) use ($tableAlias) {
            $column = $fieldDef['column'] ?? $fieldName;
            // If the column name is the same as the field name, we don't need to alias it
            if ($column === $fieldName) {
                return "$tableAlias . $column";
            }
            return "$tableAlias.$column AS $fieldName";
        }, array_keys($persistedFields), $persistedFields);

        return implode(', ', $columns);
    }

    private function getPersistedFields(): array
    {
        $out = [];
        foreach ($this->fields as $fieldName => $fieldDef) {
            $persist = $fieldDef['persist'] ?? true;
            if ($persist) {
                $out[$fieldName] = $fieldDef;
            }
        }
        return $out;
    }
}
