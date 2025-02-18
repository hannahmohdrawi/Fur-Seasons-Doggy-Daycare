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

function fetchDogImages() {
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
};


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
