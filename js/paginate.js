(($) => {
  "use strict";

  const lignePaginate = () => {
    const _lignePaginate = {};

    // 초기화: 테이블 요소, 옵션 및 필터 설정
    _lignePaginate.init = (
      el,
      options = { numberPerPage: 10, goBar: false, pageCounter: true },
      filter = { el: null }
    ) => {
      setTableEl(el);
      initTable(_lignePaginate.getEl());
      checkIsTableNull();
      setOptions(options);
      setConstNumberPerPage(options.numberPerPage);
      setFilterOptions(filter);
      launchPaginate();
    };

    // 페이징 설정
    const settings = {
      el: null,
      table: null,
      numberPerPage: 10,
      constNumberPerPage: 10,
      numberOfPages: 0,
      goBar: false,
      pageCounter: true,
      hasPagination: true,
    };

    const filterSettings = {
      el: null,
      filterBox: null,
      trs: null,
    };

    // 비공개 설정 메서드
    const setConstNumberPerPage = (number) => {
      settings.constNumberPerPage = number;
    };

    const setNumberPerPage = (number) => {
      settings.numberPerPage = number;
    };

    const initTable = (el) => {
      settings.table = $(el).get(0);
    };

    const iniFilter = (el) => {
      filterSettings.filterBox = $(el).get(0);
    };

    const setTableEl = (el) => {
      settings.el = el;
    };

    const setFilterOptions = (filterOptions) => {
      if (filterOptions.el != null) {
        setFilterEl(filterOptions.el);
        iniFilter(filterSettings.el);
        checkIsFilterBoxNull();
        setFunctionInFilterBox();
      }
    };

    const setFilterEl = (el) => {
      filterSettings.el = el;
    };

    const setFunctionInFilterBox = () => {
      $(filterSettings.filterBox).on("keyup", paginate.filter);
    };

    const setGoBar = (value) => {
      settings.goBar = value;
    };

    const setPageCounter = (value) => {
      settings.pageCounter = value;
    };

    // 공개된 getter 메서드
    _lignePaginate.getEl = () => settings.el;

    _lignePaginate.getTable = () => settings.table;

    _lignePaginate.getNumberPerPage = () => settings.numberPerPage;

    _lignePaginate.getConstNumberPerPage = () => settings.constNumberPerPage;

    // 비공개 메서드
    let table,
      tr = [],
      pageCount,
      numberPerPage,
      th;

    const setOptions = (options) => {
      setNumberPerPage(options.numberPerPage);
      setGoBar(options.goBar);
      setPageCounter(options.pageCounter);
    };

    const launchPaginate = () => {
      getTrs();
      checkTh();
      createPagination();
      if (settings.pageCounter) {
        pageCounter();
      }
      if (settings.goBar) {
        goBar();
      }
      appendStyles();
    };

    const getTrs = () => {
      table = _lignePaginate.getTable();
      tr = Array.from(table.getElementsByTagName("tr"));
      return tr;
    };

    const getThs = () => {
      table = _lignePaginate.getTable();
      th = Array.from(table.getElementsByTagName("th"));
      return th;
    };

    const checkTh = () => {
      if (getThs().length < 1) {
        tr[0].classList.add("no-th");
      }
    };

    const checkIsTableNull = () => {
      if (_lignePaginate.getTable() == null) {
        console.error(
          "Ligne Paginatejs: 요소 " +
            _lignePaginate.getEl() +
            "이(가) 존재하지 않습니다."
        );
        return;
      }
    };

    const checkIsFilterBoxNull = () => {
      if (filterSettings.filterBox == null) {
        console.error(
          "Ligne Paginatejs: 요소 " +
            filterSettings.el +
            "이(가) 존재하지 않습니다."
        );
        return;
      }
    };

    const createPagination = () => {
      pageCount = Math.ceil(tr.length / settings.numberPerPage);
      let divPagination = document.createElement("div");
      let ulPagination = document.createElement("ul");
      let _li = [];

      for (let i = 0; i < pageCount; i++) {
        _li[i] = document.createElement("li");
        _li[i].innerHTML = (i + 1).toString();
        ulPagination.appendChild(_li[i]);
      }

      divPagination.appendChild(ulPagination);
      divPagination.classList.add("lignePaginate-pagination");
      $(divPagination).insertAfter($(table));
      addListenerToLi(ulPagination.getElementsByTagName("li"));
      addClassActive();
      showPage(tr, _lignePaginate.getNumberPerPage());
    };

    const showPage = (tr, numberPerPage, page = 1) => {
      page--;

      let start = numberPerPage * page;
      let end = start + numberPerPage;

      tr.forEach((elem, i) => {
        if (i >= start && i < end) {
          elem.style.display = "table-row";
        } else {
          elem.style.display = "none";
        }
      });
    };

    const pageCounter = () => {
      let pageCounter = document.createElement("div");
      pageCounter.classList.add("lignePaginate-pageCounter");
      $(pageCounter).insertAfter($(table));
      setInterval(() => {
        $(".lignePaginate-pageCounter").html(
          "페이지 " + ($(".activePaginate").text() || 1) + " / " + pageCount
        );
      }, 200);
    };

    const goBar = () => {
      let goBar = document.createElement("div");
      let inputGoBar = document.createElement("input");
      let btnGoBar = document.createElement("button");

      goBar.classList.add("lignePaginate-goBar");
      inputGoBar.type = "number";
      inputGoBar.min = 1;
      inputGoBar.value = 1;
      btnGoBar.innerHTML = "이동";
      btnGoBar.classList.add("goBtn");

      goBar.appendChild(inputGoBar);
      goBar.appendChild(btnGoBar);
      $(goBar).insertAfter($(table));
      $(goBar)
        .find(".goBtn")
        .on("click", () => {
          let number = parseInt($(goBar).find("input").val());
          if (!isNaN(number)) {
            showPage(tr, _lignePaginate.getNumberPerPage(), number);
          }
        });
    };

    const addListenerToLi = (li) => {
      li.forEach((elem) => {
        $(elem).on("click", () => {
          $(elem).addClass("activePaginate");
          $(elem).siblings().removeClass("activePaginate");
          showPage(tr, _lignePaginate.getNumberPerPage(), $(elem).text());
        });
      });
    };

    const addClassActive = () => {
      $(tr).each(function (index) {
        index < _lignePag;

        inate.getNumberPerPage() && $(this).show();
      });
      $(table)
        .siblings(".lignePaginate-pagination")
        .find("li:first")
        .addClass("activePaginate");
    };

    const appendStyles = () => {
      $("head").append(`
          <style>
            .no-th th {
              display: none !important;
            }
      
            .lignePaginate-pagination {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
      
            .lignePaginate-pagination ul {
              list-style: none;
              padding: 0;
              display: flex;
            }
      
            .lignePaginate-pagination ul li {
              cursor: pointer;
              margin-right: 10px;
              padding: 5px 10px;
              border: 1px solid #ddd;
            }
      
            .lignePaginate-pagination ul li:hover,
            .lignePaginate-pagination ul li.activePaginate {
              background-color: #ddd;
            }
      
            .lignePaginate-pageCounter {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
            }
      
            .lignePaginate-goBar {
              text-align: center;
              margin-top: 20px;
            }
      
            .lignePaginate-goBar input[type='number'] {
              width: 50px;
              text-align: center;
            }
      
            .lignePaginate-goBar button {
              padding: 5px 10px;
              cursor: pointer;
              background-color: #ddd;
              border: none;
            }
          </style>
        `);
    };

    _lignePaginate.filter = () => {
      let input = filterSettings.filterBox.value.toUpperCase();

      let trs = getTrs();
      let filterCells = getThs();

      for (let i = 0; i < trs.length; i++) {
        let hide = true;
        for (let j = 0; j < filterCells.length; j++) {
          let tds = trs[i].getElementsByTagName("td");
          if (tds[j]) {
            let txtValue = tds[j].textContent || tds[j].innerText;
            if (txtValue.toUpperCase().indexOf(input) > -1) {
              hide = false;
              break;
            }
          }
        }
        if (hide) {
          trs[i].style.display = "none";
        } else {
          trs[i].style.display = "";
        }
      }
      $(table).siblings(".lignePaginate-pagination").remove();
      $(table).siblings(".lignePaginate-pageCounter").remove();
      $(table).siblings(".lignePaginate-goBar").remove();
      $(table).siblings("style").remove();
      launchPaginate();
    };

    return _lignePaginate;
  };

  window.paginate = lignePaginate();
})(jQuery);
