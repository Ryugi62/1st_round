$(document).ready(async function () {
  const tbody = $("tbody");
  let table_data = await get_table_data();
  let sortOrders = Array(table_data[0].length).fill(""); // 초기 정렬 순서 배열
  let previousHeaderIndex = -1;
  let isSorting = false; // 정렬 중 여부를 나타내는 플래그 변수

  // 초기 테이블 생성
  refreshTable();

  // 테이블 갱신 함수
  function refreshTable() {
    tbody.empty();

    table_data.forEach((rowData, i) => {
      const tr = $("<tr></tr>").html(`
        <td>
          <input type="checkbox" class="row-checkbox">
        </td>
        <td>
          <label for="group_col${i}" class="read_only">select group</label>
          <select id="group_col${i}" class="app_group_select">
            <option value="Select">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </td>
        ${rowData
          .map((data) => `<td class="truncate-tooltip">${data}</td>`)
          .join("")}
        <td>
          <button type="submit" class="pass">Pass</button>
          <button type="submit" class="fail">Fail</button>
        </td>
        <td>
          <input type="submit" class="pass" value="Pass">
          <input type="submit" class="fail" value="Fail">
        </td>
      `);

      tbody.append(tr);
    });

    let options = {
      numberPerPage: 20, //Cantidad de datos por pagina
      goBar: false, //Barra donde puedes digitar el numero de la pagina al que quiere ir
      pageCounter: false, //Contador de paginas, en cual estas, de cuantas paginas
    };

    paginate.init(".judge", options);

    // 툴팁 이벤트 처리
    $(".truncate-tooltip").on("mouseenter", handleTooltip);

    // 테이블 헤더에 클릭 이벤트 연결
    tbody.find("tr:first-child th").on("click", function () {
      console.log("th click");
      if (isSorting) {
        return; // 정렬 중일 때는 클릭 이벤트 무시
      }

      isSorting = true; // 정렬 시작

      const headerIndex = $(this).index();

      if (previousHeaderIndex !== headerIndex) {
        sortOrders = Array(table_data[0].length).fill(""); // 이전 헤더와 다른 경우 정렬 순서 배열 초기화
      }

      const sortOrder = getNextSortOrder(sortOrders[headerIndex]);
      sortOrders[headerIndex] = sortOrder;

      // 비동기로 테이블 정렬 및 갱신 작업 수행
      setTimeout(async function () {
        table_data = await sortTableData(table_data, headerIndex, sortOrder);

        previousHeaderIndex = headerIndex;

        // 테이블 갱신
        refreshTable();

        isSorting = false; // 정렬 종료
      }, 0);
    });
    console.log(tbody.find("th"));
  }

  // 테이블 데이터 정렬 함수
  async function sortTableData(data, columnIndex, sortOrder) {
    const compareFunction = (a, b) => {
      const valueA = String(a[columnIndex]);
      const valueB = String(b[columnIndex]);
      return valueA.localeCompare(valueB);
    };

    const sortedData = [...data]; // 정렬된 데이터를 담을 새로운 배열 생성

    if (sortOrder === "desc") {
      sortedData.sort((a, b) => compareFunction(b, a));
    } else if (sortOrder === "asc") {
      sortedData.sort(compareFunction);
    }

    return sortedData;
  }

  // 다음 정렬 순서 반환 함수
  function getNextSortOrder(currentSortOrder) {
    if (currentSortOrder === "asc") {
      return "desc";
    } else if (currentSortOrder === "desc") {
      return "";
    } else {
      return "asc";
    }
  }

  // 툴팁 처리 함수
  function handleTooltip() {
    const cell = $(this);
    const text = cell.text();
    cell.attr("title", cell[0].scrollWidth > cell.innerWidth() ? text : null);
  }

  // tbody의 첫 번째 행에 있는 th 요소에 클릭 이벤트 연결
  tbody.find("tr:first-child th").on("click", function () {
    console.log("th click");
    if (isSorting) {
      return; // 정렬 중일 때는 클릭 이벤트 무시
    }

    isSorting = true; // 정렬 시작

    const headerIndex = $(this).index();

    if (previousHeaderIndex !== headerIndex) {
      sortOrders = Array(table_data[0].length).fill(""); // 이전 헤더와 다른 경우 정렬 순서 배열 초기화
    }

    const sortOrder = getNextSortOrder(sortOrders[headerIndex]);
    sortOrders[headerIndex] = sortOrder;

    // 비동기로 테이블 정렬 및 갱신 작업 수행
    setTimeout(async function () {
      table_data = await sortTableData(table_data, headerIndex, sortOrder);

      previousHeaderIndex = headerIndex;

      // 테이블 갱신
      refreshTable();

      isSorting = false; // 정렬 종료
    }, 0);
  });
});
