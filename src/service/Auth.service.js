import Service from "./Service"

export default {
    sign_in: ({ username, password }) => Service.instance.post("/auth/sign_in", { username, password }),
    sign_up: ({ username, password, email }) => Service.instance.post("/auth/sign_up", { username, password, email })
}