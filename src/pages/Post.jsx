import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appwrite/database_storage'
import { Button, Container} from "../components";
import parse from "html-react-parser";
import { useSelector,useDispatch } from "react-redux";
import Loading from "../components/Loading/Loading";
import { follow,unfollow } from "../store/followerSlice";
import { FcLike ,FcDislike} from "react-icons/fc";
import auth from "../appwrite/auth";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const [liked,setLiked] = useState(true)

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
    
        } else navigate("/");
        setTimeout(() => {
            setLoading(false)
        },2000);
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_image);
                navigate("/");
            }
        });
    };

    useEffect(()=>{
        auth.getDocument().then(()=>{
            const ifLiked = docs.documents[0].likedPosts.findIndex(((item)=>item===post.$id))
            if(ifLiked==-1) setLiked(true)
        }) 
    },[])
    
    const isFollowing = useSelector((state)=>state.follow.followList.findIndex((userId) => userId === post?.userId)!==-1)
    
    const handleFollowUser = () =>{
        console.log(isFollowing)
        if(isFollowing){
            dispatch(unfollow(post.userId))
        }else{
            dispatch(follow(post.userId))
        }
    }

    const handlePostLike = async() =>{
        const docs = await auth.getDocument()
        const tempArray = []
        const ifLiked = docs.documents[0].likedPosts.findIndex(((item)=>item===post.$id))
        if (ifLiked === -1) { // If the post is not already liked
            tempArray.push(post.$id)
            await auth.updateDocument(docs.documents[0].$id,tempArray)
            console.log(docs.documents[0])
            setLiked(true)
        } else {
            docs.documents[0].likedPosts = docs.documents[0].likedPosts.filter((item)=>item!==post.$id)
            await auth.updateDocument(docs.documents[0].$id,docs.documents[0].likedPosts)
            setLiked(false)
        }
    }

    if(loading) return <Loading page="read/edit"/>
    return post ? (
        <Container>
        <div className="py-8 p-10">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post?.featured_image)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor ? (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" classname="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={deletePost}>
                                Delete
                            </Button>

                            <Button><FcLike className="text-5xl"/></Button>

                        </div>
                    ):
                    <div className="absolute right-6 top-6 flex items-center justify-center gap-2">
                    <div><Button classname="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={handleFollowUser}>
                                {isFollowing ? "Unfollow":"Follow"}
                            </Button></div>

                         <div>{liked ? <FcLike className="text-4xl" onClick={handlePostLike}/>:<FcDislike className="text-4xl" onClick={handlePostLike}/>}</div>
                    </div>
                    }
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
        </div>
        </Container>
    ) : null;
}