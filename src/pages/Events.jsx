import React from 'react';
import './events.css';

const nextImage = "streaming.png"
const pastImage1 = "wbar-12.02.png"
const pastImage2 ="wbar_apps_due.png"
const pastImage3 ="wbar join '23 Flyer (1).png";
const pastImage4 ="wbar-april-29.png"
const pastImage5 = "wbar-2.17.jpg"

function Events() {
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-12 col-md-6'>
          <div className='bar'>
            <h1 className="bar-title">Next Event:</h1>
          </div>
          <div className="spacer"></div>
          <div className="image-container-next">
            <img src={nextImage} className="next-event img-fluid" alt="next event" />
          </div>
          <div className="spacer"></div>
        </div>
        <div className='col-12 col-md-6'>
          <div className='bar'>
            <h1 className="bar-title">Past Events:</h1>
          </div>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={pastImage1} className="d-block w-100" alt="Past Event 1" />
              </div>
              <div className="carousel-item">
                <img src={pastImage2} className="d-block w-100" alt="Past Event 2" />
              </div>
              <div className="carousel-item">
                <img src={pastImage3} className="d-block w-100" alt="Past Event 3" />
              </div>
              <div className="carousel-item">
                <img src={pastImage4} className="d-block w-100" alt="Past Event 4" />
              </div>
              <div className="carousel-item">
                <img src={pastImage5} className="d-block w-100" alt="Past Event 5" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </div>
  );
}

export default Events;
