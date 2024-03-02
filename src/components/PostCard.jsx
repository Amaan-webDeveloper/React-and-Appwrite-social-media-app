import React, { useEffect, useState } from 'react'
import service from "../appwrite/appwriteConfig"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostCard({ $id, title, featuredimg, content, likes }) {
  const [imgsrc, setimgsrc] = useState("")
  const [like, setlike] = useState(likes)

  
  const userData = useSelector((state) => state.auth.userData);

  const liked = async (e) => {
    e.preventDefault()
    
    try {
      if (userData) {
        if (!likes.includes(userData.$id || likes.length == 0)) {
          likes.push(userData.$id) 
        const res = await service.updatePost($id, {likes})
        setlike(res.likes)
        }else if (likes.includes(userData.$id)) {

          const filteredLikes = likes.filter((like)=>{
            
            
            return like != userData.$id
          })
        
          const res = await service.updatePost($id, {likes:filteredLikes})
          
        setlike(res.likes)
        
        }
        console.log(likes)
      }
    } catch (error) {
      console.log(error)
    }
    
    // e.disabled()
  }
  

  useEffect(() => {

    (async () => {
      const img = await service.getFilePreview(featuredimg)
      setimgsrc(img)
    })()

  }, []);


  return (

    <div className='w-64 bg-black rounded-lg flex flex-col text-wrap'>

      < div className='h-full w-full bg-slate-200 rounded-t-lg' >
        <Link to={`/post/${$id}`}>
          <img className='rounded-t-lg' src={imgsrc} alt={title} />
        </Link>
      </div >

      <div className='flex items-center justify-between px-2'>
        <h1 className='text-white cursor-pointer' onClick={(e)=>{
          liked(e)}}>Like {like.length}</h1>
        <h1 className='text-white'>Comments 100</h1>
      </div>
      <h1 className='text-xl p-1 text-white'>{title}</h1>

    </div >

  )
}


export default PostCard

