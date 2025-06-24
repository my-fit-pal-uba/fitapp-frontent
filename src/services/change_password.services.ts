import { DevUrl } from "../env/dev.url.model";

export async function ChangePasswordMail(email: string) {

    try {
        const response = await fetch(`${DevUrl.baseUrl}/access/restore_password?email=${email}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to change password');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}


export async function ChangePassword(email: string, hashedPassword: string) {
    try {
        const response = await fetch(`${DevUrl.baseUrl}/access/change_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: hashedPassword,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to change password');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
}