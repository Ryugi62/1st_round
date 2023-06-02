$(function () {
  $(".cate-wrap .category-contents-nav > li > div").click(function () {
    const t = parseInt($(this).attr("data-n"));
    const cateWrap = $(this).closest(".cate-wrap");
    cateWrap.find(".category-contents-nav > li > div").removeClass("on");
    $(this).addClass("on");
  });
});
