import { roles } from "../../middleware/auth.js";



export const endPoints={
    getAll:[roles.superAdmin],
    update:[roles.superAdmin] 
}