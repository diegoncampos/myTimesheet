export interface Task {
    name: string;
    hourlyRate: number;
    weekStartDay: number;
    taxPercentage?: number;
    specialDay?: boolean;
    specialDayPercentage?: number;
  }