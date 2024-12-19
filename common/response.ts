function response(statusCode: number, message: string, result: any[] = []) {
    return {
        statusCode: statusCode,
        message: message,
        result: result
    };
}

export default response;
