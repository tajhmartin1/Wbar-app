import React, { } from 'react';
import './about.css';

function About() {
  return (
    <div className="about-container">
      <section className="section">
        <h2>Who Are We?</h2>
        <p>WBAR is the college radio station of Barnard College in New York City. WBAR was developed in the early 1990s as a freeform alternative to WKCR-FM on the Columbia University campus. Since then, WBAR has provided community and a form of expression for music and podcast loving Barnard College and Columbia University students seeking a place to play the music that impassions them. Every semester, our board members hand pick the semester schedule with a mix of recurring and brand new DJs to continuously diversify our schedule. From Southern hip hop to Russian techno, there is no limit to how the nearly 100 DJs fill their weekly 2 hour time slots.</p>
        <p>We broadcast 22 hours a day, with a daily 4am - 6am "open time slot", to listeners all over the world. In addition to our online broadcast, WBAR hosts several live concerts per year in Morningside Heights, including the WBAR-B-Q, our annual spring outdoor concert, as well as our Winter Formal concert event in December. Recent performers have included Junglepussy, Frost Children, Kari Faux, Dorian Electra, Spirit of the Beehive, Coco & Clair Clair, Palehound, Liturgy, Japanese Breakfast, Ravyn Lenae, and more.</p>
      </section>

      <section className="section">
        <h2>Meet the WBAR Staff</h2>
        <p></p>
        <div className="grid-container">
          <div className="grid-item">
          
          </div>
          <div className="grid-item">
          
          </div>
          <div className="grid-item">
          
          </div>
          <div className="grid-item">
          
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Socials</h2>
        <ul className="social-links">
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        </ul>
      </section>
    </div>
  );
}

export default About;
