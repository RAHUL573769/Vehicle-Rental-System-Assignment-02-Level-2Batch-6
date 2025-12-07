import { NextFunction, Response, Request } from "express";
export declare const VehicleController: {
    createVehicles: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
    getSingleVehicles: (req: Request, res: Response) => Promise<void>;
    getVehicles: (_req: Request, res: Response) => Promise<void>;
    updateVehicles: (req: Request, res: Response) => Promise<void>;
    deleteVehicles: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=vehicles.controllers.d.ts.map