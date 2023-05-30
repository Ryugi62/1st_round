async function getTableData(sortField = null, filterValue = null) {
  try {
    let url = "http://127.0.0.1:5000/api/data";

    // Add sorting parameter if specified
    if (sortField) {
      url += `?sort=${sortField}`;
    }

    // Add filtering parameter if specified
    if (filterValue) {
      url += `&filter=${filterValue}`;
    }

    const response = await $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
    });

    const data = response.data;
    const keyOrder = response.key_order;

    // Rearrange the data based on the key order
    const rearrangedData = data.map((obj) => {
      const rearrangedObj = {};
      keyOrder.forEach((key) => {
        rearrangedObj[key] = obj[key];
      });
      return rearrangedObj;
    });

    // console.log(rearrangedData);

    return rearrangedData; // Return the rearranged data
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
}
