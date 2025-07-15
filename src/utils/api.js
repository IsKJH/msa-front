const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const token = rememberMe 
    ? localStorage.getItem('authToken') 
    : sessionStorage.getItem('authToken');
  
  console.log('토큰 확인:', { rememberMe, token, hasToken: !!token });
  
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = {
  async get(endpoint) {
    const headers = getAuthHeaders();
    console.log('GET 요청 헤더:', headers);
    
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        ...headers,
      },
    });
    
    console.log('응답 상태:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 오류 응답:', errorText);
      throw new Error(`API 요청 실패: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },

  async put(endpoint, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },

  async delete(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  }
};

export default api;