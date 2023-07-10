import axios from "axios"

const DEVELOPMENT = 'https://ra-core-2022v-production.up.railway.app'

let SERVER

SERVER = DEVELOPMENT

class Request {
    constructor(url) {
        this.url = url
    }

    async Get(path, headers) {
        return axios.get(this.url+path, { headers })
    }
    
    async Post(path, data, headers) {
        return axios.post(this.url+path, data, { headers })
    }

}

// options "*" is route which required authentication
export const SIGN_UP = "/auth/signup" // POST
export const SIGN_IN = "/auth/signin" // POST
export const GET_COURSE = "/course" // GET
export const GET_LATEST_COURSES = "/course/latest"
export const GET_POPULAR_COURSES = "/course/popular"
export const COURSE_INFO = "/course/info" // GET
export const CREATE_COURSE = "/course/create" // * POST
export const UPDATE_COURSE = "/course/create" // * POST
export const DELETE_COURSE = "/course/delete" // * POST
export const ADD_ASSIGNMENT = "/course/add-assignment" // * POST { courseId, content }
export const FIND_ASSIGNMENT = "/course/find-assignment" // * GET { courseId, content }
export const UPDATE_ASSIGNMENT = "/course/update-assignment"
export const UPDATE_DESCRIPTION = "/course/update-description" // * POST { courseId, title, content }
export const ENROLL_COURSE = "/course/enroll" // * POST { courseId }
export const SEARCH = "/search" // * POST { type, keyword }
export const UPLOAD = "/file/upload"
export { SERVER }
export default new Request(SERVER)
