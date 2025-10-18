import api from './config';

export const collectData = async () => {
  try {
    const response = await api.get('/collect');
    return response.data;
  } catch (error) {
    console.error('Error collecting data:', error);
    throw error;
  }
};

export const analyzeAsset = async (asset) => {
  try {
    const response = await api.post('/analyze', { asset });
    return response.data;
  } catch (error) {
    console.error('Error analyzing asset:', error);
    throw error;
  }
};

export const getStrategy = async () => {
  try {
    const response = await api.get('/strategy');
    return response.data;
  } catch (error) {
    console.error('Error fetching strategy:', error);
    throw error;
  }
};

export const getExplanation = async () => {
  try {
    const response = await api.get('/explain');
    return response.data;
  } catch (error) {
    console.error('Error fetching explanation:', error);
    throw error;
  }
};

export const getTokenomics = async () => {
  try {
    const response = await api.get('/tokenize');
    return response.data;
  } catch (error) {
    console.error('Error fetching tokenomics:', error);
    throw error;
  }
};
