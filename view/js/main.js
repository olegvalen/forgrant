$(document).ready(function () {
    "use strict";

    $(document).on('click', '.delete-price', function (e) {
        var result = confirm("Действительно удалить?");
        if (result) {
            e.preventDefault();
            var self = $(this);
            var id = self.data('id');
            $.ajax({
                url: '/home/deletePrice',
                data: {method: 'deletePrice', id: id},
                type: 'GET',
                success: function () {
                    self.closest('tr').remove();
                },
            });
        }
    });

    $('.add-price').on('click', function (e) {
        e.preventDefault();
        var product_id = $(this).data('product-id');
        var html = "<tr><td><input type='date' required name='data[date][]' value='2018-07-22'/></td><td><input type='number' required name='data[price][]' min='0' value='10000' step='.01'><input type='text' name='data[product_id]' value='" + product_id + "' hidden/><input type='text' name='data[method]' value='refreshPrices' hidden/></td><td class='is-centered'><a class='delete-price' data-id=''><i class='fas fa-trash-alt'></i></a></td></tr>";
        $(document).find('.table-price > tbody > tr:last-child').after(html);
    });

    $('.refresh-price').on('click', function (e) {
        e.preventDefault();
        var form = $('#form-table-price').serialize();
        $.ajax({
            url: '/home/refreshPrices',
            data: form,
            type: 'GET',
            success: function () {
                window.location.reload(false);
            },
        });
    });


    $(document).on('click', '.delete-price-prior', function (e) {
        var result = confirm("Действительно удалить?");
        if (result) {
            e.preventDefault();
            var self = $(this);
            var id = self.data('id');
            $.ajax({
                url: '/home/deletePricePrior',
                data: {method: 'deletePricePrior', id: id},
                type: 'GET',
                success: function () {
                    self.closest('tr').remove();
                },
            });
        }
    });

    $('.add-price-prior').on('click', function (e) {
        e.preventDefault();
        var product_id = $(this).data('product-id');
        var html = "<tr><td><input type='date' required name='data[date_from][]' value='2018-07-22'/></td><td><input type='date' required name='data[date_till][]' value='2018-07-22'/></td><td><input type='number' required name='data[price][]' min='0' value='10000' step='.01'><input type='text' name='data[product_id]' value='" + product_id + "' hidden/><input type='text' name='data[method]' value='refreshPricesPrior' hidden/></td><td class='is-centered'><a class='delete-price-prior' data-id=''><i class='fas fa-trash-alt'></i></a></td></tr>";
        $(document).find('.table-price-prior > tbody > tr:last-child').after(html);
    });

    $('.refresh-price-prior').on('click', function (e) {
        e.preventDefault();
        var form = $('#form-table-price-prior').serialize();
        $.ajax({
            url: '/home/refreshPricesPrior',
            data: form,
            type: 'GET',
            success: function () {
                window.location.reload(false);
            },
        });
    });

});