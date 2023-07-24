import { atom } from "recoil";

export interface AdminState{
    isLoading: boolean;
    adminEmail: string|null;
}

export const adminState= atom<AdminState>({
    key: 'adminState',
    default: {
        isLoading: true,
        adminEmail: null
    },
});