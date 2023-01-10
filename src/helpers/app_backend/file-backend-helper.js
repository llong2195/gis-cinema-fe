import { get, post, put, del,postWithFormData } from '../api_helper'

const BASE_API_URL = process.env.REACT_APP_FILE_ENDPOINT;
console.log(process.env)

const uploadLocal = data => {
    return postWithFormData(`${BASE_API_URL}/upload-local`,data)
}

const uploadCloud = data => {
    return postWithFormData(`${BASE_API_URL}/upload-cloud`,data)
}


export {
    uploadLocal,
    uploadCloud,

}