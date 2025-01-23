import React from 'react';
import './Index.css';
import Navbar from './Navbar';

function Index() {
  return (
    <>
    <Navbar />
    <main className="app-layout">
  <header className="header">
    <h1 className="logo-title">Career Counselor</h1>
  </header>

  {/* Hero Section */}
  <section id="hero" className="hero">
    <h1 className="hero-title">Shape Your Career with Confidence</h1>
    <p className="hero-description">Empowering individuals to make informed career decisions with expert guidance.</p>
    <div className="hero-buttons">
      <button className="btn primary-btn">Get Started</button>
      <button className="btn secondary-btn">Learn More</button>
    </div>
  </section>

  {/* About Section */}
  <section id="about" className="about">
    <h2>About Us</h2>
    <p>We are committed to helping you discover your true potential. Our team of experts provides personalized career advice and resources to guide you on your journey.</p>
  </section>

  {/* Services Section */}
  <section id="services" className="services">
    <h2>Our Services</h2>
    <div className="services-grid">
      <div className="service-card">
        <h3>Career Assessments</h3>
        <p>Gain insights into your strengths and interests with our detailed assessments.</p>
      </div>
      <div className="service-card">
        <h3>One-on-One Counseling</h3>
        <p>Work directly with experts to plan and achieve your career goals.</p>
      </div>
      <div className="service-card">
        <h3>Workshops and Resources</h3>
        <p>Participate in workshops and access tools to enhance your career path.</p>
      </div>
    </div>
  </section>

  {/* Contact Section */}
  <section id="contact" className="contact">
    <h2>Contact Us</h2>
    <p>Have questions or need support? Get in touch with us today!</p>
    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit" className="btn primary-btn">Send Message</button>
    </form>
  </section>

  <footer className="footer">
    <p>&copy; 2024 Career Counselor. All Rights Reserved.</p>
  </footer>
</main>


    </>
  );
}

export default Index;
