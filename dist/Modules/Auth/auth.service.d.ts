export declare const AuthServices: {
    loginIntoDb: (email: string, password: string) => Promise<{
        token: string;
        user: import("pg").QueryResult<any>;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map