$(function () {
  $(window).scroll(() => {
    const nav = $("#header");
    if ($(this).scrollTop() > 80) {
      nav.addClass("f-nav");
      $("#logo img").attr("src", (index, attr) => attr.replace("_w", "_c"));
    } else {
      nav.removeClass("f-nav");
      $("#logo img").attr("src", (index, attr) => attr.replace("_c", "_w"));
    }
  });

  $(".tab-menu li:first-child").addClass("active");
  $("ul.tab-menu li").click(function () {
    $("ul.tab-menu li").removeClass("active"); //Remove any "active" class
    $(this).addClass("active"); //Add "active" class to selected tab
    $(".tab-con").hide(); //Hide all tab content

    const activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
    $(activeTab).fadeIn(); //Fade in the active ID content
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
    // 클릭한 요소의 'data-n' 값을 변수 't'에 저장
    const t = parseInt($(this).attr("data-n"));

    // 클릭한 요소와 가장 가까운 부모 요소 중 클래스가 '.cate-wrap'인 요소를 찾아 변수 'cateWrap'에 저장합니다.
    const cateWrap = $(this).closest(".cate-wrap");

    // 'cateWrap' 요소 내부에 있는 모든 '.category-contents-nav > li > div' 요소의 'on' 클래스를 제거합니다.
    cateWrap.find(".category-contents-nav > li > div").removeClass("on");

    // 'cateWrap' 요소 내부에서 'data-n' 속성 값이 't'와 일치하는 '.category-contents-nav > li > div' 요소에 'on' 클래스를 추가합니다.
    cateWrap
      .find(`.category-contents-nav > li > div[data-n=${t}]`)
      .addClass("on");
  });
});

function setScreenSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setScreenSize();

// js
window.addEventListener("resize", setScreenSize);
