const categoryWraps = document.querySelectorAll(".cate-wrap");

categoryWraps.forEach((wrap) => {
  const categoryNav = wrap.querySelector(".category-contents-nav");
  const categoryItems = categoryNav.querySelectorAll("div[data-n]");

  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedDataN = item.getAttribute("data-n");
      const currentSelected = wrap.querySelector("div.on");

      if (currentSelected && currentSelected !== item) {
        currentSelected.classList.remove("on");
      }

      item.classList.add("on");
      wrap.setAttribute("data-n", selectedDataN);
    });
  });
});
