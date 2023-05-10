import React from 'react';
import './components.css'
import CardNews from './CardNews';
import SmallCard from './SmallCard';



const HotArticle = () => {
    return (

        <div className='ListBox'>
            {/* <div className='List'>
            여긴 카드뉴스 느낌으로 인기게시글 여러개 띄울거임.

            </div> */}

            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column',paddingRight : '20px' }}>
                    <CardNews/>
                    <CardNews/>
                    <CardNews/>
                    <SmallCard/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft : '20px'}}>
                    <SmallCard/>
                    <CardNews/>
                    <CardNews/>
                    <CardNews/>
                </div>

                
            </div>
        </div>


    )



}

export default HotArticle;