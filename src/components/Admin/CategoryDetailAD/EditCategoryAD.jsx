import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./CategoryAD.css";

import { getAllCategories, updateCategory } from "../../api/categoryApi";

function EditCategoryAD() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nameVi: "",
    nameZh: "",
    slug: "",
  });

  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD CATEGORY
  // =========================

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);

        const categories = await getAllCategories();

        console.log("CATEGORIES:", categories);

        const currentCategory = categories.find(
          (item) => item.id === Number(id),
        );

        console.log("CATEGORY CẦN SỬA:", currentCategory);

        if (!currentCategory) {
          alert("Không tìm thấy thể loại.");

          navigate("/admin");

          return;
        }

        setCategory(currentCategory);

        setFormData({
          nameVi: currentCategory.nameVi ?? "",

          nameZh: currentCategory.nameZh ?? "",

          slug: currentCategory.slug ?? "",
        });
      } catch (error) {
        console.error("Lỗi load category:", error.response?.data || error);

        alert("Không thể tải thể loại.");

        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id, navigate]);

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

    if (!category) {
      alert("Không tìm thấy thể loại.");

      return;
    }

    try {
      setSaving(true);

      const data = {
        nameVi: formData.nameVi.trim(),
        nameZh: formData.nameZh.trim(),
        slug: formData.slug.trim(),
      };

      console.log("UPDATE CATEGORY:", category.id, data);

      await updateCategory(category.id, data);

      alert("Cập nhật thể loại thành công!");

      navigate("/admin");
    } catch (error) {
      console.error("Lỗi update category:", error.response?.data || error);

      alert(error.response?.data?.message || "Cập nhật thể loại thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="category-loading">Đang tải thông tin thể loại...</div>
    );
  }

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
          <h1>Chỉnh sửa thể loại</h1>

          <p>Cập nhật thông tin thể loại</p>
        </div>
      </div>

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
              placeholder="Nhập tên thể loại"
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
              placeholder="Nhập tên tiếng Trung"
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
            {saving ? "Đang lưu..." : "✓ Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategoryAD;
