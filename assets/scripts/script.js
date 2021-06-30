// ------------- Assignment Code -------------
let autocomplete;

// ---------------- Functions ----------------
// Run on web page load
function init() {
    renderHeader();
    renderMainContent();
    renderFooter();
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();
    searchInputAutoComplete();
    renderSearchLocations();
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

    // Build button to access location search
    let $btnLocationSearch = $("<a>");
    $btnLocationSearch.attr("id", "addLocations");
    $btnLocationSearch.attr("href", "#");
    $btnLocationSearch.attr("data-target", "locationSlideOut");
    $btnLocationSearch.addClass("sidenav-trigger waves-effect waves-light btn");

    let $btnLocationSearchIcon = $("<i>");
    $btnLocationSearchIcon.addClass("material-icons left");
    $btnLocationSearchIcon.text("search");

    $btnLocationSearch.append($btnLocationSearchIcon);
    $btnLocationSearch.append("Add Locations");

    // Append location search button to main container
    $(".container").append($btnLocationSearch);

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
        $locationCardDiv.addClass("card horizontal");

        // Build the location card Title
        let $locationCardTitle = $("<div>");
        $locationCardTitle.addClass("card-title");
        let $locationCardTitleH3 = $("<h3>");
        $locationCardTitleH3.text(locationItems[i].cityName);

        // Append the location card title to card Div
        $locationCardTitle.append($locationCardTitleH3);
        $locationCardDiv.append($locationCardTitle);

        // Build the location card content
        let $locationCardStack = $("<div>");
        $locationCardStack.addClass("card-stacked");

        let $locationCardContent = $("<div>");
        $locationCardContent.attr("id", `Card-${locationItems[i].cityId}`);
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
        $searchResultA.addClass("subheader");

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

// Calls init to retrieve data and render it to the page on load
init();

// ------------- Event Listeners -------------
//Store the new location in local storage once found via google
document.querySelector("#addButton").addEventListener("click", function(event) {
    // Get search history items from local storage
    let locationItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (locationItems === null) {
        locationItems = [];
    }
    
    // Set the new entry for the array
    let searchCity = $("#searchInput").val().trim();
    let cityId = $("#searchInputId").val();
    let cityLAT = $("#searchInputLAT").val();
    let cityLNG = $("#searchInputLNG").val();
    let newEntry = {
        "cityId": cityId,
        "cityName": searchCity,
        "cityLAT": cityLAT,
        "cityLNG": cityLNG
    }

    // Check if an item already exists in the array and either add new or delete and add
    let validateCity = locationItems.filter(city =>(city.cityId === cityId));

    console.log(validateCity);

    let cityIndex = locationItems.findIndex(city => city.cityId === cityId);
    if (validateCity.length === 0 && newEntry.cityId.length > 0) {
        // Does not exist in array so add
        console.log("Does not exist. Added.");
        locationItems.push(newEntry);
    } else if (newEntry.cityId.length > 0 && cityIndex != -1) {
        // Does exist in the array so delete and add
        console.log("Does exist. Replaced.");
        locationItems.splice(cityIndex, 1);
        locationItems.push(newEntry);
    }
    
    // Store changes back to local storage
    localStorage.setItem("smallTalk_searchLocations", JSON.stringify(locationItems));

    // TODO: User Story #1 -> Location Form Reset

    // Render Search location history
    renderSearchLocations();
});

// Google event listener for the location search field
google.maps.event.addListener(autocomplete, "place_changed", function() {
    let searchPlace = autocomplete.getPlace();

    if (searchPlace.name !== "") {

        $("#searchInputId").val(searchPlace.place_id);
        $("#searchInputLAT").val(searchPlace.geometry.location.lat());
        $("#searchInputLNG").val(searchPlace.geometry.location.lng());

        $("#addButton").removeClass("disabled");
    } else {
        $("#searchInputId").val("");
        $("#searchInputLAT").val("");
        $("#searchInputLNG").val("");

        $("#addButton").addClass("disabled");
    }
})

// TODO: User Story #3 -> Delete Locations from Dashboard
// Need an event handler for individual clicking the delete / trash can button