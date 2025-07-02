'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Icon from '@mdi/react';
import { mdiAccount, mdiHome, mdiMapMarkerRadius, mdiChartAreaspline, mdiFileDocumentCheck } from '@mdi/js';
import AmenitiesSection from './amenities';
import TestimonialsCarousel from './testimonials';
import Faq from './faq';
import LeadFormSection from './leadformsection';
import LocationPage from './location';
import PageWrapper from './pagewrapper';
import Banner from './banner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <PageWrapper>
      <section>
       <Banner/>
      </section>
      {/* overview */}
      <section className='py-3 py-md-5 position-relative'>
        <div className='container'>
          <div className=''>
            <h1 className='robot-text fs-60h1 text-center robot-text lh-90px fw-bold' data-aos="fade-up"><span className='text-blue ' >Premium Residential Plots in Kalapatti,<br className='d-none d-md-block'/> Coimbatore</span> One World</h1>
          </div>
          <div className='row mt-md-5 align-items-center yellow-bg animate'>
            <div className='col-md-6 text-align-center'>
              <div className='w-83'>
                <h6 className='fs-30px text-md-end robot-text lh-45px text-center mt-3 mt-md-0' data-aos="fade-right">One World by Adissia Developers offers <span className='yellow-bg-wrap'><span className='yellow-bg-text text1'>DTCP-approved villa plots in Kalapatti, Coimbatore’s</span></span> prime residential <br className='d-block d-md-none'/> and IT zone.</h6>
              </div>
            </div>
            <div className='col-md-6' data-aos="fade-left">
              <div className=''>
                <p className='fs-1rem  fs-sm-5 text-secondary font-poppins text-center text-md-start'>Welcome to One World by Adissia – where smart investment meets peaceful living in Kalapatti, Coimbatore’s most promising real estate corridor. Discover DTCP-approved residential plots for sale in Kalapatti, designed for families, investors, and future homebuilders who value connectivity, growth, and long-term returns. Whether you're buying a plot in Coimbatore for your dream home or securing land as a future-proof asset, One World delivers unmatched value in a fast-growing micro-market.
</p>
              </div>
              <div className='mt-4 mb-2 text-center text-md-start' id='contactus'>
                <a href='#' className='btn-primary  fs-18px font-poppins text-center'>Enquire Now</a>
              </div>
              <div className='mt-4  text-center text-md-start'>
                <h5 className='text-secondary font-poppins'><b>Rera No: TN/11/Layout/2931/2024</b></h5>
              </div>
            </div>
          </div>
        </div>
        <div className='position-absolute adissia-a'>
          <div className=''>
            <img src="./image/Adissia-A.png" alt='Adissia A' className='opacity-a' />
          </div>
        </div>
      </section>
      {/* image */}
      <section className='pb-md-5 pb-3 pt-6rem bg-pattern'>
        <div className='container'>
          <div className="row">
            <div className="col-md-6"  data-aos="fade-right">
              <div className="site-layout">
                <img src="/image/plot-image.jpg" alt="Plot-img" className='border-white' />
              </div>
            </div>
            <div className="col-md-6"  data-aos="fade-left">
              <div className="site-layout">
                <img src="/image/arch-oneworld.jpg" alt="arch-oneworld" className='border-white' />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No of Plots */}
      <section className="py-3 py-md-5 bg-pattern">
        <div className="container">
          <div className="projectoverviewDetailTop">
            <div className="row">
              <div className="col-6 col-md-2"  data-aos="fade-right">
                <span className="nBlock font-poppins"> NO. of Units</span>
                <h3 className='font-poppins'>271</h3>
                <span className="apartments font-poppins">Units</span>
              </div>

              <div className="col-6 col-md-2"  data-aos="fade-right">
                <span className="nBlock font-poppins"><span className='d-none d-md-inline '>Project</span> Status</span>
                <h3 className='font-poppins'>Pre Launch</h3>
              </div>

              <div className="col-12 col-md-4 my-5 my-md-0 "  data-aos="fade-up">
                <img src="/image/ow-logo.png" alt="" className='ow-logo' />
              </div>

              <div className="col-6 col-md-2"  data-aos="fade-left">
                <span className="nBlock font-poppins">Location</span>
                <h3 className='font-poppins '>Kalapatti</h3>
              </div>

              <div className="col-6 col-md-2"  data-aos="fade-left">
                <span className="nBlock font-poppins">Plot Size</span>
                <h3 className='font-poppins'>1061 <span>-</span> 2868</h3>
                <span className="apartments font-poppins">Sq.ft</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Amenities */}
      <section>
        <AmenitiesSection />
      </section>



      {/* About Section */}
      <section className='py-4 py-md-5 bg-light'>
        <div className='container'>
          <div>
            <h1 className='text-blue robot-text-style fs-60px text-center mb-3 ' data-aos="fade-up"><b>Choose One World for Smart Investment
            </b></h1>
          </div>
          <div className='row align-items-center justify-content-center justify-content-md-start'>
            <div className='col-md-6' data-aos="fade-right">

              <div className='row  justify-content-center justify-content-md-start'>
                <div className="stats-boxes mt-4">
                  <div className='col-6'>
                    <div className="stat-box">
                      <h3 className='font-poppins'><b>7 <span className='fs-6'>Mins</span></b></h3>
                      <p>SVB Tech Park</p>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className="stat-box">
                      <h3 className='font-poppins'><b>15 <span className='fs-6'>Mins</span></b></h3>
                      <p>Kmch, Aravind Hospitals</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row justify-content-center justify-content-md-start'>
                <div className="stats-boxes mt-4">
                  <div className='col-6'>
                    <div className="stat-box">
                      <h3 className='font-poppins'><b>20 <span className='fs-6'>Mins</span></b></h3>
                      <p>PSG, GRD Colleges</p>
                    </div>

                  </div>
                  <div className='col-6'>
                    <div className="stat-box">
                      <h3 className='font-poppins'><b>15 <span className='fs-6'>Mins</span></b></h3>
                      <p>Broadway Mall</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 'data-aos="fade-left">
              <div className='font-poppins mb-4'><p className='text-center text-md-start fs-sm-5'>One World offers the perfect mix of legal assurance, prime location, and growth potential—ideal for both living and investment near Coimbatore’s key hubs.
              </p></div>
              <ul className='text-decoration-none'>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className="rotating-wrapper">
                    <div className="rotating-border"></div>
                    <div className="static-icon">
                      <Icon path={mdiMapMarkerRadius} size={1.5} className='text-blue' />
                    </div>
                  </div>
                  <li className='fs-18px ms-5 font-poppins'><b className='text-blue'>Prime Location</b>: <span className='yellow-bg-wrap'><span className='yellow-bg-text text1'>Just minutes from SVB Tech Park</span></span> and Coimbatore International Airport, offering unbeatable connectivity.</li>
                </div>

                <div className='d-flex justify-content-center align-items-center mt-4'>
                  <div className="rotating-wrapper">
                    <div className="rotating-border"></div>
                    <div className="static-icon">
                      <Icon path={mdiChartAreaspline} size={1.5} className='text-blue static-icon' />
                    </div>
                  </div>
                  <li className='fs-18px ms-5 font-poppins'><b className='text-blue'>High Growth Zone</b>: Surrounded by PSG College, GRD, and KMCH Hospital — <span className='yellow-bg-wrap'><span className='yellow-bg-text text1'>a hotspot for steady land value appreciation.</span></span></li>
                </div>
              </ul>
              <div className='mt-5 mb-2 text-center text-md-start'>
                <a href='' id='#contactus' className='btn-primary  fs-18px font-poppins'>Enquire Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      <section>
        <Faq />
      </section>

      {/*<section>
        <LocationPage />
      </section>*/}
      


      {/* Testimonials */}
      <section>
        <TestimonialsCarousel />
      </section>


 

      {/* contact us */}
      <section>
        <LeadFormSection />
      </section>
</PageWrapper>

      {/* Footer */}
      <footer className='bg-blue p-2'>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h6 className='fs-16px mb-0 text-white fw-light font-poppins'>© Adissia Developers Pvt Ltd. All rights reserved.</h6>
          </div>
          <ul className="list-inline small mb-0 mb-md-0 small text-muted1 ">
          <li className="list-inline-item"><a href="terms-and-conditions.php" className="text-muted1 text-decoration-none fs-16px text-white font-poppins">Terms
              & Conditions</a></li>
          <li className="list-inline-item"><a href="privacy-policy.php" className="text-muted1 text-decoration-none fs-16px text-white font-poppins">Privacy
              Policy</a></li>
        </ul>
        </div>
        </div>
      </footer>

    </main>
  );
}
