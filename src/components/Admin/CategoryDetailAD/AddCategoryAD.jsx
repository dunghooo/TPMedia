import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CategoryAD.css";

import { createCategory } from "../../api/categoryApi";

function AddCategoryAD() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameVi: "",
    nameZh: "",
    slug: "",
  });

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
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = {
        nameVi: formData.nameVi.trim(),
        nameZh: formData.nameZh.trim(),
        slug: formData.slug.trim(),
      };

      console.log("CATEGORY:", data);

      await createCategory(data);

      alert("Thêm thể loại thành công!");

      navigate("/admin");
    } catch (error) {
      console.error("Lỗi thêm category:", error.response?.data || error);

      alert(error.response?.data?.message || "Thêm thể loại thất bại!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="category-page">
      {/* =========================
                HEADER
            ========================= */}

      <div className="category-header">
        <button
          type="button"
          className="category-back-button"
          onClick={() => navigate("/admin")}
        >
          ← Quay lại
        </button>

        <div>
          <h1>Thêm thể loại</h1>

          <p>Tạo thể loại mới</p>
        </div>
      </div>

      {/* =========================
                FORM
            ========================= */}

      <form className="category-form" onSubmit={handleSubmit}>
        {/* =========================
                    TIẾNG VIỆT
                ========================= */}

        <section className="category-section">
          <div className="category-section-title">
            <div className="category-section-icon">🇻🇳</div>

            <div>
              <h2>Thông tin tiếng Việt</h2>

              <p>Tên thể loại bằng tiếng Việt</p>
            </div>
          </div>

          <div className="category-form-group">
            <label>
              Tên thể loại
              <span>*</span>
            </label>

            <input
              type="text"
              name="nameVi"
              value={formData.nameVi}
              onChange={handleChange}
              placeholder="Ví dụ: Thi công"
              required
            />
          </div>
        </section>

        {/* =========================
                    TIẾNG TRUNG
                ========================= */}

        <section className="category-section">
          <div className="category-section-title">
            <div className="category-section-icon">🇨🇳</div>

            <div>
              <h2>Thông tin tiếng Trung</h2>

              <p>Tên thể loại bằng tiếng Trung</p>
            </div>
          </div>

          <div className="category-form-group">
            <label>Tên thể loại</label>

            <input
              type="text"
              name="nameZh"
              value={formData.nameZh}
              onChange={handleChange}
              placeholder="Nhập tên thể loại tiếng Trung"
            />
          </div>
        </section>

        {/* =========================
                    THÔNG TIN CHUNG
                ========================= */}

        <section className="category-section">
          <div className="category-section-title">
            <div className="category-section-icon">⚙️</div>

            <div>
              <h2>Thông tin chung</h2>

              <p>Thông tin định danh thể loại</p>
            </div>
          </div>

          <div className="category-form-group">
            <label>
              Slug
              <span>*</span>
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="vi-du-thi-cong"
              required
            />
          </div>
        </section>

        {/* =========================
                    FOOTER
                ========================= */}

        <div className="category-form-footer">
          <button
            type="button"
            className="category-cancel-button"
            onClick={() => navigate("/admin")}
            disabled={saving}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="category-save-button"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "✓ Lưu thể loại"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryAD;
