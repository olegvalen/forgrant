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
            Hello Форгрант
        </h1>

        <table class="table is-bordered is-hoverable">
            <thead>
            <tr>
                <th>Product</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($products as $product): ?>
                <tr>
                    <td><?= $product['name'] ?></td>
                    <td class="is-centered"><a href="/edit?id=<?= $product['id'] ?>"><i class="fas fa-edit"></i></a></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>

    </div>
</section>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</body>
</html>
