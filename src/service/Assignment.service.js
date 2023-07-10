import Service from "./Service"

export default {
    ping: () => Service.instance.get("/ping"),
    create_assignment: (course_id) => Service.instance.post("/assignment", course_id),
    get_assignment: (course_id) => Service.instance.get(`/assignment?course=${course_id}`),
    update_assignment: (course_id, data) => Service.instance.put(`/assignment`, {course_id, data}),
}