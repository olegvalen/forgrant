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


    $(window).resize(function () {

        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.nav-li>.dropdown-menu').removeClass('min-width768');
        } else {
            $('.nav-li>.dropdown-menu').addClass('min-width768');
        }

        if (window.matchMedia('(min-width: 992px)').matches) {
            $('.top-menu2').addClass('open');
        } else {
            $('.top-menu2').removeClass('open');
        }

    });

    if (window.matchMedia('(min-width: 768px)').matches) {
        $('.nav-li>.dropdown-menu').removeClass('min-width768');
    } else {
        $('.nav-li>.dropdown-menu').addClass('min-width768');
    }

    if (window.matchMedia('(min-width: 992px)').matches) {
        $('.top-menu2').addClass('open');
    } else {
        $('.top-menu2').removeClass('open');
    }

    $('.nav-li').mouseenter(function () {
        $(this)
            .find('div.dropdown-menu')
            .not('.min-width768')
            .fadeIn(300)
            .css('display', 'block');
    })
        .mouseleave(function () {
            $(this)
                .closest('ul')
                .find('div.dropdown-menu')
                .not('.min-width768')
                .css('display', 'none');
        });

    $('.navigation>.nav-li').hover(
        function () {
            $(this).find('>a').css('background-color', '#8e83bc');
        },
        function () {
            $(this).find('>a').css('background-color', '#252525');
        });

    $('.item-grid>ul>li').hover(
        function () {
            var self = $(this);
            self.find('ul').css('display', 'inline-flex');
            self.find('.text-center a').css('color', '#8e83bc');
            self.css('border', '1px solid #505050');
        },
        function () {
            var self = $(this);
            self.find('ul').css('display', 'none');
            self.find('.text-center a').css('color', '#505050');
            self.css('border', 'none');
        }
    );

    $("select[id^='size-option']").on('change', function () {
        $('#product-price-38950 span').text($('option:selected', this).attr('data-price'));
    });

    $("select[class^='size-option']").on('change', function () {
        var self = $(this);
        var id = self.data('id');
        var attribute_idOld = self.closest('.first.odd.tr-row').data('attribute-id');
        var attribute_id = $('option:selected', this).data('attribute-id');
        if (attribute_id === undefined) {
            attribute_id = '';
        }
        $.ajax({
            url: '/cart/changeattribute',
            data: {id: id, attribute_id: attribute_id, attribute_idOld: attribute_idOld},
            type: 'GET',
            success: function (e) {
                if (e) {
                    self.closest('.first.odd.tr-row').data('attribute-id', attribute_id);
                    $('.price-item' + id).text($('option:selected', self).data('price'));
                    refreshQtySum();
                }
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    /******************************
     BOTTOM SCROLL TOP BUTTON
     ******************************/

    var scrollTop = $(".scroll-top");
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        // if user scrolls down - show scroll to top button
        if (topPos > 100) {
            $(scrollTop).css("opacity", "1");
        } else {
            $(scrollTop).css("opacity", "0");
        }
    });

    $(scrollTop).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('.link-wishlist').on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.data('id');
        $.ajax({
            url: '/wishlist/add',
            data: {id: id},
            type: 'GET',
            success: function (e) {
                if (!e)
                    alert('Error!');
                _this.find('span').first().addClass('hover');
                $('.ok-badge-wishlist').text(e);
                window.location.replace("/wishlist");
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.cart-to-wishlist').on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.data('id');
        $.ajax({
            url: '/cart/wishlist',
            data: {id: id},
            type: 'GET',
            success: function (e) {
                removeItemCart(_this, true, true);
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.btn-remove-id').on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.data('id');
        $.ajax({
            url: '/wishlist/clear',
            data: {id: id},
            type: 'GET',
            success: function () {
                removeItemWishlist(_this, false);
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.btn-remove-cart').on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.data('id');
        $.ajax({
            url: '/cart/clear',
            data: {id: id},
            type: 'GET',
            success: function () {
                removeItemCart(_this, false, true);
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.button.btn-empty').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/cart/clearall',
            type: 'GET',
            success: function () {
                removeItemCartAll();
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.button.btn-proceed-checkout.btn-checkout').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/cart/checkout',
            type: 'GET',
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.error) {
                    alert(obj.error.msg);
                }
                $(document).find('h1').after("<div class='alert alert-success alert-dismissible ok-alert' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Заказ успешно оформлен! Ждите звонка от представителя магазина!</div>");
                removeItemCartAll();
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.btn-cart').on('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.data('id');
        $.ajax({
            url: '/wishlist/cart',
            data: {id: id},
            type: 'GET',
            success: function () {
                removeItemWishlist(_this, true);
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.btn-adto-cart,.link-cart').on('click', function (e) {
        e.preventDefault();
        var self = $(this);
        var id = self.data('id');
        var attribute_id = $('option:selected', $(document).find('#size-option')).val();
        if (attribute_id === undefined) {
            attribute_id = '';
        }

        $.ajax({
            url: '/cart/add',
            data: {id: id, attribute_id: attribute_id, pathname: window.location.pathname},
            type: 'GET',
            success: function () {
                var cartQty = parseInt($('.ok-badge-cart').text());
                cartQty = isNaN(cartQty) ? 1 : cartQty + 1;
                $('.ok-badge-cart').text(cartQty);
                window.location.replace("/cart");
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.btn-cart-all').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/wishlist/cartall',
            type: 'GET',
            success: function () {
                // window.location.replace("/cart");
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    $('.qty-minus-cart,.qty-plus-cart').on('click', function (e) {
        e.preventDefault();
        var self = $(this);
        var sign = 0;

        var firstOdd = self.closest('.first.odd.tr-row');
        var id = firstOdd.data('id');
        var attribute_id = firstOdd.data('attribute-id');
        var className = self.attr('class');
        if (className === 'qty-minus-cart') {
            sign = -1;
        }
        else if (className === 'qty-plus-cart') {
            sign = 1;
        } else {
            return;
        }

        var input = self.closest('.qty-container').find('input');
        var qtyInput = parseInt(input.val());
        if (qtyInput + sign <= 0) {
            return;
        }

        $.ajax({
            url: '/cart/changeqty',
            data: {id: id, attribute_id: attribute_id, sign: sign},
            type: 'GET',
            success: function (e) {
                if (e) {
                    input.attr('value', qtyInput + sign);

                    var cartQty = parseInt($('.ok-badge-cart').text());
                    cartQty += sign;
                    if (cartQty === 0) {
                        cartQty = '';
                    }
                    $('.ok-badge-cart').text(cartQty);
                    refreshQtySum();
                }
            },
            beforeSend: function () {
                $('#loader').show();
            },
            complete: function () {
                $('#loader').hide();
            },
        });
    });

    function removeItemWishlist(_this, removeToCart) {
        _this.closest('.first.odd').remove();

        var wishlistQty = parseInt($('.ok-badge-wishlist').text());
        wishlistQty -= 1;
        if (wishlistQty === 0) {
            wishlistQty = '';
        }
        $('.ok-badge-wishlist').text(wishlistQty);

        if (removeToCart) {
            var cartQty = parseInt($('.ok-badge-cart').text());
            cartQty = isNaN(cartQty) ? 1 : cartQty + 1;
            $('.ok-badge-cart').text(cartQty);
        }

        if ($('.cart-cell').length === 0) {
            $('#wishlist-view-form').remove();
        }
    }

    function removeItemCart(_this, refreshBadgeWishlist, refreshBadgeCart) {
        _this.closest('.first.odd').remove();

        if (refreshBadgeWishlist) {
            var wishlistQty = parseInt($('.ok-badge-wishlist').text());
            wishlistQty = isNaN(wishlistQty) ? 1 : wishlistQty + 1;
            $('.ok-badge-wishlist').text(wishlistQty);
        }

        if (refreshBadgeCart) {
            var cartQty = parseInt($('.ok-badge-cart').text());
            cartQty = cartQty === 1 ? '' : cartQty - 1;
            $('.ok-badge-cart').text(cartQty);
        }

        if ($('.qty-container').length === 0) {
            $('.checkout-types, #cart-view-form').remove();
        }
        refreshQtySum();
    }

    function removeItemCartAll() {
        $('.ok-badge-cart').text('');
        $('.checkout-types, #cart-view-form').remove();
    }

    function refreshQtySum() {
        var _price = 0, _qty = 0, _sum = 0, qty = 0, sum = 0;
        $('.first.odd.tr-row').each(function () {
            var _this = $(this);
            var id = _this.data('id');
            _price = parseInt(_this.find('.price-item' + id).text().replace(' ', ''));
            _qty = parseInt(_this.find('.input-text.qty').val());
            _sum = _price * _qty;
            _this.find('.price.sum').text(addSeparators(_sum, '.', '.', ' '));
            qty += _qty;
            sum += _sum;
        });
        $('.cart-qty strong').text(qty);
        $('.cart-sum strong').text(addSeparators(sum, '.', '.', ' '));
    }

    function addSeparators(nStr, inD, outD, sep) {
        nStr += '';
        var dpos = nStr.indexOf(inD);
        var nStrEnd = '';
        if (dpos !== -1) {
            nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
            nStr = nStr.substring(0, dpos);
        }
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(nStr)) {
            nStr = nStr.replace(rgx, '$1' + sep + '$2');
        }
        return nStr + nStrEnd;
    }

    $('.btn-search').on('click', function (e) {
        e.preventDefault();
        document.location.href = '/search';
    });

});