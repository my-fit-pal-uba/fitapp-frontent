

export interface Notification  {
    id: number;
    description: string;
    date: Date;
    user_id?: number;
    active?: boolean;
};