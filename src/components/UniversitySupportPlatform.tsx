// UniversitySupportPlatform.tsx
import { Link } from 'react-router-dom';
import './styles/main.css';
import bbbLogo from '../assets/bbb.svg';
import ll1Logo from '../assets/ll1.svg';
import solanaLogo from '../assets/solana-sol-logo.svg';

const UniversitySupportPlatform = () => {
  const services = [
    {
      title: "Academic Curriculum Development",
      description: "Modernize your programs with blockchain-integrated courses designed with Superteam experts",
      features: [
        "DeFi and blockchain course modules",
        "Lab integration kits for practical learning",
        "Faculty training programs",
        "Student certification system"
      ],
      cta: "Request Curriculum Package"
    },
    {
      title: "Research Projects Crowdfunding",
      description: "Tokenized funding platform for university research initiatives",
      features: [
        "Custom university DAO creation",
        "Alumni participation incentives",
        "Transparent funding allocation",
        "IP management solutions"
      ],
      cta: "Launch Research DAO"
    },
    {
      title: "Student Grants & Scholarships",
      description: "Decentralized funding mechanisms for student projects",
      features: [
        "Merit-based token rewards",
        "Community-voted funding",
        "Progress-based disbursement",
        "Industry matching funds"
      ],
      cta: "Explore Grant Options"
    },
    {
      title: "Academic Publishing Suite",
      description: "Blockchain-powered tools for paper management and monetization",
      features: [
        "NFT-based citation tracking",
        "Automated royalty distribution",
        "Peer review incentive system",
        "Journal integration pipelines"
      ],
      cta: "View Publishing Tools"
    }
  ];

  return (
    <div className="page-content">
      <section className="platform-header">
        <h1>Superteam Balkan's University Web3 Integration Platform</h1>
        <p className="subtitle">
          Solana blockchain solutions for academia, developed by Superteam Balkan in partnership with leading universities and domain experts
        </p>
            {/* University Partners Section */}
            <div className="logo-grid">
               <h3>Trusted by:</h3>
              <img src={bbbLogo} alt="Belgrade Blockchain Hub" width="80" height="40" />
              <img src={ll1Logo} alt="Ljubljana Lab" width="80" height="40" />
            </div>
              <div className="expert-endorsement">
              <div className="endorsement-quote">
                "This platform bridges the gap between cutting-edge blockchain technology 
                and academic institutional needs"
                <div className="expert-title">
                  — Prof. Ana Kovačević, Digital Innovation Lab
                </div>
              </div>
            </div>
                  {/* Solana Badge */}
            <div className="solana-badge">
              <span>Official Education Partner</span>
              <img src={solanaLogo} alt="Powered by Solana" width="36" height="12" />
            </div>
      </section>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card academic-card">
            <div className="card-header">
              <h2>{service.title}</h2>
              <div className="academic-badge">🎓</div>
            </div>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>
                  <span className="feature-icon">✓</span> {feature}
                </li>
              ))}
            </ul>
            <div className="revenue-model">
              <h4>Revenue Potential:</h4>
              <ul>
                {service.title === "Academic Publishing Suite" ? (
                  <>
                    <li>30-50% increased citation revenue</li>
                    <li>Automatic royalty splits</li>
                    <li>Secondary sales commissions</li>
                  </>
                ) : service.title === "Research Projects Crowdfunding" ? (
                  <>
                    <li>5-7% platform fees</li>
                    <li>IP licensing opportunities</li>
                    <li>Industry partnership bonuses</li>
                  </>
                ) : (
                  <li>Sustainable funding models</li>
                )}
              </ul>
            </div>
            <button className="service-cta academic-cta">
              {service.cta} →
            </button>
          </div>
        ))}
      </div>

      <section className="university-cta">
        <h2>Ready to Transform Your Institution?</h2>
        <div className="cta-grid">
          <div className="cta-card">
            <h3>For Faculty</h3>
            <p>Schedule a consultation with our academic integration team</p>
            <Link to="/faculty-contact" className="cta-button">
              Faculty Inquiry
            </Link>
          </div>
          <div className="cta-card">
            <h3>For Administrators</h3>
            <p>Request our institutional deployment package</p>
            <Link to="/admin-contact" className="cta-button">
              Administrative Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversitySupportPlatform;