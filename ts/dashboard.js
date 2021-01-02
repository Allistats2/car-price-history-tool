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
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/' + makeId + '/modelyear/' + year + '?format=json', { mode: 'cors' })
        .then(function (resp) { return resp.json(); }) // Convert data to json
        .then(function (data) {
        for (var i in data.Results) {
            modelNames[i] = data.Results[i].Model_Name;
            modelIds[i] = data.Results[i].Model_ID;
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
    console.log("make " + makeSelect.value);
    console.log("model " + modelOptionList.value);
    console.log("year" + yearOptionList.value);
});
window.onload = function () {
    getMakes();
};
