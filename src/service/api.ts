import axios from "axios";

const Api = axios.create()

const getImg = async () => {
    const _clientId = 'client_id=T9uwG_YUdi1Em5I9Uf3CvOaXEFjtx-wGWk8HZ4LMmkI'
    
    try {
        const urlImg = await Api.get(`https://api.unsplash.com/photos/random?orientation=landscape&${_clientId}`)
                       .then(res => res.data.urls.raw)
        return urlImg
    } catch (e) {
        console.log(e);
        
    }
}

export const apiService = {getImg}