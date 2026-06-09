import "./membercard.css";
import { useTranslation } from 'react-i18next';
import image2 from "../../assets/p12.jpg";
import acc1 from "../../assets/ac1 (1).jpg";
import acc2 from "../../assets/ac1 (2).jpg";
import acc3 from "../../assets/ac1 (3).jpg";

const member = [
  {
    image: acc1,
    description: "VietNam Airlines Spring Gala Dinner 2024",
  },
  {
    image: acc2,
    description: "VIETNAMESE CULTURAL FESTIVAL 2026 - VCF NTHU: TÂM",
  },
  {
    image: acc3,
    description: "中華奧林匹克盃 2025 美業交流競技暨美饌藝術美學",
  },
];

function MemberCard() {
  const { t } = useTranslation();
  return (
    <div className="member-card">
      <div className="member-card-header">
        <p className="member-intro">{t('member.intro')}</p>
        <h1 className="member-name">{t('member.name')}</h1>
        <h1 className="member-title">{t('member.title')}</h1>
        <h2 className="member-company">{t('member.company')}</h2>
      </div>
      <div className="member-card-body">
        {/* Add member details here */}
        <div className="Member-image">
          <img
            src={image2}
            alt="Member"
          />
        </div>
        <div className="Member-bio">
          <p>{t('member.greeting')}</p>
          <p>điều gì để thành lập nên TP Media và các mong muốn</p>
          <div className="Member-Contract">
            <p>{t('member.letsTalk')} ♥</p>
          </div>
        </div>
      </div>

      <div className="Member-achievements-grid">
        {member.map((member, index) => (
          <div
            className="Member-achievement-item"
            key={`${member.description} - ${index}`}
          >
            <img src={member.image} alt={member.description} />
            <p>{member.description}</p>
          </div>
        ))}
      </div>
      <div className="membercard-footer">
        <h5>Discover Exciting Career </h5>
        <h5>Opportunities</h5>
        <p>At Minagency, we're looking for talented individuals to join our team and help us achieve our mission.</p>
        <div className="membercard-footer-button">
          <p>· Explore Roles</p>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
