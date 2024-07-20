import { roles } from "../../middleware/auth.js";



export const endPoints={
    add:[roles.User,roles.Admin,roles.superAdmin],
    get:[roles.User,roles.Admin,roles.superAdmin],
   
}