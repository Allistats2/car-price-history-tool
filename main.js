/*
var carsKey = '';
fetch('file.json')
  .then(response => response.json())
  .then(jsonResponse => carsKey = jsonResponse.carsKey)
  .catch(function() {
    console.log("Check key");
});    
*/
var gifKey = '';
fetch('file.json')
  .then(response => response.json())
  .then(jsonResponse => gifKey = jsonResponse.gifKey)
  .catch(function() {
    console.log("Check key");
});        
  //if(carsKey=='') document.getElementById('temp').innerHTML = ('Loading!');
const makeNames = [];
const makeIds = [];
function makes() {
  console.log("makes");
	fetch('api.json')  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
    var num = 0;
    for (i in data.Results) {
      makeNames[num] = data.Results[num].MakeName;
      makeIds[num] = data.Results[num].MakeId;
      //console.log(data.Results[num].MakeName);
      num++;



    }

    displayData(makeNames);
    makeList(makeNames, makeIds);
	})
	.catch(function() {
		// catch any errors
	});
}
const modelNames = [];
const modelIds = [];

function models(makeId) {
  

	fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/' + makeId + '?format=json', {mode: 'cors'})  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
    var num4 = 0;
    for (i in data.Results) {
      //console.log(data.Results[num4].Model_Name);
      modelNames[num4] = data.Results[num4].Model_Name;
      modelIds[num4] = data.Results[num4].Model_ID;
      num4++;
    }
    modelList(modelNames, modelIds);
	})
	.catch(function() {
		// catch any errors
	});
}
function displayData( data ) {
  
  //var description = data[1]; 
	
	document.getElementById('description').innerHTML = 'website under construction';

    document.body.className = 'clear';
    
    
  

  const img = document.querySelector('img');
  fetch('https://api.giphy.com/v1/gifs/translate?api_key=' + gifKey +'&s=' + description, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    img.src = response.data.images.original.url;
  });
  
}
function makeList() {
  //console.log("my funcyion");
  var num2 = 0;
  var option;
  
  var x = document.getElementById("mySelect");
  for (i in makeNames) {
    //console.log(makeNames[num2]);
     option = document.createElement("option");
    option.text = makeNames[num2];
    option.value = makeIds[num2];
    x.add(option);
    num2++;
  }
  
}
 function modelList(modelNames, modelIds) {
  var num3 = 0;
  var option2;

  
  var x2 = document.getElementById("modelSelect");
  for (j in modelNames) {
    option2 = document.createElement("option");
    option2.text = modelNames[num3];
    option2.value = modelIds[num3];
    x2.add(option2);
    num3++;
  }


}
function clearModelList() {
  console.log("clear");
  var rmvSelectOptions = document.getElementById("modelSelect");
  rmvSelectOptions.remove();
  modelNames.splice(0, modelNames.length);
  modelIds.splice(0, modelIds.length);
  var newModelSelect = document.createElement("select");
  newModelSelect.size = "10";
  newModelSelect.id = "modelSelect";
  document.getElementById("modelForm").appendChild(newModelSelect);
}

var b;
var d = false;
btn.addEventListener('click', function (e) {
  if (d == true){
    clearModelList(modelNames, modelIds)
  }
  d = true;
  b = document.getElementById("search").value;
  console.log(  document.getElementById("mySelect").value);
  models( document.getElementById("mySelect").value );
  
  });
  
window.onload = function() {
  makes();
}

