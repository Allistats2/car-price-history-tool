const makeNames = [];
const makeIds = [];
const modelNames = [];
const modelIds = [];

var yearOptionList = document.getElementById("yearSelect") as HTMLSelectElement;
for (var i = 2020; i > 1964; i--)
{
  var yearOption = document.createElement("option");
  yearOption.text = "" + i;
  yearOption.value = "" + i;
  yearOptionList.add(yearOption); 
}

function getMakes() {
	fetch('makes.json')  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
    for (var i in data.Results) {
      makeNames[i] = data.Results[i].MakeName;
      makeIds[i] = data.Results[i].MakeId;
    }

    renderMakeList(makeNames, makeIds);
	})
	.catch(function() {
		// catch any errors
	});
}
function renderMakeList(makeNames, makeIds) {
    var makeOptionList = document.getElementById("makeSelect") as HTMLSelectElement;
    for (var i in makeNames) {
      var makeOption = document.createElement("option");
      makeOption.text = makeNames[i];
      makeOption.value = makeIds[i];
      makeOptionList.add(makeOption);
    }
    
  }

  
  function getModels(makeId, year) {
    
  
      fetch('makes.json')  
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        for (let i in data.Results){
          if (data.Results[i].MakeId == makeId ){
            console.log(data.Results[i])
            for (let j in data.Results[i].Models ){
              modelNames[j] = data.Results[i].Models[j].Model_Name
              modelIds[j] = data.Results[i].Models[j].Model_ID
            }
            break;
          }
        }
        renderModelList(modelNames, modelIds)
      })
      .catch(function() {
          // catch any errors
      });
  }
  var modelOptionList = document.getElementById("modelSelect") as HTMLSelectElement;
  function renderModelList(modelNames, modelIds) {
    
  
    
    
    for (var i in modelNames) {
      var modelOtion = document.createElement("option");
      modelOtion.text = modelNames[i];
      modelOtion.value = modelIds[i];
      modelOptionList.add(modelOtion);
    }
  
  
  }

  function clearModelList() {
   removeOptions(document.getElementById('modelSelect'));
   modelNames.splice(0, modelNames.length);
   modelIds.splice(0, modelIds.length);

  }

  function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

  var makeSelect = document.getElementById("makeSelect") as HTMLSelectElement;
  makeSelect.addEventListener('change', function (e) {

    clearModelList();

    var selectdMake = makeSelect.value;
    var selectedYear = yearOptionList.value;
    getModels( selectdMake, selectedYear );
    
    });

    yearOptionList.addEventListener('change', function (e) {

      clearModelList();
  
      var selectdMake = makeSelect.value;
      var selectedYear = yearOptionList.value;
      getModels( selectdMake, selectedYear );
      
      });

  var searchButton = document.getElementById("searchButton") as HTMLButtonElement;
  searchButton.addEventListener('click', function (e) {
    console.log("make " + makeSelect.value);
    console.log("model " + modelOptionList.value);
    console.log("year" + yearOptionList.value);
    let url = 'https://xa5gbbywad.execute-api.us-east-1.amazonaws.com/dev/getvehicle?id=' + yearOptionList.value + makeSelect.value + modelOptionList.value;
    console.log(url);
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((priceHistory) => {
        console.log(priceHistory)
        console.log(priceHistory.prices[0])
        console.log(priceHistory.prices[1])
        let truncatedPrices = priceHistory.prices[1].map(x => Math.floor(x));
        renderChart(priceHistory.prices[0], truncatedPrices)
    })
    .catch(err => console.log('Request Failed', err));


  });

  window.onload = function() {
    let defaultTimes = ["Janary", "May", "September"];
    let defaultPrices = [0, 0, 0];
    renderChart(defaultTimes, defaultPrices);
    getMakes();
  }