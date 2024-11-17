import { useEffect, useState } from 'react';
import './FullPost.css';
import axios from 'axios';

const FullPost = props => {
        const [updatedPost, setUpdatedPost] = useState(null);

        useEffect(()=>{
            if(props.id){
                axios.get('https://jsonplaceholder.typicode.com/posts/'+props.id)
                .then(response => {
                    console.log(response);
                    setUpdatedPost(response.data)
                });
            }
        },[props.id]);

        const deletePostHandler = (id) => {
            axios.delete('https://jsonplaceholder.typicode.com/posts/'+props.id)
            .then(response => console.log(response));
        }

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(props.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(updatedPost){
            post = (
                <div className="FullPost">
                    <h1>{updatedPost.title}</h1>
                    <p>{updatedPost.body}</p>
                    <div className="Edit">
                        <button onClick={deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
}

export default FullPost;