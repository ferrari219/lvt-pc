if ($('.ex_0401').length) {
	var link = $('.sticky_tab a');
	link.on('click', function (e) {
		var target = $($(this).attr('href'));
		$('html, body').animate(
			{
				scrollTop: target.offset().top - 135,
			},
			600
		);
		// $(this).addClass('active');
		e.preventDefault();
	});
	$(window).on('scroll', function () {
		findPosition();
	});
	function findPosition() {
		var winScrollTop = $(window).scrollTop();
		$('section').each(function () {
			var thisH = $(this).height() - 150;
			if ($(this).offset().top - 140 < winScrollTop && $(this).offset().top + thisH > winScrollTop) {
				$('.sticky_tab')
					.find('[data-scroll="' + $(this).attr('id') + '"]')
					.addClass('active');
			} else {
				$('.sticky_tab')
					.find('[data-scroll="' + $(this).attr('id') + '"]')
					.removeClass('active');
			}
		});
	}
	$(document).ready(function () {
		findPosition();
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});

	$('.accordion a').on('click', function () {
		if ($('.accordion').hasClass('open')) {
			$('.accordion').removeClass('open');
		} else {
			$('.accordion').addClass('open');
		}
	});

	// 그랜드오픈 오픈이벤트 용 스크롤 픽스
	$(window).on('scroll', function () {
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});
}
