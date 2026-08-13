import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./EditMemberAD.css";

import { getAllMembers, updateMember } from "../../api/memberApi";

function EditMemberAD() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =====================================================
  // FORM DATA
  // =====================================================

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

  // =====================================================
  // MEMBER
  // =====================================================

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =====================================================
  // AVATAR CŨ
  // =====================================================

  const [oldAvatar, setOldAvatar] = useState("");

  // =====================================================
  // AVATAR MỚI
  // =====================================================

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // =====================================================
  // ẢNH CŨ
  // =====================================================

  const [oldImages, setOldImages] = useState([]);

  // =====================================================
  // ID ẢNH CŨ CẦN XÓA
  // =====================================================

  const [deleteImageIds, setDeleteImageIds] = useState([]);

  // =====================================================
  // ẢNH MỚI
  // =====================================================

  const [newImages, setNewImages] = useState([]);

  // =====================================================
  // LOAD MEMBER
  // =====================================================

  useEffect(() => {
    const loadMember = async () => {
      try {
        setLoading(true);

        const members = await getAllMembers();

        console.log("DANH SÁCH MEMBERS:", members);

        const currentMember = members.find((item) => item.id === Number(id));

        console.log("MEMBER CẦN SỬA:", currentMember);

        if (!currentMember) {
          alert("Không tìm thấy nhân viên.");
          navigate("/admin");
          return;
        }

        // =========================
        // LƯU MEMBER
        // =========================

        setMember(currentMember);

        // =========================
        // ĐỔ FORM
        // =========================

        setFormData({
          fullNameVi: currentMember.fullNameVi ?? "",

          fullNameZh: currentMember.fullNameZh ?? "",

          roleVi: currentMember.roleVi ?? "",

          roleZh: currentMember.roleZh ?? "",

          bioContentVi: currentMember.bioContentVi ?? "",

          bioContentZh: currentMember.bioContentZh ?? "",

          behanceLink: currentMember.behanceLink ?? "",

          displayOrder: currentMember.displayOrder ?? "",
        });

        // =========================
        // AVATAR
        // =========================

        setOldAvatar(currentMember.avatarUrl ?? "");

        // =========================
        // IMAGES
        // =========================

        setOldImages(currentMember.images ?? []);
      } catch (error) {
        console.error("LỖI LOAD MEMBER:", error.response?.data || error);

        alert("Không thể tải thông tin nhân viên.");

        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id, navigate]);

  // =====================================================
  // INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // AVATAR
  // =====================================================

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatar(file);

    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeNewAvatar = () => {
    setAvatar(null);
    setAvatarPreview("");

    const input = document.getElementById("avatar");

    if (input) {
      input.value = "";
    }
  };

  // =====================================================
  // XÓA ẢNH CŨ
  // =====================================================

  const removeOldImage = (imageId) => {
    setDeleteImageIds((prev) => {
      if (prev.includes(imageId)) {
        return prev;
      }

      return [...prev, imageId];
    });

    setOldImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  // =====================================================
  // THÊM ẢNH MỚI
  // =====================================================

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const images = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...images]);

    e.target.value = "";
  };

  // =====================================================
  // XÓA ẢNH MỚI
  // =====================================================

  const removeNewImage = (imageId) => {
    setNewImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!member) {
      alert("Không tìm thấy nhân viên.");
      return;
    }

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
      // AVATAR MỚI
      // =========================

      // Không chọn avatar mới
      // => không gửi Avatar
      // => Backend giữ avatar cũ

      if (avatar) {
        data.append("Avatar", avatar);
      }

      // =========================
      // ẢNH CŨ CẦN XÓA
      // =========================

      deleteImageIds.forEach((imageId) => {
        data.append("DeleteImageIds", imageId);
      });

      // =========================
      // ẢNH MỚI
      // =========================

      newImages.forEach((image) => {
        data.append("Images", image.file);
      });

      // =========================
      // DEBUG
      // =========================

      console.log("MEMBER ID UPDATE:", member.id);

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }

      // =========================
      // CALL API
      // =========================

      const result = await updateMember(member.id, data);

      console.log("UPDATE MEMBER SUCCESS:", result);

      alert("Cập nhật nhân viên thành công!");

      navigate("/admin");
    } catch (error) {
      console.error("LỖI UPDATE MEMBER:", error.response?.data || error);

      alert(error.response?.data?.message || "Cập nhật nhân viên thất bại!");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="edit-member-loading">Đang tải thông tin nhân viên...</div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="edit-member-page">
      {/* =================================================
                HEADER
            ================================================= */}

      <div className="edit-member-header">
        <button
          type="button"
          className="edit-member-back-button"
          onClick={() => navigate("/admin")}
        >
          ← Quay lại
        </button>

        <div>
          <h1>Chỉnh sửa nhân viên</h1>

          <p>Cập nhật thông tin thành viên</p>
        </div>
      </div>

      <form className="edit-member-form" onSubmit={handleSubmit}>
        {/* =================================================
                    TIẾNG VIỆT
                ================================================= */}

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">🇻🇳</div>

            <div>
              <h2>Thông tin tiếng Việt</h2>

              <p>Thông tin thành viên bằng tiếng Việt</p>
            </div>
          </div>

          <div className="edit-member-form-grid">
            <div className="edit-member-form-group">
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

            <div className="edit-member-form-group">
              <label>Chức vụ</label>

              <input
                type="text"
                name="roleVi"
                value={formData.roleVi}
                onChange={handleChange}
                placeholder="Nhập chức vụ"
              />
            </div>

            <div className="edit-member-form-group edit-member-full-width">
              <label>Tiểu sử</label>

              <textarea
                name="bioContentVi"
                value={formData.bioContentVi}
                onChange={handleChange}
                placeholder="Nhập tiểu sử..."
              />
            </div>
          </div>
        </section>

        {/* =================================================
                    TIẾNG TRUNG
                ================================================= */}

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">🇨🇳</div>

            <div>
              <h2>Thông tin tiếng Trung</h2>

              <p>Thông tin thành viên bằng tiếng Trung</p>
            </div>
          </div>

          <div className="edit-member-form-grid">
            <div className="edit-member-form-group">
              <label>Họ và tên</label>

              <input
                type="text"
                name="fullNameZh"
                value={formData.fullNameZh}
                onChange={handleChange}
                placeholder="Nhập họ tên tiếng Trung"
              />
            </div>

            <div className="edit-member-form-group">
              <label>Chức vụ</label>

              <input
                type="text"
                name="roleZh"
                value={formData.roleZh}
                onChange={handleChange}
                placeholder="Nhập chức vụ tiếng Trung"
              />
            </div>

            <div className="edit-member-form-group edit-member-full-width">
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

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">⚙️</div>

            <div>
              <h2>Thông tin chung</h2>

              <p>Thông tin cơ bản của thành viên</p>
            </div>
          </div>

          <div className="edit-member-form-grid">
            <div className="edit-member-form-group">
              <label>Behance</label>

              <input
                type="url"
                name="behanceLink"
                value={formData.behanceLink}
                onChange={handleChange}
                placeholder="https://www.behance.net/..."
              />
            </div>

            <div className="edit-member-form-group">
              <label>Thứ tự hiển thị</label>

              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </section>

        {/* =================================================
                    AVATAR
                ================================================= */}

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">👤</div>

            <div>
              <h2>Ảnh đại diện</h2>

              <p>Ảnh hiện tại và ảnh mới</p>
            </div>
          </div>

          <div className="edit-member-avatar-upload">
            {avatarPreview ? (
              <div className="edit-member-avatar-preview">
                <img src={avatarPreview} alt="Avatar mới" />

                <button
                  type="button"
                  className="edit-member-remove-image"
                  onClick={removeNewAvatar}
                >
                  ×
                </button>
              </div>
            ) : oldAvatar ? (
              <div className="edit-member-avatar-preview">
                <img src={oldAvatar} alt="Avatar hiện tại" />

                <label
                  htmlFor="avatar"
                  className="edit-member-change-avatar"
                  title="Đổi avatar"
                >
                  ✏️
                </label>
              </div>
            ) : (
              <label htmlFor="avatar" className="edit-member-upload-box">
                <div>👤</div>

                <strong>Chọn ảnh</strong>

                <span>JPG, PNG, WEBP</span>
              </label>
            )}

            <input
              id="avatar"
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          <small className="edit-member-note">
            Không chọn ảnh mới → giữ nguyên avatar hiện tại.
          </small>
        </section>

        {/* =================================================
                    ẢNH CŨ
                ================================================= */}

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">🖼️</div>

            <div>
              <h2>Ảnh hiện tại</h2>

              <p>Các ảnh đang có của nhân viên</p>
            </div>
          </div>

          {oldImages.length === 0 ? (
            <div className="edit-member-empty">Chưa có ảnh nào.</div>
          ) : (
            <div className="edit-member-gallery-grid">
              {oldImages.map((image, index) => (
                <div className="edit-member-gallery-item" key={image.id}>
                  <img src={image.imageUrl} alt={`Ảnh ${index + 1}`} />

                  <span className="edit-member-gallery-number">
                    {index + 1}
                  </span>

                  <button
                    type="button"
                    className="edit-member-gallery-remove"
                    onClick={() => removeOldImage(image.id)}
                    title="Xóa ảnh"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =================================================
                    THÊM ẢNH MỚI
                ================================================= */}

        <section className="edit-member-section">
          <div className="edit-member-section-title">
            <div className="edit-member-section-icon">➕</div>

            <div>
              <h2>Thêm ảnh</h2>

              <p>Upload thêm ảnh mới</p>
            </div>
          </div>

          <div className="edit-member-gallery-grid">
            {newImages.map((image, index) => (
              <div className="edit-member-gallery-item" key={image.id}>
                <img src={image.preview} alt={`Ảnh mới ${index + 1}`} />

                <span className="edit-member-gallery-number">{index + 1}</span>

                <button
                  type="button"
                  className="edit-member-gallery-remove"
                  onClick={() => removeNewImage(image.id)}
                  title="Xóa ảnh"
                >
                  ×
                </button>
              </div>
            ))}

            <label htmlFor="images" className="edit-member-gallery-add">
              <span>+</span>

              <strong>Thêm ảnh</strong>
            </label>

            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImagesChange}
            />
          </div>
        </section>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="edit-member-form-footer">
          <button
            type="button"
            className="edit-member-cancel-button"
            onClick={() => navigate("/admin")}
            disabled={saving}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="edit-member-save-button"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : "✓ Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMemberAD;
