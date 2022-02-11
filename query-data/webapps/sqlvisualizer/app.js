let key = dataiku.getWebAppConfig()['input_datasets'][0];
sessionStorage.setItem('dataset-name',key);
document.getElementById('page_title').innerHTML = dataiku.getWebAppConfig()['app_title'];
let test = "&nbsp;&nbsp;" + String(sessionStorage.getItem('dataset-name')).replaceAll('_',' ');
document.getElementById('page_dataset_title').innerHTML = test
if (String(sessionStorage.getItem('dataset-name')) == 'null'){
  document.getElementById('page_dataset_title').innerHTML = "&nbsp;&nbsp;"
}

try {
document.getElementById('page_title').innerHTML = dataiku.getWebAppConfig()['app_title'];
let test = "&nbsp;&nbsp;" + String(sessionStorage.getItem('dataset-name')).replaceAll('_',' ');
document.getElementById('page_dataset_title').innerHTML = test
if (String(sessionStorage.getItem('dataset-name')) == 'null'){
  document.getElementById('page_dataset_title').innerHTML = "&nbsp;&nbsp;"
}


let bkg_color = String(dataiku.getWebAppConfig()['title_color'])
document.getElementById('page_title').style.background = bkg_color;

let dataset_list = dataiku.getWebAppConfig()['input_datasets']

for (i in dataset_list){
    key = dataset_list[i]
    $('#columns-dropdown2').append('<i class="glyphicon glyphicon-import" style="float: left; font-size: 75%; color: #3b99fc; padding-right: 5px;" ></i><div style = "cursor: pointer;"  id = "'+key+'-ds-button" onclick="setDataset('+"'"+String(key)+"'"+')">' + key + '</div>');
}


// sessionStorage.setItem('dataset-name','license_type_metrics');
function createTable(object){
    $('#data-container-2').append('<table id="jsonTable" ><thead></thead><tbody></tbody></table>');

  $.each(Object.keys(object[0]), function(index, key){
    $('#columns-dropdown').append('<i class="glyphicon glyphicon-plus" style="float: left; font-size: 75%; color: #3b99fc; padding-right: 5px;" ></i><div style = "cursor: pointer;"  id = "'+key+'-col-button" onclick="insertSelect('+"'"+String(key)+"'"+')">' + key + '</div>');
    $('#jsonTable thead').append('<th> <i class="glyphicon glyphicon-filter" style="float:left; color: #BD2D31; display: none; margin-right: 5px !important;" id="'+String(key)+'_filter_icon'+'"></i>' + String(key) + '</th> ');
  });
  $.each(object, function(index, jsonObject){     
    if(Object.keys(jsonObject).length > 0){
      var tableRow = '<tr>';
      $.each(Object.keys(jsonObject), function(i, key){
         if (String(jsonObject[key]).length > 50){
         tableRow += '<td value = "'+ jsonObject[key] +'" style = "cursor: pointer;">' + String(jsonObject[key]).slice(0,50) + "..." + '</td>';
         }else{
             tableRow += '<td>' + String(jsonObject[key]) + '</td>';
         }
      });
      tableRow += "</tr>";
      $('#jsonTable tbody').append(tableRow);
    }
    });
}

document.getElementById("new-query").innerHTML = sessionStorage.getItem('newQuery');
var testArray = []
var goButton = document.getElementById('go-button');
var newQuery = sessionStorage.getItem('newQuery');
var dataset_isVisible = sessionStorage.getItem('dataset_isVisible');


goButton.addEventListener('click', function(event) {
    sessionStorage.setItem('dataset_isVisible', 'True');
    let newQuery = document.getElementById('new-query');
    sessionStorage.setItem('newQuery', newQuery.value);
    let endpoint = '/first_api_call?javascript_var='+newQuery.value;
    sessionStorage.setItem('endpoint', endpoint); 
    location.reload(); 
});

if (dataset_isVisible = 'True') {
        let newQuery = sessionStorage.getItem('newQuery');
        let endpoint = sessionStorage.getItem('endpoint');
        if (newQuery == null || newQuery == ''){
            $('#new-query').append(String(newQuery));
        }
        $.getJSON(getWebAppBackendUrl(endpoint), function(data) {
        console.log('Received data from backend', data)
        var object = data;
        $('body').getScript('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',createTable(object) ) } );
}
var counter = 1;
var dataset_button = document.getElementById('dataset-cols-button');
dataset_button.addEventListener('click', function(event) {counter += 1; document.getElementById('columns-dropdown').style.display = "block"
if ((counter % 2) == 0){document.getElementById('columns-dropdown').style.display = "block";};
if ((counter % 2) != 0){document.getElementById('columns-dropdown').style.display = "none";};
});
var counter2 = 1;
var dataset_button2 = document.getElementById('pick-a-dataset');
dataset_button2.addEventListener('click', function(event) {counter2 += 1; document.getElementById('columns-dropdown2').style.display = "block"
if ((counter2 % 2) == 0){document.getElementById('columns-dropdown2').style.display = "block";};
if ((counter2 % 2) != 0){document.getElementById('columns-dropdown2').style.display = "none";};
});


}
catch{
    document.getElementById('reset-button').click();
}




























// document.getElementById('page_title').innerHTML = dataiku.getWebAppConfig()['app_title'];
// let test = "&nbsp;&nbsp;" + String(sessionStorage.getItem('dataset-name')).replace('_',' ');
// document.getElementById('page_dataset_title').innerHTML = test
// alert(test);
// if (String(sessionStorage.getItem('dataset-name')) == 'null'){
//   document.getElementById('page_dataset_title').innerHTML = "&nbsp;&nbsp;"
// }


// let bkg_color = String(dataiku.getWebAppConfig()['title_color'])
// document.getElementById('page_title').style.background = bkg_color;

// let dataset_list = dataiku.getWebAppConfig()['input_datasets']

// for (i in dataset_list){
//     key = dataset_list[i]
//     $('#columns-dropdown2').append('<i class="glyphicon glyphicon-import" style="float: left; font-size: 75%; color: #3b99fc; padding-right: 5px;" ></i><div style = "cursor: pointer;"  id = "'+key+'-ds-button" onclick="setDataset('+"'"+String(key)+"'"+')">' + key + '</div>');
// }


// // sessionStorage.setItem('dataset-name','license_type_metrics');
// function createTable(object){
//     $('#data-container-2').append('<table id="jsonTable" ><thead></thead><tbody></tbody></table>');

//   $.each(Object.keys(object[0]), function(index, key){
//     $('#columns-dropdown').append('<i class="glyphicon glyphicon-plus" style="float: left; font-size: 75%; color: #3b99fc; padding-right: 5px;" ></i><div style = "cursor: pointer;"  id = "'+key+'-col-button" onclick="insertSelect('+"'"+String(key)+"'"+')">' + key + '</div>');
//     $('#jsonTable thead').append('<th>' + String(key) + '</th>');
//   });
//   $.each(object, function(index, jsonObject){     
//     if(Object.keys(jsonObject).length > 0){
//       var tableRow = '<tr>';
//       $.each(Object.keys(jsonObject), function(i, key){
//          if (String(jsonObject[key]).length > 50){
//          tableRow += '<td value = "'+ jsonObject[key] +'" style = "cursor: pointer;">' + String(jsonObject[key]).slice(0,50) + "..." + '</td>';
//          }else{
//              tableRow += '<td>' + String(jsonObject[key]) + '</td>';
//          }
//       });
//       tableRow += "</tr>";
//       $('#jsonTable tbody').append(tableRow);
//     }
//     });
// }

// document.getElementById("new-query").innerHTML = sessionStorage.getItem('newQuery');
// var testArray = []
// var goButton = document.getElementById('go-button');
// var newQuery = sessionStorage.getItem('newQuery');
// var dataset_isVisible = sessionStorage.getItem('dataset_isVisible');


// goButton.addEventListener('click', function(event) {
//     sessionStorage.setItem('dataset_isVisible', 'True');
//     let newQuery = document.getElementById('new-query');
//     sessionStorage.setItem('newQuery', newQuery.value);
//     let endpoint = '/first_api_call?javascript_var='+newQuery.value;
//     sessionStorage.setItem('endpoint', endpoint); 
//     location.reload(); 
// });

// if (dataset_isVisible = 'True') {
//         let newQuery = sessionStorage.getItem('newQuery');
//         let endpoint = sessionStorage.getItem('endpoint');
//         if (newQuery == null || newQuery == ''){
//             $('#new-query').append(String(newQuery));
//         }
//         $.getJSON(getWebAppBackendUrl(endpoint), function(data) {
//         console.log('Received data from backend', data)
//         var object = data;
//         $('body').getScript('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',createTable(object) ) } );
// }
// var counter = 1;
// var dataset_button = document.getElementById('dataset-cols-button');
// dataset_button.addEventListener('click', function(event) {counter += 1; document.getElementById('columns-dropdown').style.display = "block"
// if ((counter % 2) == 0){document.getElementById('columns-dropdown').style.display = "block";};
// if ((counter % 2) != 0){document.getElementById('columns-dropdown').style.display = "none";};
// });
// var counter2 = 1;
// var dataset_button2 = document.getElementById('pick-a-dataset');
// dataset_button2.addEventListener('click', function(event) {counter2 += 1; document.getElementById('columns-dropdown2').style.display = "block"
// if ((counter2 % 2) == 0){document.getElementById('columns-dropdown2').style.display = "block";};
// if ((counter2 % 2) != 0){document.getElementById('columns-dropdown2').style.display = "none";};
// });

