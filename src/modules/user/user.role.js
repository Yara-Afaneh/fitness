import { roles } from "../../middleware/auth.js";



export const endPoints={
    getdata:[roles.User],
    update:[roles.User] 
}