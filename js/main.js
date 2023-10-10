// Анимация гамбургер-меню
    var wrapperMenu = document.querySelector('.wrapper-menu');
        wrapperMenu.addEventListener('click', function(){
        wrapperMenu.classList.toggle('open');  
    })


// открытие меню по клику на гамбургер
    $('.wrapper-menu').click(function() {
        $('.menu-collapse').toggleClass('d-none').css('order', '1').css('position', 'revert');
        $('.menu').toggleClass('menu-open');
    });


//  Возврат меню в исходное положение, после нажатия на пункт меню
    $('.menu li a').click(function() {   
         $('.menu-collapse').addClass('d-none');
         $('.menu').removeClass('menu-open');
         $('.wrapper-menu').removeClass('open');
    });



// Плавная прокрутка страницы по якорям (без обращения к элементам) top -80 указывает на сколько подымать секцию по высоте от верха экрана.
    $("a[href*=#]").on("click", function(e){
    var anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top -24}, 777);
        e.preventDefault();
        return false;
    }); 



jQuery('.btn-player').bind("click", function(event) {
        if (jQuery(this).hasClass('on')) {
            //если данная мелодия уже проигрывается
            //снимаем флаг ON
            jQuery(this).removeClass('on');

            //останавливаем проигрыватель
            jQuery('#my-hidden-player').get(0).pause();
        } else {
            //если данная мелодия не проигрывается в текущий момент
            //выключаем все остальные кнопки
            jQuery('.btn-player').removeClass('on');
            //добавляем класс ON
            jQuery(this).addClass('on');
            var pl = jQuery('#my-hidden-player').get(0);
            //останавливаем текущую мелодию
            pl.pause();
            //устанавливаем новый источник
            pl.src = jQuery(this).attr('data-src');
            //включаем проигрывание
            pl.play();
        }
    });

//выбрали объект проигрывателя
var pl = jQuery('#my-hidden-player').get(0);
//ставим громкость на 50%;
pl.volume = 0.5;



$(function() {
    $('.slide-client-foto').slick({
        prevArrow: '<div class="slider__prev"></div>',
        nextArrow: '<div class="slider__next"></div>',
        // infinite: false,
      dots: true,
      speed: 1600,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
            //infinite: true,
            
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
            //infinite: true,
            
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 568,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
});


//  Кнопка "подняться наверх"
$(function() {
    var btn = $('#button');

    $(window).scroll(function() {
      if ($(window).scrollTop() > 400) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '400');
    });
});


 
// ----- Модальное окно ----- //
        $('.btn-offer, .btn-audio, .btn-price').click(function() {
            $('#exampleModal').arcticmodal();
        });

// Передача инфо о кнопке в модальное окно
$(function() {
    $('.btn-offer, .btn-audio, .btn-price').click(function() {
        var parent = $(this).attr('data-parent');
        var modal = $(this).attr('data-target')
        $(modal).find('input[name=target]').val(parent);
    })
});

// Валидация и отправка формы
$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {

        el.validate({
            rules: {
                name: {
                    required: true,
                    regex: '^[а-яА-ЯёЁa-zA-Z]+$'
                },
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: 'Поле обязательно для заполнения!',
                    regex: 'Неверный формат имени!'
                },
                tel: {
                    required: 'Поле обязательно для заполнения!',
                    regex: 'Телефон может содержать символы + ()!'
                },
                email: {
                    required: 'Поле обязательно для заполнения!',
                    email: 'Неверный формат E-mail!'
                },
                message: {
                    required: 'Вы ничего не написали!'
                }
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $.arcticmodal('close');
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="goToNewPage" - делаем:
                    case 'goToNewPage':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register'); // Google Analytics
                                yaCounter27714603.reachGoal('lm17lead');  // Я.Метрикa
                            });
                        break;
                    // Если у формы id="popupResult" - делаем:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics


                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                    // Если у формы id="StaticResult" - делаем:
                    case 'staticResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
    
});