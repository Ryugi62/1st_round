$(document).ready(async function () {
  const tbody = $("tbody");
  let tableData = await getTableData();
  const n = 20; // 페이지당 데이터 개수

  console.log(tableData[0]);
  let sortOrders = Array(tableData[0].length).fill(0);
  let previousHeaderIndex = -1;
  let isSorting = false;
  let currentPage = 1;
  let totalPages = Math.ceil(tableData.length / n); // Calculate the total number of pages

  initializeTable(); // 테이블 초기화

  async function initializeTable() {
    // thead 초기화
    const thead = $("thead");
    const headers = Object.keys(tableData[0]);

    thead.empty();

    const headerCells = headers.map((header) => `<th>${header}</th>`);
    headerCells.unshift("<th>No</th>"); // No 값을 추가
    headerCells.push("<th>Download Application</th>"); // No 값을 추가
    headerCells.push("<th>Test (Delete) Application</th>"); // No 값을 추가

    thead.append(`<tr>${headerCells.join("")}</tr>`);

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
        <td>
          <button type="submit" class="pass">Button</button>
        </td>
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

    createPagination(); // 인덱스 이동 버튼 생성
  }

  function createPagination() {
    const paginationContainer = $("<div></div>").addClass("paginate");

    const prevButton = $("<input>")
      .attr("type", "button")
      .val("<")
      .addClass("paginate_control_prev");
    prevButton.on("click", function () {
      if (currentPage > 1) {
        currentPage--;
        displayTableData(tableData, currentPage);
      }
    });

    paginationContainer.append(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = $("<input>")
        .attr("type", "button")
        .val(i)
        .addClass("paginate_button");
      if (i === currentPage) {
        pageButton.addClass("active");
      }
      pageButton.on("click", function () {
        currentPage = i;
        displayTableData(tableData, currentPage);
      });

      paginationContainer.append(pageButton);
    }

    const nextButton = $("<input>")
      .attr("type", "button")
      .val(">")
      .addClass("paginate_control_next");
    nextButton.on("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        displayTableData(tableData, currentPage);
      }
    });

    paginationContainer.append(nextButton);

    $("#pagination").remove();

    // Create a new pagination element and append it below the table
    const paginationElement = $("<div></div>")
      .attr("id", "pagination")
      .append(paginationContainer);
    $("table").after(paginationElement);
  }

  async function getSortedTableData(columnIndex, sortOrder) {
    if (sortOrder === 1 || sortOrder === 2) {
      const sortedData = sortTableData(tableData, columnIndex, sortOrder);
      return sortedData;
    } else {
      // sortOrder가 1이나 2가 아닌 경우에는 새로운 데이터를 불러옴
      tableData = await getTableData();
      return tableData;
    }
  }

  function sortTableData(data, columnIndex, sortOrder) {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      const valueA = String(Object.values(a)[columnIndex]); // 수정된 부분
      const valueB = String(Object.values(b)[columnIndex]); // 수정된 부분

      if (sortOrder === 1) {
        return valueA.localeCompare(valueB);
      } else if (sortOrder === 2) {
        return valueB.localeCompare(valueA);
      }
    });

    return sortedData;
  }

  function getNextSortOrder(currentSortOrder) {
    if (currentSortOrder === 1) {
      return 2;
    } else if (currentSortOrder === 2) {
      return 0;
    } else {
      return 1;
    }
  }

  function handleTooltip() {
    $("table").on("mouseenter", "td", function () {
      var $this = $(this);
      if (this.offsetWidth < this.scrollWidth && !$this.attr("title")) {
        $this.tooltip({
          title: $this.text(),
          placement: "top",
          trigger: "hover",
          container: "body",
        });
        $this.tooltip("show");
      }
    });
  }

  tbody.on("click", ".truncate-tooltip", handleTooltip);

  const thead = $("thead");

  thead.on("click", "th", async function () {
    if (isSorting) {
      return;
    }

    console.log("clicked");

    isSorting = true;

    const headerIndex = $(this).index() - 1;

    if (headerIndex < 0 || headerIndex >= tableData[0].length) {
      // 키 값에 해당하는 열이 없을 경우 정렬 기능을 수행하지 않음
      isSorting = false;
      return;
    }

    if (previousHeaderIndex !== headerIndex) {
      sortOrders = Array(tableData[0].length).fill(0);
    }

    sortOrders[headerIndex] = getNextSortOrder(sortOrders[headerIndex]);

    const sortOrder = sortOrders[headerIndex];

    tableData = await getSortedTableData(headerIndex, sortOrder);

    previousHeaderIndex = headerIndex;

    displayTableData(tableData, currentPage);

    // 테이블 정렬이 완료되면 클릭을 허용
    setTimeout(function () {
      isSorting = false;
    }, 0); // 0초 지연 시간으로 클릭 허용
  });
});
