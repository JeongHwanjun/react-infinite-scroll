import PostListItem from "./PostListItem"
import {useEffect, useState, useRef} from 'react'
import { AutoSizer, List } from "react-virtualized"
import axios from "axios"
import '../styles/Styles.scss'

const PostList = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const scrollPositionRef = useRef(0);
    const listRef = useRef(null)

    useEffect(() => {
        const fetchPost = async () => { // 데이터를 받아옴
            setLoading(true)
            try{
                // 로딩 과정을 알 수 있게 한번에 소량만 받아옴
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
                setPosts(prevPosts => [...prevPosts, ...res.data])
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
            console.log(posts.length)
        }
        fetchPost()
    },[page])
    

    const loadingNextPage = ({scrollTop, clientHeight, scrollHeight}) => {
        scrollPositionRef.current = scrollTop
        if(scrollHeight - scrollTop <= 1.5 * clientHeight && !loading){
            setPage(prevPage => prevPage + 1)
            console.log("reload")
        }
    }

    useEffect(() => {
        if(listRef.current){
            listRef.current.scrollToPosition(scrollPositionRef.current)
        }
    })

    const rowRenderer = ({index, key, style}) =>{
        const post = posts[index]
        if(!post) return null
        return(
            <PostListItem
            post={post}
            key={post.id}
            style={style}/>
        )
    }

    return(
        <div>
            {loading && posts.length === 0 && <div>로딩중 . . . </div>}
            <List
                ref={listRef}
                className="PostList"
                width={768}
                height={500}
                rowCount={posts.length}
                rowHeight={293}
                rowRenderer={rowRenderer}
                onScroll={loadingNextPage}
                style={{outline : 'none'}}
            />
            {loading && posts.length>0 && <div>로딩중 . . . </div>}
        </div>
            
    )
}

export default PostList