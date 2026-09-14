import { Link } from "react-router-dom";
import "./listProject.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../components/api/projectApi";
import Pagination from "../../components/page/Pagination";

function ListProject() {
  const { t, i18n } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getAllProjects();

        console.log("Projects:", data);
        console.log("Is array:", Array.isArray(data));

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi gọi API:", error);
        setProjects([]);
      }
    };

    loadProjects();
  }, []);

  // Tính tổng số trang
  const totalPages = Math.ceil(projects.length / pageSize);

  // Vị trí bắt đầu
  const startIndex = (currentPage - 1) * pageSize;

  // Chỉ lấy project của trang hiện tại
  const currentProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className="ProjectList">
        <div className="project-list__hero">
          <h2>{t("outlines.projectListTitle")}</h2>
        </div>
      </div>

      <div className="project-list__grid">
        {currentProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projectdetail/${project.id}`}
            className="project-card__link"
          >
            <div className="project-card">
              <img
                src={project.thumbnailUrl}
                alt={i18n.language === "zh" ? project.titleZh : project.titleVi}
              />

              <h3>
                {i18n.language === "zh" ? project.titleZh : project.titleVi}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default ListProject;
