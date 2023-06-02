$(document).ready(async () => {
  const tbody = $("tbody");
  const originalTableData = await getTableData();
  let tableData = [...originalTableData];
  const n = 20; // 페이지당 데이터 개수
  let sortOrders = Array(tableData[0].length).fill(0);
  let previousHeaderIndex = -1;
  let isSorting = false;
  let currentPage = 1;
  const totalPages = Math.ceil(tableData.length / n); // 총 페이지 수

  initializeTable();

  async function initializeTable() {
    const thead = $("thead");
    const headers = Object.keys(tableData[0]);

    thead.empty();

    const headerCells = headers.map((header) => `<th>${header}</th>`);
    headerCells.unshift("<th>No</th>");
    headerCells.push(
      "<th>Download Application</th>",
      "<th>Test (Delete) Application</th>"
    );

    thead.append(`<tr>${headerCells.join("")}</tr>`);
    $("th").css("cursor", "pointer");

    displayTableData(tableData, currentPage);
  }

  function displayTableData(data, page) {
    tbody.empty();

    const startIndex = (page - 1) * n;
    const endIndex = page * n;
    const currentPageData = data.slice(startIndex, endIndex);

    currentPageData.forEach((rowData, i) => {
      const rowDataArray = Object.values(rowData);
      const tableData = rowDataArray
        .map((data) => `<td class="truncate-tooltip">${data}</td>`)
        .join("");

      const tr = $("<tr></tr>").html(`
        <td>${startIndex + i + 1}</td>
        ${tableData}
        <td><button type="submit" class="pass">Button</button></td>
        <td>
          <select class="app_group_select">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <button type="submit" class="fail">Button</button>
        </td>
      `);

      tbody.append(tr);
    });

    createPagination();
  }

  function createPagination() {
    const paginationContainer = $("<div></div>").addClass("paginate");

    const prevButton = $("<input>")
      .attr({ type: "button", value: "<" })
      .addClass("paginate_control_prev");
    prevButton.on("click", () => {
      if (currentPage > 1) {
        displayTableData(tableData, --currentPage);
      }
    });

    paginationContainer.append(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $("<input>")
        .attr({ type: "button", value: i })
        .addClass("paginate_button");
      if (i === currentPage) {
        pageButton.addClass("active");
      }
      pageButton.on("click", () => {
        currentPage = i;
        displayTableData(tableData, currentPage);
      });

      paginationContainer.append(pageButton);
    }

    const nextButton = $("<input>")
      .attr({ type: "button", value: ">" })
      .addClass("paginate_control_next");
    nextButton.on("click", () => {
      if (currentPage < totalPages) {
        displayTableData(tableData, ++currentPage);
      }
    });

    paginationContainer.append(nextButton);

    $("#pagination").remove();

    $("<div></div>")
      .attr("id", "pagination")
      .append(paginationContainer)
      .insertAfter("table");
  }

  async function getSortedTableData(columnIndex, sortOrder) {
    if (sortOrder === 0) {
      return [...originalTableData];
    }

    return sortTableData(tableData, columnIndex, sortOrder);
  }

  function sortTableData(data, columnIndex, sortOrder) {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const valueA = String(Object.values(a)[columnIndex]);
      const valueB = String(Object.values(b)[columnIndex]);

      return sortOrder === 1
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return sortedData;
  }

  function getNextSortOrder(currentSortOrder) {
    return currentSortOrder === 1 ? 2 : currentSortOrder === 2 ? 0 : 1;
  }

  const handleTooltip = () => {
    $("table").on("mouseenter", "td", function () {
      const $this = $(this);
      if (this.offsetWidth < this.scrollWidth && !$this.attr("title")) {
        $this
          .tooltip({
            title: $this.text(),
            placement: "top",
            trigger: "hover",
            container: "body",
          })
          .tooltip("show");
      }
    });
  };

  tbody.on("click", ".truncate-tooltip", handleTooltip);

  const thead = $("thead");

  thead.on("click", "th", async function () {
    if (isSorting) {
      return;
    }

    isSorting = true;

    const headerIndex = $(this).index() - 1;

    if (headerIndex < 0 || headerIndex >= tableData[0].length) {
      isSorting = false;
      return;
    }

    if (previousHeaderIndex !== headerIndex) {
      sortOrders = Array(tableData[0].length).fill(0);
      $("th").css("font-weight", "normal");
      $("th").each(function () {
        let originalText = $(this).text().replace(/ ↓| ↑/g, "");
        $(this).html(originalText);
      });
    }

    sortOrders[headerIndex] = getNextSortOrder(sortOrders[headerIndex]);

    const sortOrder = sortOrders[headerIndex];

    tableData = await getSortedTableData(headerIndex, sortOrder);

    let originalText = $(this).text().replace(/ ↓| ↑/g, "");

    if (sortOrder === 1) {
      $(this).html(originalText + " ↓");
    } else if (sortOrder === 2) {
      $(this).html(originalText + " ↑");
    } else {
      $(this).html(originalText);
    }

    if (sortOrder !== 0) {
      $(this).css("font-weight", "bold");
    } else {
      $(this).css("font-weight", "normal");
    }

    previousHeaderIndex = headerIndex;

    displayTableData(tableData, currentPage);

    setTimeout(() => {
      isSorting = false;
    }, 0);
  });
});
