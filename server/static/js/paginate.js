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
      th,
      currentPage = 1;

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
          "Element " + filterSettings.el + " does not exist in DOM"
        );
      }
    };

    const launchPaginate = () => {
      let trNum = 0;
      let numberOfEntries = 0;

      if (filterSettings.filterBox !== null) {
        tr = Array.from(
          _lignePaginate
            .getTable()
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr")
        );
        numberOfEntries = tr.length;
        const filterValue = filterSettings.filterBox.value.toLowerCase();
        let compareWith;
        tr.forEach((element, index) => {
          compareWith = element.textContent.toLowerCase();
          if (compareWith.includes(filterValue)) {
            tr[index].style.display = "";
            trNum++;
          } else {
            tr[index].style.display = "none";
          }
        });
      } else {
        tr = Array.from(
          _lignePaginate
            .getTable()
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr")
        );
        numberOfEntries = tr.length;
        trNum = tr.length;
      }

      currentPage = 1;

      if (trNum === 0) {
        if (document.getElementsByClassName("pagination").length !== 0) {
          document.getElementsByClassName("pagination")[0].style.display =
            "none";
          document.getElementsByClassName("info")[0].style.display = "none";
        }
        return;
      }

      pageCount = Math.ceil(trNum / _lignePaginate.getNumberPerPage());

      if (document.getElementsByClassName("pagination").length === 0) {
        createPagination();
      }

      displayTable(numberOfEntries);
    };

    const displayTable = (numberOfEntries) => {
      let fromIndex = (currentPage - 1) * _lignePaginate.getNumberPerPage();
      let toIndex = currentPage * _lignePaginate.getNumberPerPage();

      if (toIndex > numberOfEntries) {
        toIndex = numberOfEntries;
      }

      tr.forEach((element, index) => {
        if (index >= fromIndex && index < toIndex) {
          element.style.display = "";
        } else {
          element.style.display = "none";
        }
      });

      updatePageCounter(numberOfEntries);
    };

    const createPagination = () => {
      const paginationContainer = document.createElement("div");
      paginationContainer.className = "paginate";

      if (settings.pageCounter) {
        const infoDiv = document.createElement("div");
        infoDiv.className = "info";
        paginationContainer.appendChild(infoDiv);
      }

      const prevButton = document.createElement("input");
      prevButton.type = "button";
      prevButton.value = "<";
      prevButton.addEventListener("click", () => goToPage("prev"));
      prevButton.className = "paginate_control_prev";
      paginationContainer.appendChild(prevButton);

      for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("input");
        pageButton.type = "button";
        pageButton.value = i;
        pageButton.addEventListener("click", () => goToPage(i));
        pageButton.className = "paginate_button";
        if (i === currentPage) {
          pageButton.classList.add("active");
        }
        paginationContainer.appendChild(pageButton);
      }

      const nextButton = document.createElement("input");
      nextButton.type = "button";
      nextButton.value = ">";
      nextButton.addEventListener("click", () => goToPage("next"));
      nextButton.className = "paginate_control_next";
      paginationContainer.appendChild(nextButton);

      _lignePaginate
        .getTable()
        .parentNode.insertBefore(
          paginationContainer,
          _lignePaginate.getTable().nextSibling
        );
    };

    const goToPage = (page) => {
      if (page === "prev" && currentPage > 1) {
        currentPage--;
      } else if (page === "next" && currentPage < pageCount) {
        currentPage++;
      } else if (typeof page === "number" && page > 0 && page <= pageCount) {
        currentPage = page;
      } else {
        return;
      }

      displayTable(tr.length);
      updatePageButtons(); // 페이지 버튼의 클래스를 업데이트
    };

    const updatePageButtons = () => {
      const pageButtons = document.querySelectorAll(".paginate_button");

      pageButtons.forEach((button, index) => {
        if (index + 1 === currentPage) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    };

    const updatePageCounter = (numberOfEntries) => {
      if (settings.pageCounter) {
        const infoDiv = document.getElementsByClassName("info")[0];
        infoDiv.innerHTML = `Page ${currentPage} of ${pageCount} (${numberOfEntries} entries)`;
      }
    };

    const sortTableData = (column) => {
      const columnTh = th[column];
      const sortOrder = getNextSortOrder(columnTh);

      tr.sort((a, b) => {
        const aData = a.getElementsByTagName("td")[column].textContent;
        const bData = b.getElementsByTagName("td")[column].textContent;

        if (sortOrder === "asc") {
          return aData.localeCompare(bData);
        } else {
          return bData.localeCompare(aData);
        }
      });

      updateSortIcons(column, sortOrder);

      displayTable(tr.length);
    };

    const getNextSortOrder = (columnTh) => {
      if (columnTh.classList.contains("asc")) {
        columnTh.classList.remove("asc");
        columnTh.classList.add("desc");
        return "desc";
      } else {
        columnTh.classList.remove("desc");
        columnTh.classList.add("asc");
        return "asc";
      }
    };

    const updateSortIcons = (column, sortOrder) => {
      th.forEach((columnTh, index) => {
        if (index === column) {
          columnTh.classList.remove("asc", "desc");
          columnTh.classList.add(sortOrder);
        } else {
          columnTh.classList.remove("asc", "desc");
        }
      });
    };

    const addSortListeners = () => {
      th = Array.from(_lignePaginate.getTable().getElementsByTagName("th"));

      th.forEach((columnTh, index) => {
        columnTh.addEventListener("click", () => sortTableData(index));
      });
    };

    const paginate = {
      init: _lignePaginate.init,
      filter: launchPaginate,
      goToPage: goToPage,
      sortTableData: sortTableData,
    };

    return paginate;
  };

  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = lignePaginate();
  } else {
    window.paginate = lignePaginate();
  }
})(window);
