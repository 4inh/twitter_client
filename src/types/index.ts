export interface FormDataResponse<DataType> {
    message: string;
    data: DataType | null;
    error: string | null;
}

export interface MediaFile {
    file: File;
    preview: string;
    type: string;
}
