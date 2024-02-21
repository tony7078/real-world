import { AxiosError } from "axios";

const Error = (err: unknown) => {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
        alert("Unauthorized");
    } else if (error.response?.status === 422) {
        alert("Unexpected error");
    }
};

export default Error;