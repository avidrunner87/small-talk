// ------------- Assignment Code -------------
let autocomplete;
let registeredWidgets = [];

// ------------ General Functions ------------
// Run on web page load
function init() {
    // Activate Widget / Cards
    weatherWidget(true);

    // Activate the page content
    renderHeader();
    renderMainContent();
    renderFooter();
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    $('.modal').modal();
    searchInputAutoComplete();
    renderSearchLocations();

    // LAST: Activate Widget Filter
    renderFilterWidgets();
}

// Reload the widgets due to a page change
function renderAllWidgets() {
    if (registeredWidgets === null) {
        registeredWidgets = [];
    }

    registeredWidgets.forEach(widget => {
        switch (widget.widgetConsName) {
            case "Weather":
                weatherWidget();
                break;
        
            default:
                break;
        }
    });
}

// Create the header
function renderHeader() {
    // Build the header
    let $headerTitleH1 = $("<h2>");
    $headerTitleH1.text("Small Talk");

    // Append to the header on the page
    $("header").append($headerTitleH1)
}

function renderMainContent() {
    // Build location search
    buildLocationSearch();

    // Build filter widgets
    buildFilterWidgets();

    // Build button to access location search
    let $btnLocationSearch = $("<a>");
    $btnLocationSearch.attr("id", "manageLocations");
    $btnLocationSearch.attr("href", "#");
    $btnLocationSearch.attr("data-target", "locationSlideOut");
    $btnLocationSearch.addClass("sidenav-trigger waves-effect waves-light btn");

    let $btnLocationSearchIcon = $("<i>");
    $btnLocationSearchIcon.addClass("material-icons left");
    $btnLocationSearchIcon.text("location_searching");

    $btnLocationSearch.append($btnLocationSearchIcon);
    $btnLocationSearch.append("Manage Locations");

    // Append location search button to main container
    $(".container").append($btnLocationSearch);

    // Build button to filter widget cards
    let $btnFilterWidgets = $("<a>");
    $btnFilterWidgets.attr("id", "filterWidgets");
    $btnFilterWidgets.attr("href", "#");
    $btnFilterWidgets.attr("data-target", "widgetsSlideOut");
    $btnFilterWidgets.addClass("sidenav-trigger waves-effect waves-light btn");

    let $btnFilterWidgetsIcon = $("<i>");
    $btnFilterWidgetsIcon.addClass("material-icons left");
    $btnFilterWidgetsIcon.text("filter_list");

    $btnFilterWidgets.append($btnFilterWidgetsIcon);
    $btnFilterWidgets.append("Select Widgets");

    // Append filter widgets button to main container
    $(".container").append($btnFilterWidgets);

    // Build the pop-up modal
    let $ModalDiv = $("<div>");
    $ModalDiv.attr("id", "widgetModal");
    $ModalDiv.addClass("modal");

    $ModalContent = $("<div>");
    $ModalContent.addClass("modal-content");
    
    $ModalTitle = $("<h4>");
    $ModalTitle.addClass("modal-title");
    $ModalTitle.text("Placeholder Modal Title");

    $ModalBody = $("<div>");
    $ModalBody.addClass("modal-body row");
    $ModalBody.text("Placeholder Modal Body");

    $ModalFooter = $("<div>");
    $ModalFooter.addClass("modal-footer");

    $ModalFooterA = $("<a>");
    $ModalFooterA.attr("href", "#!");
    $ModalFooterA.addClass("modal-close waves-effect waves-green btn-flat");
    $ModalFooterA.text("Close");
    
    $ModalFooter.append($ModalFooterA);
    $ModalContent.append($ModalTitle);
    $ModalContent.append($ModalBody);
    $ModalContent.append($ModalFooter);
    $ModalDiv.append($ModalContent);

    // Append the location card to the container
    $(".container").append($ModalDiv);

    // Build cards for locations
    buildLocationCards();
}

function buildLocationSearch() {
    // Build location search slide-out
    let $locSlideOutDiv = $("<ul>");
    $locSlideOutDiv.attr("id", "locationSlideOut");
    $locSlideOutDiv.addClass("sidenav");

    let $locSlidOutSearch = $("<li>");
    
    let $locSlidOutSearchDiv = $("<div>");
    $locSlidOutSearchDiv.addClass("user-view");
    $locSlidOutSearchDiv.text("Manage Locations");

    let $locSlidOutSearchForm = $("<form>");
    $locSlidOutSearchForm.addClass("col s12");

    let $locSlidOutSearchFormDiv = $("<div>");
    $locSlidOutSearchFormDiv.addClass("row");
    
    let $locSlidOutSearchFormInputDiv = $("<div>");
    $locSlidOutSearchFormInputDiv.addClass("input-field col s12");

    let $locSlidOutSearchFormInput = $("<input>");
    $locSlidOutSearchFormInput.attr("id", "searchInput");
    $locSlidOutSearchFormInput.addClass("materialize-textarea");

    let $locSlidOutSearchFormInputA = $("<a>");
    $locSlidOutSearchFormInputA.attr("id", "addButton");
    $locSlidOutSearchFormInputA.addClass("btn-floating btn-small halfway-fab waves-effect waves-light disabled");

    let $locSlidOutSearchFormInputAIcon = $("<i>");
    $locSlidOutSearchFormInputAIcon.addClass("material-icons");
    $locSlidOutSearchFormInputAIcon.text("add");

    let $locSlidOutSearchFormInputShortName = $("<input>");
    $locSlidOutSearchFormInputShortName.attr("id", "searchInputShortName");
    $locSlidOutSearchFormInputShortName.attr("type", "hidden");

    let $locSlidOutSearchFormInputId = $("<input>");
    $locSlidOutSearchFormInputId.attr("id", "searchInputId");
    $locSlidOutSearchFormInputId.attr("type", "hidden");

    let $locSlidOutSearchFormInputAddComponents = $("<input>");
    $locSlidOutSearchFormInputAddComponents.attr("id", "searchInputAddComponents");
    $locSlidOutSearchFormInputAddComponents.attr("type", "hidden");

    let $locSlidOutSearchFormInputLAT = $("<input>");
    $locSlidOutSearchFormInputLAT.attr("id", "searchInputLAT");
    $locSlidOutSearchFormInputLAT.attr("type", "hidden");

    let $locSlidOutSearchFormInputLNG = $("<input>");
    $locSlidOutSearchFormInputLNG.attr("id", "searchInputLNG");
    $locSlidOutSearchFormInputLNG.attr("type", "hidden");

    $locSlidOutSearchFormInputDiv.append($locSlidOutSearchFormInput);
    $locSlidOutSearchFormInputA.append($locSlidOutSearchFormInputAIcon);
    $locSlidOutSearchFormInputDiv.append($locSlidOutSearchFormInputA);

    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputDiv);
    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputShortName);
    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputId);
    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputAddComponents);
    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputLAT);
    $locSlidOutSearchFormDiv.append($locSlidOutSearchFormInputLNG);

    $locSlidOutSearchForm.append($locSlidOutSearchFormDiv);

    $locSlidOutSearchDiv.append($locSlidOutSearchForm);

    $locSlidOutSearch.append($locSlidOutSearchDiv);

    $locSlideOutDiv.append($locSlidOutSearch);

    // Append location search slide-out to main container
    $(".container").append($locSlideOutDiv);
}

function buildFilterWidgets() {
    // Build filter widgets slide-out
    let $widgetSlideOutDiv = $("<ul>");
    $widgetSlideOutDiv.attr("id", "widgetsSlideOut");
    $widgetSlideOutDiv.addClass("sidenav");

    let $widgetSlideOutTitle = $("<li>");
    
    let $widgetSlideOutTitleDiv = $("<div>");
    $widgetSlideOutTitleDiv.addClass("user-view");
    $widgetSlideOutTitleDiv.text("Select Widgets");

    // Append filter widgets slide-out to main container
    $widgetSlideOutTitle.append($widgetSlideOutTitleDiv);
    $widgetSlideOutDiv.append($widgetSlideOutTitle);
    $(".container").append($widgetSlideOutDiv);
}

// Enable autocomplete on the search input
function searchInputAutoComplete() {
    let searchInput = document.getElementById('searchInput');

    autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode']
    });
}

function buildLocationCards() {
    $(".locationCard").remove();
    let locations = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locations === null) {
        locations = [];
    }

    for (let i = 0; i < locations.length; i++) {
        // Build the location card Div
        let $locationCardDiv = $("<div>");
        $locationCardDiv.addClass("card horizontal locationCard");
        $locationCardDiv.attr("cityId", `${locations[i].cityId}`);

        // Build the location card Title
        let $locationCardTitle = $("<div>");
        $locationCardTitle.addClass("card-title");
        let $locationCardTitleH3 = $("<h3>");
        $locationCardTitleH3.text(locations[i].cityShortName);

        // Append the location card title to card Div
        $locationCardTitle.append($locationCardTitleH3);
        $locationCardDiv.append($locationCardTitle);

        // Build the location card content
        let $locationCardStack = $("<div>");
        $locationCardStack.addClass("card-stacked");

        let $locationCardContent = $("<div>");
        $locationCardContent.attr("id", `Content-${locations[i].cityId}`);
        $locationCardContent.addClass("card-content");

        // Append the location card content to card Div 
        $locationCardStack.append($locationCardContent);
        $locationCardDiv.append($locationCardStack);

        // Append the location card to the container
        $(".container").append($locationCardDiv);
    }

    // Refresh the widgets
    renderAllWidgets()
}

function renderFooter() {
    // Build the footer
    let $footerDiv = $("<div>");
    $footerDiv.text("Made by Triple A");
    $("footer").append($footerDiv);
}

// Create the Search history
function renderSearchLocations() {
    $(".searchResult").remove();
    // Get the list of search history items from local storage
    let locations = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locations === null) {
        locations = [];
    }

    // TODO: User Story #4 -> Sort Locations
    // locations.sort(function(a, b) {
    //     return a.cityName - b.cityName
    // });


    for (let i = 0; i < locations.length; i++) {
        let $searchResult = $("<li>");
        $searchResult.addClass("searchResult");

        let $searchResultA = $("<a>");

        let $searchResultRemove = $("<i>");
        $searchResultRemove.attr("id", locations[i].cityId);
        $searchResultRemove.addClass("small material-icons");
        $searchResultRemove.text("delete");

        $searchResultA.append($searchResultRemove);
        $searchResultA.append(locations[i].cityName);
        $searchResult.append($searchResultA);

        $("#locationSlideOut").append($searchResult);
    }
}

// Create the widget filters
function renderFilterWidgets() {
    $(".widgetFilter").remove();

    // Get active filter widgets items from local storage
    let activeWidgets = JSON.parse(localStorage.getItem("smallTalk_activeWidgets"));
    if (activeWidgets === null) {
        activeWidgets = [];
    }

    for (let i = 0; i < registeredWidgets.length; i++) {
        let $widgetFilter = $("<li>");
        $widgetFilter.addClass("widgetFilter");

        let $widgetFilterA = $("<a>");

        let $widgetFilterForm = $("<form>");
        $widgetFilterForm.attr("action", "#");

        let $widgetFilterLabel = $("<label>");

        let $widgetFilterInput = $("<input>");
        $widgetFilterInput.attr("type", "checkbox");
        $widgetFilterInput.attr("id", `widgetFilter-${registeredWidgets[i].widgetConsName}`);
        $widgetFilterInput.addClass("filled-in");

        // Check if an item already exists in the array and either add new or delete and add
        let validateWidget = activeWidgets.filter(widget => (widget.widgetConsName === registeredWidgets[i].widgetConsName));

        if (validateWidget.length !== 0) {
            $widgetFilterInput.prop("checked", true);
        }

        let $widgetFilterSpan = $("<span>");
        $widgetFilterSpan.text(registeredWidgets[i].widgetName);

        $widgetFilterLabel.append($widgetFilterInput);
        $widgetFilterLabel.append($widgetFilterSpan);
        $widgetFilterForm.append($widgetFilterLabel);
        $widgetFilterA.append($widgetFilterForm);
        $widgetFilter.append($widgetFilterA);

        $("#widgetsSlideOut").append($widgetFilter);
    }
}


// Calls init to retrieve data and render it to the page on load
init();

// ------------ Widget Functions -------------
// Create Weather Widget
function weatherWidget(onInit) {
    // UPDATE: Set widget name -> Letters and Numbers Only
    const widgetName = "Weather";
    const widgetConsName = widgetName.replace(/ /g,'');

    if (onInit) {
        // Register widget if it isn't already 
        let validateRegisteredWidget = registeredWidgets.filter(widget => (widget.widgetConsName === widgetConsName));
        if (validateRegisteredWidget.length === 0) {
            let widgetItem = {
                "widgetName": widgetName,
                "widgetConsName": widgetConsName
            }
            registeredWidgets.push(widgetItem);
        }
    } else {
        // Get active filter widgets items from local storage
        let activeWidgets = JSON.parse(localStorage.getItem("smallTalk_activeWidgets"));
        if (activeWidgets === null) {
            activeWidgets = [];
        }

        // Check if an item exists in the array to determine whether to show widget
        let validateActiveWidget = activeWidgets.filter(widget => (widget.widgetConsName === widgetConsName));

        if (validateActiveWidget.length !== 0) {

            // Clear out existing widgets
            $(".weatherWidgetCard").remove();

            let locations = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
            if (locations === null) {
                locations = [];
            }

            locations.forEach(location => {

                let $widgetDivRow = $("<div>");
                $widgetDivRow.addClass("row weatherWidgetCard");

                let $widgetDivCol = $("<div>");
                $widgetDivCol.addClass("col s12 m4");

                let $widgetDivCard = $("<div>");
                $widgetDivCard.addClass("card blue-grey lighten-4");

                let $widgetDivContent = $("<div>");
                $widgetDivContent.addClass("card-content black-text");

                // Get API Content
                let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.cityLAT}&lon=${location.cityLNG}&units=imperial&exclude=minutely,hourly&appid=33e00170884c3cd4fa86aa23f7431b3e`

                fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let $widgetDivTitle = $("<span>");
                    $widgetDivTitle.addClass("card-title flow-text");
                    $widgetDivTitle.text("Current Weather  ");

                    // Build the weather image next for the forecast
                    let $resultsForcWXImg = $("<img>");
                    let forcImgSrc = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
                    $resultsForcWXImg.attr("src", forcImgSrc);
                    $resultsForcWXImg.attr("title", data.current.weather[0].description);
                    $resultsForcWXImg.attr("alt", data.current.weather[0].description);
                    $resultsForcWXImg.attr("width", "40");
                    $widgetDivTitle.append($resultsForcWXImg);

                    $widgetDivContent.append($widgetDivTitle);

                    // Build the current temperature on card body
                    let $resultsCurrWXTemp = $("<p>");
                    let $resultsCurrWXTempTitle = $("<span>");
                    $resultsCurrWXTempTitle.text("Temperature: ");
                    $resultsCurrWXTemp.append($resultsCurrWXTempTitle);
                    $resultsCurrWXTemp.append(`${Math.round(data.current.temp)} &#176;F`);
                    $widgetDivContent.append($resultsCurrWXTemp);

                    // Build the current UV index on card body
                    let $resultsCurrWXUVI = $("<p>");
                    let $resultsCurrWXUVITitle = $("<span>");
                    $resultsCurrWXUVITitle.text("UV Index: ");
                    $resultsCurrWXUVI.append($resultsCurrWXUVITitle);
                    let $resultsCurrWXUVIBadge = $("<span>");
                    $resultsCurrWXUVIBadge.addClass("badge");
    
                    let varUVI = data.current.uvi;
    
                    switch(true) {
                        case (0 <= varUVI && varUVI < 3):
                            // UV index is low
                            $resultsCurrWXUVIBadge.addClass("green white-text");
                            break;
                        case ( 3 <= varUVI && varUVI < 8):
                            // UV index is moderate to high
                            $resultsCurrWXUVIBadge.addClass("yellow");
                            break;
                        case ( 8 <= varUVI):
                            // UV index very high to extreme
                            $resultsCurrWXUVIBadge.addClass("red white-text");
                            break;
                    }
    
                    $resultsCurrWXUVIBadge.text(varUVI);
                    $resultsCurrWXUVI.append($resultsCurrWXUVIBadge);
                    $widgetDivContent.append($resultsCurrWXUVI);

                    let $widgetDivAction = $("<div>");
                    $widgetDivAction.addClass("card-action");
    
                    let $widgetDivActionA = $("<a>");
                    $widgetDivActionA.attr("href", "#widgetModal");
                    $widgetDivActionA.addClass("modal-trigger green-text")
                    $widgetDivActionA.text("More Info");
                    $widgetDivActionA.attr("data-modal-title", `5 Day Forecast for ${location.cityShortName}`);
    
                    // Generate HTML for data-modal-body
                    let $resultsForcWX = $("<div>");
                    $resultsForcWX.addClass("row");
    
                    for (let i = 1; i < 6; i++) {
                        // Build forecast weather Div
                        let $resultsForcWXDiv = $("<div>");
                        $resultsForcWXDiv.addClass("col s12 m4");
    
                        let $resultsForcWXCard = $("<div>");
                        $resultsForcWXCard.addClass("card blue-grey lighten-4");
    
                        let $resultsForcWXContent = $("<div>");
                        $resultsForcWXContent.addClass("card-content");
    
                        // Build the weather title
                        let $resultsForcWXContentTitle = $("<span>")
                        $resultsForcWXContentTitle.addClass("card-title");
                        $resultsForcWXContentTitle.text(
                            moment(data.daily[i].dt * 1000).calendar(null, {
                                sameDay: '[Today]',
                                nextDay: '[Tomorrow]',
                                nextWeek: 'dddd',
                                lastDay: '[Yesterday]',
                                lastWeek: '[Last] dddd',
                                sameElse: 'YYYY-MM-DD'
                            }
                            ));
    
                        $resultsForcWXContent.append($resultsForcWXContentTitle);
    
                        // Build the weather image next for the forecast
                        let $resultsForcWXImg = $("<img>");
                        let forcImgSrc = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;
                        $resultsForcWXImg.attr("src", forcImgSrc);
                        $resultsForcWXImg.attr("title", data.daily[i].weather[0].description);
                        $resultsForcWXImg.attr("alt", data.daily[i].weather[0].description);

                        $resultsForcWXContent.append($resultsForcWXImg);
    
                        // Build the current temperature on card body
                        let $resultsForcWXTemp = $("<p>");
    
                        let $resultsForcWXTempTitle = $("<span>");
                        $resultsForcWXTempTitle.text("Temperature: ");
                        $resultsForcWXTemp.append($resultsForcWXTempTitle);
                        $resultsForcWXTemp.append(`${Math.round(data.daily[i].temp.day)} &#176;F`);
                        $resultsForcWXContent.append($resultsForcWXTemp);
    
                        // Build the current wind on card body
                        let $resultsForcWXWind = $("<p>");
    
                        let $resultsForcWXWindTitle = $("<span>");
                        $resultsForcWXWindTitle.text("Wind: ");
                        $resultsForcWXWind.append($resultsForcWXWindTitle);
                        $resultsForcWXWind.append(`${data.daily[i].wind_speed} MPH`);
                        $resultsForcWXContent.append($resultsForcWXWind);
    
                        // Build the current humidity on card body
                        let $resultsForcWXHum = $("<p>");
    
                        let $resultsForcWXHumTitle = $("<span>");
                        $resultsForcWXHumTitle.text("Humidity: ");
                        $resultsForcWXHum.append($resultsForcWXHumTitle);
                        $resultsForcWXHum.append(`${data.daily[i].humidity} %`);
                        $resultsForcWXContent.append($resultsForcWXHum);

                        $resultsForcWXCard.append($resultsForcWXContent);
                        $resultsForcWXDiv.append($resultsForcWXCard);
                        $resultsForcWX.append($resultsForcWXDiv);
                    }
    
                    $widgetDivActionA.attr("data-modal-body", $resultsForcWX.html());
    
                    $widgetDivAction.append($widgetDivActionA);
                    $widgetDivCard.append($widgetDivContent);
                    $widgetDivCard.append($widgetDivAction);
                    $widgetDivCol.append($widgetDivCard);
                    $widgetDivRow.append($widgetDivCol);
                    $(`#Content-${location.cityId}`).append($widgetDivRow);

                });

            });

        } else {
            // Clear out existing widgets
            $(".weatherWidgetCard").remove();
        }
    }
}

// ------------- Event Listeners -------------
// Store the new location in local storage once found via google
$("#addButton").click(function(event) {
    // Get locations from local storage
    let locations = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locations === null) {
        locations = [];
    }
    
    // Set the new entry for the array
    let searchCity = $("#searchInput").val().trim();
    let cityShortName = $("#searchInputShortName").val();
    let cityId = $("#searchInputId").val();
    let cityAddressComponents = JSON.parse($("#searchInputAddComponents").val());
    let cityLAT = $("#searchInputLAT").val();
    let cityLNG = $("#searchInputLNG").val();
    let newEntry = {
        "cityId": cityId,
        "cityName": searchCity,
        "cityShortName": cityShortName,
        "cityAddressComponents": cityAddressComponents,
        "cityLAT": cityLAT,
        "cityLNG": cityLNG
    }

    // Check if an item already exists in the array and either add new or delete and add
    let validateCity = locations.filter(city => (city.cityId === cityId));

    let cityIndex = locations.findIndex(city => (city.cityId === cityId));
    if (validateCity.length === 0 && newEntry.cityId.length > 0) {
        // Does not exist in array so add
        locations.push(newEntry);
    } else if (newEntry.cityId.length > 0 && cityIndex !== -1) {
        // Does exist in the array so delete and add
        locations.splice(cityIndex, 1);
        locations.push(newEntry);
    }
    
    // Store changes back to local storage
    localStorage.setItem("smallTalk_searchLocations", JSON.stringify(locations));

    // TODO: User Story #1 -> Location Form Reset

    // Render location cards
    buildLocationCards();

    // Render Search location history
    renderSearchLocations();
});

// Update the registered Widgets local storage
$("#widgetsSlideOut").click(function(event) {
    if ($(event.target).is("input") === true || $(event.target).parent().is("input") === true) {
        // Get active filter widgets items from local storage
        let activeWidgets = JSON.parse(localStorage.getItem("smallTalk_activeWidgets"));
        if (activeWidgets === null) {
            activeWidgets = [];
        }
        const id = event.target.id || event.target.parentNode.id;
        const widgetConsName = id.substring(id.indexOf("-") + 1);

        // Register widget inactive
        let widgetItem = {
            "widgetConsName": widgetConsName
        }
        // Check if an item already exists in the array and either add new or delete and add
        let validateWidget = activeWidgets.filter(widget => (widget.widgetConsName === widgetConsName));

        let widgetIndex = activeWidgets.findIndex(widget => (widget.widgetConsName === widgetConsName));

        if (validateWidget.length === 0 && $(`#${id}`).prop('checked')) {
            // Does not exist in array so add
            activeWidgets.push(widgetItem);
        } else if (validateWidget.length !== 0 && widgetIndex !== -1 && $(`#${id}`).prop('checked')) {
            // Does exist in the array so delete and add
            activeWidgets.splice(widgetIndex, 1);
            activeWidgets.push(widgetItem);
        } else if (widgetIndex !== -1) {
            // Delete entry in the array
            activeWidgets.splice(widgetIndex, 1);
        }

        // Store changes back to local storage
        localStorage.setItem("smallTalk_activeWidgets", JSON.stringify(activeWidgets));

        // Refresh the widgets
        renderAllWidgets();
    
    }
});

// Widget More Info link clicked
$(".container").click(function(event) {
    if($(event.target).hasClass("modal-trigger")) {
        $(".modal-title").text($(event.target).attr("data-modal-title"));
        $(".modal-body").html($(event.target).attr("data-modal-body"));
    }
});

// Google event listener for the location search field
google.maps.event.addListener(autocomplete, "place_changed", function() {
    let searchPlace = autocomplete.getPlace();  

    console.log(searchPlace);

    if (searchPlace.name !== "") {
        $("#searchInputShortName").val(searchPlace.name);
        $("#searchInputId").val(searchPlace.place_id);
        $("#searchInputAddComponents").val(JSON.stringify(searchPlace.address_components));
        $("#searchInputLAT").val(searchPlace.geometry.location.lat());
        $("#searchInputLNG").val(searchPlace.geometry.location.lng());

        $("#addButton").removeClass("disabled");
    } else {
        $("#searchInputShortName").val("");
        $("#searchInputId").val("");
        $("#address_components").val("");
        $("#searchInputLAT").val("");
        $("#searchInputLNG").val("");

        $("#addButton").addClass("disabled");
    }
})

// Event handler for individual clicking the delete / trash can button on location
$("#locationSlideOut").click(function(event) {
    if ($(event.target).is("i") === true && $(event.target).text() === "delete") {
        let locations = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
        if (locations === null) {
            locations = [];
        }

        let cityId = $(event.target).attr("id");

        let cityIndex = locations.findIndex(city => (city.cityId === cityId));
        if (cityIndex !== -1) {
            locations.splice(cityIndex, 1);
        }
        
        // Store changes back to local storage
        localStorage.setItem("smallTalk_searchLocations", JSON.stringify(locations));

        $(event.target).closest("li").remove();

        // Render location cards
        buildLocationCards();

        // Render Search location history
        renderSearchLocations();
    }
})