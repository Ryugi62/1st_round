$(() => {
  $(window).scroll(() => {
    const nav = $("#header");

    // 스크롤 이벤트 핸들러 등록
    if ($(this).scrollTop() > 80) {
      nav.addClass("f-nav");
      $("#logo img").attr("src", (index, attr) => attr.replace("_w", "_c"));
    } else {
      nav.removeClass("f-nav");
      $("#logo img").attr("src", (index, attr) => attr.replace("_c", "_w"));
    }
  });

  $(".tab-menu li:first-child").addClass("active");

  // 탭 메뉴 클릭 이벤트 핸들러 등록
  $("ul.tab-menu li").click(function () {
    $("ul.tab-menu li").removeClass("active");
    $(this).addClass("active");
    $(".tab-con").hide();

    const activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();

    return false;
  });

  // Navigation (Mobile)
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

  // Top Button Click
  $("#btn_top").click(() => {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Top Button hover
  $("#btn_top img").hover(
    function () {
      $(this).attr("src", (index, attr) => attr.replace("_off", "_on"));
    },
    function () {
      $(this).attr("src", (index, attr) => attr.replace("_on", "_off"));
    }
  );

  setScreenSize();

  $(".category-contents-nav > li > div").click(function () {
    const t = parseInt($(this).attr("data-n"));
    const cateWrap = $(this).closest(".cate-wrap");

    // 'data-n' 값에 따라 'on' 클래스를 추가하거나 제거합니다.
    cateWrap.find(".category-contents-nav > li > div").removeClass("on");
    cateWrap
      .find(`.category-contents-nav > li > div[data-n=${t}]`)
      .addClass("on");
  });
});

// 화면 크기 설정 함수
const setScreenSize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setScreenSize();

// 윈도우 크기 변경 이벤트 핸들러 등록
window.addEventListener("resize", setScreenSize);
