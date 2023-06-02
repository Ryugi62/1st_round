$(function () {
  $(window).scroll(() => {
    const nav = $("#header");
    const scrollTop = $(window).scrollTop();
    const isScrolled = scrollTop > 80;
    nav.toggleClass("f-nav", isScrolled);
    $("#logo img").attr("src", (_, attr) =>
      isScrolled ? attr.replace("_w", "_c") : attr.replace("_c", "_w")
    );
    let value = 0;
  });

  $(".tab-menu li:first-child").addClass("active");
  $("ul.tab-menu li").click(function () {
    const clickedTab = $(this);
    $("ul.tab-menu li").removeClass("active");
    clickedTab.addClass("active");
    $(".tab-con").hide();

    const activeTab = clickedTab.find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });

  $("li.add_deps > a").on("click", function (e) {
    e.preventDefault();
    $("li.add_deps > ul").hide();
    $(this).next().show();
  });

  $("#btn_nav").click(() => {
    $("#nav").animate({ right: "0" });
  });

  $("#btn_close_nav").click(() => {
    $("#nav").animate({ right: "-100%" });
  });

  $("#btn_top").click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  $("#btn_top img").hover(
    function () {
      $(this).attr("src", (_, attr) => attr.replace("_off", "_on"));
    },
    function () {
      $(this).attr("src", (_, attr) => attr.replace("_on", "_off"));
    }
  );

  setScreenSize();
});

function resizeYoutube() {
  $("iframe").each(function () {
    const src = $(this).attr("src");
    if (/^https?:\/\/www.youtube.com\/embed\//g.test(src)) {
      $(this).css({
        width: "100%",
        height: `${Math.ceil((parseInt($(this).css("width")) * 480) / 854)}px`,
      });
    }
  });
}

function go_url(url) {
  if (url !== "") {
    window.open(url, "_blank");
  }
}

function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setScreenSize();
$(window).resize(setScreenSize);
