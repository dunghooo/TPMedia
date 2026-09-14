import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./projectdetail.css";

import {
  getProjectById,
  getAllProjects,
} from "../../components/api/projectApi";

function ProjectDetail() {
  const { i18n } = useTranslation();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const slidesToShow = 3;
  const [activeSlide, setActiveSlide] = useState(0);

  const isZh = i18n.language === "zh" || i18n.language === "zh-TW";

  // =========================
  // LẤY CHI TIẾT PROJECT
  // =========================
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);

        console.log("Project detail:", data);

        setProject(data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết project:", error);
        setError("Không thể tải thông tin dự án.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      // Link dạng:
      // https://youtu.be/mAgLR0jZAjc?si=xxxx
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.substring(1);

        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Link dạng:
      // https://www.youtube.com/watch?v=mAgLR0jZAjc
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }

        // Nếu API đã lưu sẵn dạng embed
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return url;
        }
      }

      return "";
    } catch (error) {
      console.error("YouTube URL không hợp lệ:", error);
      return "";
    }
  };

  // =========================
  // LẤY CÁC PROJECT KHÁC
  // =========================
  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        const data = await getAllProjects();

        const filteredProjects = data.filter((item) => item.id !== Number(id));

        setRelatedProjects(filteredProjects);
      } catch (error) {
        console.error("Lỗi lấy dự án liên quan:", error);
      }
    };

    fetchRelatedProjects();
  }, [id]);

  // =========================
  // AUTO SLIDER
  // =========================
  useEffect(() => {
    const maxIndex = Math.max(0, relatedProjects.length - slidesToShow);

    if (relatedProjects.length <= slidesToShow) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide((current) => (current >= maxIndex ? 0 : current + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [relatedProjects.length]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <p className="project-loading">Đang tải dự án...</p>;
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return <p className="project-error">{error}</p>;
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!project) {
    return <p className="project-empty">Không tìm thấy dự án.</p>;
  }

  return (
    <>
      <section className="project-detail">
        {/* HEADER */}
        <div className="detail-header">
          <div className="detail-info">
            <p className="tagline">
              {isZh ? project.category?.nameZh : project.category?.nameVi}
            </p>

            <h2>{isZh ? project.titleZh : project.titleVi}</h2>

            <p className="description">
              {isZh ? project.descriptionZh : project.descriptionVi}
            </p>
          </div>

          <div className="info-card">
            <p className="info-label">Client</p>

            <p className="info-value">
              {isZh ? project.clientNameZh : project.clientNameVi}
            </p>

            <div className="info-row">
              <p className="info-label">Location</p>

              <p className="info-value">
                {isZh ? project.category?.nameZh : project.category?.nameVi}
              </p>
            </div>

            <div className="info-row">
              <p className="info-label">Launch Date</p>

              <p className="info-value">{project.completionYear}</p>
            </div>
          </div>
        </div>

        {/* =========================
            IMAGES
        ========================= */}

        <div className="visual-grid">
          <div className="left-visual image-card">
            <div className="image-placeholder2">
              <img
                src={project.thumbnailUrl}
                alt={isZh ? project.titleZh : project.titleVi}
              />
            </div>
          </div>

          <div className="right-visual">
            <div className="right-grid">
              {project.galleries?.map((image) => (
                <div className="image-card small-card" key={image.id}>
                  <img
                    src={image.imageUrl}
                    alt={
                      isZh
                        ? image.captionZh || project.titleZh
                        : image.captionVi || project.titleVi
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================
            VIDEO
        ========================= */}

        {project.videoEmbedUrl && (
          <div className="project-video">
            <iframe
              src={getYoutubeEmbedUrl(project.videoEmbedUrl)}
              title={project.titleVi}
              width="100%"
              height="500"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* =========================
            STATS
        ========================= */}

        <div className="stats-block">
          <h3>{isZh ? "项目成果" : "THÀNH QUẢ DỰ ÁN"}</h3>

          <p className="stats-description">
            {isZh ? project.descriptionZh : project.descriptionVi}
          </p>

          <div className="stats-list">
            <div className="stats-item">
              <span className="bullet" />

              <p>{isZh ? project.statusZh : project.statusVi}</p>
            </div>

            <div className="stats-item">
              <span className="bullet" />

              <p>{isZh ? project.clientNameZh : project.clientNameVi}</p>
            </div>

            <div className="stats-item">
              <span className="bullet" />

              <p>
                {isZh
                  ? `完成年份：${project.completionYear}`
                  : `Hoàn thành năm ${project.completionYear}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RELATED PROJECTS
      ========================= */}

      <section className="related-projects">
        <div className="related-header">
          <h3>{isZh ? "OTHER PROJECTS" : "OTHER PROJECTS"}</h3>
        </div>

        <div
          className="related-slider"
          style={{
            ["--slides-visible"]: slidesToShow,
            ["--active-slide"]: activeSlide,
          }}
        >
          <div className="slider-track">
            {relatedProjects.map((item) => (
              <Link
                to={`/projectdetail/${item.id}`}
                key={item.id}
                className="slider-card"
              >
                <div
                  className="slider-image"
                  style={{
                    backgroundImage: `url(${item.thumbnailUrl})`,
                  }}
                />

                <div className="slider-copy">
                  <p className="slider-category">
                    {isZh ? item.category?.nameZh : item.category?.nameVi}
                  </p>

                  <h4>{isZh ? item.titleZh : item.titleVi}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectDetail;
