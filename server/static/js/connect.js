async function get_table_data(sortField = null, filterValue = null) {
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

    console.log(response);

    return response.data; // Access the 'data' attribute and return it
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
}
