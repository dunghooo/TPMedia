import { useEffect, useState } from "react";

import "./admin.css";
import { Link } from "react-router-dom";
import { getAllProjects } from "../api/projectApi";
import { deleteProject } from "../api/projectApi";
import Pagination from "../page/Pagination";
import { getAllMembers, deleteMember } from "../api/memberApi";
import { getAllCategories, deleteCategory } from "../api/categoryApi";
import { getAllContacts, deleteContact } from "../api/contactApi";

function Admin() {
  const [activeMenu, setActiveMenu] = useState("employees");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorProjects, setErrorProjects] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const totalPages = Math.ceil(projects.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const currentProjects = projects.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (activeMenu !== "projects") return;
    let cancelled = false;
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        setErrorProjects("");
        const data = await getAllProjects();
        if (!cancelled) {
          setProjects(data);

          sessionStorage.setItem("projects", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách project:", error);

        if (!cancelled) {
          setErrorProjects("Không thể tải danh sách dự án.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProjects(false);
        }
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [activeMenu]);

  const handleDeleteProject = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa dự án này không?",
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      const newProjects = projects.filter((project) => project.id !== id);

      setProjects(newProjects);

      const newTotalPages = Math.ceil(newProjects.length / pageSize);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      alert("Xóa dự án thành công.");
    } catch (error) {
      console.error("Lỗi xóa project:", error);

      alert(error.response?.data?.message || "Không thể xóa dự án.");
    }
  };

  const [members, setMembers] = useState([]);

  const [loadingMembers, setLoadingMembers] = useState(false);

  const [errorMembers, setErrorMembers] = useState("");

  const [memberPage, setMemberPage] = useState(1);

  // Để test: 3 nhân viên / trang
  const memberPageSize = 3;

  useEffect(() => {
    if (activeMenu !== "employees") return;

    let cancelled = false;

    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        setErrorMembers("");

        const data = await getAllMembers();

        if (!cancelled) {
          setMembers(data);
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách nhân viên:", error);

        if (!cancelled) {
          setErrorMembers("Không thể tải danh sách nhân viên.");
        }
      } finally {
        if (!cancelled) {
          setLoadingMembers(false);
        }
      }
    };

    fetchMembers();

    return () => {
      cancelled = true;
    };
  }, [activeMenu]);

  const [categories, setCategories] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);

  const [errorCategories, setErrorCategories] = useState("");

  const [categoryPage, setCategoryPage] = useState(1);

  const categoryPageSize = 3;

  useEffect(() => {
    if (activeMenu !== "categories") return;

    let cancelled = false;

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setErrorCategories("");

        const data = await getAllCategories();

        console.log("Categories:", data);

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Lỗi lấy category:", error);

        if (!cancelled) {
          setErrorCategories("Không thể tải danh sách thể loại.");
        }
      } finally {
        if (!cancelled) {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, [activeMenu]);

  const categoryTotalPages = Math.ceil(categories.length / categoryPageSize);

  const categoryStartIndex = (categoryPage - 1) * categoryPageSize;

  const currentCategories = categories.slice(
    categoryStartIndex,
    categoryStartIndex + categoryPageSize,
  );

  const handleDeleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa thể loại này không?",
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);

      const newCategories = categories.filter((category) => category.id !== id);

      setCategories(newCategories);

      const newTotalPages = Math.ceil(newCategories.length / categoryPageSize);

      if (categoryPage > newTotalPages && newTotalPages > 0) {
        setCategoryPage(newTotalPages);
      }

      alert("Xóa thể loại thành công.");
    } catch (error) {
      console.error("Lỗi xóa category:", error);

      alert(error.response?.data?.message || "Xóa thể loại thất bại.");
    }
  };

  const memberTotalPages = Math.ceil(members.length / memberPageSize);

  const memberStartIndex = (memberPage - 1) * memberPageSize;

  const currentMembers = members.slice(
    memberStartIndex,
    memberStartIndex + memberPageSize,
  );

  const handleDeleteMember = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa nhân viên này không?",
    );

    if (!confirmed) return;

    try {
      await deleteMember(id);

      setMembers((prev) => prev.filter((member) => member.id !== id));

      alert("Xóa nhân viên thành công.");
    } catch (error) {
      console.error("Lỗi xóa nhân viên:", error.response?.data || error);

      alert(error.response?.data?.message || "Xóa nhân viên thất bại.");
    }
  };

  const [contacts, setContacts] = useState([]);

  const [loadingContacts, setLoadingContacts] = useState(false);

  const [errorContacts, setErrorContacts] = useState("");

  const [contactPage, setContactPage] = useState(1);

  const contactPageSize = 5;

  const contactTotalPages = Math.ceil(contacts.length / contactPageSize);

  const contactStartIndex = (contactPage - 1) * contactPageSize;

  const currentContacts = contacts.slice(
    contactStartIndex,
    contactStartIndex + contactPageSize,
  );

  useEffect(() => {
    if (activeMenu !== "contacts") return;

    let cancelled = false;

    const fetchContacts = async () => {
      try {
        setLoadingContacts(true);
        setErrorContacts("");

        const data = await getAllContacts();

        console.log("CONTACTS:", data);

        if (!cancelled) {
          setContacts(data);
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách liên hệ:", error);

        if (!cancelled) {
          setErrorContacts("Không thể tải danh sách liên hệ.");
        }
      } finally {
        if (!cancelled) {
          setLoadingContacts(false);
        }
      }
    };

    fetchContacts();

    return () => {
      cancelled = true;
    };
  }, [activeMenu]);

  const handleDeleteContact = async (id) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa liên lạc này không?",
    );

    if (!confirmed) return;

    try {
      await deleteContact(id);

      setContacts((prev) => prev.filter((contact) => contact.id !== id));

      alert("Xóa liên lạc thành công.");
    } catch (error) {
      console.error("Lỗi xóa liên lạc:", error.response?.data || error);

      alert(error.response?.data?.message || "Xóa liên lạc thất bại.");
    }
  };

  const getTitle = () => {
    switch (activeMenu) {
      case "employees":
        return "Danh sách nhân viên";

      case "projects":
        return "Danh sách dự án";

      case "contacts":
        return "Thông tin liên hệ";

      default:
        return "Dashboard";
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}/${d.getFullYear()} ${String(d.getHours()).padStart(
      2,
      "0",
    )}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="logo-icon">A</div>

          <span>Admin Panel</span>
        </div>

        <div className="sidebar-menu">
          <button
            className={
              activeMenu === "employees" ? "menu-item active" : "menu-item"
            }
            onClick={() => setActiveMenu("employees")}
          >
            <span className="menu-icon">👨‍💼</span>
            <span>Nhân viên</span>
          </button>

          <button
            className={
              activeMenu === "projects" ? "menu-item active" : "menu-item"
            }
            onClick={() => setActiveMenu("projects")}
          >
            <span className="menu-icon">📁</span>
            <span>Dự án</span>
          </button>

          <button
            className={
              activeMenu === "categories" ? "menu-item active" : "menu-item"
            }
            onClick={() => setActiveMenu("categories")}
          >
            <span className="menu-icon">🏷️</span>

            <span>Thể loại</span>
          </button>

          <button
            className={
              activeMenu === "contacts" ? "menu-item active" : "menu-item"
            }
            onClick={() => setActiveMenu("contacts")}
          >
            <span className="menu-icon">📞</span>
            <span>Thông tin liên hệ</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-button">
            <span>🚪</span>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <div>
            <h1>{getTitle()}</h1>

            <p>Quản lý thông tin hệ thống</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">AD</div>

            <div>
              <strong>Administrator</strong>
              <span>Quản trị viên</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="admin-content">
          {/* EMPLOYEES */}
          {activeMenu === "employees" && (
            <div className="content-card">
              <div className="table-header">
                <div>
                  <h2>Nhân viên</h2>

                  <p>Quản lý danh sách nhân viên</p>
                </div>

                <Link to="/admin/addMember" className="add-button">
                  + Thêm nhân viên
                </Link>
              </div>

              <div className="table-wrapper">
                <table className="member-table">
                  <thead>
                    <tr>
                      <th className="member-id-column">ID</th>

                      <th className="member-avatar-column">Ảnh đại diện</th>

                      <th>Họ và tên</th>

                      <th>Chức vụ</th>

                      <th>Tiểu sử</th>

                      <th>Behance</th>

                      <th>Ảnh khác</th>

                      <th className="member-action-column">Thao tác</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loadingMembers ? (
                      <tr>
                        <td colSpan="8" className="member-message">
                          Đang tải danh sách nhân viên...
                        </td>
                      </tr>
                    ) : errorMembers ? (
                      <tr>
                        <td colSpan="8" className="member-message error">
                          {errorMembers}
                        </td>
                      </tr>
                    ) : currentMembers.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="member-message">
                          Chưa có nhân viên nào.
                        </td>
                      </tr>
                    ) : (
                      currentMembers.map((member) => (
                        <tr key={member.id}>
                          {/* ID */}
                          <td>
                            <span className="member-id">#{member.id}</span>
                          </td>

                          {/* AVATAR */}
                          <td>
                            <div className="member-avatar">
                              {member.avatarUrl ? (
                                <img
                                  src={member.avatarUrl}
                                  alt={member.fullNameVi}
                                />
                              ) : (
                                <span>
                                  {member.fullNameVi?.charAt(0)?.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* TÊN */}
                          <td>
                            <div className="member-name">
                              <strong>{member.fullNameVi}</strong>

                              {member.fullNameZh && (
                                <small>{member.fullNameZh}</small>
                              )}
                            </div>
                          </td>

                          {/* CHỨC VỤ */}
                          <td>
                            <span className="position">{member.roleVi}</span>
                          </td>

                          {/* BIO */}
                          <td>
                            <div
                              className="member-bio"
                              title={member.bioContentVi}
                            >
                              {member.bioContentVi || "Chưa có tiểu sử"}
                            </div>
                          </td>

                          {/* BEHANCE */}
                          <td>
                            {member.behanceLink ? (
                              <a
                                href={member.behanceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="behance-link"
                              >
                                Xem Behance
                              </a>
                            ) : (
                              <span className="no-data">Chưa có</span>
                            )}
                          </td>

                          {/* CÁC ẢNH KHÁC */}
                          <td>
                            <div className="member-gallery">
                              {member.images && member.images.length > 0 ? (
                                member.images.map((image) => (
                                  <div
                                    className="member-gallery-image"
                                    key={image.id}
                                  >
                                    <img
                                      src={image.imageUrl}
                                      alt={`Ảnh ${member.fullNameVi}`}
                                    />
                                  </div>
                                ))
                              ) : (
                                <span className="no-data">Không có ảnh</span>
                              )}
                            </div>
                          </td>

                          {/* THAO TÁC */}
                          <td>
                            <div className="actions">
                              <Link
                                to={`/admin/EditMemberAD/${member.id}`}
                                className="edit-button"
                                title="Sửa"
                              >
                                ✏️
                              </Link>

                              <button
                                type="button"
                                className="delete-button"
                                title="Xóa"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              <Pagination
                currentPage={memberPage}
                totalPages={memberTotalPages}
                onPageChange={setMemberPage}
              />
            </div>
          )}

          {/* PROJECTS */}
          {activeMenu === "projects" && (
            <div className="content-card">
              <div className="table-header">
                <div>
                  <h2>Dự án</h2>

                  <p>Quản lý danh sách dự án</p>
                </div>

                <Link to="/admin/addProject" className="add-button">
                  + Thêm dự án
                </Link>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th className="project-id-column">Ảnh</th>

                      <th className="project-image-column">ID</th>

                      <th>Tên dự án</th>

                      <th>Khách hàng</th>

                      <th>Trạng thái</th>

                      <th>Ngày tạo</th>

                      <th>Thao tác</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loadingProjects ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Đang tải dữ liệu...
                        </td>
                      </tr>
                    ) : errorProjects ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                            color: "red",
                          }}
                        >
                          {errorProjects}
                        </td>
                      </tr>
                    ) : currentProjects.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Chưa có dự án nào.
                        </td>
                      </tr>
                    ) : (
                      currentProjects.map((project) => (
                        <tr key={project.id}>
                          {/* ẢNH */}
                          <td>
                            <div className="project-image">
                              <img
                                src={project.thumbnailUrl}
                                alt={project.titleVi}
                              />
                            </div>
                          </td>

                          {/* ID */}
                          <td>
                            <span className="project-id">#{project.id}</span>
                          </td>

                          {/* TÊN */}
                          <td>
                            <div className="project-title">
                              {project.titleVi}
                            </div>
                          </td>

                          {/* KHÁCH HÀNG */}
                          <td>
                            <span className="project-client">
                              {project.clientNameVi}
                            </span>
                          </td>

                          {/* TRẠNG THÁI */}
                          <td>
                            <span
                              className={
                                project.statusVi === "Hoàn thành"
                                  ? "status completed"
                                  : "status working"
                              }
                            >
                              {project.statusVi}
                            </span>
                          </td>

                          {/* NĂM */}
                          <td>
                            <span className="project-date">
                              {project.completionYear}
                            </span>
                          </td>

                          {/* THAO TÁC */}
                          <td>
                            <div className="actions">
                              <Link
                                to={`/admin/UpdateProjectAD/${project.id}`}
                                className="edit-button"
                              >
                                ✏️
                              </Link>

                              <button
                                type="button"
                                className="delete-button"
                                title="Xóa"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {activeMenu === "categories" && (
            <div className="content-card">
              {/* =========================
            HEADER
        ========================= */}

              <div className="table-header">
                <div>
                  <h2>Thể loại</h2>

                  <p>Quản lý danh sách thể loại</p>
                </div>

                <Link to="/admin/addCategory" className="add-button">
                  + Thêm thể loại
                </Link>
              </div>

              {/* =========================
            TABLE
        ========================= */}

              <div className="table-wrapper">
                <table className="category-table">
                  <thead>
                    <tr>
                      <th className="category-id-column">ID</th>

                      <th>Tên tiếng Việt</th>

                      <th>Tên tiếng Trung</th>

                      <th>Slug</th>

                      <th className="category-action-column">Thao tác</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loadingCategories ? (
                      <tr>
                        <td colSpan="5" className="category-message">
                          Đang tải danh sách thể loại...
                        </td>
                      </tr>
                    ) : errorCategories ? (
                      <tr>
                        <td colSpan="5" className="category-message error">
                          {errorCategories}
                        </td>
                      </tr>
                    ) : currentCategories.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="category-message">
                          Chưa có thể loại nào.
                        </td>
                      </tr>
                    ) : (
                      currentCategories.map((category) => (
                        <tr key={category.id}>
                          {/* ID */}

                          <td>
                            <span className="category-id">#{category.id}</span>
                          </td>

                          {/* TÊN VI */}

                          <td>
                            <strong className="category-name">
                              {category.nameVi}
                            </strong>
                          </td>

                          {/* TÊN ZH */}

                          <td>
                            <span className="category-name-zh">
                              {category.nameZh || "Chưa có"}
                            </span>
                          </td>

                          {/* SLUG */}

                          <td>
                            <span className="category-slug">
                              {category.slug}
                            </span>
                          </td>

                          {/* THAO TÁC */}

                          <td>
                            <div className="actions">
                              {/* XEM */}

                              {/* SỬA */}

                              <Link
                                to={`/admin/editCategory/${category.id}`}
                                className="edit-button"
                                title="Sửa"
                              >
                                ✏️
                              </Link>

                              {/* XÓA */}

                              <button
                                type="button"
                                className="delete-button"
                                title="Xóa"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* =========================
            PAGINATION
        ========================= */}

              <Pagination
                currentPage={categoryPage}
                totalPages={categoryTotalPages}
                onPageChange={setCategoryPage}
              />
            </div>
          )}
          {/* CONTACTS */}
          {/* CONTACTS */}
          {activeMenu === "contacts" && (
            <div className="content-card">
              {/* HEADER */}
              <div className="table-header">
                <div>
                  <h2>Thông tin liên hệ</h2>

                  <p>Danh sách liên hệ từ khách hàng</p>
                </div>
              </div>

              {/* LOADING */}
              {loadingContacts && (
                <div className="loading">Đang tải danh sách liên hệ...</div>
              )}

              {/* ERROR */}
              {errorContacts && (
                <div className="error-message">{errorContacts}</div>
              )}

              {/* TABLE */}
              {!loadingContacts && !errorContacts && (
                <>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Họ và tên</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Dịch vụ</th>
                          <th>Nội dung</th>
                          <th>Ngày gửi</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentContacts.length > 0 ? (
                          currentContacts.map((contact) => (
                            <tr key={contact.id}>
                              {/* ID */}
                              <td>#{contact.id}</td>

                              {/* HỌ TÊN */}
                              <td>
                                <strong>{contact.senderName || "—"}</strong>
                              </td>

                              {/* EMAIL */}
                              <td>{contact.senderEmail || "—"}</td>

                              {/* PHONE */}
                              <td>{contact.senderPhone || "—"}</td>

                              {/* SERVICE */}
                              <td>{contact.serviceInterested || "—"}</td>

                              {/* MESSAGE */}
                              <td className="message">
                                {contact.message || "—"}
                              </td>

                              {/* CREATED DATE */}
                              <td>
                                {contact.createdAt
                                  ? formatDate(contact.createdAt)
                                  : "—"}
                              </td>

                              {/* STATUS */}
                              <td>
                                <span
                                  className={
                                    contact.isRead
                                      ? "status-read"
                                      : "status-unread"
                                  }
                                >
                                  {contact.isRead ? "Đã đọc" : "Chưa đọc"}
                                </span>
                              </td>

                              {/* ACTION */}
                              <td>
                                <div className="actions">
                                  <button
                                    type="button"
                                    className="delete-button"
                                    title="Xóa"
                                    onClick={() =>
                                      handleDeleteContact(contact.id)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="9"
                              style={{
                                textAlign: "center",
                                padding: "30px",
                              }}
                            >
                              Chưa có thông tin liên hệ
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* PAGINATION */}
                  {contactTotalPages > 1 && (
                    <Pagination
                      currentPage={contactPage}
                      totalPages={contactTotalPages}
                      onPageChange={setContactPage}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
