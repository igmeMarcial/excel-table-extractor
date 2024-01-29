<?php

namespace Aesa\Rest\Services;

class ArchivoService
{
    private string $filesDir;
    private string $deletedFilePrefix;
    private string $hashAlgorithm;
    public function __construct(string $filesDir, string $hashAlgorithm = 'md5', string $deletedFilePrefix = '_x_')
    {
        $this->filesDir = $filesDir;
        $this->hashAlgorithm = $hashAlgorithm;
        $this->deletedFilePrefix = $deletedFilePrefix;
    }
    public function listar()
    {
        $filesDir = $this->filesDir;
        $listaArchivos = scandir($filesDir);

        // Eliminar los archivos . y .. del array
        $listaArchivos = array_slice($listaArchivos, 2);

        // Filtrar los archivos eliminados
        $listaArchivos = array_filter($listaArchivos, function ($nombreArchivo) {
            return strpos($nombreArchivo, $this->deletedFilePrefix) !== 0;
        });
        $listaArchivos = array_values($listaArchivos);

        // Obtener información de cada archivo
        $listaArchivos = array_map(function ($nombreArchivo) use ($filesDir) {
            $path = $filesDir . '/' . $nombreArchivo;
            $fileInfo = stat($path);
            return (object) [
                'hash'     => hash($this->hashAlgorithm, $nombreArchivo),
                'name'     => $nombreArchivo,
                'size'     => $fileInfo['size'],
                'modified' => $fileInfo['mtime'],
            ];
        }, $listaArchivos);

        return $listaArchivos;
    }

    public function eliminarArchivo($hash): bool
    {
        $archivo = $this->getArchivoInfoByHash($hash);
        // Renombrar el archivo añadiendo _x_ al principio para simbolizar que está eliminado
        return rename(
            $this->filesDir . '/' . $archivo->name,
            $this->filesDir . '/' . $this->deletedFilePrefix . $archivo->name
        );
    }
    public function getArchivoInfoByHash($hash): object
    {
        $archivos = $this->listar();
        $archivo = array_filter($archivos, function ($archivo) use ($hash) {
            return $archivo->hash === $hash;
        });
        return array_shift($archivo);
    }
    public function getArchivoFullInfoByHash($hash): object
    {
        $archivo = $this->getArchivoInfoByHash($hash);
        $archivo->path = $this->filesDir . '/' . $archivo->name;
        return $archivo;
    }
    public function guardarArchivo($file): bool
    {
        $rutaArchivo = $this->filesDir . '/' . $file['name'];
        return move_uploaded_file($file['tmp_name'],  $rutaArchivo);
    }
}
