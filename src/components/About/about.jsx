import "./about.css";
import largeImage from "../../assets/event1.jpg";
import smallImage1 from "../../assets/event2.jpg";
import smallImage2 from "../../assets/event3.jpg";
import smallImage3 from "../../assets/event4.jpg";

function About() {
  return (
    <div className="about-page">
      <div className="about-description">
        <div className="about-description__text">
          <h1>VỀ CHÚNG TÔI TP MEDIA</h1>
          <p>
            We are a company dedicated to providing the best services to our
            customers. Our team builds strong digital experiences with a focus on
            creativity, reliability, and modern design.
          </p>
        </div>

        <div className="about-description__visual">
          <div className="about-card about-card--large">
            <img
              src={largeImage}
              alt="Agency project preview"
              className="about-card__image"
            />
          </div>
          <div className="about-card-grid">
            <div className="about-card about-card--small">
              <img
                src={smallImage1}
                alt="Agency photo"
                className="about-card__image"
              />
            </div>
            <div className="about-card about-card--small">
              <img
                src={smallImage2}
                alt="Agency photo"
                className="about-card__image"
              />
            </div>
            <div className="about-card about-card--small">
              <img
                src={smallImage3}
                alt="Agency photo"
                className="about-card__image"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="about-services">
        <div className="about-services__coverage">
          <h2>WHAT WE COVER IN THIS SERVICE</h2>
          <div className="about-services__columns">
            <ul>
              <li>Improve productivity and performance</li>
              <li>Get peace of mind knowing your services are in trusted hands</li>
              <li>Reduce your service costs</li>
            </ul>
            <ul>
              <li>Hassle-free setup & management</li>
              <li>Lifetime license, no monthly or yearly fee</li>
              <li>User-friendly admin & reporting features</li>
            </ul>
          </div>
        </div>

        <div className="about-services__details">
          <article className="about-service-block">
            <h3>RESEARCH AND STRATEGY</h3>
            <p>
              Comfort reached gay perhaps chamber his six detract besides add.
              Moonlight newspaper up its enjoyment agreeable depending. Timed
              voice share led him to widen noisy young. At weddings believed
              laughing although the material does the exercise of. Up attempt
              offered ye civilly so sitting to. She new course gets living
              within Elinor joy. She rapturous suffering concealed.
            </p>
          </article>

          <article className="about-service-block">
            <h3>CONTENT CREATION</h3>
            <p>
              Demesne far hearted suppose venture excited see had has. Dependent
              on so extremely delivered by. Yet no jokes worse her why. Bed one
              supposing breakfast day fulfilled off depending questions.
              Whatever boy her exertion his extended. Ecstatic followed handsome
              drawings entirely Mrs one yet outweigh. Off acceptance
              insipidity remarkably is an invitation.
            </p>
          </article>

          <article className="about-service-block">
            <h3>DEVELOPMENT & LAUNCH</h3>
            <p>
              Satisfied conveying a dependent contented he gentleman agreeable do
              be. Warrant private blushes removed in an equally totally if.
              Delivered dejection necessary objection do Mr prevailed. Mr feeling
              does chiefly cordial in do. Water timed forfly night aware if oh
              truth. Imprudence attachment him his for sympathize. Large above
              be to means.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default About;
