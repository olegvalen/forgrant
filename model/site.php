<?php

class ModelSite extends Model
{
    public function getProducts()
    {
        $query = $this->registry->get('db')->query("SELECT * FROM product ORDER BY id ASC", func_get_args());
        return $query->rows;
    }

    public function getPrices()
    {
        $query = $this->registry->get('db')->query("SELECT
          p.id product_id,
          p.name,
          pr.id,
          pr.date,
          pr.price
        FROM product p LEFT JOIN price pr ON p.id = pr.product_id
        WHERE p.id = ?
        ORDER BY date ASC;", func_get_args());
        return $query->rows;
    }

    public function getPricesPriority()
    {
        $query = $this->registry->get('db')->query("SELECT
          p.id product_id,
          p.name,
          pr.id,
          pr.date_from,
          pr.date_till,
          pr.price
        FROM product p LEFT JOIN price_priority pr ON p.id = pr.product_id
        WHERE p.id = ?
        ORDER BY date_from ASC;", func_get_args());
        return $query->rows;
    }

    public function getPrice()
    {
        $query = $this->registry->get('db')->query("SELECT * FROM price WHERE id = ?;", func_get_args());
        return $query->row;
    }

    public function deletePrice()
    {
        $query = $this->registry->get('db')->query("DELETE FROM price WHERE id = ?;", func_get_args());
        return $query->row;
    }

    public function getPricePrior()
    {
        $query = $this->registry->get('db')->query("SELECT * FROM price_priority WHERE id = ?;", func_get_args());
        return $query->row;
    }

    public function deletePricePrior()
    {
        $query = $this->registry->get('db')->query("DELETE FROM price_priority WHERE id = ?;", func_get_args());
        return $query->row;
    }

    public function getPriceOnDate()
    {
        $query = $this->registry->get('db')->query("SELECT * FROM price WHERE date = ?;", func_get_args());
        return $query->row;
    }

    public function updatePrice()
    {
        $query = $this->registry->get('db')->query("UPDATE price SET price = ? WHERE date = ?;", func_get_args());
        return $query->row;
    }

    public function createPrice()
    {
        $query = $this->registry->get('db')->query("INSERT INTO price (product_id, date, price) VALUES (?, ?, ?);", func_get_args());
        return $query->row;
    }

    public function createPricePrior()
    {
        $query = $this->registry->get('db')->query("INSERT INTO price_priority (product_id, date_from, date_till, price) VALUES (?, ?, ?, ?);", func_get_args());
        return $query->row;
    }

}