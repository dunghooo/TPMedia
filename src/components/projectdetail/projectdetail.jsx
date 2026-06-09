import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import "./projectdetail.css";
import image6 from "../../assets/p5.jpg";
import event1 from "../../assets/event1.jpg";
import event2 from "../../assets/event2.jpg";
import event3 from "../../assets/event3.jpg";
import event4 from "../../assets/event4.jpg";
import image5 from "../../assets/p1.jpg";
import image7 from "../../assets/p7.jpg";
import image8 from "../../assets/p8.jpg";
import image9 from "../../assets/p9.jpg";
import image10 from "../../assets/p10.jpg";

function ProjectDetail() {
  const { t } = useTranslation();
  const relatedProjects = [
    {
      title: "中華奧林匹克盃 2025 | 美業交流競技暨美饌藝術美學",
      category: "Event · Visual Design",
      image:
        image5,
    },
    {
      title: "VIETNAMESE CULTURAL FESTIVAL 2026 - VCF NTHU: TÂM",
      category: "Branding · Photography",
      image:
        image7,
    },
    {
      title: "VIETNAM AIRLINE SPRING GALA DINNER",
      category: "Marketing · Motion",
      image:
        image8,
    },
    {
      title: "29th 2025 APHCA Asia Pacific Beauty and Hairdressing Olympics International Competition",
      category: "Video · Visual Direction",
      image:
        image9,
    },
    {
      title: "League of Legends - LCP TP Media x MGN Viking Esports",
      category: "Design · Production",
      image:
        image10,
    }
  ];

  const slidesToShow = 3;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const maxIndex = Math.max(0, relatedProjects.length - slidesToShow);
    const interval = setInterval(() => {
      setActiveSlide((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [relatedProjects.length]);

  return (
    <>
      <section className="project-detail">
        <div className="detail-header">
          <div className="detail-info">
            <p className="tagline">{t('projectDetail.tagline')}</p>
            <h2>WORKSHOP REBORN | LESS IS MORE</h2>
            <p className="description">{t('projectDetail.shortDescription', 'Mô tả dự án...')}</p>
          </div>
          <div className="info-card">
            <p className="info-label">Client</p>
            <p className="info-value">Orange Leaders</p>
            <div className="info-row">
              <p className="info-label">Location</p>
              <p className="info-value">Estica Cap</p>
            </div>
            <div className="info-row">
              <p className="info-label">Launch Date</p>
              <p className="info-value">Wed May 05 2023</p>
            </div>
          </div>
        </div>

        <div className="visual-grid">
          <div className="left-visual image-card">
            <div className="image-placeholder2"><img src={image6} alt="" /></div>
          </div>

          <div className="right-visual">
            <div className="right-grid">
              <div className="image-card small-card"><img src={event1} alt="" /></div>
              <div className="image-card small-card"><img src={event2} alt="" /></div>
              <div className="image-card small-card"><img src={event3} alt="" /></div>
              <div className="image-card small-card"><img src={event4} alt="" /></div>
            </div>          
          </div>
        </div>

        <div className="stats-block">
          <h3>{t('projectDetail.statsTitle')}</h3>
          <p className="stats-description">
            Giới thiệu quy mô dự án và các thành công dự án mang lại.
          </p>
          <div className="stats-list">
            <div className="stats-item">
              <span className="bullet" />
              <p>Đạt mức tăng nhận diện thương hiệu sau chiến dịch SPA.</p>
            </div>
            <div className="stats-item">
              <span className="bullet" />
              <p>
                Được khách hàng đánh giá cao về chất lượng hình ảnh và nội dung.
              </p>
            </div>
            <div className="stats-item">
              <span className="bullet" />
              <p>
                Hoàn thành đúng tiến độ với đội ngũ TP Media đồng hành xuyên
                suốt.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="related-projects">
        <div className="related-header">
          <h3>OTHER PROJECTS</h3>
        </div>
        <div
          className="related-slider"
          style={{
            ["--slides-visible"]: slidesToShow,
            ["--active-slide"]: activeSlide,
          }}
        >
          <div className="slider-track">
            {relatedProjects.map((project, index) => (
              <article key={index} className="slider-card">
                <div
                  className="slider-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="slider-copy">
                  <p className="slider-category">{project.category}</p>
                  <h4>{project.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectDetail;
