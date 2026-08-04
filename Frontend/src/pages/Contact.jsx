import Navbar from "../components/Navbar";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-page">
        <div className="contact-content">
          <h1>Contact Us</h1>

          <p>
            Have a question or need help? Get in touch with the
            Smart Campus Management System team.
          </p>

          <div className="contact-container">
            <div className="contact-info">
              <h2>Get In Touch</h2>

              <p>📧 Email: smartcampus@example.com</p>
              <p>📞 Phone: +91 98765 43210</p>
              <p>📍 Address: Your College Campus</p>
            </div>

            <div className="contact-form">
              <h2>Send Us a Message</h2>

              <form>
                <input
                  type="text"
                  placeholder="Your Name"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                />

                <textarea
                  placeholder="Write your message..."
                  rows="5"
                ></textarea>

                <button type="submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;