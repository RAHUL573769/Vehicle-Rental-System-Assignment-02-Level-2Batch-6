export declare const UserServices: {
    AdminorOwnProfile: (customerInfo: any, userId: any, data: any) => Promise<any>;
    createUserIntoDb: (payload: any) => Promise<import("pg").QueryResult<any>>;
    getSingleUserFromDb: (query: string, specificVehicleId: string) => Promise<import("pg").QueryResult<any>>;
    getUsersFromDb: (query: string) => Promise<import("pg").QueryResult<any>>;
    updateUsersFromDb: (query: string, params: any[]) => Promise<import("pg").QueryResult<any>>;
    deleteUsersFromDb: (deleteQuery: string, id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.services.d.ts.map