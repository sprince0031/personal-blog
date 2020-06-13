let darkTheme = false;

$(function() {
    var href = window.location.href;
    $('.navbar .nav-item a').each(function(e,i) {
        if (href.indexOf($(this).attr('href')) >= 0) {
            console.log($(this).attr('href'), href);
            $(this).addClass('active');
        }
    });
});

$(function() {
    if($(window).width() <= 767 ) {
        $('#theme-toggle-btn').addClass('theme-toggle-fixed');
    } else {
        $('#theme-toggle-btn').removeClass('theme-toggle-fixed');
    }
});

function themeSwitcher(darkTheme) {
    if (darkTheme) {
        $(':root').css('--background-colour', '#111');
        $(':root').css('--primary-text-colour', '#fff');
        $(':root').css('--accent-colour', '#a80b0b');
        $('#theme-toggle-btn').html(`<svg class="bi bi-brightness-high-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="4"/>
                <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>`);
        
    } else {
        $(':root').css('--background-colour', '#fff');
        $(':root').css('--primary-text-colour', '#111');
        $(':root').css('--accent-colour', '#2e6cd1');
        $('#theme-toggle-btn').html(`<svg class="bi bi-moon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
            </svg>`);

    }
}

$("#theme-toggle-btn").on('click', () => {
    darkTheme = (darkTheme) ? false : true;
    // console.log(darkTheme)
    $.post('/themetoggle',
    {
        darkTheme: darkTheme,
    }, 
    (data, status) => {
        // console.log(data, status);
        darkTheme = data == 'true';
        themeSwitcher(darkTheme);
        console.log(`Theme is now ${(darkTheme) ? "dark" : "light"}.`);
    });
});
