import Service from "./Service"

export default {
    get_all_course: () => Service.instance.get(`/course`),
    get_own_course: () => Service.instance.get(`/course?own=true`),
    get_user_course: (user_id) => Service.instance.get(`/course?user=${user_id}`),
    get_course_info: (course_id) => Service.instance.get(`/course?id=${course_id}`),
    create_course: () => Service.instance.post(`/course/create-course`),
    update_course: (course_id, data) => Service.instance.put(`/course/update-course`, {course_id, data}),
    delete_course: (course_id) => Service.instance.delete(`/course/${course_id}`),
}