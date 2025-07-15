import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      let savedToken, savedUser;
      
      if (rememberMe) {
        // 로그인 상태 유지가 체크된 경우 localStorage에서 가져오기
        savedToken = localStorage.getItem('authToken');
        savedUser = localStorage.getItem('user');
      } else {
        // 로그인 상태 유지가 체크되지 않은 경우 sessionStorage에서 가져오기
        savedToken = sessionStorage.getItem('authToken');
        savedUser = sessionStorage.getItem('user');
      }
      
      if (savedToken) {
        setToken(savedToken);
        setIsAuthenticated(true);
        
        // 저장된 사용자 정보가 있는지 확인
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // 사용자 정보가 없으면 API로 가져오기
          try {
            const response = await fetch('http://localhost:8080/api/account/me', {
              headers: {
                'Authorization': `Bearer ${savedToken}`
              }
            });
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
              if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(userData));
              } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
              }
            } else {
              // 토큰이 유효하지 않으면 로그아웃
              logout();
            }
          } catch (error) {
            console.error('사용자 정보 가져오기 실패:', error);
            logout();
          }
        }
      }
    };
    
    initializeAuth();
  }, []);

  const login = (tokenData, userData, rememberMe = false) => {
    setToken(tokenData);
    setUser(userData);
    setIsAuthenticated(true);
    
    if (rememberMe) {
      // 로그인 상태 유지 시 localStorage에 저장
      localStorage.setItem('authToken', tokenData);
      localStorage.setItem('rememberMe', 'true');
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } else {
      // 로그인 상태 유지 안 함 시 sessionStorage에 저장
      sessionStorage.setItem('authToken', tokenData);
      localStorage.setItem('rememberMe', 'false');
      if (userData) {
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // 모든 저장소에서 제거
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  };

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};