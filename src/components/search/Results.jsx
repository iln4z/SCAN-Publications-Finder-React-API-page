import React, { useEffect, useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import Loader from '../ui/Loader';
import DocumentCard from './DocumentCard';
import '../../styles/results.css';

const Results = () => {
  const { histograms, documentIds, documents, loading, loadDocuments } = useSearch();
  const [visibleDocs, setVisibleDocs] = useState(2);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [transformedHistograms, setTransformedHistograms] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (documentIds.length > 0 && documents.length < 2) {
      loadDocuments(documentIds.slice(0, 2));
    }
    setTotalDocuments(documentIds.length);
  }, [documentIds, documents.length, loadDocuments]);

  useEffect(() => {
    if (histograms.length > 0) {
      const totalData = histograms.find(h => h.histogramType === 'totalDocuments')?.data || [];
      const riskData = histograms.find(h => h.histogramType === 'riskFactors')?.data || [];

      const dates = [
        ...new Set([
          ...totalData.map(d => new Date(d.date).toLocaleDateString('ru-RU')),
          ...riskData.map(d => new Date(d.date).toLocaleDateString('ru-RU'))
        ])
      ].sort((a, b) => new Date(a) - new Date(b));

      const transformed = dates.map(date => {
        const totalItem = totalData.find(d =>
          new Date(d.date).toLocaleDateString('ru-RU') === date
        );
        const riskItem = riskData.find(d =>
          new Date(d.date).toLocaleDateString('ru-RU') === date
        );

        return {
          date,
          total: totalItem ? totalItem.value : 0,
          risks: riskItem ? riskItem.value : 0
        };
      });

      setTransformedHistograms(transformed);
    }
  }, [histograms]);

  const handleLoadMore = () => {
    const nextIndex = visibleDocs + 2;
    const nextDocs = documentIds.slice(visibleDocs, nextIndex);

    loadDocuments(nextDocs);
    setVisibleDocs(nextIndex);
  };

  const nextCarousel = () => {
    setCarouselIndex(prev => Math.min(prev + 10, transformedHistograms.length - 10));
  };

  const prevCarousel = () => {
    setCarouselIndex(prev => Math.max(prev - 10, 0));
  };

  const visibleHistograms = transformedHistograms.slice(carouselIndex, carouselIndex + 10);

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="header-text">
          <h1>Ищем. Скоро будут результаты</h1>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>

        <div className="header-image-container">
          <img
            src="/images/HomePage/result.png"
            alt="Фоновое изображение результатов"
            className="result-header-image"
          />
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>Общая сводка</h2>
          <div className="found-count">Найдено {totalDocuments} вариантов</div>
        </div>

        {loading.histograms ? (
          <Loader />
        ) : transformedHistograms.length > 0 ? (
          <div className="histogram-container">
            <div className="carousel-controls">
              <button
                className="carousel-arrow prev"
                onClick={prevCarousel}
                disabled={carouselIndex === 0}
              >
                &lt;
              </button>
              <div className="histogram-table-container">
                <table className="histogram-table">
                  <thead>
                    <tr>
                      <th>Период</th>
                      {visibleHistograms.map((histogram, index) => (
                        <th key={index}>{histogram.date}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Всего</td>
                      {visibleHistograms.map((histogram, index) => (
                        <td key={index}>{histogram.total}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Риски</td>
                      {visibleHistograms.map((histogram, index) => (
                        <td key={index}>{histogram.risks}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                className="carousel-arrow next"
                onClick={nextCarousel}
                disabled={carouselIndex >= transformedHistograms.length - 10}
              >
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>

      <div className="documents-section">
        <h2>Список документов</h2>
        {loading.documents ? (
          <Loader />
        ) : documents.length > 0 ? (
          <>
            <div className="documents-grid">
              {documents.map((doc, index) => (
                <DocumentCard key={index} document={doc} />
              ))}
            </div>

            {visibleDocs < documentIds.length && (
              <button
                onClick={handleLoadMore}
                className="load-more-btn"
              >
                Показать больше
              </button>
            )}
          </>
        ) : (
          <p>Документы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default Results;