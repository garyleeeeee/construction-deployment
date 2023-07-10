import './dashboard-swiper.styles.scss';
import DashboardImage1 from '../../assets/dashboard-images/dashboard1.jpg';
// import DashboardImage2 from '../../assets/dashboard-images/dashboard2.png';
// import DashboardImage3 from '../../assets/dashboard-images/dashboard3.jpg';
// import DashboardImage4 from '../../assets/dashboard-images/dashboard4.jpg';
// import DashboardImage5 from '../../assets/dashboard-images/dashboard5.jpg';
// import { useEffect, useRef } from 'react';



const DashboardSwiper = () => {
    // const swiperElRef = useRef(null);

    // useEffect(() => {
    //   // listen for Swiper events using addEventListener
    //   swiperElRef.current.addEventListener('progress', (e) => {
    //     const [swiper, progress] = e.detail;
    //   });
  
    //   swiperElRef.current.addEventListener('slidechange', (e) => {
    //     console.log('slide changed');
    //   });
    // }, []
    // );

    return (

        <swiper-container
        // ref={swiperElRef}
        slides-per-view="1"
        speed="500"
        navigation="false"
        pagination="true"
        autoplay="true"
        loop="true"
        className='db-swiper-container'
      >
        <swiper-slide>
            <img src={DashboardImage1} alt='builders' className='db-swiper-img'/>
        </swiper-slide>
        {/* <swiper-slide>
            <img src={DashboardImage2} alt='builders' className='db-swiper-img'/>
        </swiper-slide>
        <swiper-slide>
            <img src={DashboardImage3} alt='builders' className='db-swiper-img'/>
        </swiper-slide>
        <swiper-slide>
            <img src={DashboardImage4} alt='builders' className='db-swiper-img'/>
        </swiper-slide>
        <swiper-slide>
            <img src={DashboardImage5} alt='builders' className='db-swiper-img'/>
        </swiper-slide> */}
      </swiper-container>

        
    )
};

export default DashboardSwiper;




