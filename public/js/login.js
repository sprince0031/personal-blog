$(function() {
    const href = window.location.href;
    
    if (href.endsWith('/login')) {
        let cheatString = "";
        let pass = 0;
        let secretKey;
        $(document).keydown(event => { 
            pass += event.keyCode;

            if (event.keyCode === 27) {
                cheatString = '';
                pass = 0;
            }

            if (pass === 32) {
                const magicWord = prompt("Enter the magic word!");
                $.ajax({
                    type: "post",
                    url: "/admin/imperio",
                    data: JSON.stringify({magicWord: magicWord}),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
                        if (response.secretKey) {
                            secretKey = response.secretKey;
                            const successIndicator = `<svg style="margin-left: 5px; margin-bottom: 5px;" class="bi bi-unlock" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 0 0-.224.296 1.626 1.626 0 0 0-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 0 0 .436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 0 0 .224-.296 1.627 1.627 0 0 0 .138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 0 0-.255-.237A1.122 1.122 0 0 0 9.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
                                                </svg>`;
                            $('footer a').append(successIndicator);
                            setTimeout(() => {
                                secretKey = undefined;
                                $('footer .bi-unlock').remove();
                            }, 7000);
                        } else {
                            console.log(response.error);
                        }
                        
                    }
                });
                
            }
            if (secretKey) {
                if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
                    cheatString += event.key;
                    if (cheatString.length === 1) {
                        setTimeout(function() {
                            cheatString = "";
                        }, 7000);
                    } else if (cheatString.length > 14) {
                        cheatString = "";
                    }
                    
                    if (cheatString === secretKey) {
                        $('form').attr('action', ('/admin/register'));
                        $('form button').text('Register');
                        secretKey = undefined;
                    }
                }
            }
            
        });
    }
});