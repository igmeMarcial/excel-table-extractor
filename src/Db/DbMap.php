<?php

namespace Aesa\Db;

class DbMap
{
    private string $prefix;
    public string $mdeaComponente;
    public string $mdeaSubcomponente;
    public string $mdeaTemaEstadistico;
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
        $this->mdeaComponente      = $this->prefix . 'mdea_componente';
        $this->mdeaSubcomponente   = $this->prefix . 'mdea_subcomponente';
        $this->mdeaTemaEstadistico = $this->prefix . 'mdea_tema_estadistico';
        $this->estadistica         = $this->prefix . 'estadistica';
    }
}
