import PostListItem from "./PostListItem"
import {useEffect, useState} from 'react'
import { AutoSizer, List } from "react-virtualized"
import axios from "axios"
import '../styles/Styles.scss'

const PostList = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchPost = async () => { // 데이터를 받아옴
            setLoading(true)
            try{
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
                setPosts(prevPosts => [...prevPosts, ...res.data])
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        }
        fetchPost()
    },[page])

    if(loading){
        return (
            <div>로딩중</div>
        )
    }

    if(!posts){
        return null
    }

    const loadingNextPage = ({scrollTop, clientHeight, scrollHeight}) => {
        if(scrollHeight - scrollTop <= 1.5 * clientHeight && !loading){
            setPage(prevPage => prevPage + 1)
        }
    }

    const rowRenderer = ({index, key, style}) =>{
        const post = posts[index]
        return(
            <PostListItem
            post={post}
            key={post.id}
            style={style}/>
        )
    }

    return(
            <List
                className="PostList"
                width={768}
                height={500}
                rowCount={posts.length}
                rowHeight={293}
                rowRenderer={rowRenderer}
                onScroll={loadingNextPage}
                style={{outline : 'none'}}
            />
    )
}

export default PostList