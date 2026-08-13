import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { updateProject } from "../../api/projectApi";

import { getAllCategories } from "../../api/categoryApi";

import "./UpdateProjectAD.css";

function UpdateProject() {
  const { id } = useParams();

  const navigate = useNavigate();

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    categoryId: "",
    titleVi: "",
    titleZh: "",
    slug: "",
    clientNameVi: "",
    clientNameZh: "",
    completionYear: "",
    videoEmbedUrl: "",
    descriptionVi: "",
    descriptionZh: "",
    isFeatured: false,
    statusVi: "",
    statusZh: "",
  });

  // =========================
  // CATEGORY
  // =========================

  const [categories, setCategories] = useState([]);

  // =========================
  // PROJECT
  // =========================

  const [project, setProject] = useState(null);

  // =========================
  // THUMBNAIL
  // =========================

  const [oldThumbnail, setOldThumbnail] = useState("");

  const [thumbnail, setThumbnail] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  // =========================
  // OLD GALLERY
  // =========================

  const [oldGallery, setOldGallery] = useState([]);

  const [deleteImageIds, setDeleteImageIds] = useState([]);

  // =========================
  // NEW GALLERY
  // =========================

  const [newGallery, setNewGallery] = useState([]);

  // =========================
  // STATE
  // =========================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // =====================================================
  // LOAD PROJECT + CATEGORY
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // =========================
        // LẤY PROJECT TỪ SESSION
        // =========================

        const storedProjects = sessionStorage.getItem("projects");

        if (!storedProjects) {
          alert("Không tìm thấy danh sách dự án.");

          navigate("/admin");

          return;
        }

        const projects = JSON.parse(storedProjects);

        // =========================
        // TÌM PROJECT THEO ID
        // =========================

        const currentProject = projects.find((item) => item.id === Number(id));

        if (!currentProject) {
          alert("Không tìm thấy dự án.");

          navigate("/admin");

          return;
        }

        console.log("PROJECT EDIT:", currentProject);

        setProject(currentProject);

        // =========================
        // FORM
        // =========================

        setFormData({
          categoryId: currentProject.categoryId ?? "",

          titleVi: currentProject.titleVi ?? "",

          titleZh: currentProject.titleZh ?? "",

          slug: currentProject.slug ?? "",

          clientNameVi: currentProject.clientNameVi ?? "",

          clientNameZh: currentProject.clientNameZh ?? "",

          completionYear: currentProject.completionYear ?? "",

          videoEmbedUrl: currentProject.videoEmbedUrl ?? "",

          descriptionVi: currentProject.descriptionVi ?? "",

          descriptionZh: currentProject.descriptionZh ?? "",

          isFeatured: currentProject.isFeatured ?? false,

          statusVi: currentProject.statusVi ?? "",

          statusZh: currentProject.statusZh ?? "",
        });

        // =========================
        // THUMBNAIL
        // =========================

        setOldThumbnail(currentProject.thumbnailUrl ?? "");

        // =========================
        // GALLERY
        // =========================

        setOldGallery(currentProject.galleries ?? []);

        // =========================
        // CATEGORY
        // =========================

        const categoryData = await getAllCategories();

        setCategories(categoryData);
      } catch (error) {
        console.error("Lỗi load project:", error);

        alert("Không thể tải dữ liệu dự án.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // THUMBNAIL
  // =====================================================

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnail(file);

    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnail(null);

    setThumbnailPreview("");

    const input = document.getElementById("thumbnail");

    if (input) {
      input.value = "";
    }
  };

  // =====================================================
  // DELETE OLD GALLERY
  // =====================================================

  const handleDeleteOldImage = (imageId) => {
    // Thêm ID vào danh sách xóa

    setDeleteImageIds((prev) => {
      if (prev.includes(imageId)) {
        return prev;
      }

      return [...prev, imageId];
    });

    // Xóa khỏi giao diện

    setOldGallery((prev) => prev.filter((image) => image.id !== imageId));
  };

  // =====================================================
  // ADD NEW GALLERY
  // =====================================================

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    const images = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,

      file: file,

      preview: URL.createObjectURL(file),

      captionVi: "",

      captionZh: "",
    }));

    setNewGallery((prev) => [...prev, ...images]);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE NEW GALLERY
  // =====================================================

  const removeNewGalleryImage = (imageId) => {
    setNewGallery((prev) => prev.filter((image) => image.id !== imageId));
  };

  // =====================================================
  // CAPTION
  // =====================================================

  const handleCaptionChange = (imageId, field, value) => {
    setNewGallery((prev) =>
      prev.map((image) =>
        image.id === imageId
          ? {
              ...image,
              [field]: value,
            }
          : image,
      ),
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!project) {
      alert("Không tìm thấy project.");

      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      // =========================
      // BASIC INFO
      // =========================

      data.append("CategoryId", formData.categoryId);

      data.append("TitleVi", formData.titleVi);

      data.append("TitleZh", formData.titleZh);

      data.append("Slug", formData.slug);

      data.append("ClientNameVi", formData.clientNameVi || "");

      data.append("ClientNameZh", formData.clientNameZh || "");

      data.append("CompletionYear", formData.completionYear || "0");

      data.append("VideoEmbedUrl", formData.videoEmbedUrl || "");

      data.append("DescriptionVi", formData.descriptionVi || "");

      data.append("DescriptionZh", formData.descriptionZh || "");

      data.append("IsFeatured", formData.isFeatured);

      data.append("StatusVi", formData.statusVi || "");

      data.append("StatusZh", formData.statusZh || "");

      // =========================
      // NEW THUMBNAIL
      // =========================

      if (thumbnail) {
        data.append("Thumbnail", thumbnail);
      }

      // =========================
      // DELETE OLD IMAGES
      // =========================

      deleteImageIds.forEach((imageId) => {
        data.append("DeleteImageIds", imageId);
      });

      // =========================
      // NEW GALLERY
      // =========================

      newGallery.forEach((image) => {
        data.append("Images", image.file);

        data.append("CaptionVi", image.captionVi || "");

        data.append("CaptionZh", image.captionZh || "");
      });

      // =========================
      // DEBUG
      // =========================

      console.log("UPDATE PROJECT ID:", project.id);

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      // =========================
      // CALL API
      // =========================

      await updateProject(project.id, data);

      alert("Cập nhật dự án thành công!");

      // =========================
      // QUAY VỀ ADMIN
      // =========================

      navigate("/admin");
    } catch (error) {
      console.error("Lỗi update:", error.response?.data || error);

      alert(error.response?.data?.message || "Cập nhật dự án thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="edit-project-page">
        <div className="loading">Đang tải dữ liệu dự án...</div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="edit-project-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="edit-project-header">
        <div>
          <h1>Chỉnh sửa dự án</h1>

          <p>Cập nhật thông tin dự án</p>
        </div>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/admin")}
        >
          ← Quay lại
        </button>
      </div>

      <form className="edit-project-form" onSubmit={handleSubmit}>
        {/* =================================================
            THÔNG TIN CƠ BẢN
        ================================================= */}

        <div className="form-card">
          <h2>Thông tin dự án</h2>

          <div className="form-grid">
            {/* CATEGORY */}

            <div className="form-group">
              <label>
                Danh mục
                <span className="required">*</span>
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nameVi}
                  </option>
                ))}
              </select>
            </div>

            {/* TITLE VI */}

            <div className="form-group">
              <label>
                Tên dự án (Tiếng Việt)
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="titleVi"
                value={formData.titleVi}
                onChange={handleChange}
                required
              />
            </div>

            {/* TITLE ZH */}

            <div className="form-group">
              <label>
                Tên dự án (Tiếng Trung)
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="titleZh"
                value={formData.titleZh}
                onChange={handleChange}
                required
              />
            </div>

            {/* SLUG */}

            <div className="form-group">
              <label>
                Slug
                <span className="required">*</span>
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>

            {/* CLIENT VI */}

            <div className="form-group">
              <label>Khách hàng (Tiếng Việt)</label>

              <input
                type="text"
                name="clientNameVi"
                value={formData.clientNameVi}
                onChange={handleChange}
              />
            </div>

            {/* CLIENT ZH */}

            <div className="form-group">
              <label>Khách hàng (Tiếng Trung)</label>

              <input
                type="text"
                name="clientNameZh"
                value={formData.clientNameZh}
                onChange={handleChange}
              />
            </div>

            {/* YEAR */}

            <div className="form-group">
              <label>Năm hoàn thành</label>

              <input
                type="number"
                name="completionYear"
                value={formData.completionYear}
                onChange={handleChange}
              />
            </div>

            {/* STATUS VI */}

            <div className="form-group">
              <label>Trạng thái (Tiếng Việt)</label>

              <input
                type="text"
                name="statusVi"
                value={formData.statusVi}
                onChange={handleChange}
              />
            </div>

            {/* STATUS ZH */}

            <div className="form-group">
              <label>Trạng thái (Tiếng Trung)</label>

              <input
                type="text"
                name="statusZh"
                value={formData.statusZh}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FEATURED */}

          <div className="featured-box">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Dự án nổi bật
            </label>
          </div>
        </div>

        {/* =================================================
            NỘI DUNG
        ================================================= */}

        <div className="form-card">
          <h2>Nội dung</h2>

          <div className="form-group">
            <label>Video Embed URL</label>

            <input
              type="text"
              name="videoEmbedUrl"
              value={formData.videoEmbedUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="description-grid">
            <div className="form-group">
              <label>Mô tả tiếng Việt</label>

              <textarea
                name="descriptionVi"
                value={formData.descriptionVi}
                onChange={handleChange}
                rows="8"
              />
            </div>

            <div className="form-group">
              <label>Mô tả tiếng Trung</label>

              <textarea
                name="descriptionZh"
                value={formData.descriptionZh}
                onChange={handleChange}
                rows="8"
              />
            </div>
          </div>
        </div>

        {/* =================================================
            THUMBNAIL
        ================================================= */}

        <div className="form-card">
          <h2>Ảnh đại diện</h2>

          <div className="thumbnail-section">
            {/* ẢNH CŨ */}

            {!thumbnailPreview && oldThumbnail && (
              <div className="thumbnail-item">
                <img src={oldThumbnail} alt="Thumbnail cũ" />

                <span>Ảnh hiện tại</span>
              </div>
            )}

            {/* ẢNH MỚI */}

            {thumbnailPreview && (
              <div className="thumbnail-item">
                <div className="image-wrapper">
                  <img src={thumbnailPreview} alt="Thumbnail mới" />

                  <button
                    type="button"
                    className="remove-image"
                    onClick={removeThumbnail}
                  >
                    ×
                  </button>
                </div>

                <span>Ảnh mới</span>
              </div>
            )}

            {/* UPLOAD */}

            <div className="upload-thumbnail">
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />

              <label htmlFor="thumbnail">📷 Chọn ảnh mới</label>

              <p>Không chọn ảnh mới → giữ ảnh hiện tại</p>
            </div>
          </div>
        </div>

        {/* =================================================
            GALLERY CŨ
        ================================================= */}

        <div className="form-card">
          <h2>Gallery hiện tại</h2>

          {oldGallery.length === 0 ? (
            <div className="empty-gallery">Chưa có ảnh Gallery.</div>
          ) : (
            <div className="gallery-grid">
              {oldGallery.map((image) => (
                <div className="gallery-item" key={image.id}>
                  <div className="gallery-image">
                    <img src={image.imageUrl} alt={image.captionVi || ""} />

                    <button
                      type="button"
                      className="remove-gallery"
                      onClick={() => handleDeleteOldImage(image.id)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="gallery-caption">
                    <p>{image.captionVi}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            GALLERY MỚI
        ================================================= */}

        <div className="form-card">
          <h2>Thêm ảnh Gallery</h2>

          <div className="gallery-upload-area">
            <input
              id="gallery"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
            />

            <label htmlFor="gallery">+ Chọn ảnh Gallery</label>
          </div>

          {newGallery.length > 0 && (
            <div className="new-gallery-grid">
              {newGallery.map((image) => (
                <div className="new-gallery-item" key={image.id}>
                  <div className="new-gallery-image">
                    <img src={image.preview} alt="" />

                    <button
                      type="button"
                      onClick={() => removeNewGalleryImage(image.id)}
                    >
                      ×
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Caption tiếng Việt"
                    value={image.captionVi}
                    onChange={(e) =>
                      handleCaptionChange(image.id, "captionVi", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Caption tiếng Trung"
                    value={image.captionZh}
                    onChange={(e) =>
                      handleCaptionChange(image.id, "captionZh", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            BUTTON
        ================================================= */}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin")}
          >
            Hủy
          </button>

          <button type="submit" className="save-button" disabled={saving}>
            {saving ? "Đang lưu..." : "💾 Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProject;
