const KSQLDB_QUERY_ENDPOINT = "http://localhost:8088/query";
var obj;
var obj_2;

var myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Access-Control-Allow-Headers", "x-requested-with");

const selectElement = document.querySelector('#dropdown');

$("#builder").queryBuilder({
  filters: [
    {
      id: "STOCK_ID",
      label: "STOCK_ID",
      type: "string",
    },

    {
      id: "STOCK_NAME",
      label: "STOCK_NAME",
      type: "string",
    },

    {
      id: "NUMBER",
      label: "NUMBER",
      type: "integer",
    },
    {
      id: "TOTAL_PRICE",
      label: "TOTAL_PRICE",
      type: "integer",
    },
  ],
});

selectElement.addEventListener('change', (event) => {
  var selected_table = $('#dropdown').find(":selected").val();
  console.log("CHANGE OF STREAM");
  console.log(selected_table);
  // if ($("#builder")) {
  //   $("#builder").remove();
  // }
  switch (selected_table) {
    case "INVOICE": {
      var filters = [
        {
          id: "INVOICE_ID",
          label: "INVOICE_ID",
          type: "string",
        },

        {
          id: "INVOICE_NAME",
          label: "INVOICE_NAME",
          type: "string",
        },

        {
          id: "NUMBER",
          label: "NUMBER",
          type: "integer",
        },
        {
          id: "TOTAL_PRICE",
          label: "TOTAL_PRICE",
          type: "integer",
        },
      ];
      console.log("INSIDE INVOICE");
      $("#builder").queryBuilder('setFilters', true, filters);
      break;
    }
    case "STOCK": {
      console.log("INSIDE STOCK STREAM");
      $("#builder").queryBuilder('setFilters', true, [
        {
          id: "STOCK_ID",
          label: "STOCK_ID",
          type: "string",
        },

        {
          id: "STOCK_NAME",
          label: "STOCK_NAME",
          type: "string",
        },

        {
          id: "NUMBER",
          label: "NUMBER",
          type: "integer",
        },
        {
          id: "TOTAL_PRICE",
          label: "TOTAL_PRICE",
          type: "integer",
        },
      ],
      );
      break;
    }
    case "CUSTOMER": {
      console.log("INSIDE CUSTOMER");
      $("#builder").queryBuilder('setFilters', true, [
        {
          id: "CUSTOMER_ID",
          label: "CUSTOMER_ID",
          type: "string",
        },

        {
          id: "CUSTOMER_NAME",
          label: "CUSTOMER_NAME",
          type: "string",
        },

        {
          id: "NUMBER",
          label: "NUMBER",
          type: "integer",
        },
      ],
      );
      break;
    }

  }
});


$(".parse-json").on("click", function () {
  var table = $('#dropdown').find(":selected").val();
  console.log(table);
  obj = $("#builder").queryBuilder("getSQL", false);
  obj_2 =
    JSON.stringify(obj.sql).length > 2
      ? "SELECT * FROM " + table + " WHERE " + obj.sql + ";"
      : "SELECT * FROM " + table + ";";
  var data = {
    ksql: obj_2,
  };

  console.log(obj_2);
  var settings = {
    url: "http://localhost:3003/data",
    method: "POST",
    timeout: 0,
    data: data,
  };

  $.ajax(settings).done(function (response) {
    for (var i = 1; i < response.length - 1; i++) {
      // console.log(response[i].row.columns.length);
      var tr = `<tr>`
      for (var j = 0; j < response[i].row.columns.length; j++) {
        tr += `<td> ${response[i].row.columns[j]} </td>`;
    //    console.log(tr);
      }
      tr += `</tr>`
      $("#table").append(tr);
    }
  });
});
