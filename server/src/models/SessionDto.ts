export interface SessionDto {
    id: number;
    title: string;
    description?: string;
    location: string;
    startTime: Date;
    endTime: Date;
    type: string;
    ownerId: number;
}
