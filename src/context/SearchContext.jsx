import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  searchHistograms as apiSearchHistograms,
  objectSearch as apiObjectSearch,
  searchDocuments as apiSearchDocuments
} from '../api/search';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [histograms, setHistograms] = useState([]);
  const [documentIds, setDocumentIds] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState({
    histograms: false,
    documents: false
  });
  const [error, setError] = useState(null);

  const search = useCallback(async (formData) => {
    setLoading({ histograms: true, documents: false });
    setError(null);

    try {
      const params = {
        issueDateInterval: {
          startDate: `${formData.startDate}T00:00:00+03:00`,
          endDate: `${formData.endDate}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{
              type: "company",
              inn: parseInt(formData.inn),
              maxFullness: formData.maxFullness,
              inBusinessNews: formData.inBusinessNews
            }],
            onlyMainRole: formData.onlyMainRole,
            tonality: formData.tonality,
            onlyWithRiskFactors: formData.onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: []
            },
            themes: {
              and: [],
              or: [],
              not: []
            }
          },
          themesFilter: {
            and: [],
            or: [],
            not: []
          }
        },
        attributeFilters: {
          excludeTechNews: !formData.includeTechNews,
          excludeAnnouncements: !formData.includeAnnouncements,
          excludeDigests: !formData.includeDigests
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: []
        },
        similarMode: "none",
        limit: parseInt(formData.limit),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"]
      };

      console.log("Search params:", params);

      const histogramsData = await apiSearchHistograms(params);
      console.log("Histograms response:", histogramsData);
      setHistograms(histogramsData.data || []);

      const searchResults = await apiObjectSearch(params);
      console.log("ObjectSearch response:", searchResults);
      setDocumentIds(searchResults.items.map(item => item.encodedId));

    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || err.message || 'Ошибка при выполнении поиска');
    } finally {
      setLoading({ histograms: false, documents: false });
    }
  }, []);

  const loadDocuments = useCallback(async (ids) => {
    setLoading({ histograms: false, documents: true });
    setError(null);

    try {
      const docs = await apiSearchDocuments(ids);
      console.log("Documents response:", docs);
      setDocuments(prev => [...prev, ...docs]);
    } catch (err) {
      console.error('Documents error:', err);
      setError(err.response?.data?.message || err.message || 'Ошибка при загрузке документов');
    } finally {
      setLoading({ histograms: false, documents: false });
    }
  }, []);

  const clearResults = useCallback(() => {
    setHistograms([]);
    setDocumentIds([]);
    setDocuments([]);
    setError(null);
  }, []);

  return (
    <SearchContext.Provider value={{
      histograms,
      documentIds,
      documents,
      loading,
      error,
      search,
      loadDocuments,
      clearResults
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);