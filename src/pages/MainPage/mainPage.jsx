import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './mainPage.module.scss'


function MainPage() {
   const navigate = useNavigate()

   const [tab, setTab] = useState(0)

   useEffect(() => {

      // console.log(JSON.parse(localStorage.getItem('tables')))

   }, [])




   const changeTable = (item) => {

      navigate(`/${item.id}`)
   }


   return (
      <div className={style.mainPage}>

         <p className={style.mainPage__title}>         Главная страница</p>

         <div className={style}>


         </div>
         {
            tab === 0 && <div className={style.mainPage__excelContainer}>
               {
                  JSON.parse(localStorage.getItem('tables')).map(item => (

                     <div onClick={() => changeTable(item)}>{item.name}</div>

                  ))
               }

            </div>
         }


      </div>

   )
}

export default MainPage
