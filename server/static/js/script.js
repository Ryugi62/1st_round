$(function () {
  $(window).scroll(function () {
    var nav = $("#header");
    if ($(this).scrollTop() > 80) {
      nav.addClass("f-nav");
      $("#logo img").attr("src", function (index, attr) {
        return attr.replace("_w", "_c");
      });
    } else {
      nav.removeClass("f-nav");
      $("#logo img").attr("src", function (index, attr) {
        return attr.replace("_c", "_w");
      });
    }
    var value = 0;
  });

  $(".tab-menu li:first-child").addClass("active");
  $("ul.tab-menu li").click(function () {
    $("ul.tab-menu li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(".tab-con").hide(); //Hide all tab content

    var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
    $(activeTab).fadeIn(); //Fade in the active ID content
    return false;
  });

  //Navication (Mobile)
  $("li.add_deps > a").on("click", function (e) {
    e.preventDefault();
    $("li.add_deps > ul").hide();
    $(this).next().show();
  });

  $("#btn_nav").click(function () {
    $("#nav").animate({ right: "0" });
  });

  $("#btn_close_nav").click(function () {
    $("#nav").animate({ right: "-100%" });
  });

  //Top Button Click
  $("#btn_top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  //Top Button hover
  $("#btn_top img").hover(
    function () {
      $(this).attr("src", function (index, attr) {
        return attr.replace("_off", "_on");
      });
    },
    function () {
      $(this).attr("src", function (index, attr) {
        return attr.replace("_on", "_off");
      });
    }
  );

  setScreenSize();

  /*
	$( window ).resize(function() {

		var windowWidth = $( window ).width();
		if(windowWidth < 992) { //창 가로 크기가 992 미만일 경우 
			$("#btn_close_nav").click(function() {
				$('#nav').animate({right:'-100%'});
			});
		} else { //창 가로 크기가 992보다 클 경우
		
		}
	});
*/

  $(".category-contents-nav > li > div").click(function () {
    t = parseInt($(this).attr("data-n"));
    $(".category-contents-nav > li > div").removeClass("on");
    $(this).addClass("on");
  });
});

function resizeYoutube() {
  $("iframe").each(function () {
    if (/^https?:\/\/www.youtube.com\/embed\//g.test($(this).attr("src"))) {
      $(this).css("width", "100%");
      $(this).css(
        "height",
        Math.ceil((parseInt($(this).css("width")) * 480) / 854) + "px"
      );
    }
  });
}

function go_url(url) {
  if (url != "") window.open(url, "_blank");
}

function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();

// js
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();
window.addEventListener("resize", setScreenSize);
