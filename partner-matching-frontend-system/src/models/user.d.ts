/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    userProfile?: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tags: string[];
    createTime: Date;
};