<?php

require_once "library/pChart2.1.4/class/pDraw.class.php";
require_once "library/pChart2.1.4/class/pImage.class.php";
require_once "library/pChart2.1.4/class/pData.class.php";

class Pchart
{
    protected $registry;

    public function __construct($registry)
    {
        $this->registry = $registry;
    }

    public function render($product_id)
    {
        /* Create and populate the pData object */
        $MyData = new pData();

        $loader = new Loader($this->registry);

        $result = $loader->model('site', 'getPrices', array($product_id));
        foreach ($result as $value){
            $MyData->addPoints($value['price'], "Price");
            $MyData->addPoints($value['date'], "Labels");
        }
        $MyData->setAbscissa("Labels");

        $MyData->setAxisName(0, "Price");
        $MyData->setAbscissaName("Date");
        /* Create the pChart object */
        $myPicture = new pImage(700, 230, $MyData);
        /* Turn of Antialiasing */
        $myPicture->Antialias = FALSE;
        /* Add a border to the picture */
        $myPicture->drawRectangle(0, 0, 699, 229, array("R" => 0, "G" => 0, "B" => 0));

        /* Write the chart title */
        $myPicture->setFontProperties(array("FontName" => "library/pChart2.1.4/fonts/Forgotte.ttf", "FontSize" => 11));
        $myPicture->drawText(150, 35, "Prices", array("FontSize" => 20, "Align" => TEXT_ALIGN_BOTTOMMIDDLE));
        /* Set the default font */
        $myPicture->setFontProperties(array("FontName" => "library/pChart2.1.4/fonts/pf_arma_five.ttf", "FontSize" => 6));
        /* Define the chart area */
        $myPicture->setGraphArea(60, 40, 650, 200);
        /* Draw the scale */
        $scaleSettings = array("XMargin" => 10, "YMargin" => 10, "Floating" => TRUE, "GridR" => 200, "GridG" => 200, "GridB" => 200, "DrawSubTicks" => TRUE, "CycleBackground" => TRUE);
        $myPicture->drawScale($scaleSettings);
        /* Turn on Antialiasing */
        $myPicture->Antialias = TRUE;
        /* Draw the line of best fit */
//$myPicture->drawThreshold($MyData->getSerieMedian("Probe 1"), array("WriteCaption" => TRUE, "Caption" => "Median value"));
        /* Turn on shadows */
        $myPicture->setShadow(TRUE, array("X" => 1, "Y" => 1, "R" => 0, "G" => 0, "B" => 0, "Alpha" => 10));
        /* Draw the line chart */
        $myPicture->drawPlotChart();
        /* Write the chart legend */
        $myPicture->drawLegend(580, 20, array("Style" => LEGEND_NOBORDER, "Mode" => LEGEND_HORIZONTAL));
        /* Render the picture (choose the best way) */
        $myPicture->render(DIR_APPLICATION . 'view/tpl/oubput.png');
    }
}