var makeNames = [];
var makeIds = [];
var modelNames = [];
var modelIds = [];
var yearOptionList = document.getElementById("yearSelect");
for (var i = 2020; i > 1964; i--) {
    var yearOption = document.createElement("option");
    yearOption.text = "" + i;
    yearOption.value = "" + i;
    yearOptionList.add(yearOption);
}
function getMakes() {
    fetch('makes.json')
        .then(function (resp) { return resp.json(); }) // Convert data to json
        .then(function (data) {
        for (var i in data.Results) {
            makeNames[i] = data.Results[i].MakeName;
            makeIds[i] = data.Results[i].MakeId;
        }
        renderMakeList(makeNames, makeIds);
    })["catch"](function () {
        // catch any errors
    });
}
function renderMakeList(makeNames, makeIds) {
    var makeOptionList = document.getElementById("makeSelect");
    for (var i in makeNames) {
        var makeOption = document.createElement("option");
        makeOption.text = makeNames[i];
        makeOption.value = makeIds[i];
        makeOptionList.add(makeOption);
    }
}
function getModels(makeId, year) {
    fetch('makes.json')
        .then(function (resp) { return resp.json(); }) // Convert data to json
        .then(function (data) {
        for (var i_1 in data.Results) {
            if (data.Results[i_1].MakeId == makeId) {
                for (var j in data.Results[i_1].Models) {
                    modelNames[j] = data.Results[i_1].Models[j].Model_Name;
                    modelIds[j] = data.Results[i_1].Models[j].Model_ID;
                }
                break;
            }
        }
        renderModelList(modelNames, modelIds);
    })["catch"](function () {
        // catch any errors
    });
}
var modelOptionList = document.getElementById("modelSelect");
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
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}
var makeSelect = document.getElementById("makeSelect");
makeSelect.addEventListener('change', function (e) {
    clearModelList();
    var selectdMake = makeSelect.value;
    var selectedYear = yearOptionList.value;
    getModels(selectdMake, selectedYear);
});
yearOptionList.addEventListener('change', function (e) {
    clearModelList();
    var selectdMake = makeSelect.value;
    var selectedYear = yearOptionList.value;
    getModels(selectdMake, selectedYear);
});
var searchButton = document.getElementById("searchButton");
searchButton.addEventListener('click', function (e) {
    var url = 'https://xa5gbbywad.execute-api.us-east-1.amazonaws.com/dev/getvehicle?id=' + yearOptionList.value + makeSelect.value + modelOptionList.value;
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (priceHistory) {
        var truncatedPrices = priceHistory.prices[1].map(function (x) { return Math.floor(x); });
        renderChart(priceHistory.prices[0], truncatedPrices, true);
    })["catch"](function (err) { return console.log('Request Failed', err); });
});
window.onload = function () {
    var defaultTimes = ["Janary", "May", "September"];
    var defaultPrices = [0, 0, 0];
    renderChart(defaultTimes, defaultPrices, false);
    getMakes();
};
