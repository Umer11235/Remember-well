    import axios from 'axios';



    const createAxiosInstance = (BaseUrl:any, type?:string) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage
 
      return axios.create({
          baseURL: BaseUrl,
          headers: {
            'Content-Type': type || 'application/json',
            'Authorization': token ? `Bearer ${token}` : '' // Include the token if it exists

          },
         
        
        });
      };

    export default createAxiosInstance;


    