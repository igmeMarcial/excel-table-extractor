<?php

namespace Aesa\Db;

class DbMap
{
    private string $prefix;
    public string $clasificador;
    public string $estadistica;
    public string $estaClasN1;
    public string $estaClasN2;
    public string $estaClasN3;

    /**
     * DbMap constructor.
     * @param string $prefix Prefix for tables
     */
    public function __construct($prefix)
    {
        $this->setupTablePrefix($prefix);
        $this->setupTableNames();
    }

    private function setupTablePrefix($prefix): void
    {
        global $wpdb;
        $this->prefix = $wpdb->prefix . $prefix;
    }
    private function setupTableNames(): void
    {
        $this->clasificador = $this->prefix . 'clasificador';
        $this->estadistica         = $this->prefix . 'estadistica';
        $this->estaClasN1          = $this->prefix . 'esta_clas_n1';
        $this->estaClasN2          = $this->prefix . 'esta_clas_n2';
        $this->estaClasN3          = $this->prefix . 'esta_clas_n3';
    }
}
