import { selector } from "recoil";
import { adminState } from "../atoms/admins";

export const adminEmail= selector({
    key: 'adminEmail',
    get: ({get})=>{
        const state= get(adminState);
        return state.adminEmail;
    },
});