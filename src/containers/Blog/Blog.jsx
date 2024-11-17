import {useEffect, useState } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response =>{
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return {
                    ...post,
                    title : post["title"].slice(0,10),
                    author : 'Max'
                };
            });
            setPosts(updatedPosts);
        });
    },[]);

    const selectedPostHandler = (id) => {
        console.log(id);
        setSelectedPost(id);
    }
    return (
            <div>
                <section className="Posts">
                    {posts.map(post => 
                        <Post 
                            key={post.id} 
                            title={post.title}
                            author={post.author}
                            clicked={()=>selectedPostHandler(post.id)}/>)}
                </section>
                <section>
                    <FullPost id={selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );

}

export default Blog;