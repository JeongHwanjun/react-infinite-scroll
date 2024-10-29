const PostListItem = ({post, style}) => {
    const {title, body} = post
    return(
        <div className="post" style={style}>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    )
}

export default PostListItem