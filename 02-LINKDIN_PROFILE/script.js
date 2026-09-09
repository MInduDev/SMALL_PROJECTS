// ======= FOLLOW BUTTONS =======

function followUser() {

    let button = document.getElementById("followButton");

    if (button.innerText === "Follow") {
        button.innerText = "Following";
        button.classList.remove("btn-primary");
        button.classList.add("btn-success");
        showNotification("You are now following this user");

    } else {

        button.innerText = "Follow";
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");
        showNotification("You unfollowed this user");
    }

}


// ======= LIKE POST =======

function likePost(button) {
    let post = button.closest(".post");
    let likeText = post.querySelector(".like-count");
    let currentLikes = parseInt(
        likeText.innerText
    );

    if (!button.classList.contains("liked")) {
        currentLikes++;
        button.classList.add("liked");
        button.innerHTML =
            '<i class="bi bi-hand-thumbs-up-fill"></i> Liked';
    } else {

        currentLikes--;
        button.classList.remove("liked");
        button.innerHTML =
            '<i class="bi bi-hand-thumbs-up"></i> Like';
    }

    likeText.innerText =
        currentLikes + " likes";
}


// ======= COMMENT BOX =======

function showCommentBox(button) {
    let post = button.closest(".post");
    let commentBox = post.querySelector(".comment-section");

    commentBox.classList.toggle("d-none");
}


// ======= ADD COMMENT =======

function addComment(button) {

    let commentSection = button.closest(".comment-section");
    let input = commentSection.querySelector(".comment-input");
    let comments = commentSection.querySelector(".comments");
    let commentText = input.value.trim();


    if (commentText === "") {
        alert("Please write a comment.");
        return;
    }


    let newComment = document.createElement("p");
    newComment.innerHTML = "<strong>You:</strong> " + commentText;

    comments.appendChild(newComment);
    input.value = "";

}


// ======= SHARE POST =======
function sharePost() {
    showNotification(
        "Post link copied successfully!"
    );

}


// ======= CREATE POST =======
function createPost() {

    let input = document.getElementById("postInput");
    let postText = input.value.trim();

    if (postText === "") {
        alert("Please write something before posting.");
        return;
    }


    let postContainer = document.getElementById("postContainer");
    let newPost = document.createElement("div");

    newPost.className = "card mb-4 post";


    newPost.innerHTML = `

        <div class="card-body">
            <div class="d-flex">
                <img
                    src="https://i.pravatar.cc/100?img=47"
                    class="post-profile-image">

                <div class="ms-3">
                    <h6 class="mb-0">
                        Reetwika
                    </h6>

                    <small class="text-muted">
                        Full Stack Developer
                    </small>

                </div>
            </div>


            <p class="mt-3 post-content">
                ${postText}
            </p>


            <div class="d-flex justify-content-between">
                <small class="text-muted like-count">
                    0 likes
                </small>

                <small class="text-muted">
                    0 comments
                </small>
            </div>


            <hr>


            <div class="d-flex justify-content-around">
                <button
                    class="btn btn-light action-btn"
                    onclick="likePost(this)">

                    <i class="bi bi-hand-thumbs-up"></i>
                    Like
                </button>


                <button
                    class="btn btn-light action-btn"
                    onclick="showCommentBox(this)">

                    <i class="bi bi-chat"></i>
                    Comment
                </button>


                <button
                    class="btn btn-light action-btn"
                    onclick="sharePost()">

                    <i class="bi bi-share"></i>
                    Share
                </button>

            </div>


            <div class="comment-section mt-3 d-none">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control comment-input"
                        placeholder="Write a comment...">

                    <button
                        class="btn btn-primary"
                        onclick="addComment(this)">
                        Send
                    </button>
                </div>


                <div class="comments mt-2"></div>
            </div>
        </div>
    `;


    postContainer.prepend(newPost);
    input.value = "";

    showNotification(
        "Your post was published!"
    );
}


// ======= EDIT PROFILE =======

function saveProfile() {

    let name = document.getElementById("editName").value;
    let role = document.getElementById("editRole").value;
    let about = document.getElementById("editAbout").value;


    if (
        name.trim() === "" ||
        role.trim() === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }


    document.getElementById("profileName") .innerText = name;
    document.getElementById("profileRole") .innerText = role;
    document.getElementById("aboutText") .innerText = about;


    // Close Bootstrap modal
    let modalElement = document.getElementById("editProfileModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();


    showNotification(
        "Profile updated successfully!"
    );
}


// ======= SEARCH POST =======

function searchPosts() {
    let search = document.getElementById("searchInput")
        .value
        .toLowerCase();


    let posts = document.querySelectorAll(".post");


    posts.forEach(function(post) {

        let content =
            post.innerText.toLowerCase();


        if (content.includes(search)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }
    });
}


// ======= NOTIFICATION =======

function showNotification(message) {

    let notification = document.getElementById("notification");


    notification.innerText = message;
    notification.style.display = "block";


    setTimeout(function() {
        notification.style.display = "none";
    }, 2500);

}
