$(document).ready(() => {
    const userSelect = $('#user-select');
    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    $.ajax(`${BASE_URL}/users`, {
        method: 'GET',
        success: (res) => {
            res.forEach(({id, username}) => {
                const option = document.createElement('option');
                option.value = id;
                option.innerText = username;
                userSelect.append(option);
            });
        }
    });

    userSelect.change(() => {
        const userId = userSelect.val();
        const detailsTable = $('#details-table');
        const userDetailsLoader = $('.user-details-loader');

        detailsTable.addClass('d-none');
        userDetailsLoader.removeClass('d-none');
        userSelect.attr('disabled', true);

        $.ajax(`${BASE_URL}/users/${userId}`, {
            method: 'GET',
            success: ({
                          id,
                          name,
                          company:
                              { name: companyName },
                          address: { city },
                          email,
                          website
                      }) => {
                const detailsTDs = $('.user-details-row td');

                detailsTDs[0].innerText = id;
                detailsTDs[1].innerText = name;
                detailsTDs[2].innerText = email;
                detailsTDs[3].innerText = website;
                detailsTDs[4].innerText = companyName;
                detailsTDs[5].innerText = city;
            },
            complete: () => {
                detailsTable.removeClass('d-none');
                userDetailsLoader.addClass('d-none');
                userSelect.removeAttr('disabled');
            }
        });
    });

    const imgAnimator = $('.img-animator');
    imgAnimator.click(() => {
        // if (imgAnimator.data('hidden') === false) {
        //     $('.fox-image').fadeOut();
        //     imgAnimator.data('hidden', true);
        // } else {
        //     $('.fox-image').fadeIn();
        //     imgAnimator.data('hidden', false);
        // }

        // $('.fox-image').toggle();

        // $('.fox-image').animate({
        //     opacity: 0,
        // }, 3000, () => {
        //     console.log('animation finished')
        // });
    });

    const API_KEY = '21a4d9e8258a4ce093175225212703';

    function loadWeatherData() {
        $('.weather-loader').removeClass('d-none');
        $('.weather-content').removeClass('d-flex').addClass('d-none');
        $('.load-weather').attr('disabled', true);
        $.ajax(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Baku`, {
            method: 'GET',
            success: (res) => {
                const {
                    current: {
                        condition: {
                            icon
                        },
                        temp_c
                    }
                } = res;

                $('.weather-icon').attr('src', icon);
                $('.weather-temp').text(`${temp_c}˚ C`);
            },
            error: (e) => {
                console.log(e);
            },
            complete: () => {
                $('.weather-loader').addClass('d-none');
                $('.weather-content').addClass('d-flex').removeClass('d-none');
                $('.load-weather').removeAttr('disabled');
            }
        });

        // then(res => {
        //     const {
        //         current: {
        //             condition: {
        //                 icon
        //             },
        //             temp_c
        //         }
        //     } = res;
        //
        //     $('.weather-icon').attr('src', icon);
        //     $('.weather-temp').text(`${temp_c}˚ C`);
        //     $('.weather-loader').addClass('d-none');
        //     $('.weather-content').addClass('d-flex').removeClass('d-none');
        // });
    }

    $('.load-weather').click(() => {
        loadWeatherData();
    });
});

$(window).on('load', () => {
    console.log('window loaded');

    // function loadDoc() {
    //     $.ajax('https://jsonplaceholder.typicode.com/posts', {method: 'GET'}).then(response => {
    //         console.log(response)
    //     }).catch((e) => {
    //         console.log(e)
    //     });
    //
    //     // var xhttp = new XMLHttpRequest();
    //     // xhttp.onreadystatechange = function() {
    //     //     if (this.readyState == 4 && this.status == 200) {
    //     //         console.log(JSON.parse(xhttp.response));
    //     //     }
    //     // };
    //     // xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    //     // xhttp.send();
    // }
    //
    // loadDoc();
})

// image ratio trick
