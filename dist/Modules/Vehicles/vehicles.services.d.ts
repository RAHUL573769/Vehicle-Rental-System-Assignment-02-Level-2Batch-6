export declare const VehicleServices: {
    createVehiclesIntoDb: (query: string, params: any[]) => Promise<import("pg").QueryResult<any>>;
    getSingleVehicleFromDb: (query: string, specificVehicleId: string) => Promise<import("pg").QueryResult<any>>;
    getVehiclesFromDb: (query: string) => Promise<import("pg").QueryResult<any>>;
    deleteVehiclesFromDb: (deleteQuery: string, id: string) => Promise<import("pg").QueryResult<any>>;
    updateVehiclesInDb: (query: string, params: any[]) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=vehicles.services.d.ts.map