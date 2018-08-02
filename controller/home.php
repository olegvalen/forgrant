<?php

class ControllerHome extends Controller
{
    public function index()
    {
        $data = array();
        $loader = new Loader($this->registry);
        $result = $loader->model('site', 'getProducts', func_get_args());
        foreach ($result as $product) {
            $data['products'][] = array(
                'id' => $product['id'],
                'name' => $product['name'],
            );
        }
//            'date' => date('d.m.Y', strtotime($result['date']))

        $loader->view('index', $data);
    }

    public function edit()
    {
        $loader = new Loader($this->registry);

        $data['name'] = '';
        $data['product_id'] = func_get_args()[0];

        //price
        $result = $loader->model('site', 'getPrices', func_get_args());
        if ($result) {
            $data['name'] = $result[0]['name'];
        }
        if (count($result) >= 1 && $result[0]['price'] != null) {
            foreach ($result as $price) {
                $data['prices'][] = array(
                    'id' => $price['id'],
                    'date' => date('d.m.Y', strtotime($price['date'])),
                    'price' => $price['price'],
                );
            }
        }

        //price_priority
        $result = $loader->model('site', 'getPricesPriority', func_get_args());
        if (count($result) >= 1 && $result[0]['price'] != null) {
            foreach ($result as $price) {
                $data['prices_prior'][] = array(
                    'id' => $price['id'],
                    'date_from' => date('d.m.Y', strtotime($price['date_from'])),
                    'date_till' => date('d.m.Y', strtotime($price['date_till'])),
                    'price' => $price['price'],
                );
            }
        }

//       include(DIR_APPLICATION . 'view/tpl/pchart.php');
        $pchart = new Pchart($this->registry);
        $pchart->render(func_get_args()[0]);

        $loader->view('edit', $data);
    }

    public function deletePrice()
    {
        if (func_get_args()[0] == "")
            return;
        $loader = new Loader($this->registry);
        $result = $loader->model('site', 'getPrice', func_get_args());
        if ($result) {
            $loader->model('site', 'deletePrice', func_get_args());
        }
    }

    public function refreshPrices()
    {
        $loader = new Loader($this->registry);
        $data = $this->registry->get('request')->get['data'];
        $i = 0;
        for ($i; $i < count($data['date']); $i++) {
            $result = $loader->model('site', 'getPriceOnDate', array($data['date'][$i]));
            if ($result) {
                $loader->model('site', 'updatePrice', array($data['price'][$i], $data['date'][$i]));
            } else {
                $loader->model('site', 'createPrice', array($data['product_id'], $data['date'][$i], $data['price'][$i]));
            }
        }
    }

    public function deletePricePrior()
    {
        if (func_get_args()[0] == "")
            return;
        $loader = new Loader($this->registry);
        $result = $loader->model('site', 'getPricePrior', func_get_args());
        if ($result) {
            $loader->model('site', 'deletePricePrior', func_get_args());
        }
    }

    public function refreshPricesPrior()
    {
        $loader = new Loader($this->registry);
        $data = $this->registry->get('request')->get['data'];
        $i = 0;
        for ($i; $i < count($data['date_from']); $i++) {
            $loader->model('site', 'createPricePrior', array($data['product_id'], $data['date_from'][$i], $data['date_till'][$i], $data['price'][$i]));
        }
    }
}