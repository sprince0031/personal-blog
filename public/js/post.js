function deletePost(postId, endpoint) {
    const choice = prompt(`Are you sure you want to delete this post? If you do, type ${endpoint} and submit.`);
    if (choice === endpoint) {
        $.ajax({
            type: "delete",
            url: `/posts/${endpoint}/delete?${$.param({'id': postId})}`
        }).done((result) => {
            if (result.error) {
                alert(`An error has occurred!\n${result.error}`);
            } else {
                if (result.deleted) {
                    alert("This post has been successfully deleted.");
                    window.location.assign('/');
                } else {
                    alert("There was an error deleting this post.");
                }
            }
        });
    } else {
        alert("Sorry! The entered endpoint does not match with the actual endpoint value. Please try again.");
    }
}