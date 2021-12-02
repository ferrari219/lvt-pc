'use strict';

// S: Dynamic Tab + Content -- jQuery
$(function () {
	// show/hide 처리
	$(document).on('click', '[role="show"]', function (event) {
		event = event || window.event;
		event.preventDefault
			? event.preventDefault()
			: (event.returnValue = false);

		// 선택된 탭 활성화
		$('#' + $(this).attr('aria-controls'))
			.removeAttr('hidden')
			.attr({ tabindex: '0', 'aria-hidden': 'false' })
			.addClass('is-active')
			// 기존 탭 패널 비활성화
			.siblings('.showpanel')
			.attr({ tabindex: '-1', 'aria-hidden': 'true', hidden: '' })
			.removeClass('is-active');
	});

	// let tabFocus = 0;
	$(document).on('click', '[role="tab"]', function (event) {
		event = event || window.event;
		event.preventDefault
			? event.preventDefault()
			: (event.returnValue = false);

		// 선택된 탭 활성화
		tabActivate($(this));
		// 탭 하위에 탭이 존재하는 경우 초기화 처리
		var $thisChildren = $('#' + $(this).attr('aria-controls')).find(
			'[role="tablist"]'
		);
		if ($thisChildren.length) {
			tabActivate(
				$thisChildren.children().eq(0).children('[role="tab"]')
			);
			$('#' + $(this).attr('aria-controls')).removeAttr('tabindex');
		}
	});

	$(document).on('keydown', '[role="tab"]', function (event) {
		event = event || window.event;
		var keycode = event.keyCode || event.which;
		var tabsLength = $(this).children('li').length;
		if (keycode === 39 || keycode === 37) {
			var firstEl = $(this)
				.closest('[role="tablist"]')
				.children('li')
				.eq(0)
				.children('[role="tab"]');
			var lastEl = $(this)
				.closest('[role="tablist"]')
				.children('li')
				.eq(tabsLength - 1)
				.children('[role="tab"]');
			$(this).parent('li').addClass('');
			if (keycode === 39) {
				$(this).parent('li').next().children('[role="tab"]').focus();
				if (!$(this).parent('li').next().length) {
					firstEl.focus();
				}
			} else if (keycode === 37) {
				$(this).parent('li').prev().children('[role="tab"]').focus();
				if (!$(this).parent('li').prev().length) {
					lastEl.focus();
				}
			}
		}
	});

	// 상품유닛용 툴팁 선언을 위한 스크립트 : 200701
	if ($('[data-toggle="tooltip"]').length) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	// Collapse 처리
	// 초기화
	$('.is-collapsible').each(function () {
		if ($(this).hasClass('is-active')) {
			$(this).attr({ 'aria-expanded': 'true' });
		} else {
			$(this).attr({ 'aria-expanded': 'false' }).css({ display: 'none' });
		}
	});
	$('[data-action="collapse"]').each(function () {
		if ($($(this).attr('href')).hasClass('is-active')) {
			$(this).addClass('is-active');
		} else {
			$(this).removeClass('is-active');
		}
	});
	// collapse 작동
	$(document).on('click', '[data-action="collapse"]', function (event) {
		event = event || window.event;
		event.preventDefault
			? event.preventDefault()
			: (event.returnValue = false);
		var $target = $($(this).attr('href'));
		// 아코디언 형태인 경우
		if (
			$target.data('parent') !== undefined &&
			$target.data('parent') != ''
		) {
			var accordionParent = $target.data('parent');

			if ($(this).hasClass('is-active')) {
				$target
					.closest('#' + accordionParent)
					.find('.is-collapsible')
					.each(function () {
						if ($(this).hasClass('is-active')) {
							$(this)
								.attr({ 'aria-expanded': 'false' })
								.removeClass('is-active')
								.slideUp('fast');
						}
					});
				$(this).removeClass('is-active');
				$target
					.attr({ 'aria-expanded': 'false' })
					.removeClass('is-active')
					.slideUp('fast');
			} else {
				$target
					.closest('#' + accordionParent)
					.find('[data-action="collapse"]')
					.removeClass('is-active');
				$target
					.closest('#' + accordionParent)
					.find('.is-collapsible')
					.removeClass('is-active')
					.delay(10)
					.slideUp('fast');
				$(this).addClass('is-active');
				$target
					.attr({ 'aria-expanded': 'true' })
					.addClass('is-active')
					.stop()
					.slideDown('fast');
			}
		}
		// 일반 collapse 인 경우
		else {
			if ($(this).hasClass('is-active')) {
				$(this).removeClass('is-active');
				$target
					.attr({ 'aria-expanded': 'false' })
					.removeClass('is-active')
					.slideUp('fast');
			} else {
				$(this).addClass('is-active');
				$target
					.attr({ 'aria-expanded': 'true' })
					.addClass('is-active')
					.stop()
					.slideDown('fast');
			}
		}
	});
});

// 장바구니 수량 증감
$(document)
	.on(
		'click',
		'.spinner-box:not(.spinner-box__not) .spinner-box__plus',
		function (e) {
			var countVal = parseInt(
				$(this).closest('.spinner-box').find('input[type=number]').val()
			);
			var toCountVal = countVal + 1;
			if (toCountVal > 99) {
				// alert('구매수량은 100개 이상이 될 수 없습니다.');
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(99);
			} else if (toCountVal <= 1) {
				// alert('구매수량은 1개 이상이어야 합니다.');
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(1);
			} else {
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(toCountVal);
			}
		}
	)
	.on(
		'click',
		'.spinner-box:not(.spinner-box__not) .spinner-box__minus',
		function (e) {
			var countVal = parseInt(
				$(this).closest('.spinner-box').find('input[type=number]').val()
			);
			var toCountVal = countVal - 1;
			if (toCountVal > 99) {
				// alert('구매수량은 100개 이상이 될 수 없습니다.');
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(99);
			} else if (toCountVal <= 1) {
				// alert('구매수량은 1개 이상이어야 합니다.');
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(1);
			} else {
				$(this)
					.closest('.spinner-box')
					.find('input[type=number]')
					.val(toCountVal);
			}
		}
	);

function tabActivate(thisEl) {
	thisEl
		.closest('[role="tablist"]')
		.children()
		.children('[aria-selected="true"]')
		.attr({
			tabindex: '-1',
			'aria-selected': 'false',
		});
	thisEl.parent().addClass('is-active').siblings().removeClass('is-active');
	thisEl.attr({
		tabindex: '0',
		'aria-selected': 'true',
	});
	// 연관된 탭 패널 활성화
	$('#' + thisEl.attr('aria-controls'))
		.removeAttr('hidden')
		.attr('tabindex', '0')
		.addClass('is-active') // 기존 탭 패널 비활성화
		.siblings('.tabpanel')
		.attr({ tabindex: '-1', hidden: '' })
		.removeClass('is-active');
	console.log($('#' + thisEl.attr('aria-controls')));
}
// E : Dynamic Tab + Content -- jQuery

// S : fixed 스크롤 체크 - 20200601
var isIE = /*@cc_on!@*/ false || !!document.documentMode;
var position;
// IE11 을 제외하고 resize (left-menu 같은 높이값이 높은 요소에만 적용)
function initScrollCheckLeftMenu() {
	if (
		!isIE &&
		$('.left-menu').length &&
		$('#container').length &&
		$('#footer').length
	) {
		if (!(typeof ResizeObserver === 'undefined')) {
			let resizeObserver = new ResizeObserver(function () {
				var footer_top = $('#footer').offset().top;
				var scroll_top = $(window).scrollTop();
				var locationHeight = $('.location-header').height();
				if (locationHeight === undefined) {
					locationHeight = 0;
				}
				var container_height =
					$('#container').innerHeight() - locationHeight - 50;
				// check_scroll_fixed('', '.section-contents-wrap', '.left-menu');
				if (container_height < $('.left-menu').outerHeight()) {
					$('.left-menu').css({ position: 'relative', top: 'unset' });
				}
			});
			const elem = document.querySelector('.left-menu');
			resizeObserver.observe(elem);
		}
	}
}
$(function () {
	initScrollCheckLeftMenu();
});
// scroll Up and Down Check
function check_scroll_updown(scr, ths) {
	if (scr > position) {
		// scrollDown Check
		ths.css({
			position: 'fixed',
			top: $(window).innerHeight() - ths.outerHeight() + 'px',
		});
	} else {
		// scrollUp	Check
		ths.css({ position: 'fixed', top: '0px' });
	}
	position = scr;
}
function check_scroll_fixed(_mode, _wrapper, _this) {
	// fixed 일 경우 true 반환
	// _mode 가 simple 일 경우는 left-menu 처럼 높이 값을 체크해서 position 변화할 필요가 없는 단순 고정
	var wrapper_top = $(_wrapper).offset().top;
	var scroll_top = $(window).scrollTop();
	var scroll_btm = scroll_top + $(window).innerHeight();
	if ($('#container').length && $('#footer').length) {
		var footer_top = $('#footer').offset().top;
		var locationHeight = $('.location-header').height();
		if (locationHeight === undefined) {
			locationHeight = 0;
		}
		var container_height =
			$('#container').innerHeight() - locationHeight - 60;
		if (scroll_top > wrapper_top) {
			$(_wrapper).addClass('is-fixed');
			if (_mode.indexOf('simple') !== -1) {
				$(_this).css({ position: 'fixed', top: '0' });
				// 기획전, 이벤트 등 4뎁스 탭 padding-top 속성 수정 : 20200622
				if (_mode == 'simple-padding') {
					$(_wrapper).css({
						'padding-top': $(_this).outerHeight() + 'px',
					});
				}
			} else {
				// this-height 이 윈도 height 보다 작은 경우 스크롤 다운/업 이벤트 작동 중지
				if (container_height > $(_this).outerHeight() + 40) {
					if ($(_this).outerHeight() > footer_top - scroll_top) {
						check_scroll_updown(scroll_top, $(_this));
						if (scroll_btm > footer_top) {
							$(_wrapper).removeClass('is-fixed');
							$(_this).css({
								top:
									-scroll_btm +
									footer_top -
									$(_this).outerHeight() +
									$(window).innerHeight() +
									'px',
							});
						}
					} else {
						if ($(_this).outerHeight() > $(window).innerHeight()) {
							check_scroll_updown(scroll_top, $(_this));
						} else {
							$(_this).css({ position: 'fixed', top: '0' });
						}
					}
				}
			}
			if (
				_mode.indexOf('simple') !== -1 &&
				scroll_top > footer_top - $(_this).outerHeight()
			) {
				$(_this).css({ position: 'relative', top: 'initial' });
				$(_wrapper).removeClass('is-fixed');
				// 기획전, 이벤트 등 4뎁스 탭 padding-top 속성 수정 : 20200622
				if (_mode == 'simple-padding') {
					$(_wrapper).css({ 'padding-top': '' });
				}
			}
		} else {
			$(_this).css({ position: 'relative', top: 'initial' });
			$(_wrapper).removeClass('is-fixed');
			// 4뎁스 탭 padding-top 속성 추가 : 20200616
			$(_wrapper).css({ 'padding-top': '' });
		}
	}
}
$(document).ready(function () {
	// IE11 의 경우 fixed 후 top 값을 변화시키는 스크롤 동작시 끊김현상이 심해 스크롤하지 않고 고정.
	if ($('.left-menu').length && !isIE) {
		// check_scroll_fixed('', '.section-contents-wrap', '.left-menu');
		// $(window)
		//   .on('scroll', function () {
		//     check_scroll_fixed('', '.section-contents-wrap', '.left-menu');
		//   })
		//   .on('resize', function () {
		//     check_scroll_fixed('', '.section-contents-wrap', '.left-menu');
		//   });
	}
	if ($('.section-category-item__relation').length) {
		// check_scroll_fixed(
		//   'simple',
		//   '.section-category-item-search',
		//   '.section-category-item__relation'
		// );
		// $(window)
		//   .on('scroll', function () {
		//     check_scroll_fixed(
		//       'simple',
		//       '.section-category-item-search',
		//       '.section-category-item__relation'
		//     );
		//   })
		//   .on('resize', function () {
		//     check_scroll_fixed(
		//       'simple',
		//       '.section-category-item-search',
		//       '.section-category-item__relation'
		//     );
		//   });
	}
});

// 폐쇄몰 용 fixed 체크 : 200908
function check_closed_scroll_fixed(_wrapper, _this) {
	var wrapper_top = $(_wrapper).offset().top;
	var scroll_top = $(window).scrollTop();
	var scroll_btm = scroll_top + $(window).innerHeight();
	if ($('#container').length && $('#footer').length) {
		var footer_top = $('#footer').offset().top;
		var container_height = $('#container').innerHeight() - 60;
		if (scroll_top > wrapper_top) {
			$(_wrapper).addClass('is-fixed');
			$(_this).css({ position: 'fixed', top: '0' });
			$(_wrapper).css({ 'padding-top': $(_this).outerHeight() + 'px' });

			if (scroll_top > footer_top - $(_this).outerHeight()) {
				$(_this).css({ position: 'relative', top: 'initial' });
				$(_wrapper).removeClass('is-fixed');
				$(_wrapper).css({ 'padding-top': '' });
			}
		} else {
			$(_this).css({ position: 'relative', top: 'initial' });
			$(_wrapper).removeClass('is-fixed');
			$(_wrapper).css({ 'padding-top': '' });
		}
	}
}
// E : fixed 스크롤 체크

// S : a 태그의 href 를 이용해 현재 페이지 스크롤 처리 : 20200615
$(document).on('click', '.tab-block-item > a[href^="#"]', function (e) {
	// target element id
	var id = $(this).attr('href');

	// target element
	var $id = $(id);
	if ($id.length === 0) {
		return;
	}

	// prevent standard hash navigation (avoid blinking in IE)
	e.preventDefault();

	// top position relative to the document
	var pos = $id.offset().top;

	// animated top scrolling
	$('body, html').animate({ scrollTop: pos });
});
// E : a 태그의 href 를 이용해 현재 페이지 스크롤 처리

// S : Dropdowns
// Functions

function getAll(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

var $dropdowns = getAll('.dropdown:not(.is-hoverable)');
$(document)
	.on('click', function (e) {
		if (!$(e.target).closest('.dropdown').length) {
			$('.dropdown.is-active').removeClass('is-active');
		}
	})
	.on('mouseenter focus', '.dropdown-trigger .button', function (e) {
		$('.dropdown').removeClass('is-hover');
		$(this).closest('.dropdown').addClass('is-hover');
	})
	.on('mouseleave', '.dropdown-trigger .button', function (e) {
		$(this).closest('.dropdown').removeClass('is-hover');
	})
	.on('click', '.dropdown-trigger .button', function (e) {
		e.preventDefault();
		$('.dropdown:not(.is-hover)').removeClass('is-active');
		if ($(this).closest('.dropdown').hasClass('is-active')) {
			$(this).closest('.dropdown').removeClass('is-active');
		} else {
			$(this).closest('.dropdown').addClass('is-active');
		}
	})
	.on('click', '.dropdown-item', function (e) {
		// 드롭다운 관련 추가 : 드롭다운 dropdown 아이템 아이콘 관련 이벤트 처리
		if ($(this).hasClass('is-icon')) {
			$(this).addClass('is-active').siblings().removeClass('is-active');
			$(this)
				.closest('.dropdown')
				.find('[aria-controls="dropdown-menu"]')
				.children('span')
				.eq(0)
				.empty()
				.append($(this).children().clone());
			$(this)
				.closest('.dropdown')
				.find('[aria-controls="dropdown-menu"]')
				.children('span')
				.eq(0)
				.append($(this).text());
		} else {
			$(this).addClass('is-active').siblings().removeClass('is-active');
			$(this)
				.closest('.dropdown')
				.find('[aria-controls="dropdown-menu"]')
				.children('span')
				.eq(0)
				.text($(this).text());
		}

		var dropdownWidth = $(this).outerWidth();
		if ($('.header-search__dropdown').length) {
			$(this)
				.closest('.header-search__dropdown')
				.css('min-width', dropdownWidth)
				.find('.dropdown')
				.css('width', 'auto');
		}
		$('.dropdown.is-active').removeClass('is-active');
	});

function closeDropdowns() {
	$dropdowns.forEach(function ($el) {
		$el.classList.remove('is-active');
	});
}
// E : Dropdowns
// Modals : 20200602
// Modal Open
// modal 액션시 tab-index 추가 및 포커스 새 레이어로 이동 : 200722
$(document).on('click', '.modal-button', function (e) {
	e.preventDefault();
	var target = '#' + $(this).data('target');
	$('html').addClass('is-clipped');
	$(target).addClass('is-active').attr('tabindex', 0).focus();
});
// modal 상태에서 띄워주는 modal 호출 버튼 : 200710
$(document).on('click', '.modal-button-this', function (e) {
	e.preventDefault();
	var target = '#' + $(this).data('target');
	$(target).addClass('is-active').attr('tabindex', 0).focus();
});
// Modal Close
$(document).on(
	'click',
	'.modal-background, .modal-close, .modal-card-head .delete, .modal .button-modal-close',
	function (e) {
		closeModals();
	}
);
// modal 상태에서 띄워져 있는 modal 닫기 버튼 : 200710
$(document).on(
	'click',
	'.modal-background-this, .modal-close-this',
	function (e) {
		$(this).closest('.modal').removeClass('is-active');
	}
);
function closeModals() {
	$('html').removeClass('is-clipped');
	$(document).find('.modal').removeClass('is-active');
}
$(document).on('keydown', function (event) {
	var e = event || window.event;
	if (e.keyCode === 27) {
		closeModals();
		// closeDropdowns();
		$('.dropdown.is-active').removeClass('is-active');
	}
});
document.addEventListener('keydown', function (event) {
	var e = event || window.event;
	if (e.keyCode === 27) {
		closeModals();
		closeDropdowns();
	}
});

// S : 상단 헤더 통합검색 바
var skeyIndex = -1;
function schUpdate(i) {
	var schLi = $('#headerSearchKeyword .header-search-content__body ul li');
	console.log(i, skeyIndex, schLi.length, schLi);
	if (skeyIndex === -1) return schLi.siblings().removeClass('is-on');
	return schLi.eq(i).addClass('is-on').siblings().removeClass('is-on');
}
$(function () {
	schUpdate(skeyIndex);
});
$(document)
	.on('click', function (e) {
		if (!$(e.target).closest('.header-search-wrap').length) {
			$('.header-search-content').hide();
		}
		if ($(e.target).closest('.dropdown-wrap').length) {
			$('.header-search-content').hide();
		}
	})
	.on('click', '.header-search__input', function (e) {
		e.preventDefault();
		skeyIndex = idx = -1;
		if (!$('body').hasClass('__header-search-keyword')) {
			$('#headerSearchContent').show();
		}
	})
	.on('click', '.button-search-content__del', function (e) {
		e.stopPropagation();
		$(this).closest('li').remove();
	})
	.on('click', '.button-search-all__del', function (e) {
		e.preventDefault();
		$(this)
			.closest('.tabpanel')
			.find('.header-search-content__body li')
			.remove();
	})
	.on('click', '.button-search-content__close', function (e) {
		e.preventDefault();
		$(this).closest('.header-search-content').hide();
	})
	.on('keydown keyup', '.header-search-wrap form', function (event) {
		var e = event || window.event;
		if (e.keyCode === 13) {
			$('.dropdown.is-active').removeClass('is-active');
		}
	})
	.on('keyup', '.header-search__input', function (e) {
		var schLi = $(
			'#headerSearchKeyword .header-search-content__body ul li'
		);
		if ($(this).val() != '') {
			$('#headerSearchContent').hide();
			$('#headerSearchKeyword').show();
			$('body').addClass('__header-search-keyword');

			// S: 자동완성 키보드 제어

			if ($('#headerSearchKeyword').show()) {
				if (e.keyCode === 38) {
					//up
					if (skeyIndex > 0) {
						skeyIndex--;
					} else {
						skeyIndex = schLi.length - 1;
					}
				} else if (e.keyCode === 40) {
					//down
					if (skeyIndex < schLi.length - 1) {
						skeyIndex++;
					} else {
						skeyIndex = 0;
					}
				} else {
					skeyIndex = -1;
				}
				schUpdate(skeyIndex);
				// console.log(skeyIndex);
			}
			// E: 자동완성 키보드 제어
		} else {
			$('#headerSearchContent').show();
			$('#headerSearchKeyword').hide();
			skeyIndex = -1;
			schUpdate(skeyIndex);
			$('body').removeClass('__header-search-keyword');
		}
	});
// E : 상단 헤더 통합검색 바

document.addEventListener('DOMContentLoaded', function () {
	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	// Utils
	function removeFromArray(array, value) {
		if (array.includes(value)) {
			var value_index = array.indexOf(value);
			array.splice(value_index, 1);
		}

		return array;
	}
	Array.prototype.diff = function (a) {
		return this.filter(function (i) {
			return a.indexOf(i) < 0;
		});
	};
});

// S : 상단 GNB 브랜드
// var $oneDepth = $('.gnb-brand-menu > li'),
//       $header = $('.header-top');

// $oneDepth.mouseenter(function (e) {
//             e.preventDefault();
//             // console.log('enter');
//             $(this).addClass('is-active')
//                 .siblings().removeClass('is-active');
// })
// $oneDepth.mouseleave(function (e) {
//             // console.log('leave');
//             $oneDepth.siblings().removeClass('is-active');
// })
// 201230 UI변경으로 삭제
/* : 홈 없는 경우 사이즈
// 기본 디폴트
var gnb_brand_menu_width = [263, 251, 251, 251, 350];
// 해외프리미엄브랜드 active
var gnb_brand_menu_width_active = [127, 112, 112, 112, 901];
*/
/* 201105
// 기본 디폴트
var gnb_brand_menu_width = [250, 238, 238, 238, 332];
// 해외프리미엄브랜드 active
var gnb_brand_menu_width_active = [127, 112, 112, 112, 833];
*/
// 201122 : 가구 통합, 해외브랜드 수정
// 기본 디폴트
// var gnb_brand_menu_width = [295, 295, 295, 411];
// // 해외프리미엄브랜드 active
// var gnb_brand_menu_width_active = [170, 155, 161, 810];

// function setGnbBrandMenuWidth(mode) {
// 	for (var ii = 0; ii < 6; ii++) {
// 		if (mode == 'default') {
// 			// 초기 상태로
// 			$('.gnb-brand-menu__li')
// 				.eq(ii)
// 				.children('.gnb-brand-menu__btn')
// 				.css({ width: gnb_brand_menu_width[ii] + 'px' });
// 		} else {
// 			// 해외 프리미엄 브랜드.planning-tabs').length
// 			$('.gnb-brand-menu__li')
// 				.eq(ii)
// 				.children('.gnb-brand-menu__btn')
// 				.css({ width: gnb_brand_menu_width_active[ii] + 'px' });
// 		}
// 	}
// }

// $(document)
// 	.on('mouseenter', '.gnb-brand-menu__li', function () {
// 		// 해외 프리미엄 홈퍼니싱
// 		if ($(this).index() == 3) {
// 			setGnbBrandMenuWidth('premium');
// 		} else {
// 			setGnbBrandMenuWidth('default');
// 		}
// 		$(this).addClass('is-active').siblings('li').removeClass('is-active');
// 	})
// 	.on('mouseleave', '.gnb-brand-menu__li', function () {
// 		// 해외 프리미엄 홈퍼니싱
// 		if ($(this).index() == 3) {
// 			setGnbBrandMenuWidth('premium');
// 		} else {
// 			setGnbBrandMenuWidth('default');
// 		}
// 		$(this).removeClass('is-active');
// 	});

// var gnbBrandMenuIndex;
// $(function () {
// 	$('.gnb-brand-menu__li').each(function () {
// 		if ($(this).hasClass('is-active')) {
// 			gnbBrandMenuIndex = $(this).index();
// 		}
// 	});
// 	if (gnbBrandMenuIndex == 3) {
// 		// 해외 프리미엄 브랜드
// 		setGnbBrandMenuWidth('premium');
// 	} else {
// 		setGnbBrandMenuWidth('default');
// 	}
// 	$('.gnb-brand-menu__li').eq(gnbBrandMenuIndex).addClass('is-active');
// });
// $(document).on('mouseleave', '.gnb-brand-menu', function () {
// 	if (gnbBrandMenuIndex == 3) {
// 		// 해외 프리미엄 브랜드
// 		setGnbBrandMenuWidth('premium');
// 	} else {
// 		setGnbBrandMenuWidth('default');
// 	}
// 	$(this).children('li').eq(gnbBrandMenuIndex).addClass('is-active');
// });
// E : 상단 GNB 브랜드

// 제목 글자수 카운트 : 200904
$(document).on('keydown', '[maxlength]', function () {
	var content = $(this).val();
	var thisMaxL = $(this).attr('maxlength');

	if (content.length > thisMaxL) {
		alert('최대 ' + thisMaxL + '자까지 입력 가능합니다.');
		$(this).val(content.substring(0, thisMaxL));
		return;
	}
});

// 푸터 패밀리 링크 열기
$(document).on('click', '.button-family-site', function () {
	$(this).parent().toggleClass('is-active');
});

// 기획전 상세 등 스크롤 영역 체크해서 active 표시 해 주기 : 200914
function scroll_area_check() {
	var scroll_top = $(window).scrollTop();
	if ($('[role="scrollcheck"]').length) {
		$('[role="scrollcheck"]').each(function () {
			var thisTarget = $(this).attr('href');

			if (
				thisTarget.substring(0, 1) === '#' &&
				$(thisTarget) != undefined
			) {
				var itemTop = $(thisTarget).offset().top - 10;
				if (scroll_top > itemTop) {
					$('[role="scrollcheck"]').parent().removeClass('is-active');
					$('[href="' + thisTarget + '"]')
						.parent()
						.addClass('is-active');
				}
			}
		});
	}
}
$(window).on('scroll', function () {
	if ($('[role="scrollcheck"]').length) {
		scroll_area_check();
	}
});

$(function () {
	// 와이드 이미지를 중앙 정렬 시킴 .image-center-fit 에 대한 정의 : 200922
	if ($('.image-center-fit').length) {
		$('.image-center-fit').each(function () {
			var imgSrc = $(this).children('img').attr('src'),
				imgHeight = $(this).children('img').height();
			$(this).children('img').css({ visibility: 'hidden' });
			$(this).css({ 'background-image': 'url(' + imgSrc + ')' });
			$(this).height(imgHeight);
		});
	}

	// twentytwenty 비포/애프터 이미지 비교시 사진 높이 맞추기 : 200924
	/*
	if ($('.twentytwenty-container').length) {
		$('.twentytwenty-container').each(function () {
			var minHeight = [];
			$(this)
				.children('img')
				.each(function () {
					var imgHeight = $(this).height();
					minHeight.push(imgHeight);
				});
			var minH = Math.min.apply(null, minHeight);
			$(this).height(minH);
			$(this).children('img').height(minH);
		});
	}
	*/
	// 제품상세 정보가 1300px 보다 작을 경우 pitem-main-info 하단의 상품정보 더보기 노출 안함.
	// 210115 신대리 요청으로 추가
	var checkMainInfo;
	var checkMainInfoCnt = 0;
	checkMainInfo = setInterval(function () {
		checkMainInfoCnt++;
		try {
			if ($('#pitem-main-info').length) {
				if (
					$('#pitem-main-info').hasClass('is-active') ||
					checkMainInfoCnt >= 10
				) {
					clearInterval(checkMainInfo);
				}
				if ($('#pitem-main-info').height() < 1300) {
					$('.pitem-detail-button').hide();
				} else {
					$('.pitem-detail-button').show();
				}
				console.log(checkMainInfo, checkMainInfoCnt);
			}
		} catch (e) {}
	}, 200);
});

// 맨 위로 이동 클릭 : 201112
$(document).on('click', '.button-quick-top', function (e) {
	e.preventDefault();
	$('body, html').animate({ scrollTop: 0 });
});

// 3초뒤 탑배너 닫힘
$(function () {
	function dev_bannerClose() {
		var $topBanner = $('#dev_top-banner > .top-banner-list');
		$topBanner.removeClass('is-active');
	}
	var interval = setInterval(dev_bannerClose, 3000);
	setTimeout(function () {
		clearInterval(interval);
	}, 4000);
});

// 윙배너 1개 등록시 좌우화살표 미노출, 높이 조정
$(function () {
	var n = $('#main-wingbanner ul li').length;
	if (n == 1) {
		$('.wing-banner')
			.css({ height: '242px' })
			.find('.swiper-controls-wrap')
			.css({ display: 'none' });
	}
});
