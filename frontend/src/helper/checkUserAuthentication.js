import axios from "axios"
import { url } from "../assets/assets"


const checkUserAuthentication = async () => {
    try {

        const response = await axios.get(url.protectedroute, { withCredentials: true })
        if (response.data.success) {
            return response.data
        }

    } catch (error) {
        return {
            success: false,
            message: "Failed to authenticate user"
        }
    }
}

export {
    checkUserAuthentication
}