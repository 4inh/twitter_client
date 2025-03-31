export interface INotification {
    _id: string;
    userId: string;
    senderId: INotificationSenderId;
    type: string;
    message: string;
    read: boolean;
    __v: number;
    createdAt: string;
    updatedAt: string;
}

export interface INotificationSenderId {
    _id: string;
    username: string;
}
