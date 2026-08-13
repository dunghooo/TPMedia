import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ProjectDetailAD/AddProjectAD.css";
import { createProject } from "../../api/projectApi";
import { getAllCategories } from "../../api/categoryApi";

function AddProject() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoryError("");

        const data = await getAllCategories();

        console.log("Categories:", data);

        setCategories(data);
      } catch (error) {
        console.error("Lỗi lấy category:", error);

        setCategoryError("Không thể tải danh sách category.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titleVi: "",
    titleZh: "",
    slug: "",
    clientNameVi: "",
    clientNameZh: "",
    completionYear: "",
    categoryId: "",
    videoEmbedUrl: "",
    descriptionVi: "",
    descriptionZh: "",
    statusVi: "",
    statusZh: "",
    isFeatured: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [gallery, setGallery] = useState([]);

  // =========================
  // INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // THUMBNAIL
  // =========================

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

  // =========================
  // GALLERY
  // =========================

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setGallery((prev) => [...prev, ...newImages]);

    e.target.value = "";
  };

  const removeGalleryImage = (id) => {
    setGallery((prev) => prev.filter((image) => image.id !== id));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // =========================
      // THÔNG TIN DỰ ÁN
      // =========================

      data.append("CategoryId", formData.categoryId);
      data.append("TitleVi", formData.titleVi);
      data.append("TitleZh", formData.titleZh);
      data.append("Slug", formData.slug);

      data.append("ClientNameVi", formData.clientNameVi || "");

      data.append("ClientNameZh", formData.clientNameZh || "");

      data.append("CompletionYear", formData.completionYear || "");

      data.append("VideoEmbedUrl", formData.videoEmbedUrl || "");

      data.append("DescriptionVi", formData.descriptionVi || "");

      data.append("DescriptionZh", formData.descriptionZh || "");

      data.append("StatusVi", formData.statusVi || "");

      data.append("StatusZh", formData.statusZh || "");

      data.append("IsFeatured", formData.isFeatured);

      // =========================
      // THUMBNAIL
      // =========================

      if (thumbnail) {
        data.append("Thumbnail", thumbnail);
      }

      // =========================
      // GALLERY
      // =========================

      gallery.forEach((image) => {
        data.append("Images", image.file);
      });

      // =========================
      // KIỂM TRA DỮ LIỆU
      // =========================

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      // =========================
      // GỌI API
      // =========================

      const result = await createProject(data);

      console.log("Thêm project thành công:", result);

      alert("Thêm dự án thành công!");

      navigate("/admin");
    } catch (error) {
      console.error("Lỗi thêm project:", error.response?.data || error);

      alert(error.response?.data?.message || "Thêm dự án thất bại!");
    }
  };

  return (
    <div className="add-project-page">
      {/* =========================
                HEADER
            ========================= */}

      <div className="add-project-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/admin")}
        >
          ← Quay lại
        </button>

        <div>
          <h1>Thêm dự án</h1>

          <p>Tạo thông tin dự án mới</p>
        </div>
      </div>

      <form className="add-project-form" onSubmit={handleSubmit}>
        {/* =========================
                    TIẾNG VIỆT
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🇻🇳</div>

            <div>
              <h2>Thông tin tiếng Việt</h2>

              <p>Nội dung dự án bằng tiếng Việt</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Tên dự án
                <span>*</span>
              </label>

              <input
                type="text"
                name="titleVi"
                value={formData.titleVi}
                onChange={handleChange}
                placeholder="Nhập tên dự án"
                required
              />
            </div>

            <div className="form-group">
              <label>Tên khách hàng</label>

              <input
                type="text"
                name="clientNameVi"
                value={formData.clientNameVi}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng"
              />
            </div>

            <div className="form-group full-width">
              <label>Mô tả</label>

              <textarea
                name="descriptionVi"
                value={formData.descriptionVi}
                onChange={handleChange}
                placeholder="Nhập mô tả dự án..."
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>

              <input
                type="text"
                name="statusVi"
                value={formData.statusVi}
                onChange={handleChange}
                placeholder="Ví dụ: Hoàn thành"
              />
            </div>
          </div>
        </section>

        {/* =========================
                    TIẾNG TRUNG
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🇨🇳</div>

            <div>
              <h2>Thông tin tiếng Trung</h2>

              <p>Nội dung dự án bằng tiếng Trung</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Tên dự án</label>

              <input
                type="text"
                name="titleZh"
                value={formData.titleZh}
                onChange={handleChange}
                placeholder="Nhập tên dự án tiếng Trung"
              />
            </div>

            <div className="form-group">
              <label>Tên khách hàng</label>

              <input
                type="text"
                name="clientNameZh"
                value={formData.clientNameZh}
                onChange={handleChange}
                placeholder="Nhập tên khách hàng tiếng Trung"
              />
            </div>

            <div className="form-group full-width">
              <label>Mô tả</label>

              <textarea
                name="descriptionZh"
                value={formData.descriptionZh}
                onChange={handleChange}
                placeholder="Nhập mô tả dự án tiếng Trung..."
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>

              <input
                type="text"
                name="statusZh"
                value={formData.statusZh}
                onChange={handleChange}
                placeholder="Ví dụ: 已完成"
              />
            </div>
          </div>
        </section>

        {/* =========================
                    THÔNG TIN CHUNG
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">⚙️</div>

            <div>
              <h2>Thông tin chung</h2>

              <p>Thông tin cơ bản của dự án</p>
            </div>
          </div>

          <div className="form-grid">
            {/* CATEGORY */}

            <div className="form-group">
              <label>
                Category <span className="required">*</span>
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn category --</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nameVi}
                  </option>
                ))}
              </select>

              {loadingCategories && <small>Đang tải category...</small>}

              {categoryError && (
                <small style={{ color: "red" }}>{categoryError}</small>
              )}
            </div>

            {/* YEAR */}

            <div className="form-group">
              <label>Năm hoàn thành</label>

              <input
                type="number"
                name="completionYear"
                value={formData.completionYear}
                onChange={handleChange}
                placeholder="2024"
                min="1900"
                max="2100"
              />
            </div>

            {/* SLUG */}

            <div className="form-group">
              <label>Slug</label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="vi-dang-vi-dan"
              />
            </div>

            {/* FEATURED */}

            <div className="form-group">
              <label>Hiển thị</label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />

                <div>
                  <strong>Dự án nổi bật</strong>

                  <small>Hiển thị ở khu vực nổi bật</small>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* =========================
                    THUMBNAIL
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🖼️</div>

            <div>
              <h2>Thumbnail</h2>

              <p>Ảnh đại diện của dự án</p>
            </div>
          </div>

          <div className="thumbnail-upload">
            {!thumbnailPreview ? (
              <label htmlFor="thumbnail" className="upload-box">
                <div className="upload-icon">🖼️</div>

                <strong>Chọn ảnh</strong>

                <span>JPG, PNG, WEBP</span>

                <small>Click để tải ảnh</small>
              </label>
            ) : (
              <div className="thumbnail-preview">
                <img src={thumbnailPreview} alt="Thumbnail" />

                <button
                  type="button"
                  className="remove-image"
                  onClick={removeThumbnail}
                >
                  ×
                </button>
              </div>
            )}

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              hidden
              onChange={handleThumbnailChange}
            />
          </div>
        </section>

        {/* =========================
                    GALLERY
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🖼️</div>

            <div>
              <h2>Gallery</h2>

              <p>Hình ảnh chi tiết của dự án</p>
            </div>
          </div>

          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div className="gallery-item" key={image.id}>
                <img src={image.preview} alt={`Gallery ${index + 1}`} />

                <span className="gallery-number">{index + 1}</span>

                <button
                  type="button"
                  className="gallery-remove"
                  onClick={() => removeGalleryImage(image.id)}
                >
                  ×
                </button>
              </div>
            ))}

            <label htmlFor="gallery" className="gallery-add">
              <span>+</span>

              <strong>Thêm ảnh</strong>
            </label>

            <input
              id="gallery"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleGalleryChange}
            />
          </div>
        </section>

        {/* =========================
                    VIDEO
                ========================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🎬</div>

            <div>
              <h2>Video</h2>

              <p>Video giới thiệu dự án</p>
            </div>
          </div>

          <div className="form-group">
            <label>Video Embed URL</label>

            <input
              type="url"
              name="videoEmbedUrl"
              value={formData.videoEmbedUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>
        </section>

        {/* =========================
                    BUTTON
                ========================= */}

        <div className="form-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/projects")}
          >
            Hủy
          </button>

          <button type="submit" className="save-button">
            ✓ Lưu dự án
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
