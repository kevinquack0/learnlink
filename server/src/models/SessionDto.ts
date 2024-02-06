export interface SessionDto {
    id: number;
    title: string;
    description?: string;
    location: string;
    duration: number;
    startTime: Date;
    endTime: Date;
    ownerId: number; // User ID of the session creator
    // additional session properties...
}
