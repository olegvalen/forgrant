<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Форгрант</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" rel="stylesheet">
    <link href="/view/css/main.css" rel="stylesheet">
    <script defer src="https://use.fontawesome.com/releases/v5.1.0/js/all.js"></script>
</head>

<body>
<section class="section">
    <div class="container">
        <h1 class="title">
            Редактирование цен: <?= $name ?>
        </h1>
        <hr>
        <h2 class="title is-4">Справочник цен</h2>
        <form id="form-table-price">
            <table class="table is-bordered is-hoverable table-price">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Цена</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($prices as $price): ?>
                    <tr>
                        <td><?= $price['date'] ?></td>
                        <td><?= $price['price'] ?></td>
                        <td class="is-centered"><a class="delete-price" data-id="<?= $price['id'] ?>"><i
                                        class="fas fa-trash-alt"></i></a></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <a class="button is-primary add-price" data-product-id="<?= $product_id ?>">Добавить</a>
            <a class="button is-info refresh-price">Обновить</a>
        </form>
        <hr>
        <h2 class="title is-4">Справочник приоритетных цен</h2>
        <form id="form-table-price-prior">
            <table class="table is-bordered is-hoverable table-price-prior">
                <thead>
                <tr>
                    <th>Дата с</th>
                    <th>Дата по</th>
                    <th>Цена</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                <?php foreach ($prices_prior as $price): ?>
                    <tr>
                        <td><?= $price['date_from'] ?></td>
                        <td><?= $price['date_till'] ?></td>
                        <td><?= $price['price'] ?></td>
                        <td class="is-centered"><a class="delete-price-prior" data-id="<?= $price['id'] ?>"><i
                                        class="fas fa-trash-alt"></i></a></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <a class="button is-primary add-price-prior" data-product-id="<?= $product_id ?>">Добавить</a>
            <a class="button is-info refresh-price-prior">Обновить</a>
        </form>
        <hr>
        <img src="/view/tpl/oubput.png">
    </div>
</section>
<script src="/view/js/jquery.min.js"></script>
<script src="/view/js/main.js"></script>
</body>
</html>
