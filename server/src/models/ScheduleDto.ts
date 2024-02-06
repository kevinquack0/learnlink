export interface ScheduleDto {
    id: number;
    userId: number; // The ID of the user to whom the schedule belongs
    dayOfWeek: string;
    startTime: Date;
    endTime: Date;
    // additional properties such as course information could be included here
}
