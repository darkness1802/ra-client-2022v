import axios from "axios"

class RoyalAcademyService {

    constructor(baseUrl, withToken = true) {
      this.baseUrl = baseUrl;
      this.withToken = withToken;
  
      this.instance = axios.create({
        timeout: 30000,
        timeoutErrorMessage: "Request Timeout",
        baseURL: this.baseUrl,
      });
  
      const isProd = process.env.NODE_ENV !== "development";
  
      this.instance.interceptors.request.use(
        (config) => {
          let auth = JSON.parse(localStorage.getItem("auth"))
          if (auth && this.withToken) {
            console.log(auth)
            config.headers.common["Authorization"] = `${auth.access}`;
          }
          return config;
        },
        (error) => {
          if (!isProd) {
            console.log(error);
          }
          return Promise.reject(error);
        }
      );
  
      this.instance.interceptors.response.use(
        (response) => {
          if (!isProd) {
            console.log("SUC Resp: ", response.data);
          }
  
          return response;
        },
        (error) => {
          if (error.response) {
            if (error.response?.status === 401) {
              store.dispatch(logout());
            }
  
            if (!isProd) {
              console.log("ERR Resp: ", error.response);
            }
            return Promise.reject(error.response);
          }
  
          if (!isProd) {
            console.log("Err: ", error);
          }
  
          return Promise.reject(error);
        }
      );
    }
  }

const service = new RoyalAcademyService(`https://ra-core-2022v-production.up.railway.app`)

export default service