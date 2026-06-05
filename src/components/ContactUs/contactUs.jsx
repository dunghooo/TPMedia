import "./contactUs.css";

function ContactUs() {
  return (
    <>
      <section className="contact-us-section">
        <div className="contact-us-header">
          <span className="contact-us-label">CONTACT US</span>
          <h2 className="contact-us-heading">
            HÃY ĐỂ CHÚNG TÔI XỬ LÝ VẤN ĐỀ CỦA BẠN
          </h2>
        </div>
        <div className="contact-us-grid">
          <div className="contact-us-info">
            <div className="contact-us-office">
              <h4>VĂN PHÒNG ONLINE :</h4>
              <p className="office-location">TAIPEI - TAIWAN</p>
              <p className="office-address">
                750 Sing Sing Rd, Horseheads, NY, 14845
              </p>
            </div>
            <div className="contact-us-office">
              <h4>TOKYO, JAPAN</h4>
              <p className="office-address">
                Tokyo, Japan2002 Horton Ford Road, Eidson, TN, 37731
              </p>
            </div>
            <div className="contact-us-socials">
              <button type="button" aria-label="Facebook">
                f
              </button>
              <button type="button" aria-label="Dribbble">
                d
              </button>
              <button type="button" aria-label="LinkedIn">
                in
              </button>
              <button type="button" aria-label="Twitter">
                t
              </button>
            </div>
          </div>
          <form className="contact-us-form">
            <label>
              <span>Name</span>
              <input type="text" placeholder="Name" />
            </label>
            <label>
              <span>Email Address</span>
              <input type="email" placeholder="Email Address" />
            </label>
            <label>
              <span>Phone Number</span>
              <input type="tel" placeholder="Phone Number" />
            </label>
            <label>
              <span>Message</span>
              <textarea placeholder="Message" rows="6" />
            </label>
            <button type="submit" className="contact-us-submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
