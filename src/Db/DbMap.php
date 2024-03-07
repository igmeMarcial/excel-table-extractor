<?php

namespace Aesa\Db;

class DbMap
{
    private string $prefix;
    public string $clasificador;
    public string $estadistica;

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
    }
}
