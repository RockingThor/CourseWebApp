import { selector } from "recoil";
import { adminState } from "../atoms/admins";

export const isAdminLoading= selector({
    key: 'adminLoadingState',
    get: ({get})=>{
        const state= get(adminState);
        return state.isLoading;
    },
});