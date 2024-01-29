<?php

namespace Aesa\Rest\Services;

use Psr\Container\ContainerInterface;
use PhpOffice\PhpWord\TemplateProcessor;
use PhpOffice\PhpWord\Element\Chart;
use PhpOffice\PhpWord\Shared\Converter;

class AnuarioService  extends ArchivoService
{

    private MdeaService $mdeaService;
    private EstadisticaService $estadisticaService;
    public function __construct(
        ContainerInterface $container,
        string $filesDir,
        string $hashAlgorithm = 'md5',
        string $deletedFilePrefix = '_x_'
    ) {
        $this->mdeaService = $container->get(MdeaService::class);
        $this->estadisticaService = $container->get(EstadisticaService::class);
        parent::__construct($filesDir, $hashAlgorithm, $deletedFilePrefix);
    }
    public function generarAnuario()
    {
        $templateFilePath = AESA_PLUGIN_DIR . "/uploads/plantillas/PlantillaAnuario_003.docx";
        $targetFilePath = AESA_PLUGIN_DIR . "/uploads/anuarios/Anuario-2024_" . date('mdHi') . ".docx";
        $componentes = $this->mdeaService->getListaComponentes();
        $estadisticas = $this->estadisticaService->getListaEstadisticas();
        $estadisticas = array_map(function ($estadistica) {
            return [
                'nombre'  => $estadistica['nombre'],
                //'grafico' => $this->getChart(),
            ];
        }, $estadisticas);
        $templateProcessor = new TemplateProcessor($templateFilePath);

        $templateProcessor->setValue('year', '2024');

        // Test iterations
        $templateProcessor->cloneBlock('componente', null, true, false, $componentes);
        $templateProcessor->cloneBlock('estadistica', null, true, false, $estadisticas);
        $templateProcessor->setChart('grafico', $this->getChart());

        $templateProcessor->saveAs($targetFilePath);
    }
    public function savePwpWodFiles($phpWord, $filename)
    {
        $targetFile = AESA_PLUGIN_DIR . "/uploads/anuarios/{$filename}";
        $phpWord->save($targetFile . '.docx', 'Word2007');
        //$phpWord->save($targetFile . '.pdf', 'PDF');
    }
    public function saveFromTemplate($templateProcessor, $targetPath)
    {
        $templateProcessor->saveAs($targetPath);
    }
    public function getChart()
    {
        $categories = array('A', 'B', 'C', 'D', 'E');
        $series = array(1, 3, 2, 5, 4);
        $chart = new Chart('line', $categories, $series);
        $chart->getStyle()->setWidth(Converter::inchToEmu(2.5))->setHeight(Converter::inchToEmu(2));
        $chart->getStyle()->setShowGridX(true);
        $chart->getStyle()->setShowGridY(true);
        $chart->getStyle()->setShowAxisLabels(true);
        $chart->getStyle()->setShowLegend(true);
        $chart->getStyle()->setLegendPosition('t');
        return $chart;
    }
}
