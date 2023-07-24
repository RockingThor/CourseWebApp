import { atom } from "recoil";

export interface AdminState{
    isLoading: boolean;
    adminEmail: string|null;
}

export interface AdminId{
    adminEmail: string|null;
    adminId: string|null;
}

export const adminState= atom<AdminState>({
    key: 'adminState',
    default: {
        isLoading: true,
        adminEmail: null
    },
});

export const adminId= atom<AdminId>({
    key: 'adminId',
    default:{
        adminEmail: null,
        adminId: null
    }
})