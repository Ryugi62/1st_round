((window) => {
  "use strict";

  const lignePaginate = () => {
    const _lignePaginate = {};

    _lignePaginate.init = (
      el,
      options = { numberPerPage: 10, goBar: false, pageCounter: true },
      filter = [{ el: null }]
    ) => {
      setTableEl(el);
      initTable(_lignePaginate.getEl());
      checkIsTableNull();
      setOptions(options);
      setConstNumberPerPage(options.numberPerPage);
      setFilterOptions(filter);
      launchPaginate();
    };

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

    const setConstNumberPerPage = (number) => {
      settings.constNumberPerPage = number;
    };

    const setNumberPerPage = (number) => {
      settings.numberPerPage = number;
    };

    const initTable = (el) => {
      if (el.includes("#")) {
        settings.table = document.getElementById(el.replace("#", "").trim());
      } else if (el.includes(".")) {
        settings.table = document.querySelector(el);
      }
    };

    const iniFilter = (el) => {
      if (el.includes("#")) {
        filterSettings.filterBox = document.getElementById(
          el.replace("#", "").trim()
        );
      } else if (el.includes(".")) {
        filterSettings.filterBox = document.querySelector(el);
      }
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
      filterSettings.filterBox.addEventListener("keyup", () =>
        paginate.filter()
      );
    };

    const setGoBar = (value) => {
      settings.goBar = value;
    };

    const setPageCounter = (value) => {
      settings.pageCounter = value;
    };

    _lignePaginate.getEl = () => {
      return settings.el;
    };

    _lignePaginate.getTable = () => {
      return settings.table;
    };

    _lignePaginate.getNumberPerPage = () => {
      return settings.numberPerPage;
    };

    _lignePaginate.getConstNumberPerPage = () => {
      return settings.constNumberPerPage;
    };

    let table,
      tr = [],
      pageCount,
      numberPerPage,
      th;

    const setOptions = (options) => {
      if (options.numberPerPage !== settings.numberPerPage) {
        setNumberPerPage(options.numberPerPage);
      }

      if (typeof options.goBar === "boolean") setGoBar(options.goBar);

      if (typeof options.pageCounter === "boolean")
        setPageCounter(options.pageCounter);
    };

    const checkIsTableNull = () => {
      if (settings.table === null) {
        throw new Error(
          "Element " + _lignePaginate.getEl() + " does not exist"
        );
      }
    };

    const checkIsFilterBoxNull = () => {
      if (filterSettings.filterBox === null) {
        throw new Error(
          "Element " + _lignePaginate.getEl() + " does not exist"
        );
      }
    };

    const paginateAlreadyExists = () => {
      const paginate = document.querySelector("div.paginate");
      if (paginate !== null) removePaginate(paginate);
    };

    const removePaginate = (element) => {
      element.parentNode.removeChild(element);
    };

    const hiddenPaginateControls = () => {
      document.querySelector(".paginate_controls").style.visibility = "hidden";
    };

    const showPaginateControls = () => {
      document.querySelector(".paginate_controls").style.visibility = "unset";
    };

    const pageButtons = (numberOfPage, currentPage) => {
      const prevDisabled = currentPage === 1 ? "disabled" : "";
      const nextDisabled = currentPage === numberOfPage ? "disabled" : "";

      let buttons = `<input type='button' value='<' class='paginate_control_prev' onclick='paginate.sort(${
        currentPage - 1
      })' ${prevDisabled}>`;
      const buttonNumberOfPage = `<input type='button' value='${currentPage} - ${numberOfPage}' disabled>`;

      for (let i = 1; i <= numberOfPage; i++) {
        if (numberOfPage > 10) {
          buttons += paginationMoreThatTenPage(i, numberOfPage);
        } else {
          buttons += `<input type='button' id='id${i}' value='${i}' onclick='paginate.sort(${i})'>`;
        }
      }

      const nextButton = `<input type='button' value='>' class='paginate_control_next' onclick='paginate.sort(${
        currentPage + 1
      })' ${nextDisabled}>`;
      buttons += nextButton;

      if (settings.pageCounter) buttons += buttonNumberOfPage;

      if (settings.goBar) buttons += addGoToPage();

      return buttons;
    };

    const paginationMoreThatTenPage = (iterator, numberOfPage) => {
      const referenceForTheLast = numberOfPage - 1;
      const middleValue = "...";

      if (iterator > referenceForTheLast || iterator < 5) {
        return `<input type='button' id='id${iterator}' value='${iterator}' onclick='paginate.sort(${iterator})'>`;
      } else if (iterator + 1 === numberOfPage) {
        return `<input type='button' id='id${iterator}' value='${iterator}' style='display: none' onclick='paginate.sort(${iterator})'>`;
      } else {
        return `<input type='button' id='id${iterator}' value='${iterator}' style='display: none' onclick='paginate.sort(${iterator})'>`;
      }
    };

    const addGoToPage = () => {
      const inputBox = `<input type='number' id='paginate_page_to_go' value='1' min='1' max='${settings.numberOfPages}'>`;
      const goButton = `<input type='button' id='paginate-go-button' value='Go' onclick='paginate.goToPage()'>  `;
      return inputBox + goButton;
    };

    const launchPaginate = () => {
      paginateAlreadyExists();
      table = settings.table;
      numberPerPage = settings.numberPerPage;
      const rowCount = table.rows.length;
      const firstRow = table.rows[0].firstElementChild.tagName;
      const hasHead = firstRow === "TH";
      let i,
        ii,
        j = hasHead ? 1 : 0;
      th = hasHead ? table.rows[0].outerHTML : "";
      pageCount = Math.ceil(rowCount / numberPerPage);
      settings.numberOfPages = pageCount;

      if (pageCount > 1) {
        settings.hasPagination = true;
        for (i = j, ii = 0; i < rowCount; i++, ii++)
          tr[ii] = table.rows[i].outerHTML;
        table.insertAdjacentHTML(
          "afterend",
          "<div id='buttons' class='paginate paginate_controls'></div"
        );
        _lignePaginate.sort(1);
      } else {
        settings.hasPagination = false;
      }
    };

    _lignePaginate.sort = (selectedPageNumber) => {
      let rows = th;
      const startPoint =
        settings.numberPerPage * selectedPageNumber - settings.numberPerPage;
      for (
        let i = startPoint;
        i < startPoint + settings.numberPerPage && i < tr.length;
        i++
      )
        rows += tr[i];

      table.innerHTML = rows;
      document.getElementById("buttons").innerHTML = pageButtons(
        pageCount,
        selectedPageNumber
      );
      document
        .getElementById("id" + selectedPageNumber)
        .classList.add("active");
      document.getElementById("id" + selectedPageNumber).style.display =
        "unset";
    };

    _lignePaginate.filter = () => {
      if (settings.hasPagination) {
        setNumberPerPage(9999);
        _lignePaginate.sort(1);
        hiddenPaginateControls();
      }
      const filter = document
        .querySelector(filterSettings.el)
        .value.toUpperCase();
      const trs = document.querySelectorAll(settings.el + " tr:not(.header)");
      trs.forEach(
        (tr) =>
          (tr.style.display = [...tr.children].find((td) =>
            td.innerHTML.toUpperCase().includes(filter)
          )
            ? ""
            : "none")
      );

      if (filter.length === 0 && settings.hasPagination) {
        setNumberPerPage(_lignePaginate.getConstNumberPerPage());
        _lignePaginate.sort(1);
        showPaginateControls();
      }
    };

    return _lignePaginate;
  };

  if (typeof window.paginate === "undefined") {
    window.paginate = lignePaginate();
  }
})(window);
