import "./about.css";
import { useTranslation } from 'react-i18next';
import largeImage from "../../assets/event1.jpg";
import smallImage1 from "../../assets/event2.jpg";
import smallImage2 from "../../assets/event3.jpg";
import smallImage3 from "../../assets/event4.jpg";

function About() {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      <div className="about-description">
        <div className="about-description__text">
          <h1>{t('about.title')}</h1>
          <p>{t('about.description')}</p>
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
          <h2>{t('about.servicesTitle')}</h2>
          <div className="about-services__columns">
            <ul>
              {t('about.serviceList', { returnObjects: true }).slice(0,3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <ul>
              {t('about.serviceList', { returnObjects: true }).slice(3).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
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
