$(document).ready(function () {
  const tbody = document.getElementById("tableBody");

  for (let i = 1; i <= 55; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td scope="col" class="col_chk chk_box">
          <input type="checkbox" id="chk${i}" class="selec_chk">
          <label for="chk${i}">
            <span></span>
            <b class="read_only">Check</b>
          </label>
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
        <td>${i}</td>
        <td>${i}</td>
        <td>${i}</td>
        <td>${i}</td>
        <td>${i}</td>
        <td>${i}</td>
        <td>${i}</td>
        <td>
          <button type="submit" class="pass">Pass</button>
          <button type="submit" class="fail">Fail</button>
        </td>
        <td>
          <input type="submit" class="pass" value="Pass">
          <input type="submit" class="fail" value="Fail">
        </td>
      `;

    tbody.appendChild(tr);
  }

  let options = {
    numberPerPage: 20, //Cantidad de datos por pagina
    goBar: false, //Barra donde puedes digitar el numero de la pagina al que quiere ir
    pageCounter: false, //Contador de paginas, en cual estas, de cuantas paginas
  };

  paginate.init(".judge", options);
});
