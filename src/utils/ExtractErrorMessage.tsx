const extractErrorMessage = async (response: Response): Promise<string> => {
    try {
        const errorData = await response.json();

        if (errorData && typeof errorData.message === 'string') {
            return errorData.message;
        }

        return JSON.stringify(errorData);
    } catch {
        return 'Something went wrong';
    }
}

export default extractErrorMessage;