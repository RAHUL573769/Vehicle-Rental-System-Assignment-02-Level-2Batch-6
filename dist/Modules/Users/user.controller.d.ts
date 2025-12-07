import { Request, Response } from "express";
export declare const UserController: {
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getUsers: (_req: Request, res: Response) => Promise<void>;
    getSpecificUsers: (req: Request, res: Response) => Promise<void>;
    updateUsers: (req: Request, res: Response) => Promise<void>;
    deleteVehicles: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map