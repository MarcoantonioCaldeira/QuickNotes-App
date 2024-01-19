import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

let token: null;

export const setToken = (newToken: any) => {

    token = newToken;
    
  }
  
  export const getToken = async () => {
  
    if (!token) {
  
      await refreshToken(); 
      
    }
    
    return token;
  
  };
  
  const refreshToken = async () => {
    try {
      const response = await api.get('/auth/token',{
        headers: {
            secretKey: '3G5T8W7Y1K',
        }
      });
  
      const newToken = response.data.token;
      setToken(newToken);
  
    } catch (error) {
  
      console.error('Erro ao obter novo token', error);
    }
  };
  
  
  export default api;
