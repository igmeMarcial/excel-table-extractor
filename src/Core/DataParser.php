<?php

namespace Aesa\Core;

class DataParser
{
    public static function parseQueryResult($data, array $fields)
    {
        $out = [];
        foreach ($fields as $fieldName => $fieldDef) {
            if (!array_key_exists($fieldName, $data)) {
                continue;
            }
            $value = $data[$fieldName];
            switch ($fieldDef['type']) {
                case DataTypes::INTEGER:
                    $out[$fieldName] = (int) $value;
                    break;
                case DataTypes::STRING:
                    $out[$fieldName] = (string) $value;
                    break;
                case DataTypes::BOOLEAN:
                    $out[$fieldName] = (bool) $value;
                    break;
                case DataTypes::DOUBLE:
                    $out[$fieldName] = (float) $value;
                    break;
                case DataTypes::ARRAY:
                    $out[$fieldName] = json_decode($value, true);
                    break;
                case DataTypes::OBJECT:
                    $out[$fieldName] = (object) $value;
                    break;
                default:
                    throw new \InvalidArgumentException(
                        "Invalid data type '{$fieldDef['type']}' for field '$fieldName'."
                    );
            }
        }
        return $out;
    }
    public static function parseQueryRowsResult(array $rows, array $fields)
    {
        return array_map(function ($row) use ($fields) {
            return self::parseQueryResult($row, $fields);
        }, $rows);
    }
}
