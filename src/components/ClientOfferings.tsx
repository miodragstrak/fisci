// ClientOfferings.tsx
import { Link } from 'react-router-dom';
import './styles/main.css'; // Reuse your existing styles

const ClientOfferings = () => {
  const services = [
    {
      title: "DeSci Consulting",
      description: "Expert guidance on implementing decentralized finance solutions in scientific research",
      features: [
        "Protocol design for research funding",
        "Tokenomics for scientific projects",
        "DAO governance structures"
      ],
      cta: "Book Consultation"
    },
    {
      title: "Academic Curriculum Development",
      description: "Modernizing university programs with DeSci principles",
      features: [
        "Course material preparation",
        "Lab integration strategies",
        "Student certification programs"
      ],
      cta: "Request Curriculum Kit"
    },
    {
      title: "Research Crowdfunding",
      description: "Blockchain-powered funding solutions for scientific projects",
      features: [
        "Tokenized research grants",
        "Community voting mechanisms",
        "Transparent fund allocation"
      ],
      cta: "Launch Your Campaign"
    },
    {
      title: "Scientific Paper Support",
      description: "Financial and technical assistance for academic publishing",
      features: [
        "NFT-based paper certification",
        "Peer review incentives",
        "Royalty distribution systems"
      ],
      cta: "Get Publishing Support"
    }
  ];

  return (
    <div className="page-content">
      <section className="offerings-header">
        <h1>Fi-Sci-Foo Professional Services</h1>
        <p className="subtitle">
          Bridging decentralized finance and scientific innovation through our specialized offerings
        </p>
      </section>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="card-header">
              <h2>{service.title}</h2>
              <div className="lemur-badge">🦊</div> {/* Replace with lemur SVG */}
            </div>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="service-cta">
              {service.cta} →
            </button>
          </div>
        ))}
      </div>

      <section className="enterprise-contact">
        <h2>Enterprise Solutions</h2>
        <p>
          Need customized DeSci solutions for your institution? Our team specializes in:
        </p>
        <ul>
          <a>University-wide DeFi integration</a>
          <a>Corporate research partnerships</a>
          <a>Government grant modernization</a>
        </ul>
        <Link to="/contact" className="enterprise-button">
          Contact Our Team
        </Link>
      </section>
    </div>
  );
};

export default ClientOfferings;