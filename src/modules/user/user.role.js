import { roles } from "../../middleware/auth.js";



export const endPoints={
    getdata:[roles.User,roles.Admin,roles.superAdmin],
    update:[roles.User,roles.Admin,roles.superAdmin] 
}