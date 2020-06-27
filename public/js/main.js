let darkTheme;

$(() => {
    $.get('/admin/checkauth').done(data => {
        const authState = data.isAuthenticated;
        exposeAdminControls(authState);
    });
})

function exposeAdminControls(authState) {
    const href = window.location.pathname;
    console.log(href);
    
    if (authState) {
        console.log("exposeControls: " + authState);
        $('#compose-btn').removeClass('hidden');
        $('#compose-btn').addClass('visible');
        $('#logout-btn').removeClass('hidden');
        $('#logout-btn').addClass('visible');
        $('#compose-btn').show();
        $('#logout-btn').show();
        // Add code to expose delete and edit post icons in home and individual post page
        if (href.includes('/posts/')) {
            $('#post-title-div').removeClass('col-md-12');
            $('#post-title-div').addClass('col-md-10');
            $('#post-icon-div').removeClass('hidden');
            $('#post-icon-div').addClass('visible');
            $('#post-icon-div').show();
        }
    } else {
        console.log("exposeControls: " + authState);
        $('#compose-btn').removeClass('visible');
        $('#compose-btn').addClass('hidden');
        $('#logout-btn').removeClass('visible');
        $('#logout-btn').addClass('hidden');
        $('#compose-btn').hide();
        $('#logout-btn').hide();
        if (href.includes('/posts/')) {
            $('#post-title-div').removeClass('col-md-10');
            $('#post-title-div').addClass('col-md-12');
            $('#post-icon-div').removeClass('visible');
            $('#post-icon-div').addClass('hidden');
            $('#post-icon-div').hide();
        }
    }
}

/*----------------------------------------------------------------------------- 
Dark theme switching functionality
*/

function setCookie(cookieName, cookieValue, exdays) {
    var expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ expiryDate.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieList = decodedCookie.split(';');
    for(var i = 0; i <cookieList.length; i++) {
        var c = cookieList[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

$(document).ready(function () {
    var darkThemeCookie = getCookie("darkTheme");
    if (darkThemeCookie != "") {
        darkTheme = (darkThemeCookie === 'true')
        // console.log(`darkTheme cookie: ${darkThemeCookie}`); // for debug purpose
    } else {
        darkTheme = false;
        setCookie("darkTheme", darkTheme, 365);
    }
    themeSwitcher(darkTheme);
});

function themeSwitcher(darkTheme) {
    if (darkTheme) {
        $(':root').css('--background-colour', '#000');
        $(':root').css('--primary-text-colour', '#fff');
        $(':root').css('--accent-colour', '#a80b0b');
        $('#theme-toggle-btn').html(`<svg class="bi bi-brightness-high-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="4"/>
                <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>`);
            $('#meta-theme').attr('content', '#000');
        
    } else {
        $(':root').css('--background-colour', '#fff');
        $(':root').css('--primary-text-colour', '#000');
        $(':root').css('--accent-colour', '#2e6cd1');
        $('#theme-toggle-btn').html(`<svg class="bi bi-moon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
            </svg>`);
            $('#meta-theme').attr('content', '#fff');
    }
}

$("#theme-toggle-btn").on('click', () => {
    darkTheme = (darkTheme) ? false : true;
    setCookie("darkTheme", darkTheme, 365);
    themeSwitcher(darkTheme);
    // console.log(`Theme is now ${(darkTheme) ? "dark" : "light"}.`);
});

/*----------------------------------------------------------------------------- 
Active nav item toggler
*/

$(function() {
    const href = window.location.href;
    $('.navbar .nav-item a').each(function(e,i) {
        const navHref = $(this).attr('href');
        if (navHref === href.substring(href.length - navHref.length)) {
            $(this).addClass('active');
        }
    });
});

/*----------------------------------------------------------------------------- 
Set theme switcher button to absolute position when navbar collapses
*/

$(function() {
    if($(window).width() <= 767 ) {
        $('#theme-toggle-btn').addClass('theme-toggle-fixed');
        $('#compose-btn').addClass('compose-button-fixed');
        $('#logout-btn').addClass('logout-button-fixed');
    } else {
        $('#theme-toggle-btn').removeClass('theme-toggle-fixed');
        $('#compose-btn').removeClass('compose-button-fixed');
        $('#logout-btn').removeClass('logout-button-fixed');
    }
});