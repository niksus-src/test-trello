import { useState } from 'react'
import mainStyle from './main.module.scss'

const Main = () => {
    
    return (
        <div className={mainStyle.main_container}>
            <div className={mainStyle.main_title}>Test-Trello</div>
            <div className={mainStyle.main_content}>for Oleg Dzhinganin</div>
            <div className={mainStyle.main_img}/>
        </div>
    )
}

export default Main

