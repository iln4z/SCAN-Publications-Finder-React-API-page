import React from 'react';
import { formatDate } from '../../utils/date';
import '../../styles/document-card.css';

const DocumentCard = ({ document }) => {
  const {
    ok: {
      issueDate,
      source,
      title,
      attributes,
      url,
      content
    }
  } = document;

  const formattedDate = formatDate(issueDate);
  const tags = [];

  if (attributes.isTechNews) tags.push('Технические новости');
  if (attributes.isAnnouncement) tags.push('Анонсы и события');
  if (attributes.isDigest) tags.push('Сводки новостей');

  const extractImages = (markup) => {
    if (!markup) return [];

    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const images = [];
    let match;

    while ((match = imgRegex.exec(markup)) !== null) {
      images.push(match[1]);
    }

    return images;
  };

  const images = extractImages(content?.markup);
  const mainImage = images.length > 0 ? images[0] : null;

  const extractTextContent = (markup) => {
    if (!markup) return '';

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(markup, 'text/html');

      doc.querySelectorAll('img').forEach(img => img.remove());

      let text = doc.body.textContent || '';
      text = text.replace(/\s+/g, ' ').trim();

      return text.length > 200 ? text.substring(0, 200) + '...' : text;
    } catch (e) {
      console.error('Error parsing markup:', e);
      return '';
    }
  };

  const textContent = extractTextContent(content?.markup);

  return (
    <div className="document-card">
      <div className="document-header">
        <span className="document-date">{formattedDate}</span>
        <span className="document-source">{source.name}</span>
      </div>

      <h3 className="document-title">{title.text}</h3>

      {tags.length > 0 && (
        <div className="document-tags">
          {tags.map((tag, index) => (
            <span key={index} className="document-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="document-content">
        {mainImage && (
          <img
            src={mainImage}
            alt="Иллюстрация к публикации"
            className="document-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        <p>{textContent || "Текст публикации будет здесь..."}</p>
      </div>

      <div className="document-footer">
        <div className="read-source-container">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-source"
          >
            Читать в источнике
          </a>
          <span className="word-count">{attributes.wordCount} слов</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;