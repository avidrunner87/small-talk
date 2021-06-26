// ------------- Assignment Code -------------
let autocomplete;

// ---------------- Functions ----------------
// Run on web page load
function init() {
    renderHeader();
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

// Enable autocomplete on the search input
function searchInputAutoComplete() {
    let searchInput = document.getElementById('searchInput');

    autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['geocode']
    });
}

// Create the Search history
function renderSearchLocations() {
    $(".searchResult").remove();
    // Get the list of search history items from local storage
    let searchItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (searchItems === null) {
        searchItems = [];
    }

    // TODO: Fix the sort on the searchItems array
    searchItems.sort(function(a, b) {
        return a.cityName - b.cityName
    });

    for (let i = 0; i < searchItems.length; i++) {
        let $searchResult = $("<li>");
        $searchResult.addClass("searchResult");

        let $searchResultA = $("<a>");
        $searchResultA.addClass("subheader");

        let $searchResultI = $("<i>");
        $searchResultI.addClass("material-icons");
        $searchResultI.text("location_on");

        $searchResultA.append($searchResultI);
        $searchResultA.append(searchItems[i].cityName);
        $searchResult.append($searchResultA);

        $("#slide-out").append($searchResult);
    }
}

// Calls init to retrieve data and render it to the page on load
init();

// ------------- Event Listeners -------------
document.querySelector("#addButton").addEventListener("click", function(event) {
    // Get search history items from local storage
    let searchItems = JSON.parse(localStorage.getItem("smallTalk_searchLocations"));
    if (searchItems === null) {
        searchItems = [];
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
    let validateCity = searchItems.filter(city =>(city.cityId === cityId));

    console.log(validateCity);

    let cityIndex = searchItems.findIndex(city => city.cityId === cityId);
    if (validateCity.length === 0 && newEntry.cityId.length > 0) {
        // Does not exist in array so add
        console.log("Does not exist. Added.");
        searchItems.push(newEntry);
    } else if (newEntry.cityId.length > 0 && cityIndex != -1) {
        // Does exist in the array so delete and add
        console.log("Does exist. Replaced.");
        searchItems.splice(cityIndex, 1);
        searchItems.push(newEntry);
    }
    
    // Store changes back to local storage
    localStorage.setItem("smallTalk_searchLocations", JSON.stringify(searchItems));

    // Render Search location history
    renderSearchLocations();
});

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