var timer;
// 통합몰 반짝특가용 CountDownTimer
// 데이터 형식 '04/07/2020 10:20 AM' // 월/일/년 시:분 AM
function SwiperCountDownTimer(mode, dt, id) {
	var end = new Date(dt);
	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;

	function showSwiperCountRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {
			clearInterval(timer);
			return;
		}
		var days = Math.floor(distance / _day);
		var hours = Math.floor((distance % _day) / _hour);
		// var minutes = '0' + Math.floor((distance % _hour) / _minute);
		// var seconds = '0' + Math.floor((distance % _minute) / _second);
		var innerHTML;
		if (mode == 'open') {
			// 오픈 이후
			hours = hours < 10 ? '0' + hours : hours;
			if (days < 1) {
				innerHTML =
					'<span class="groupbuy-item-goal__num"><strong>' +
					hours +
					'</strong>시간 남음</span>';
			} else {
				innerHTML =
					'<strong class="groupbuy-item-goal__day">' +
					days +
					'</strong>일 ';
				innerHTML +=
					'<span class="groupbuy-item-goal__num"><strong>' +
					hours +
					'</strong>시간 남음</span>';
			}
		} else {
			// 오픈 전
			hours = hours < 10 ? '0' + hours : hours;
			if (days < 1) {
				innerHTML =
					'<span class="groupbuy-item-goal__num"><strong>' +
					hours +
					'</strong>시간 남음</span>';
			} else {
				innerHTML =
					'시작까지 <strong class="groupbuy-item-goal__day">' +
					days +
					'</strong>일 ';
				innerHTML +=
					'<span class="groupbuy-item-goal__num"><strong>' +
					hours +
					'</strong>시간 남음</span>';
			}
		}
		$(id).html(innerHTML);
	}
	clearInterval(timer);
	showSwiperCountRemaining();
	timer = setInterval(showSwiperCountRemaining, 1000);
}

function showSwiperDateFormat(dt) {
	var dformat = dt.split('-');
	var days = Number(dformat[0]);
	var hours = Number(dformat[1]);
	hours = hours < 10 ? '0' + hours : hours;
	if (days < 1) {
		if (hours < 1) {
			innerHTML =
				'<span class="groupbuy-item-goal__num"><strong>마감임박</span>';
		} else {
			innerHTML =
				'<span class="groupbuy-item-goal__num"><strong>' +
				hours +
				'</strong>시간 남음</span>';
		}
	} else {
		innerHTML =
			'<strong class="groupbuy-item-goal__day">' + days + '</strong>일 ';
		innerHTML +=
			'<span class="groupbuy-item-goal__num"><strong>' +
			hours +
			'</strong>시간 남음</span>';
	}
	$('.timesale-header__d').html(innerHTML);
}
// 통합몰 메인 반짝특가용 슬라이드
function loadSwiperTimesale01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number swiper-pagination-number-active slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum =
						$this
							.find('.swiper-slide-active')
							.data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
					// 반짝특가용 카운트다운 타이머 추가 : 200702
					var dateFormat = $this
						.find('.swiper-slide-active')
						.children('.product-item')
						.data('format');
					showSwiperDateFormat(dateFormat);
					// var activeOpen = $this.find('.swiper-slide-active').children('.product-item').data('open');
					// SwiperCountDownTimer(activeOpen, activeTimer, el + ' .timesale-header__d');
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});

		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this)
					.removeClass('__state-swiper-play')
					.addClass('__state-swiper-pause')
					.find('i')
					.removeClass('icon-control-play')
					.addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this)
					.removeClass('__state-swiper-pause')
					.addClass('__state-swiper-play')
					.find('i')
					.removeClass('icon-control-pause')
					.addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
	}
}

function loadSwiperTimesale02(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 5000,
			},
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			speed: 0,
			slidesPerView: 3,
			on: {
				init: function () {
					var swiper = this;
					var currentNum;
					var $this = $(el + ' .swiper-container');
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					// swiper loop 상태에 따라 current index : 200818
					if (swiper.params.loop) {
						currentNum =
							$this
								.find('.swiper-slide-active')
								.data('swiper-slide-index') + 1; // loop : true 일 경우
					} else {
						currentNum = this.activeIndex + 1; // loop : false 일 경우
					}
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$(el + ' .swiper-pagination-total').text(
						totalNum.slice(-2)
					);
					$(el + ' .swiper-pagination-current').text(
						currentNum.slice(-2)
					);
					$(el + ' .swiper-slide')
						.removeClass('swiper-slide-best')
						.children('div')
						.addClass('product-item--medium')
						.removeClass('product-item--xxlarge');
					$(el + ' .swiper-slide-prev')
						.addClass('swiper-slide-best')
						.children('div')
						.removeClass('product-item--medium')
						.addClass('product-item--xxlarge');
				},
				slideChangeTransitionStart: function () {
					var swiper = this;
					var currentNum;
					var $this = $(el + ' .swiper-container');
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					// swiper loop 상태에 따라 current index : 200818
					if (swiper.params.loop) {
						currentNum =
							$this
								.find('.swiper-slide-active')
								.data('swiper-slide-index') + 1; // loop : true 일 경우
					} else {
						currentNum = this.activeIndex + 1; // loop : false 일 경우
					}
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$(el + ' .swiper-pagination-total').text(
						totalNum.slice(-2)
					);
					$(el + ' .swiper-pagination-current').text(
						currentNum.slice(-2)
					);
					$(el + ' .swiper-slide')
						.removeClass('swiper-slide-best')
						.children('div')
						.addClass('product-item--medium')
						.removeClass('product-item--xxlarge');
					$(el + ' .swiper-slide-prev')
						.addClass('swiper-slide-best')
						.children('div')
						.removeClass('product-item--medium')
						.addClass('product-item--xxlarge');
					// $('.lstore-timesale-best').empty().append($this.find('.swiper-slide-best').children('div'));
				},
			},
		});
	}
	$('.section-lstore-timesale')
		.on('mouseenter', function () {
			swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			swiperObj.autoplay.start();
		});
}

// Key Visual Banner PC 01 - 빅 와이드 배너(Auto Slide) + 좌측 스몰 배너(Slide)
function loadSwiperKeyvisual01(el, initialNum) {
	// 배너 순서 지정
	if (initialNum == undefined) {
		initialNum = 0;
	}
	var swiperList1 = $(el + ' .main-key-visual1 .swiper-slide'),
		swiperControlWrap = $(
			el + ' .main-key-visual1 .swiper-control-wrapper'
		);
	if (swiperList1.length > 1) {
		var swiperKeyVisual = new Swiper(el + ' .main-key-visual1', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			speed: 1000,
			// speed: 600,
			parallax: true,
			// grabCursor: true,
			watchSlidesProgress: true,
			mousewheelControl: false,
			keyboardControl: true,

			pagination: {
				el: el + ' .main-key-visual1 .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-control-wrapper .swiper-button-next',
				prevEl: el + ' .swiper-control-wrapper .swiper-button-prev',
			},
			on: {
				slideChangeTransitionStart: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual1');
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentNum =
						$this
							.find('.swiper-slide-active')
							.data('swiper-slide-index') + 1;
					$this.find('.swiper-pagination-total').text(totalNum);
					$this.find('.swiper-pagination-current').text(currentNum);
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .main-key-visual1');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
			initialSlide: initialNum,
		});
	} else {
		swiperList1.show();
		swiperControlWrap.hide();
	}

	// 메인 키비주얼2 슬라이드
	var swiperList2 = $(el + ' .main-key-visual2 .swiper-slide');
	if (swiperList2.length > 1) {
		var swiperKeyVisual2 = new Swiper(
			el + ' .main-key-visual2 .swiper-container',
			{
				// speed: 0,
				loop: true,
				simulateTouch: false,
				// preloadImages: false,
				// lazy: true,
				spaceBetween: 0,
				slidesPerView: 1,
				pagination: {
					el: el + ' .main-key-visual2 .swiper-pagination-count',
					type: 'custom',
					renderCustom: function (swiper, current, total) {
						function numberAppend(d) {
							return d < 10 ? '0' + d.toString() : d.toString();
						}
						return (
							'<span class="swiper-pagination-current">' +
							numberAppend(current) +
							'</span> /  <span class="swiper-pagination-total">' +
							numberAppend(total) +
							'</span>'
						);
					},
				},
				navigation: {
					nextEl: el + ' .main-key-visual2 .swiper-button-next',
					prevEl: el + ' .main-key-visual2 .swiper-button-prev',
				},
			}
		);
	} else {
		swiperList2.show();
		$(el + ' .main-key-visual2 .swiper-pagination-count').hide();
		$(el + ' .main-key-visual2 .swiper-button-prev').hide();
		$(el + ' .main-key-visual2 .swiper-button-next').hide();
	}

	$(document).on('click', el + ' .swiper-button-pause', function () {
		if ($(this).is('.__state-swiper-play')) {
			$(this)
				.removeClass('__state-swiper-play')
				.addClass('__state-swiper-pause')
				.find('i')
				.removeClass('icon-control-play')
				.addClass('icon-control-pause');
			swiperKeyVisual.autoplay.start();
		} else {
			$(this)
				.removeClass('__state-swiper-pause')
				.addClass('__state-swiper-play')
				.find('i')
				.removeClass('icon-control-pause')
				.addClass('icon-control-play');
			swiperKeyVisual.autoplay.stop();
		}
	});

	var swiperScroll = new Swiper('.swiperScroll', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		mousewheel: true,
	});
}

// Key Visual Banner PC 02 - 3단 다이나믹 배너(Auto Slide)
function loadSwiperKeyvisual02(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');

	if (swiperList.length > 2) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 400,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			slidesPerView: 3,
			centeredSlides: false,
			freeMode: true,
			spaceBetween: 50,
			slidesPerGroup: 3,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum,
						cntNum = 0;
					for (var i = 1; i <= totalNum; i++) {
						if (i % 3 === 2) {
							cntNum++;
							if (i === 1) {
								// add active class if it is the first bullet
								bulletNum = '0' + cntNum;
								bulletNum = bulletNum.slice(-2);
								$(
									el + ' .swiper-pagination-bullet-wrap'
								).append(
									'<span class="swiper-pagination-number swiper-pagination-number-active slide' +
										cntNum +
										'">' +
										bulletNum +
										'</span>'
								);
							} else {
								bulletNum = '0' + cntNum;
								bulletNum = bulletNum.slice(-2);
								$(
									el + ' .swiper-pagination-bullet-wrap'
								).append(
									'<span class="swiper-pagination-number slide' +
										cntNum +
										'">' +
										bulletNum +
										'</span>'
								);
							}
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum =
						Math.floor(
							$this
								.find('.swiper-slide-active')
								.data('swiper-slide-index') / 3
						) + 1;
					// console.log(currentNum);
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this)
					.removeClass('__state-swiper-play')
					.addClass('__state-swiper-pause')
					.find('i')
					.removeClass('icon-control-play')
					.addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this)
					.removeClass('__state-swiper-pause')
					.addClass('__state-swiper-play')
					.find('i')
					.removeClass('icon-control-pause')
					.addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 03 - 빅와이드 배너(Slide) : 520px
function loadSwiperWideBanner03(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-control-box-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 5000,
			},
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number swiper-pagination-number-active slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum =
						$this
							.find('.swiper-slide-active')
							.data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
				slideChangeTransitionEnd: function () {
					var swiper = this;
					var $this = $(el + ' .swiper-container');
					var sButton = $this.find('.swiper-button-pause');
					if (sButton.length) {
						if (sButton.is('.__state-swiper-pause')) {
							swiper.autoplay.start();
						}
					}
				},
			},
		});
		$(document).on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this)
					.removeClass('__state-swiper-play')
					.addClass('__state-swiper-pause')
					.find('i')
					.removeClass('icon-control-play')
					.addClass('icon-control-pause');
				swiperObj.autoplay.start();
			} else {
				$(this)
					.removeClass('__state-swiper-pause')
					.addClass('__state-swiper-play')
					.find('i')
					.removeClass('icon-control-pause')
					.addClass('icon-control-play');
				swiperObj.autoplay.stop();
			}
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// Key Visual Banner PC 04 - 빅와이드 배너(Slide) + Bullet
function loadSwiperWideBanner04(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				clickable: true,
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// S : 메인키비쥬얼PC5-좌1단+우3단
function loadSwiperKeyvisual05(el) {
	var swiperListV01 = $(el + ' .main-keyvisual5__left .swiper-slide'),
		swiperControlWrapV01 = $(
			el + ' .main-keyvisual5__left .section-category-control-wrap'
		);
	//컨텐츠의 갯수가 1개 이하일때 swiper를 호출하지 않는다.
	if (swiperListV01.length > 1) {
		var swiperKeyVisualLeft = new Swiper(
			el + ' .main-keyvisual5__left .swiper-container',
			{
				loop: true,
				simulateTouch: false,
				autoplay: {
					delay: 3000,
				},
				speed: 1000,
				navigation: {
					nextEl: el + ' .main-keyvisual5__left .swiper-button-next',
					prevEl: el + ' .main-keyvisual5__left .swiper-button-prev',
				},
				pagination: {
					el: el + ' .main-keyvisual5__left .swiper-pagination',
					type: 'fraction',
				},
			}
		);

		$(document)
			.on(
				'click',
				el + ' .main-keyvisual5__left .swiper-button-pause',
				function () {
					if ($(this).hasClass('__state-swiper-play')) {
						$(this)
							.removeClass('__state-swiper-play')
							.addClass('__state-swiper-pause')
							.find('i')
							.removeClass('icon-swiper-play-w')
							.addClass('icon-swiper-pause-w');
						swiperKeyVisualLeft.autoplay.start();
					} else {
						$(this)
							.removeClass('__state-swiper-pause')
							.addClass('__state-swiper-play')
							.find('i')
							.removeClass('icon-swiper-pause-w')
							.addClass('icon-swiper-play-w');
						swiperKeyVisualLeft.autoplay.stop();
					}
				}
			)
			.on(
				'click',
				el +
					' .main-keyvisual5__left .swiper-button-prev, ' +
					el +
					' .main-keyvisual5__left .swiper-button-next',
				function () {
					var isPause01 = $(this)
						.closest('.section-category-control-wrap')
						.find('.swiper-button-pause');
					if (isPause01.hasClass('__state-swiper-play')) {
						isPause01
							.removeClass('__state-swiper-play')
							.addClass('__state-swiper-pause')
							.find('i')
							.removeClass('icon-swiper-play-w')
							.addClass('icon-swiper-pause-w');
					}
					swiperKeyVisualLeft.autoplay.start();
				}
			);
	} else {
		swiperListV01.show();
		swiperControlWrapV01.hide();
	}
	// 메인 키비주얼2 슬라이드
	var swiperKeyVisualRight = new Swiper(
		el + ' .main-keyvisual5__right .swiper-container',
		{
			loop: true,
			simulateTouch: false,
			direction: 'vertical',
			slidesPerView: 3,
			spaceBetween: 0,
			navigation: {
				nextEl: el + ' .main-keyvisual5__right .swiper-button-next',
				prevEl: el + ' .main-keyvisual5__right .swiper-button-prev',
			},
		}
	);
}
// E : 메인키비쥬얼PC5-좌1단+우3단

// Key Visual Banner PC 06 - 삼성브랜드관 메인 배너, 탭
function loadSwiperKeyvisual06(el, initialNum) {
	// 배너 순서 지정
	if (initialNum == undefined) {
		initialNum = 0;
	}
	//탭
	var swiperList2 = $(el + ' .tab-swiper-container .swiper-slide');
	if (swiperList2.length > 1) {
		var swiperKeyVisual2 = new Swiper(
			el + ' .tab-swiper-container .swiper-container',
			{
				// speed: 0,
				loop: true,
				// simulateTouch: false,
				// preloadImages: false,
				// lazy: true,
				slidesPerView: 9,
				centeredSlides: true,
				spaceBetween: 10,
				navigation: {
					nextEl: el + ' .tab-swiper-container .swiper-button-next',
					prevEl: el + ' .tab-swiper-container .swiper-button-prev',
				},
			}
		);
	} else {
		swiperList2.show();
		$(el + ' .tab-swiper-container .swiper-pagination-count').hide();
		$(el + ' .tab-swiper-container .swiper-button-prev').hide();
		$(el + ' .tab-swiper-container .swiper-button-next').hide();
	}

	$(document).on('click', el + ' .swiper-button-pause', function () {
		if ($(this).is('.__state-swiper-play')) {
			$(this)
				.removeClass('__state-swiper-play')
				.addClass('__state-swiper-pause')
				.find('i')
				.removeClass('icon-control-play')
				.addClass('icon-control-pause');
			swiperKeyVisual.autoplay.start();
		} else {
			$(this)
				.removeClass('__state-swiper-pause')
				.addClass('__state-swiper-play')
				.find('i')
				.removeClass('icon-control-pause')
				.addClass('icon-control-play');
			swiperKeyVisual.autoplay.stop();
		}
	});

	var swiperScroll = new Swiper('.swiperScroll', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
		mousewheel: true,
	});
}

// WideBanner
function loadSwiperWideBanner05(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 0,
			slidesPerView: 'auto',
			on: {
				init: function () {
					$('.section-branch .tab-block-item').on(
						'click',
						function () {
							var idx = $(this).index();
							swiperObj.slideToLoop(idx);
						}
					);
				},
				slideChangeTransitionStart: function () {
					var loopIndex = $(el + ' .swiper-slide-active').attr(
						'data-swiper-slide-index'
					);
					$('.section-branch .tab-block-item')
						.removeClass('is-active')
						.eq(loopIndex)
						.addClass('is-active');
				},
			},
		});
	}
}

// 통합몰 메인 베스트 아이템 슬라이드
function loadSwiperBest01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			// autoplay: {
			// 	delay: 3000,
			// },
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// autoplay: {
			// 	delay: 3000000,
			// },
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				slideChangeTransitionStart: function () {
					var swiper = this;
					var $this = $(el);
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var currentNum =
						$this
							.find('.swiper-slide-active')
							.data('swiper-slide-index') + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this
						.find('.swiper-pagination-total')
						.text(totalNum.slice(-2));
					$this
						.find('.swiper-pagination-current')
						.text(currentNum.slice(-2));
				},
			},
		});
	} else {
		swiperList.show();
	}
}

// 기획전 슬라이드
function loadSwiperExhibition01(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var duplicateNum = $this.find(
						'.swiper-slide-duplicate'
					).length;
					var totalNum = swiper.slides.length - duplicateNum;
					var bulletNum;
					for (var i = 1; i <= totalNum; i++) {
						if (i === 1) {
							// add active class if it is the first bullet
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number swiper-pagination-number-active slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						} else {
							bulletNum = '0' + i;
							bulletNum = bulletNum.slice(-2);
							$(el + ' .swiper-pagination-bullet-wrap').append(
								'<span class="swiper-pagination-number slide' +
									i +
									'">' +
									bulletNum +
									'</span>'
							);
						}
					}
				},
				slideChangeTransitionStart: function () {
					// Get current slide from fraction pagination number
					var $this = $(el);
					var currentNum =
						$this
							.find('.swiper-slide-active')
							.data('swiper-slide-index') + 1;
					var bullets = $(el + ' .swiper-pagination-number');
					// Remove active class from all bullets
					bullets.removeClass('swiper-pagination-number-active');
					// Check each bullet element if it has slideNumber class
					$.each(bullets, function (index, value) {
						var slideClass = 'slide' + (index + 1);
						if (currentNum >= index + 1) {
							$(this).addClass('swiper-pagination-number-active');
						}
					});
				},
			},
		});
		$(document)
			.on('mouseenter', el, function () {
				swiperObj.autoplay.stop();
			})
			.on('mouseleave', el, function () {
				swiperObj.autoplay.start();
			});
	} else {
		swiperList.show();
	}
}

// 기획전 3단 슬라이드
function loadSwiperExhibition03(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			speed: 800,
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
			on: {
				init: function () {
					if (swiperList.length < 4) {
						swiperControlWrap.hide();
					}
				},
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 기획전 와이드배너 + 4단 슬라이드
function loadSwiperExhibition04(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			on: {
				init: function () {},
			},
		});
	} else {
		$(el + ' .swiper-controls-wrap').hide();
	}
}
// 기획전 와이드 1단 슬라이드 배너
function loadSwiperWide01(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			autoplay: {
				delay: 4000,
			},
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'fraction',
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}

	$(document)
		.on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this)
					.removeClass('__state-swiper-play')
					.addClass('__state-swiper-pause')
					.find('i')
					.removeClass('icon-play')
					.addClass('icon-pause');
				swiperObj.autoplay.start();
			} else {
				$(this)
					.removeClass('__state-swiper-pause')
					.addClass('__state-swiper-play')
					.find('i')
					.removeClass('icon-pause')
					.addClass('icon-play');
				swiperObj.autoplay.stop();
			}
		})
		.on(
			'click',
			el + ' .swiper-button-prev,' + el + ' .swiper-button-next',
			function () {
				var isPlayControl = $(this)
					.closest('.section-category-control-wrap')
					.find('.swiper-button-pause');
				if (isPlayControl.is('.__state-swiper-play')) {
					isPlayControl
						.removeClass('__state-swiper-play')
						.addClass('__state-swiper-pause')
						.find('i')
						.removeClass('icon-play')
						.addClass('icon-pause');
				}
				swiperObj.autoplay.start();
			}
		);
}

// 기획전 와이드 2단 슬라이드 배너
function loadSwiperWide02(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			simulateTouch: false,
			spaceBetween: 0,
			slidesPerView: 2,
			slidesPerGroup: 2,
			autoplay: {
				delay: 4000,
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'fraction',
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}

	$(document)
		.on('click', el + ' .swiper-button-pause', function () {
			if ($(this).is('.__state-swiper-play')) {
				$(this)
					.removeClass('__state-swiper-play')
					.addClass('__state-swiper-pause')
					.find('i')
					.removeClass('icon-play')
					.addClass('icon-pause');
				swiperObj.autoplay.start();
			} else {
				$(this)
					.removeClass('__state-swiper-pause')
					.addClass('__state-swiper-play')
					.find('i')
					.removeClass('icon-pause')
					.addClass('icon-play');
				swiperObj.autoplay.stop();
			}
		})
		.on(
			'click',
			el + ' .swiper-button-prev,' + el + ' .swiper-button-next',
			function () {
				var isPlayControl = $(this)
					.closest('.section-category-control-wrap')
					.find('.swiper-button-pause');
				if (isPlayControl.is('.__state-swiper-play')) {
					isPlayControl
						.removeClass('__state-swiper-play')
						.addClass('__state-swiper-pause')
						.find('i')
						.removeClass('icon-play')
						.addClass('icon-pause');
				}
				swiperObj.autoplay.start();
			}
		);
}

// 일반 autoplay 용 4단 슬라이드
function loadSwiperAutoCol4(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl1 = $(el + ' .swiper-button-prev'),
		swiperControl2 = $(el + ' .swiper-button-next');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 3000,
			},
			paginationClickable: true,
			spaceBetween: 28,
			slidesPerView: 4,
			slidesPerGroup: 4,
		});
		$(document)
			.on('mouseenter', el, function () {
				swiperObj.autoplay.stop();
			})
			.on('mouseleave', el, function () {
				swiperObj.autoplay.start();
			});
	} else {
		swiperList.show();
		swiperControl1.hide();
		swiperControl2.hide();
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperCol2(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 16,
			slidesPerView: 2,
		});
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperCol3(el) {
	var swiperList = $(el + ' .swiper-slide');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
		});
	}
}

// autoplay 가 아닌, 무한루프가 아닌 고정 3단 슬라이드
function loadSwiperCol3_1(el) {
	var swiperList = $(el + ' .swiper-slide');
	swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 3) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 53,
			slidesPerView: 3,
			slidesPerGroup: 3,
			// centeredSlides: true,
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
		$('.swiper-wrapper').css({
			'justify-content': 'center',
			'padding-left': '53px',
		});
	}
}

// autoplay 가 아닌 고정 4단 슬라이드
function loadSwiperCol4(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 30,
			slidesPerView: 4,
			slidesPerGroup: 4,
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 배너 전체 보기 팝업용 멀티 컬럼 슬라이드
function loadSwiperMultiCol01(el) {
	var swiperList = $(el + ' .swiper-slide');
	swiperControlWrap = $(el + ' .paging-container');

	if (swiperList.length > 4) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			// slidesPerView: 4,
			// slidesPerGroup: 4,
			// spaceBetween: 0,
			slidesPerView: 2,
			slidesPerColumn: 2,
			spaceBetween: 30,
			on: {
				init: function () {
					var swiper = this;
					$this = $(el);
					var totalNum = (swiper.slides.length % 4) + 2;
					var currentNum = swiper.activeIndex + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this
						.find('.swiper-pagination-total')
						.text(totalNum.slice(-2));
					$this
						.find('.swiper-pagination-current')
						.text(currentNum.slice(-2));
				},
				slideChangeTransitionStart: function () {
					var swiper = this;
					$this = $(el);
					var totalNum = (swiper.slides.length % 4) + 2;
					var currentNum = swiper.activeIndex + 1;
					totalNum = '0' + totalNum;
					currentNum = '0' + currentNum;
					$this
						.find('.swiper-pagination-total')
						.text(totalNum.slice(-2));
					$this
						.find('.swiper-pagination-current')
						.text(currentNum.slice(-2));
				},
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 이미지 카테고리
function loadSwiperImageCategory(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControlWrap = $(el + ' .section-category-control-wrap');
	//컨텐츠의 갯수가 1개 이하일때 swiper를 호출하지 않는다.
	if (swiperList.length > 8) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			simulateTouch: false,
			loop: true,
			slidesPerView: 8,
			spaceBetween: 0,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
		});
	} else {
		swiperList.show();
		swiperControlWrap.hide();
	}
}

// 신상품
function loadSwiperNewArrival(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl = $(el + ' .swiper-controls-wrap'),
		swiperControl1 = $(el + ' .paging-box');
	console.log('swiper : ', swiperList.length);
	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			pagination: {
				el: el + ' .swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: false,
			paginationClickable: true,
			centeredSlides: true,
			spaceBetween: 0,
			slidesPerView: 1,
			on: {
				init: function () {
					var totalNum =
						swiperList.length < 10
							? '0' + swiperList.length
							: swiperList.length;
					$(
						el +
							' .swiper-pagination-count .swiper-pagination-current'
					).text('01');
					$(
						el +
							' .swiper-pagination-count .swiper-pagination-total'
					).text(totalNum);
				},
				slideChangeTransitionStart: function () {
					var loopIndex =
							parseInt(
								$(el + ' .swiper-slide-active').attr(
									'data-swiper-slide-index'
								)
							) + 1,
						currentIndex = this.activeIndex + 1,
						currentNum =
							this.params.loop === false
								? currentIndex < 10
									? '0' + currentIndex
									: currentIndex
								: loopIndex < 10
								? '0' + loopIndex
								: loopIndex;

					$(
						el +
							' .swiper-pagination-count .swiper-pagination-current'
					).text(currentNum);
				},
			},
		});
	} else {
		swiperList.show();
		swiperControl.hide();
		swiperControl1.empty();
	}
}

// 베스트 후기 3단
function loadSwiperBestReviewCol3(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoplay: false,
			/* autoplay: {
				delay: 3000,
			}, */
			pagination: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			spaceBetween: 53,
			slidesPerView: 'auto',
			centeredSlides: true,
		});
	}
	$('.section-best-review')
		.on('mouseenter', function () {
			//swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			//swiperObj.autoplay.start();
		});
}

// 베스트 후기 4단
function loadSwiperBestReviewCol4(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			autoplay: false,
			/* autoplay: {
				delay: 3000,
			}, */
			pagination: false,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// spaceBetween: 40,
			spaceBetween: 0,
			slidesPerView: 'auto',
			centeredSlides: true,
		});
	}
	$('.section-best-review')
		.on('mouseenter', function () {
			//swiperObj.autoplay.stop();
		})
		.on('mouseleave', function () {
			//swiperObj.autoplay.start();
		});
}

// 미디어 쇼핑 빅 영상 이미지 + 3단 상품 유닛
function loadSwiperMediaShopping(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			autoplay: {
				delay: 3000,
			},
			paginationClickable: true,
			spaceBetween: 28,
			slidesPerView: 4,
		});
	}
}

// VR TOUR - 다이나믹 컨텐츠 배너 : 3D 플립 스와이프 slider
function loadSwiper3dDynamicBanner(el) {
	var swiperList = $(el + ' .swiper-slide');
	if (swiperList.length) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			// autoplay: {
			// 	delay: 3000,
			// },
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				stretch: 40,
				depth: 100,
				modifier: 1,
				// slideShadows: true,
			},
			paginationClickable: true,
			// spaceBetween: 28,
			slidesPerView: 3,
			centeredSlides: true,
		});
	}
}

// autoplay 가 아닌 고정 3단 슬라이드
function loadSwiperSingle(el) {
	var swiperList = $(el + ' .swiper-slide'),
		swiperControl = $(el + ' .swiper-controls-wrap');

	if (swiperList.length > 1) {
		var swiperObj = new Swiper(el + ' .swiper-container', {
			loop: true,
			navigation: {
				nextEl: el + ' .swiper-button-next',
				prevEl: el + ' .swiper-button-prev',
			},
			paginationClickable: true,
			spaceBetween: 5,
			slidesPerView: 1,
		});
	} else {
		swiperList.show();
		swiperControl.hide();
	}
}
// 메인 모듈에서 더보기 클릭시 내용 추가와 함께 스크롤 다운 : 200818
// $(document).on('click', '.button-mainmodule-more', function (e) {
// 	e.preventDefault();
// 	var $pos = $(document).scrollTop();
// 	// innerHtml = '<div style="height:500px; background:#ccc"></div>';
// 	// $('.product-item-medium-lists').append(innerHtml);
// 	$('html, body').animate({ scrollTop: $pos + 1 }, 10);
// });

//top banner 모듈 : 200908
$(document)
	.on('click', '.button-open-top-banner', function (e) {
		e.preventDefault();
		var thisT = $(this).closest('.top-banner');
		if (thisT.hasClass('is-active')) {
			thisT.removeClass('is-active');
			thisT.find('.top-banner-area').slideUp('fast');
		} else {
			thisT.addClass('is-active');
			thisT.find('.top-banner-area').slideDown('fast');
		}
	})
	.on('click', '.button-close-top-banner', function (e) {
		e.preventDefault();
		$(this).closest('.top-banner-list').hide();
	});

// 미디어쇼핑 동영상 플레이 : 200909
$(document)
	.on('click', '.button-media-video', function () {
		$(this)
			.hide()
			.closest('.thumb-video')
			.children('.embed-container')
			.show();
	})
	.on('click', '.button-media-video-close', function () {
		$(this).closest('.thumb-video').children('.embed-container').hide();
		$(this).closest('.thumb-video').children('.button-media-video').show();
	});

// 공간 솔루션 : 200910
localStorage.dataSolution = '';
localStorage.dataSolutionName = '원하시는 공간을 설정해주세요.';
// 공간솔루션 툴팁 위치값 배열
var solutionTipLoc = [
	[65, 121],
	[188, 196],
	[207, 285],
	[65, 333],
	[90, 282],
	[0, 185],
];
$(document)
	.on('mouseenter', '.svg-link-item', function () {
		var $thisTip = $('.solution-tooltip');
		var thisSol = $(this).data('solution');
		var thisName = $(this).data('name');

		$('.solution-img-bg').removeClass('is-active');
		$('.solution-img-bg__' + thisSol).addClass('is-active');
		// $thisTip.css(solutionTipLoc[thisSol + 1]).text(thisName);
		var topStr = solutionTipLoc[thisSol - 1][0] + 'px';
		var leftStr = solutionTipLoc[thisSol - 1][1] + 'px';
		$thisTip.css({ top: topStr, left: leftStr }).text(thisName);
	})
	.on('mouseleave', '.solution-img-wrap', function () {
		var $thisTip = $('.solution-tooltip');
		var thisSol = localStorage.dataSolution;
		var thisName = localStorage.dataSolutionName;
		var topStr, leftStr;
		if (thisSol == '' || thisSol == undefined) {
			thisSol = 1;
			topStr = solutionTipLoc[5][0] + 'px';
			leftStr = solutionTipLoc[5][1] + 'px';
		} else {
			topStr = solutionTipLoc[thisSol - 1][0] + 'px';
			leftStr = solutionTipLoc[thisSol - 1][1] + 'px';
		}
		if (thisName == '' || thisName == undefined) {
			thisName = '원하시는 공간을 설정해주세요.';
		}
		$('.solution-img-bg').removeClass('is-active');
		$('.solution-img-bg__' + thisSol).addClass('is-active');
		$thisTip.css({ top: topStr, left: leftStr }).text(thisName);
	})
	.on('click', '.svg-link-item', function () {
		localStorage.dataSolution = $(this).data('solution');
		localStorage.dataSolutionName = $(this).data('name');
		$('.solution-title > span').removeClass('is-active');
		$('.solution-title__' + localStorage.dataSolution).addClass(
			'is-active'
		);
		$('.solution-option-item > div').removeClass('is-active');
		$('#solution-option-item__' + localStorage.dataSolution)
			.addClass('is-active')
			.find('.button')
			.eq(0)
			.addClass('is-active')
			.siblings('.button')
			.removeClass('is-active');
		$('.solution-option-brand > div').removeClass('is-active');
		$('#solution-option-brand__' + localStorage.dataSolution)
			.addClass('is-active')
			.find('.button')
			.eq(0)
			.addClass('is-active')
			.siblings('.button')
			.removeClass('is-active');
	})
	.on('click', '.solution-option-menu .button', function () {
		$(this)
			.addClass('is-active')
			.siblings('.button')
			.removeClass('is-active');
		if (
			$(this).attr('data-sub') != '' &&
			$(this).attr('data-sub') != undefined
		) {
			$('.solution-option-brand > div').removeClass('is-active');
			$('#solution-option-brand__' + $(this).data('sub'))
				.addClass('is-active')
				.find('.button')
				.eq(0)
				.addClass('is-active')
				.siblings('.button')
				.removeClass('is-active');
		}
		if (
			$(this).attr('data-solution') != '' &&
			$(this).attr('data-solution') != undefined
		) {
			$('.solution-option-brand > div').removeClass('is-active');
			$('#solution-option-brand__' + $(this).data('solution'))
				.addClass('is-active')
				.find('.button')
				.eq(0)
				.addClass('is-active')
				.siblings('.button')
				.removeClass('is-active');
		}
	});

// 커뮤니티-오픈하우스 상단 아이콘 리스트
$(document).on('click', '.icon-category-item > a', function (e) {
	e.preventDefault();
	$(this)
		.closest('.icon-category-lists')
		.find('.icon-category-item > a')
		.removeClass('is-active');
	$(this).addClass('is-active');
});

// 윙배너 스크롤 포지션
function setWingBannerScroll(el, top) {
	$el = $(el);
	var footer_top = $('#footer').offset().top;
	var scroll_top = $(window).scrollTop();
	if (top === undefined || top == '') {
		top = 810;
	}
	if ($('.top-banner').length) {
		var topBannerH = $('.top-banner').outerHeight();
		console.log('topBannerH :', topBannerH);
		top += topBannerH;
	}
	var topPx = top + 'px';

	if (scroll_top < top - 20) {
		$el.css({ position: 'absolute', top: topPx });
	} else {
		$el.css({ position: 'fixed', top: '20px' });
	}
}

$(function () {
	// 와이드 이미지를 중앙 정렬 시킴 : 201027
	if ($('.top-banner-default').length) {
		var topBannerDefault = $('.top-banner-default');
		var imgSrc = topBannerDefault.find('img').attr('src');
		topBannerDefault.children('img').css({ visibility: 'hidden' });
		topBannerDefault.css({ 'background-image': 'url(' + imgSrc + ')' });
	}
	if ($('.top-banner-area').length) {
		var topBannerArea = $('.top-banner-area');
		var imgSrc = topBannerArea.find('img').attr('src');
		topBannerArea.children('img').css({ visibility: 'hidden' });
		topBannerArea.css({ 'background-image': 'url(' + imgSrc + ')' });
	}
});
