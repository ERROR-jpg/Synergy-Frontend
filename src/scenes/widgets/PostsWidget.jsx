import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile  }) => {

  console.log("PostsWidgit")
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  console.log(posts)
  const getPosts = async () => {
    
    const response = await fetch("https://synergy-api-5mej.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://synergy-api-5mej.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));
    
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          imageUrl,
          userPicturePath,
          likes,
          comments,
          userimageUrl
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={imageUrl}
            userPicturePath={userimageUrl}
            likes={likes}
            comments={comments}
          />
         
        )
      )}
    </>
  );
};

export default PostsWidget;
