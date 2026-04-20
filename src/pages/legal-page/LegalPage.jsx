import './LegalPage.css'

const LegalPage = ({ title, description, sections }) => (
  <div className="legal-page">
    <div className="container">
      <header className="legal-header">
        <h1>{title}</h1>
        <p className="subtitle">{description}</p>
      </header>

      <div className="legal-sections">
        {sections.map((section) => (
          <section key={section.heading} className="legal-card">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  </div>
)

export default LegalPage
