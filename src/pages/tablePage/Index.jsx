import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import UniverSheet from './UniverSheet'

function UniverPage() {
   const [data, setData] = useState();
   const univerRef = useRef();

   const { id } = useParams()

   useEffect(() => {

      JSON.parse(localStorage.getItem("tables")).map(item => {

         if (item.id === id) {

            setData(item)
         }
      }
      )

   }, [])


   // console.log(data)

   return (


         <div id="root">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>


               <UniverSheet style={{ flex: 1 }} ref={univerRef} data={data} />



            </div>
         </div>

      

   )
}

export default UniverPage
