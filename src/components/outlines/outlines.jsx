import "./outlines.css";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultProjectImage from "../../assets/hero.png";
import image1 from "../../assets/689022051_2860549037617055_4597963960149823370_n.jpg";
import image2 from "../../assets/p2.jpg";
import image3 from "../../assets/p3.jpg";
import image4 from "../../assets/p4.jpg";
import image5 from "../../assets/p1.jpg";
import image6 from "../../assets/p5.jpg";
import image7 from "../../assets/p7.jpg";
import image8 from "../../assets/p8.jpg";
import logo1 from "../../assets/0122_LOGO_VNEX.png";
import logo2 from "../../assets/H_T travel logo.png";
import logo3 from "../../assets/hennessy-logo-png_seeklogo-400371.png";
import logo4 from "../../assets/logo lcp.png";
import logo5 from "../../assets/logo_鴻毅旅遊.png";
import logo6 from "../../assets/logo-01.png";
import logo7 from "../../assets/logo-ncku.png";
import logo8 from "../../assets/LOGO-VSA-TW-2017.png";
import acc1 from "../../assets/ac1 (1).jpg";
import acc2 from "../../assets/ac1 (2).jpg";
import acc3 from "../../assets/ac1 (3).jpg";

const projects = [
  {
    title: "中華奧林匹克盃 2025 | 美業交流競技暨美饌藝術美學",
    category: "HẠNG MỤC - CHỨC NĂNG",
    image: image5,
  },
  {
    title: "WORKSHOP REBORN | LESS IS MORE",
    category: "HẠNG MỤC THI CÔNG",
    image: image6,
  },
  {
    title: "VIETNAMESE CULTURAL FESTIVAL 2026 - VCF NTHU: TÂM",
    category: "HẠNG MỤC THI CÔNG",
    image: image7,
  },
  {
    title: "VIETNAM AIRLINE SPRING GALA DINNER",
    category: "HẠNG MỤC - CHỨC NĂNG",
    image: image8,
  },
];

const achievements = [
  {
    image: acc1,
    description: "VietNam Airlines Spring Gala Dinner 2024",
  },
  {
    image: acc2,
    description: "VIETNAMESE CULTURAL FESTIVAL 2026 - VCF NTHU: TÂM",
  },
  {
    image: acc3,
    description: "中華奧林匹克盃 2025 美業交流競技暨美饌藝術美學",
  }
];

function Outlines() {
  const { t } = useTranslation();
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

  const logoTrackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const gap = 16; // should match CSS gap

  // image-placeholder slider
  const slides = [image2, image3, image4, image5];
  const [descIndex, setDescIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setDescIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const track = logoTrackRef.current;
    if (!track) return;

    const advance = () => {
      if (isPaused) return;
      const item = track.querySelector(".logo-item");
      const w = item
        ? item.getBoundingClientRect().width + gap
        : track.clientWidth;
      // scroll by one item
      // if visible area already shows all logos, do nothing
      if (track.scrollWidth <= track.clientWidth) return;

      const nextLeft = track.scrollLeft + w;
      // if next step would pass the end, jump back to start and continue
      if (nextLeft + track.clientWidth >= track.scrollWidth - 1) {
        // animate to end for a final reveal then snap to start quickly
        track.scrollTo({
          left: track.scrollWidth - track.clientWidth,
          behavior: "smooth",
        });
        setTimeout(() => {
          track.scrollTo({ left: 0 });
        }, 2000); // match scroll duration
      } else {
        track.scrollBy({ left: w, behavior: "smooth" });
      }
    };

    const id = setInterval(advance, 3000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <>
      <div className="banner-wrapper">
        <div className="banner">
          <div className="image-box">
            <span>
              <img src={image1} alt="Landscape" />
            </span>
          </div>
          <div className="banner-content">
            <div className="banner-item">
              <p>{t('outlines.highlightText', 'ĐIỂM NỔI BẬT HOẶC CÂU')}</p>
              <span>{t('outlines.highlightSub', 'CHUYÊN NGÀNH')}</span>
            </div>
            <div className="banner-item">
              <p>ĐIỂM NỔI BẬT HOẶC CÂU</p>
              <span>CHUYÊN NGÀNH</span>
            </div>
            <div className="banner-item">
              <p>ĐIỂM NỔI BẬT HOẶC CÂU</p>
              <span>CHUYÊN NGÀNH</span>
            </div>
          </div>
          <div className="decor">✦</div>
        </div>
      </div>
      <div className="logo-section">
        <div
          className="logo-track"
          ref={logoTrackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {logos.map((src, i) => (
            <div className="logo-item" key={`${src}-${i}`}>
              <img src={src} alt={`logo-${i}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="Description">
        <div className="description-content">
          <p className="description-eyebrow">{t('outlines.highlightEyebrow')}</p>
          <p className="description-text">{t('outlines.descriptionText', 'Một chút Bts của sự kiện...')}</p>

          <div className="description-services">
            <h3>{t('about.servicesTitle')}</h3>
            <div className="service-columns">
              <ul>
                <li>Product Design</li>
                <li>User Interface</li>
                <li>User Experience</li>
                <li>Brand Identity</li>
                <li>Interaction Design</li>
              </ul>
              <ul>
                <li>WordPress Development</li>
                <li>Web Development</li>
                <li>Shopify Development</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="description-image" aria-label="Project preview">
          <div className="image-placeholder">
            {slides.map((src, i) => (
              <div
                key={i}
                className={`desc-slide ${i === descIndex ? "active" : ""}`}
                style={{ transform: `translateX(${(i - descIndex) * 100}%)` }}
                aria-hidden={i !== descIndex}
              >
                <img src={src} alt={`preview-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ListProject" id="projects">
        <div className="list-project__header">
          <h2>{t('outlines.featuredProjects')}</h2>
          <Link to="/projects" className="view-all-link">
            {t('outlines.viewAll')}
          </Link>
        </div>

        <div className="list-project__grid">
          {projects.map((project, index) => (
            <article className="project-item" key={`${project.title}-${index}`}>
              <div className="project-item__image">
                <img
                  src={project.image || defaultProjectImage}
                  alt={project.title}
                />
              </div>
              <Link to={`/projectdetail`} className="project-item__title">
                <h3>{project.title}</h3>
              </Link>
              <p>{project.category}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="feature-category">
        <div className="feature-category-logo" aria-label="TP Media logo" />
        <div className="sologan-block">
          <h2 color="white">Gen Z Việt Nam - Chất Việt, Tầm quốc tế</h2>
        </div>
        <div className="list-feature-category">
          <span>
            Gen Z Việt Nam: Khẳng định ngay đội ngũ là những người trẻ đầy nhiệt
            huyết, nắm bắt xu hướng nhanh nhạy và dám nghĩ dám làm. cho các đối
            tác tại Đài Loan hay các đối tác đến từ việt nam thấy rằng quy trình
            làm việc của team rất bài bản, từ khâu lên kịch bản, chạy hiện
            trường cho đến sản xuất hình ảnh, video đều đạt chuẩn chuyên nghiệp
            khắt khe nhất.
          </span>
        </div>
      </div>
      <div className="List-Achievements" id="achievements">
        <div className="list-achievements__header">
          <h2>CÁC THÀNH TÍCH NỔI BẬT</h2>
        </div>

        <div className="list-achievements__grid">
          {/* Achievement items would go here */}
          {achievements.map((achievement, index) => (
            <article
              className="achievement-item"
              key={`${achievement.description} - ${index}`}
            >
              <div className="achievement-item__image">
                <img src={achievement.image} alt={achievement.title} />
              </div>
              <div className="achievement-item__content">
                <p>{achievement.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Outlines;
