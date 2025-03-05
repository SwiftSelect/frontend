interface HTTPError {
    status: number;
    code: string;
    response: {
        data: {
            detail: string;
        };
    };
}

export default HTTPError;