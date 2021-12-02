// 오픈이벤트용 js
$(document).ready(function() {
	$(".add_accordion .btn").on("click", function() {
		if ($(".add_accordion").hasClass("open")) { 
			$(".add_accordion").removeClass("open");
		}
		else {
			$(".add_accordion").addClass("open");
		}
	});

	$(".event_0101 .accordion a").on("click", function() {
		if ($(".accordion").hasClass("open")) { 
			$(".accordion").removeClass("open");
		}
		else {
			$(".accordion").addClass("open");
		}
	});
});

// 이리온 오픈 이벤트용 카운트 다운 : 201125
if ($('#countdown-time-module').length) {
	CountDownEventTimer('countdown-time-module');
}
function CountDownEventTimer(id) {
	var now = new Date();
	var curY = now.getFullYear();
	var curM = now.getMonth() + 1;
	var curD = now.getDate();
	var end = new Date(curY, curM, curD, 24, 0, 0, 0);
	// console.log("end  :", now);
	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;
	var timer;

	function showRemaining() {
		var now = new Date();
		var distance = end - now;
		if (distance < 0) {
			clearInterval(timer);
			document.getElementById(id).innerHTML = '00 : 00 : 00';
			return;
		}
		var hours = '0' + Math.floor((distance % _day) / _hour);
		var minutes = '0' + Math.floor((distance % _hour) / _minute);
		var seconds = '0' + Math.floor((distance % _minute) / _second);
		document.getElementById(id).innerHTML = '<span>' + hours.slice(-2) + ' : ' + minutes.slice(-2) + ' : ' + seconds.slice(-2) + '</span>';
	}
	timer = setInterval(showRemaining, 1000);
}
/*
function CountDownEventTimer(dt, id) {
	var arrCount = dt.split(':');
	var _second = parseInt(arrCount[2]);
	var _minute = parseInt(arrCount[1]);
	var _hour = parseInt(arrCount[0]);
	var timer;
	var timeAmount = _hour * 3600 + _minute * 60 + _second;

	function showRemaining() {
		var hours, minutes, seconds;
		if (timeAmount <= 0) {
			clearInterval(timer);
			document.getElementById(id).innerHTML = '00 : 00 : 00';
			return;
		}
		if (timeAmount >= 3600) {
			hours = parseInt(timeAmount / 3600);
		} else {
			hours = 0;
		}
		var timeRemain1 = timeAmount - (hours * 3600);
		if (timeRemain1 >= 60) { 
			minutes = parseInt(timeRemain1 / 60);
		} else {
			minutes = 0;
		}
		seconds = timeRemain1 - (minutes * 60);
		hours = '0' + hours;
		minutes = '0' + minutes;
		seconds = '0' + seconds;
		document.getElementById(id).innerHTML = '<span>' + hours.slice(-2) + ' : ' + minutes.slice(-2) + ' : ' + seconds.slice(-2) + '</span>';
		timeAmount--;
	}
	timer = setInterval(showRemaining, 1000);
}*/

if ($('.event_0101').length) {
	$(document).on('click','.tab a',function(event){
		var targetHash = $(this).attr('href');
		event.preventDefault();
		$("html,body").animate({
			scrollTop : $(targetHash).offset().top - 215
		},300)
	});
}
if ($('.event_0201').length) {
	$(document).on('click','.tab a',function(event){
		var targetHash = $(this).attr('href');
		event.preventDefault();
		$("html,body").animate({
			scrollTop : $(targetHash).offset().top
		},300)
	});
}
if ($('.event_0401').length) {
	
	var link = $('.sticky_tab a');
    link.on('click',function(e){
        var target = $($(this).attr('href')); 
        $('html, body').animate({
            scrollTop: target.offset().top - 135
        },600);
        // $(this).addClass('active');
        e.preventDefault();
    });
    $(window).on('scroll',function(){
        findPosition();
    });
	function findPosition() {
		var winScrollTop = $(window).scrollTop();
        $('section').each(function(){
			var thisH = $(this).height() - 150;
            if( $(this).offset().top - 140 < winScrollTop && $(this).offset().top + thisH > winScrollTop){
                $('.sticky_tab').find('[data-scroll="'+ $(this).attr('id') +'"]').addClass('active');
			} else {
				$('.sticky_tab').find('[data-scroll="'+ $(this).attr('id') +'"]').removeClass('active');
			}
		});
	}
	$(document).ready(function () {
		findPosition();
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});
	
	$(".accordion a").on("click", function() {
		if ($(".accordion").hasClass("open")) { 
			$(".accordion").removeClass("open");
		}
		else {
			$(".accordion").addClass("open");
		}
	});

	// 그랜드오픈 오픈이벤트 용 스크롤 픽스
	$(window).on('scroll', function () {
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});
}
$(document).ready(function() {
	$(".live_tab a").click(function(){
		var tab_id=$(this).attr("data-tab");
		$(".live_tab a").removeClass("current");
		$(".tab_content > div").removeClass("current");
		$(this).addClass("current");
		$("#"+tab_id).addClass("current")
	})

	$(".live_tab button").click(function(){
		var tab_id=$(this).attr("data-tab");
		$(".live_tab button").removeClass("current");
		$(".tab_content > a").removeClass("current");
		$(this).addClass("current");
		$("#"+tab_id).addClass("current")
	})

	// 이리온 오픈이벤트 용 스크롤 픽스
	if ($('.event_0101').length) {
		check_scroll_fixed('simple', '.scroll-fixed-area', '.tab');
		$(window).on('scroll', function () {
			check_scroll_fixed('simple', '.scroll-fixed-area', '.tab');
		})
	};
});

if ($('.event_0301').length) {
	
	var link = $('.sticky_tab a');
    link.on('click',function(e){
        var target = $($(this).attr('href')); 
        $('html, body').animate({
            scrollTop: target.offset().top - 135
        },600);
        // $(this).addClass('active');
        e.preventDefault();
    });
    $(window).on('scroll',function(){
        findPosition();
    });
	function findPosition() {
		var winScrollTop = $(window).scrollTop();
        $('section').each(function(){
			var thisH = $(this).height() - 150;
            if( $(this).offset().top - 140 < winScrollTop && $(this).offset().top + thisH > winScrollTop){
                $('.sticky_tab').find('[data-scroll="'+ $(this).attr('id') +'"]').addClass('active');
			} else {
				$('.sticky_tab').find('[data-scroll="'+ $(this).attr('id') +'"]').removeClass('active');
			}
		});
	}
	$(document).ready(function () {
		findPosition();
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});
	// 그랜드오픈 오픈이벤트 용 스크롤 픽스
	$(window).on('scroll', function () {
		check_scroll_fixed('simple', '.scroll-fixed-area', '.sticky_tab');
	});
}