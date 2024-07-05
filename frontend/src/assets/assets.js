

const backendUrl = "http://localhost:8080"
export const url = {
    register: `${backendUrl}/api/user/register`,
    login: `${backendUrl}/api/user/login`,
    favourite: `${backendUrl}/api/user/favourite`,
    protectedroute: `${backendUrl}/api/user/check-login`,
    logout: `${backendUrl}/api/user/logout`
}