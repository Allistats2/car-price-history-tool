var makeNames = [];
var makeIds = [];
var modelNames = [];
var modelIds = [];
var years = [];
function getYears(selectdMake, selectedModel) {
    var maxYear, minYear;
    fetch('makes.json')
        .then(function (resp) { return resp.json(); }) // Convert data to json
        .then(function (data) {
        for (var i in data.Results) {
            for (var j in data.Results[i].Models) {
                if (data.Results[i].Models[j].Make_ID == selectdMake && data.Results[i].Models[j].Model_ID == selectedModel) {
                    maxYear = data.Results[i].Models[j].Max_Year;
                    minYear = data.Results[i].Models[j].Min_Year;
                }
            }
            for (var i_1 = minYear, j = 0; i_1 <= maxYear; i_1++, j++) {
                years[j] = i_1;
            }
            renderYearList(years);
        }
    })["catch"](function () {
        // catch any errors
    });
}
var yearOptionList = document.getElementById("yearSelect");
function renderYearList(years) {
    removeOptions(document.getElementById('yearSelect'));
    var firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.text = "Select Year";
    firstOption.selected;
    firstOption.disabled;
    firstOption.hidden;
    yearOptionList.add(firstOption);
    for (var i in years) {
        var yearOPtion = document.createElement("option");
        yearOPtion.text = years[i];
        yearOPtion.value = years[i];
        yearOptionList.add(yearOPtion);
    }
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
    var firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.text = "Select Make";
    firstOption.selected;
    firstOption.disabled;
    firstOption.hidden;
    makeOptionList.add(firstOption);
    for (var i in makeNames) {
        var makeOption = document.createElement("option");
        makeOption.text = makeNames[i];
        makeOption.value = makeIds[i];
        makeOptionList.add(makeOption);
    }
}
function getModels(makeId) {
    fetch('makes.json')
        .then(function (resp) { return resp.json(); }) // Convert data to json
        .then(function (data) {
        for (var i in data.Results) {
            if (data.Results[i].MakeId == makeId) {
                for (var j in data.Results[i].Models) {
                    modelNames[j] = data.Results[i].Models[j].Model_Name;
                    modelIds[j] = data.Results[i].Models[j].Model_ID;
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
    var firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.text = "Select Model";
    firstOption.selected;
    firstOption.disabled;
    firstOption.hidden;
    modelOptionList.add(firstOption);
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
function cleatYearList() {
    removeOptions(document.getElementById('yearSelect'));
    years.splice(0, years.length);
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
    cleatYearList();
    var selectdMake = makeSelect.value;
    getModels(selectdMake);
    console.log(modelOptionList.value);
});
var modelSelect = document.getElementById("modelSelect");
modelSelect.addEventListener('change', function (e) {
    cleatYearList();
    var selectdMake = makeSelect.value;
    var selectedModel = modelOptionList.value;
    getYears(selectdMake, selectedModel);
});
var searchButton = document.getElementById("searchButton");
var spinner = document.getElementById("spinner");
searchButton.addEventListener('click', function (e) {
    spinner.removeAttribute('hidden');
    var url = 'https://xa5gbbywad.execute-api.us-east-1.amazonaws.com/dev/getvehicle?id=' + yearOptionList.value + makeSelect.value + modelOptionList.value;
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (priceHistory) {
        var truncatedPrices = priceHistory.prices[1].map(function (x) { return Math.floor(x); });
        renderChart(priceHistory.prices[0], truncatedPrices, true);
        spinner.setAttribute('hidden', '');
    })["catch"](function (err) { return console.log('Request Failed', err); });
});
window.onload = function () {
    var defaultTimes = ["Janary", "May", "September"];
    var defaultPrices = [0, 0, 0];
    renderChart(defaultTimes, defaultPrices, false);
    getMakes();
};
