import { useEffect, useState } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import { getAllProjects } from "../api/projectApi";
import { deleteProject } from "../api/projectApi";

function Admin() {
  const [activeMenu, setActiveMenu] = useState("employees");
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [errorProjects, setErrorProjects] = useState("");

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

      // Xóa khỏi danh sách hiện tại
      setProjects((prev) => prev.filter((project) => project.id !== id));

      alert("Xóa dự án thành công.");
    } catch (error) {
      console.error("Lỗi xóa project:", error);

      alert(error.response?.data?.message || "Không thể xóa dự án.");
    }
  };

  // Dữ liệu mẫu
  const employees = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      email: "nguyenvanan@gmail.com",
      position: "Frontend Developer",
      phone: "0901234567",
    },
    {
      id: 2,
      name: "Trần Thị Lan",
      email: "tranthilan@gmail.com",
      position: "Backend Developer",
      phone: "0912345678",
    },
    {
      id: 3,
      name: "Lê Minh Đức",
      email: "leminhduc@gmail.com",
      position: "UI/UX Designer",
      phone: "0923456789",
    },
  ];

  const contacts = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0901234567",
      message: "Tôi muốn tìm hiểu thêm về dự án.",
    },
    {
      id: 2,
      name: "Trần Văn B",
      email: "tranvanb@gmail.com",
      phone: "0912345678",
      message: "Xin tư vấn về dịch vụ.",
    },
    {
      id: 3,
      name: "Lê Thị C",
      email: "lethic@gmail.com",
      phone: "0923456789",
      message: "Tôi muốn hợp tác với công ty.",
    },
  ];

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

                <button className="add-button">+ Thêm nhân viên</button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Họ và tên</th>
                      <th>Email</th>
                      <th>Chức vụ</th>
                      <th>Số điện thoại</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>#{employee.id}</td>

                        <td>
                          <div className="user-info">
                            <div className="table-avatar">
                              {employee.name.charAt(0)}
                            </div>

                            <strong>{employee.name}</strong>
                          </div>
                        </td>

                        <td>{employee.email}</td>

                        <td>
                          <span className="position">{employee.position}</span>
                        </td>

                        <td>{employee.phone}</td>

                        <td>
                          <div className="actions">
                            <button className="edit-button">Sửa</button>

                            <button className="delete-button">Xóa</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          Đang tải dữ liệu...
                        </td>
                      </tr>
                    ) : errorProjects ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{ textAlign: "center", color: "red" }}
                        >
                          {errorProjects}
                        </td>
                      </tr>
                    ) : projects.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          Chưa có dự án nào.
                        </td>
                      </tr>
                    ) : (
                      projects.map((project) => (
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

                          {/* NGÀY */}
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
            </div>
          )}

          {/* CONTACTS */}
          {activeMenu === "contacts" && (
            <div className="content-card">
              <div className="table-header">
                <div>
                  <h2>Thông tin liên hệ</h2>

                  <p>Danh sách liên hệ từ khách hàng</p>
                </div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Họ và tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Nội dung</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>#{contact.id}</td>

                        <td>
                          <strong>{contact.name}</strong>
                        </td>

                        <td>{contact.email}</td>

                        <td>{contact.phone}</td>

                        <td className="message">{contact.message}</td>

                        <td>
                          <button className="delete-button">Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
