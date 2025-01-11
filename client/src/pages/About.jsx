import React, { useEffect, useRef } from 'react';
import Hydra from 'hydra-synth';
import './about.css';

function About() {
  const hydraRef = useRef(null);

  useEffect(() => {
    const h = new Hydra({
      canvas: hydraRef.current,
      makeGlobal: false,
      detectAudio: false
    });

    const synth = h.synth;

    synth.osc(13, 0, 1)
      .kaleid(() => 4)
      .mask(synth.shape(4, 0.3, 1))
      .modulateRotate(synth.shape(4, 0.1, 1))
      .scale(0.3)
      .add(synth.shape(4, 0.2, 1).color(0.7, 0.4, 1, 0.5))
      .modulate(
        synth.osc(6, 0, 1.5).brightness(-0.5).modulate(synth.noise(3).sub(synth.gradient()), 1),
        0.5
      )
      .rotate(0, 1)
      .scale(1, window.innerHeight / window.innerWidth)
      .out();
  }, []);

  return (
    <div className="about-container">
      <canvas ref={hydraRef} className="hydra-background" />

      <section className="section">
        <h2>Who Are We?</h2>
        <p>WBAR is the college radio station of Barnard College in New York City. WBAR was developed in the early 1990s as a freeform alternative to WKCR-FM on the Columbia University campus. Since then, WBAR has provided community and a form of expression for music and podcast loving Barnard College and Columbia University students seeking a place to play the music that impassions them. Every semester, our board members hand pick the semester schedule with a mix of recurring and brand new DJs to continuously diversify our schedule. From Southern hip hop to Russian techno, there is no limit to how the nearly 100 DJs fill their weekly 2 hour time slots.</p>
        <p>We broadcast 22 hours a day, with a daily 4am - 6am "open time slot", to listeners all over the world. In addition to our online broadcast, WBAR hosts several live concerts per year in Morningside Heights, including the WBAR-B-Q, our annual spring outdoor concert, as well as our Winter Formal concert event in December. Recent performers have included Junglepussy, Frost Children, Kari Faux, Dorian Electra, Spirit of the Beehive, Coco & Clair Clair, Palehound, Liturgy, Japanese Breakfast, Ravyn Lenae, and more.</p>
      </section>

      <section className="section">
        <h2>Meet the WBAR Staff!</h2>
        <p></p>
        <div className="grid-container">
          <div className="staff-item">
            <img src="maeve.jpg" alt="Staff Member 1" className="staff-image" />
            <p className="staff-name">Maeve</p>
          </div>
          <div className="staff-item">
            <img src={'maura.png'} alt="Staff Member 2" className="staff-image" />
            <p className="staff-name">Maura</p>
          </div>
          <div className="staff-item">
            <img src={'fernanda.png'} alt="Staff Member 3" className="staff-image" />
            <p className="staff-name">Fernanda</p>
          </div>
          <div className="staff-item">
            <img src={'tajh.jpg'} alt="Staff Member 4" className="staff-image" />
            <p className="staff-name">Tajh</p>
          </div>
          <div className="staff-item">
            <img src={'zoe.png'} alt="Staff Member 5" className="staff-image" />
            <p className="staff-name">Zoe</p>
          </div>
          <div className="staff-item">
            <img src={'julia.png'} alt="Staff Member 5" className="staff-image" />
            <p className="staff-name">Julia</p>
          </div>
          <div className="staff-item">
            <img src={'isis.jpg'} alt="Staff Member 6" className="staff-image" />
            <p className="staff-name">Isis</p>
          </div>

        </div>
      </section>

      <section className="section">
        <h2>Socials</h2>
        <ul className="social-links">
          <li><a href="https://www.instagram.com/wbar_radio/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </section>
    </div>
  );
}

export default About;