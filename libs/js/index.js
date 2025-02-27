/*
window.onload = function() {
    const preloader = $('#preloader');
    const content = $('#map');

    // Show the preloader initially
    preloader.show();
    content.hide();

    // Fade out preloader after 5 seconds
    setTimeout(function() {
        preloader.fadeOut(1000, function() { 
            content.show(); 
        });
    }, 2000); 
};
*/
$(document).ready(function() {
    fetchDogImages();
});


//Search function
$("#searchInp").on("keyup", function () {
    const searchTerm = $("#searchInp").val();
});


//Populating filter modal
$('#filterModal').on('show.bs.modal', function () {
    constbreedSelect = $('#breedSelection');
    
    constbreedSelect.empty();
    constbreedSelect.append('<option value="all" selected>All Locations</option>');

    $.ajax({
        url: 'libs/php/getAllBreeds.php', 
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.status.code === "200") {
                response.data.forEach(function(location) {
                    locationSelect.append(`
                        <option value="${location.id}">${location.name}</option>
                    `);
                });
                
                const activeLocation = locationSelect.data('selected') || 'all';
                locationSelect.val(activeLocation);
            } else {
                console.error("Error fetching dogs:", response.status.description);
            }
        },
        error: function() {
            console.error("AJAX request failed.");
        }
    });

});


/*
function fetchDogImages(searchTerm) {
    $.ajax({
        url: "libs/php/getAllDogImages.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200" && result.data) {
                let dogContainer = $("#dogs .row");
                dogContainer.empty();

                // Only iterate over the first 5 images
                result.data.slice(0, 6).forEach(function (dog, index) {
                    let dogCard = `
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 dog-card mb-4">
                            <div class="card shadow p-3">
                                <img src="${dog.url}" class="card-img-top" alt="Adoptable Dog ${index + 1}">
                            </div>
                        </div>
                    `;
                    dogContainer.append(dogCard);
                });
            } else {
                $("#dogs .row").html("<p class='text-center'>No dog images available.</p>");
            }
        },
        error: function () {
            $("#dogs .row").html("<p class='text-center'>Error fetching dog images. Please try again.</p>");
        },
    });
};
*/

function fetchDogImages() {
    $.ajax({
        url: "libs/php/getAllDogImages.php",
        type: "GET", 
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200" && result.message && Array.isArray(result.message)) {
                let dogContainer = $("#dogs");
                dogContainer.empty();  

                result.message.forEach(function (dogUrl, index) {
                    let dogCard = `
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 dog-card mb-4">
                            <div class="card shadow p-3">
                                <img src="${dogUrl}" class="card-img-top" alt="Dog Image ${index + 1}">
                            </div>
                        </div>
                    `;
                    dogContainer.append(dogCard);
                });
            } else {
                $("#dogs").html("<p class='text-center'>No dog images available.</p>");
            }
        },
        error: function () {
            $("#dogs").html("<p class='text-center'>Error fetching dog images. Please try again.</p>");
        }
    });
}





function fetchSuccessfulAdoptions(){
    $.ajax({
        url: "libs/php/dogImages.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200" && result.data) {
                let dogContainer = $("#dogs .row"); // Select the container where dog cards will be added
                dogContainer.empty(); // Clear any existing content

                result.data.forEach(function (dog, index) {
                    let dogCard = `
                        <div class="col-md-4 col-lg-2 dog-card">
                            <div class="card">
                                <img src="${dog.url}" class="card-img-top" alt="Adoptable Dog ${index + 1}">
                                <div class="card-body text-center">
                                    <h5 class="card-title">Dog ${index + 1}</h5>
                                    <p class="card-text">Looking for a loving home!</p>
                                </div>
                            </div>
                        </div>
                    `;
                    dogContainer.append(dogCard);
                });
            } else {
                $("#dogs .row").html("<p class='text-center'>No dog images available.</p>");
            }
        },
        error: function () {
            $("#dogs .row").html("<p class='text-center'>Error fetching dog images. Please try again.</p>");
        },
    });
}
