async function Post({ params }) {
  const { postId } = await params;
  return (
    <div className="flex justify-center items-center mt-10">Post {postId}</div>
  );
}

export default Post;
