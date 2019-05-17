export interface Task {
    name: string;
    id: string;
    hourlyRate: number;
    weekStartDay: number;
    taxPercentage?: number;
    specialDay?: boolean;
    specialDayPercentage?: number;
  }