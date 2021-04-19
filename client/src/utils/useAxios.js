import axios from 'axios';

export const UseAxios = async(type,url,params,loader,data) => {
    
     if( type === "post" ){
         loader(true);
         try {
             const res = await axios.post(url+params,data);
             loader(false);
         } catch (error) {
             loader(false);
             return error
         }
     }
     if( type === "get"){
        loader(true);
        try {
            const res = await axios.get(url);
            loader(false);
            return res;
        } catch (error) {
            loader(false);
            return error;
        }
     }
}