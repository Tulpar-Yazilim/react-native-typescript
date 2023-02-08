import {LocalNotificationType} from './enums';

export type NavigationType = {
    navigate: (route: string, params?: object) => void;
};

export type ImageType = {
    width: number;
    height: number;
    path: string;
    type: string;
    filename: string;
};

export type ImageResizeResultType = {
    name: string;
    type: string;
    uri: string;
};
export type ImagePickerResultType = {
    image: ImageResizeResultType | null;
    status: boolean;
};

export type LocalNotificationParams = {
    id?: string;
    type?: LocalNotificationType;
    title: string;
    message: string;
    scheduleDate?: Date;
};

export type UseThemeType = {
    s?: string;
};
