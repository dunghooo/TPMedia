import "./contactUs.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createContact } from "../api/contactApi";

function ContactUs() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    serviceInterested: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createContact(formData);

      alert("Gửi liên hệ thành công!");

      // Reset form
      setFormData({
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        serviceInterested: "",
        message: "",
      });
    } catch (error) {
      console.error("Create contact error:", error);

      alert(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-us-section">
      <div className="contact-us-header">
        <span className="contact-us-label">{t("contact.label")}</span>

        <h2 className="contact-us-heading">{t("contact.heading")}</h2>
      </div>

      <div className="contact-us-grid">
        <div className="contact-us-info">
          <div className="contact-us-office">
            <h4>{t("contact.officeOnline")}</h4>

            <p className="office-location">TAIPEI - TAIWAN</p>

            <p className="office-address">
              750 Sing Sing Rd, Horseheads, NY, 14845
            </p>
          </div>

          <div className="contact-us-office">
            <h4>TOKYO, JAPAN</h4>

            <p className="office-address">
              Tokyo, Japan2002 Horton Ford Road, Eidson, TN, 37731
            </p>
          </div>

          <div className="contact-us-socials">
            <button type="button" aria-label="Facebook">
              f
            </button>

            <button type="button" aria-label="Dribbble">
              d
            </button>

            <button type="button" aria-label="LinkedIn">
              in
            </button>

            <button type="button" aria-label="Twitter">
              t
            </button>
          </div>
        </div>

        <form className="contact-us-form" onSubmit={handleSubmit}>
          {/* Name */}
          <label>
            <span>{t("contact.formName", "Name")}</span>

            <input
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder={t("contact.formName", "Name")}
              required
            />
          </label>

          {/* Email */}
          <label>
            <span>{t("contact.formEmail", "Email Address")}</span>

            <input
              type="email"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              placeholder={t("contact.formEmail", "Email Address")}
              required
            />
          </label>

          {/* Phone */}
          <label>
            <span>{t("contact.formPhone", "Phone Number")}</span>

            <input
              type="tel"
              name="senderPhone"
              value={formData.senderPhone}
              onChange={handleChange}
              placeholder={t("contact.formPhone", "Phone Number")}
            />
          </label>

          {/* Service */}
          <label>
            <span>{t("contact.formService", "Service Interested")}</span>

            <input
              type="text"
              name="serviceInterested"
              value={formData.serviceInterested}
              onChange={handleChange}
              placeholder={t(
                "contact.formService",
                "What service are you interested in?",
              )}
            />
          </label>

          {/* Message */}
          <label>
            <span>{t("contact.formMessage", "Message")}</span>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact.formMessage", "Message")}
              rows="6"
              required
            />
          </label>

          <button
            type="submit"
            className="contact-us-submit"
            disabled={loading}
          >
            {loading ? "Sending..." : t("contact.submit")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
