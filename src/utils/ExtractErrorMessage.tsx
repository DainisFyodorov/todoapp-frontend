const extractErrorMessage = async (response: Response): Promise<string> => {
    try {
        const errorData = await response.json();

        if (typeof errorData === 'object' && errorData !== null) {
            let errorMessage = '';
            
            Object.entries(errorData).forEach(([field, message]) => {
                errorMessage += `Field ${field}: ${message}\n`;
            });

            return errorMessage;
        }

        return String(errorData);
    } catch {
        return 'Something went wrong';
    }
}

export default extractErrorMessage