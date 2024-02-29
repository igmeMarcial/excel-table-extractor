<?php

namespace Aesa\Core;

class ModelMapper
{
    public static function map($data, string $modelClass)
    {
        $result = [];
        $classInstance = new $modelClass();
        foreach ($classInstance::$fields as $field => $fieldDef) {
            if (isset($data[$field])) {
                $result[$field] = $data[$field];
            }
        }
        $classInstance->setData($result);
        return $classInstance;
    }
}
