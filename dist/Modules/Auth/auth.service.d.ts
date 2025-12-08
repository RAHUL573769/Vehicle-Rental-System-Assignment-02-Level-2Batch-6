export declare const AuthServices: {
    loginIntoDb: (email: string, password: string) => Promise<{
        success: boolean;
        message: string;
        data: {
            token: string;
            user: any;
        };
    }>;
    signUpIntoDb: (payload: any) => Promise<any>;
};
//# sourceMappingURL=auth.service.d.ts.map