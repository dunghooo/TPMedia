import { Link } from "react-router-dom";
import "./listProject.css";
import { useTranslation } from 'react-i18next';
import image5 from "../../assets/p1.jpg";
import image6 from "../../assets/p5.jpg";
import image7 from "../../assets/p7.jpg";
import image8 from "../../assets/p8.jpg";
import image9 from "../../assets/p9.jpg";
import image10 from "../../assets/p10.jpg";

const projects = [
  {
    image: image5,
    title: "中華奧林匹克盃 2025 | 美業交流競技暨美饌藝術美學",
  },
  {
    image: image6,
    title: "WORKSHOP REBORN | LESS IS MORE",
  },
  {
    image: image7,
    title: "VIETNAMESE CULTURAL FESTIVAL 2026 - VCF NTHU: TÂM",
  },
  {
    image: image8,
    title: "VIETNAM AIRLINE SPRING GALA DINNER",
  },
  {
    image: image9,
    title:
      "29th 2025 APHCA Asia Pacific Beauty and Hairdressing Olympics International Competition  ",
  },
  {
    image: image10,
    title: "League of Legends - LCP TP Media x MGN Viking Esports",
  },
];

function ListProject() {
  const { t } = useTranslation();
  return (
    <>
      <div className="ProjectList">
        <div className="project-list__hero">
          <h2>{t('outlines.projectListTitle')}</h2>
        </div>
      </div>
      <div className="project-list__grid">
        {/* Project cards will be rendered here */}
        {projects.map((project, index) => (
          <Link
            key={index}
            to={`/projectdetail`}
            className="project-card__link"
          >
            <div className="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ListProject;
