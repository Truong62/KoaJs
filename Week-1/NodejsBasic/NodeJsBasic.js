//EX2 Get data from all users from API above. You will get a list of 10 users.
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());

// get data
const fetchApi = async (path) => {
    const resp = await fetch("https://jsonplaceholder.typicode.com" + path)
    return resp.json()
}
const getAllData = async () => {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchApi("/users"),
            fetchApi("/posts"),
            fetchApi("/comments")
        ]);

        return [users, posts, comments];

    } catch (error) {
        console.error(error);
    }
}
//EX3 Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:
const logUserPostsCmt = async () => {
    try {
        const [users, posts, comments] = await getAllData()

        const logUserPost = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
            return {
                ...user,
                "posts": userPosts,
                "comments": userComments,
            };
        });

        console.log(JSON.stringify(logUserPost[0], null, 2));
    } catch (error) {
        console.error(error);
    }
}
//EX4 Filter only users with more than 3 comments.

const logUserComment = async () => {
    try {
        const [users, posts, comments] = await getAllData()

        const logUserPost = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
            if (userComments.length > 3) {
                return {
                    ...user,
                    "posts": userPosts,
                    "comments": userComments,
                };
            }
        });

        console.log(JSON.stringify(logUserPost[0], null, 2));
    } catch (error) {
        console.error(error);
    }
}

//ex5 Reformat the data with the count of comments and posts
const logUserReformat = async () => {
    try {
        const [users, posts, comments] = await getAllData()
        const logUserPost = users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId));
            return {
                ...user,
                "posts": userPosts.length,
                "comments": userComments.length,
            };
        });
        // console.log(JSON.stringify(logUserPost, null, 2));
        return logUserPost;

    } catch (error) {
        console.error(error);
    }
}
//ex6 Who is the user with the most comments/posts?
const logUserTheMost = async () => {
    const UserReformat = await logUserReformat();
    try {
        let userTheMost = UserReformat.reduce((accumulator, currentValue) => {
            return (accumulator.comments > currentValue.comments) ? accumulator : currentValue
        });
        console.log(userTheMost)
    } catch (error) {
        console.error(error);
    }
}
//EX7 Sort the list of users by the postsCount value descending?

const logUserPostsCountDescending = async () => {
    const UserReformat = await logUserReformat();
    UserReformat.sort((a, b) => {
        return b.posts - a.posts;
    });
    console.log(UserReformat);
    return UserReformat;
}

//EX8 Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:

const getIdPostComment = async () => {
    try {
        const [posts, comments] = await Promise.all([
            fetchApi(`/posts/1`),
            fetchApi(`/comments?postId=1`)
        ]);
        const formattedUser = {
            ...posts,
            comments
        };
        console.log(formattedUser);
    } catch (error) {
        console.error(error);
    }
}
getIdPostComment();
// hello co ba
Ngoctruongpk