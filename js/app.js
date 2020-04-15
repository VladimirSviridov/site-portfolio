"use strict";

$(function () {

    const worksSlider = $('[data-slider="slick"]');

    /* Filter */
    let filter = $("[data-filter]");

    filter.on("click", function (event) {
        event.preventDefault();

        let cat = $(this).data('filter');

        if (cat == 'all') {
            $("[data-cat]").removeClass("hide");
        } else {
            $("[data-cat]").each(function () {

                let workCat = $(this).data("cat");

                if (workCat != cat) {
                    $(this).addClass("hide");
                } else {
                    $(this).removeClass("hide");
                }
            })
        }
    });

    /* Modal */

    // Получаем кнопки и крестик по дата-атрибутам
    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    // Отрываем модальное окно при помощи кнопки
    modalCall.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass("show");
        $("body").addClass('no-scroll');

        setTimeout(function () {
            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)"
            });
        }, 200);

        worksSlider.slick('setPosition');

    });

    // Закрываем модальное окно при нажатии на крестик
    modalClose.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        $(modalParent).find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function () {
            modalParent.removeClass("show");
            $("body").removeClass('no-scroll');
        }, 200);

    });

    // Закрытие модального окна при нажатии на фон вокруг модального окна
    $(".modal").on("click", function (event) {

        let $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function () {
            $this.removeClass("show");
            $("body").removeClass('no-scroll');
        }, 200);
    });

    // Чтобы не закрывалось при нажатии на окно диалога
    $(".modal__dialog").on("click", function (event) {
        event.stopPropagation();

    });

    /* Slider:  https://kenwheeler.github.io/slick/*/


    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
    });

    $(".slickPrev").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });

    $(".slickNext").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });

});