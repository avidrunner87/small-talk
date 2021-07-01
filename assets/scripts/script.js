// ------------- Assignment Code -------------
let autocomplete;
let registeredWidgets = [];

// ------------ General Functions ------------
// Run on web page load
function init() {
    // Activate the page content
    renderHeader();
    renderMainContent();
    renderFooter();
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    searchInputAutoComplete();
    renderSearchLocations();

    // Activate widgets
    weatherWidget(true);
    
    // Activate widget slide-out
    renderFilterWidgets();
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
    let locationItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locationItems === null) {
        locationItems = [];
    }

    for (let i = 0; i < locationItems.length; i++) {
        // Build the location card Div
        let $locationCardDiv = $("<div>");
        $locationCardDiv.addClass("card horizontal locationCard");
        $locationCardDiv.attr("cityId", `${locationItems[i].cityId}`);

        // Build the location card Title
        let $locationCardTitle = $("<div>");
        $locationCardTitle.addClass("card-title");
        let $locationCardTitleH3 = $("<h3>");
        $locationCardTitleH3.text(locationItems[i].cityShortName);

        // Append the location card title to card Div
        $locationCardTitle.append($locationCardTitleH3);
        $locationCardDiv.append($locationCardTitle);

        // Build the location card content
        let $locationCardStack = $("<div>");
        $locationCardStack.addClass("card-stacked");

        let $locationCardContent = $("<div>");
        $locationCardContent.attr("id", `Content-${locationItems[i].cityId}`);
        $locationCardContent.addClass("card-content");

        // Append the location card content to card Div 
        $locationCardStack.append($locationCardContent);
        $locationCardDiv.append($locationCardStack);

        // Append the location card to the container
        $(".container").append($locationCardDiv);
    }
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
    let locationItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locationItems === null) {
        locationItems = [];
    }

    // TODO: User Story #4 -> Sort Locations
    // locationItems.sort(function(a, b) {
    //     return a.cityName - b.cityName
    // });


    for (let i = 0; i < locationItems.length; i++) {
        let $searchResult = $("<li>");
        $searchResult.addClass("searchResult");

        let $searchResultA = $("<a>");

        let $searchResultRemove = $("<i>");
        $searchResultRemove.attr("id", locationItems[i].cityId);
        $searchResultRemove.addClass("small material-icons");
        $searchResultRemove.text("delete");

        $searchResultA.append($searchResultRemove);
        $searchResultA.append(locationItems[i].cityName);
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
    // Set widget name -> Letters and Numbers Only
    const widgetName = "Weather";
    const widgetConsName = widgetName.replace(/ /g,'');

    // Register widget on initial page load
    if (onInit) {
        let widgetItem = {
            "widgetName": widgetName,
            "widgetConsName": widgetConsName
        }
        registeredWidgets.push(widgetItem);
    }

    // Get active filter widgets items from local storage
    let activeWidgets = JSON.parse(localStorage.getItem("smallTalk_activeWidgets"));
    if (activeWidgets === null) {
        activeWidgets = [];
    }

    // Check if an item already exists in the array to determine whether to show widget
    let validateWidget = activeWidgets.filter(widget => (widget.widgetConsName === widgetConsName));

    if (validateWidget.length !== 0) {


    } else {
        // Disabled in user settings and needs to be removed.
        $(".weatherWidgetCard").remove();
    }

}

// ------------- Event Listeners -------------
// Store the new location in local storage once found via google
document.querySelector("#addButton").addEventListener("click", function(event) {
    // Get locations from local storage
    let locationItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locationItems === null) {
        locationItems = [];
    }
    
    // Set the new entry for the array
    let searchCity = $("#searchInput").val().trim();
    let cityShortName = $("#searchInputShortName").val();
    let cityId = $("#searchInputId").val();
    let cityLAT = $("#searchInputLAT").val();
    let cityLNG = $("#searchInputLNG").val();
    let newEntry = {
        "cityId": cityId,
        "cityName": searchCity,
        "cityShortName": cityShortName,
        "cityLAT": cityLAT,
        "cityLNG": cityLNG
    }

    // Check if an item already exists in the array and either add new or delete and add
    let validateCity = locationItems.filter(city => (city.cityId === cityId));

    let cityIndex = locationItems.findIndex(city => (city.cityId === cityId));
    if (validateCity.length === 0 && newEntry.cityId.length > 0) {
        // Does not exist in array so add
        locationItems.push(newEntry);
    } else if (newEntry.cityId.length > 0 && cityIndex !== -1) {
        // Does exist in the array so delete and add
        locationItems.splice(cityIndex, 1);
        locationItems.push(newEntry);
    }
    
    // Store changes back to local storage
    localStorage.setItem("smallTalk_searchLocations", JSON.stringify(locationItems));

    // TODO: User Story #1 -> Location Form Reset

    // Render location cards
    buildLocationCards();

    // Render Search location history
    renderSearchLocations();
});

// Update the registered Widgets local storage
document.querySelector("#widgetsSlideOut").addEventListener("click", function(event) {
    if (event.target.matches("input") === true || event.target.parentNode.matches("input") === true) {
        // Get active filter widgets items from local storage
        let activeWidgets = JSON.parse(localStorage.getItem("smallTalk_activeWidgets"));
        if (activeWidgets === null) {
            activeWidgets = [];
        }
        const id = event.target.id || event.target.parentNode.id;
        const widgetConsName = id.substring(id.indexOf("-") + 1);
        console.log(id);
        console.log(widgetConsName);

        console.log($(`#${id}`).prop('checked'));

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
    
    }
});

// Google event listener for the location search field
google.maps.event.addListener(autocomplete, "place_changed", function() {
    let searchPlace = autocomplete.getPlace();  

    if (searchPlace.name !== "") {
        $("#searchInputShortName").val(searchPlace.name);
        $("#searchInputId").val(searchPlace.place_id);
        $("#searchInputLAT").val(searchPlace.geometry.location.lat());
        $("#searchInputLNG").val(searchPlace.geometry.location.lng());

        $("#addButton").removeClass("disabled");
    } else {
        $("#searchInputShortName").val("");
        $("#searchInputId").val("");
        $("#searchInputLAT").val("");
        $("#searchInputLNG").val("");

        $("#addButton").addClass("disabled");
    }
})

// TODO: User Story #3 -> Delete Locations from Dashboard
// Need an event handler for individual clicking the delete / trash can button