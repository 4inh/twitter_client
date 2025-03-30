export interface FormDataResponse<DataType> {
    message: string;
    data: DataType | null;
    error: string | null;
}
