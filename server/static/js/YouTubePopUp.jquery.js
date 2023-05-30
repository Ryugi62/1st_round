(($) => {
  $.fn.YouTubePopUp = function (options) {
    const YouTubePopUpOptions = $.extend({ autoplay: 1 }, options);

    // 클릭 이벤트 핸들러 등록
    this.on("click", function (e) {
      const youtubeLink = $(this).attr("href");
      let split_c, split_n;

      // YouTube 링크인 경우
      if (youtubeLink.match(/(youtube.com)/)) {
        split_c = "v=";
        split_n = 1;
      }

      // YouTube 짧은 링크나 Vimeo 링크인 경우
      if (
        youtubeLink.match(/(youtu.be)/) ||
        youtubeLink.match(/(vimeo.com\/)+[0-9]/)
      ) {
        split_c = "/";
        split_n = 3;
      }

      // Vimeo 사용자명 링크인 경우
      if (youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
        split_c = "/";
        split_n = 5;
      }

      const getYouTubeVideoID = youtubeLink.split(split_c)[split_n];
      const cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");
      let videoEmbedLink;

      // YouTube 짧은 링크나 YouTube 링크인 경우
      if (
        youtubeLink.match(/(youtu.be)/) ||
        youtubeLink.match(/(youtube.com)/)
      ) {
        videoEmbedLink = `https://www.youtube.com/embed/${cleanVideoID}?autoplay=${YouTubePopUpOptions.autoplay}`;
      }

      // Vimeo 링크인 경우
      if (
        youtubeLink.match(/(vimeo.com\/)+[0-9]/) ||
        youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)
      ) {
        videoEmbedLink = `https://player.vimeo.com/video/${cleanVideoID}?autoplay=${YouTubePopUpOptions.autoplay}`;
      }

      // 팝업을 위한 HTML 코드 추가
      $("body").append(`
          <div class="YouTubePopUp-Wrap YouTubePopUp-animation">
            <div class="YouTubePopUp-Content">
              <span class="YouTubePopUp-Close"></span>
              <iframe src="${videoEmbedLink}" allowfullscreen></iframe>
            </div>
          </div>
        `);

      // 애니메이션 효과
      if ($(".YouTubePopUp-Wrap").hasClass("YouTubePopUp-animation")) {
        setTimeout(() => {
          $(".YouTubePopUp-Wrap").removeClass("YouTubePopUp-animation");
        }, 600);
      }

      // 닫기 버튼 클릭 이벤트 핸들러 등록
      $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(() => {
        $(".YouTubePopUp-Wrap")
          .addClass("YouTubePopUp-Hide")
          .delay(515)
          .queue(function () {
            $(this).remove();
          });
      });

      e.preventDefault();
    });

    // Esc 키를 누를 경우 닫기 이벤트 처리
    $(document).keyup((e) => {
      if (e.keyCode === 27) {
        $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click();
      }
    });
  };
})(jQuery);
