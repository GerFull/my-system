import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogInPage() {

   const navigate = useNavigate()

   return (
      <div>Home

         <input type='text'/>
         <input type='text'/>
         <button onClick={()=>navigate('/main')}>LOGIn</button>
      </div>
   )
}

export default LogInPage
