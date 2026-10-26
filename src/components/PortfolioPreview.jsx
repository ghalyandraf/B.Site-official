
import { useState } from "react";
import { ExternalLink, Monitor, RefreshCw } from "lucide-react";

export default function PortfolioPreview({ project }) {
  const [reloadKey, setReloadKey] = useState(0);
  const [failed, setFailed] = useState(false);

  return (
    <article className="project-card">
      <div className="preview-toolbar">
        <div className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <span className="preview-address">{project.url}</span>

        <button
          type="button"
          className="icon-button"
          aria-label={`Muat ulang ${project.name}`}
          onClick={() => {
            setFailed(false);
            setReloadKey((key) => key + 1);
          }}
        >
          <RefreshCw size={15} />
        </button>
      </div>

      <div className="preview-frame">
        {!failed ? (
          <iframe
            key={reloadKey}
            src={project.url}
            title={`Preview ${project.name}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onError={() => setFailed(true)}
          />
        ) : null}

        <div className="preview-overlay">
          <div className="preview-overlay-content">
            <span className="preview-icon">
              <Monitor size={23} />
            </span>
            <p className="preview-overlay-title">{project.name}</p>
            <p className="muted-text">
              {failed
                ? "Preview tidak dapat dimuat."
                : "Jika website tidak muncul, buka versi aslinya."}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-small"
            >
              Buka Website <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="project-info">
        <div>
          <span className="eyebrow">{project.tag}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-open"
          aria-label={`Buka ${project.name}`}
        >
          <ExternalLink size={19} />
        </a>
      </div>
    </article>
  );
}
