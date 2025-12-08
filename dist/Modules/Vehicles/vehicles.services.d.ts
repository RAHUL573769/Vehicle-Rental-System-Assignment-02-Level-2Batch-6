export declare const VehicleServices: {
    createVehiclesIntoDb: (query: string, params: any[]) => Promise<import("pg").QueryResult<any>>;
    getSingleVehicleFromDb: (query: string, specificVehicleId: string) => Promise<import("pg").QueryResult<any>>;
    getVehiclesFromDb: (query: string) => Promise<import("pg").QueryResult<any>>;
    deleteVehiclesFromDb: (deleteQuery: string, id: string) => Promise<any>;
    updateVehiclesInDb: (vehicleId?: number | string, vehicle_name?: string, type?: string, registration_number?: string, daily_rent_price?: number, availability_status?: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=vehicles.services.d.ts.map