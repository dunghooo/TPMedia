import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../ProjectDetailAD/AddProjectAD.css";

import { createMember } from "../../api/memberApi";

function AddMember() {
  const navigate = useNavigate();

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    fullNameVi: "",
    fullNameZh: "",
    roleVi: "",
    roleZh: "",
    bioContentVi: "",
    bioContentZh: "",
    behanceLink: "",
    displayOrder: "",
  });

  // =========================
  // AVATAR
  // =========================

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // =========================
  // GALLERY
  // =========================

  const [gallery, setGallery] = useState([]);

  // =========================
  // SAVING
  // =========================

  const [saving, setSaving] = useState(false);

  // =========================
  // INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // AVATAR
  // =========================

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");

    const input = document.getElementById("avatar");

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
      setSaving(true);

      const data = new FormData();

      // =========================
      // THÔNG TIN MEMBER
      // =========================

      data.append("FullNameVi", formData.fullNameVi);

      data.append("FullNameZh", formData.fullNameZh);

      data.append("RoleVi", formData.roleVi || "");

      data.append("RoleZh", formData.roleZh || "");

      data.append("BioContentVi", formData.bioContentVi || "");

      data.append("BioContentZh", formData.bioContentZh || "");

      data.append("BehanceLink", formData.behanceLink || "");

      data.append("DisplayOrder", formData.displayOrder || "0");

      // =========================
      // AVATAR
      // =========================

      if (avatar) {
        data.append("Avatar", avatar);
      }

      // =========================
      // GALLERY
      // =========================

      gallery.forEach((image) => {
        data.append("Images", image.file);
      });

      // =========================
      // DEBUG
      // =========================

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      // =========================
      // API
      // =========================

      const result = await createMember(data);

      console.log("Thêm member thành công:", result);

      alert("Thêm nhân viên thành công!");

      navigate("/admin");
    } catch (error) {
      console.error("Lỗi thêm member:", error.response?.data || error);

      alert(error.response?.data?.message || "Thêm nhân viên thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // UI
  // =========================

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
          <h1>Thêm nhân viên</h1>

          <p>Tạo thông tin thành viên mới</p>
        </div>
      </div>

      <form className="add-project-form" onSubmit={handleSubmit}>
        {/* =================================================
                    TIẾNG VIỆT
                ================================================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🇻🇳</div>

            <div>
              <h2>Thông tin tiếng Việt</h2>

              <p>Thông tin thành viên bằng tiếng Việt</p>
            </div>
          </div>

          <div className="form-grid">
            {/* HỌ TÊN */}

            <div className="form-group">
              <label>
                Họ và tên
                <span>*</span>
              </label>

              <input
                type="text"
                name="fullNameVi"
                value={formData.fullNameVi}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            {/* CHỨC VỤ */}

            <div className="form-group">
              <label>Chức vụ</label>

              <input
                type="text"
                name="roleVi"
                value={formData.roleVi}
                onChange={handleChange}
                placeholder="Ví dụ: Frontend Developer"
              />
            </div>

            {/* BIO */}

            <div className="form-group full-width">
              <label>Tiểu sử</label>

              <textarea
                name="bioContentVi"
                value={formData.bioContentVi}
                onChange={handleChange}
                placeholder="Nhập tiểu sử nhân viên..."
              />
            </div>
          </div>
        </section>

        {/* =================================================
                    TIẾNG TRUNG
                ================================================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🇨🇳</div>

            <div>
              <h2>Thông tin tiếng Trung</h2>

              <p>Thông tin thành viên bằng tiếng Trung</p>
            </div>
          </div>

          <div className="form-grid">
            {/* HỌ TÊN */}

            <div className="form-group">
              <label>Họ và tên</label>

              <input
                type="text"
                name="fullNameZh"
                value={formData.fullNameZh}
                onChange={handleChange}
                placeholder="Nhập họ và tên tiếng Trung"
              />
            </div>

            {/* CHỨC VỤ */}

            <div className="form-group">
              <label>Chức vụ</label>

              <input
                type="text"
                name="roleZh"
                value={formData.roleZh}
                onChange={handleChange}
                placeholder="Nhập chức vụ tiếng Trung"
              />
            </div>

            {/* BIO */}

            <div className="form-group full-width">
              <label>Tiểu sử</label>

              <textarea
                name="bioContentZh"
                value={formData.bioContentZh}
                onChange={handleChange}
                placeholder="Nhập tiểu sử tiếng Trung..."
              />
            </div>
          </div>
        </section>

        {/* =================================================
                    THÔNG TIN CHUNG
                ================================================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">⚙️</div>

            <div>
              <h2>Thông tin chung</h2>

              <p>Thông tin cơ bản của thành viên</p>
            </div>
          </div>

          <div className="form-grid">
            {/* BEHANCE */}

            <div className="form-group">
              <label>Behance</label>

              <input
                type="url"
                name="behanceLink"
                value={formData.behanceLink}
                onChange={handleChange}
                placeholder="https://www.behance.net/..."
              />
            </div>

            {/* DISPLAY ORDER */}

            <div className="form-group">
              <label>Thứ tự hiển thị</label>

              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                placeholder="1"
                min="0"
              />
            </div>
          </div>
        </section>

        {/* =================================================
                    AVATAR
                ================================================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">👤</div>

            <div>
              <h2>Ảnh đại diện</h2>

              <p>Ảnh đại diện của nhân viên</p>
            </div>
          </div>

          <div className="thumbnail-upload">
            {!avatarPreview ? (
              <label htmlFor="avatar" className="upload-box">
                <div className="upload-icon">👤</div>

                <strong>Chọn ảnh</strong>

                <span>JPG, PNG, WEBP</span>

                <small>Click để tải ảnh</small>
              </label>
            ) : (
              <div className="thumbnail-preview">
                <img src={avatarPreview} alt="Avatar" />

                <button
                  type="button"
                  className="remove-image"
                  onClick={removeAvatar}
                >
                  ×
                </button>
              </div>
            )}

            <input
              id="avatar"
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>
        </section>

        {/* =================================================
                    GALLERY
                ================================================= */}

        <section className="project-section">
          <div className="section-title">
            <div className="section-icon">🖼️</div>

            <div>
              <h2>Ảnh khác</h2>

              <p>Hình ảnh bổ sung của nhân viên</p>
            </div>
          </div>

          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <div className="gallery-item" key={image.id}>
                <img src={image.preview} alt={`Ảnh ${index + 1}`} />

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

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="form-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin")}
            disabled={saving}
          >
            Hủy
          </button>

          <button type="submit" className="save-button" disabled={saving}>
            {saving ? "Đang lưu..." : "✓ Lưu nhân viên"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
