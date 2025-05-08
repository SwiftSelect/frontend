import axios, { AxiosError } from 'axios';
import { signOut, getSession } from 'next-auth/react';

const createAPI = (url: string) => {
	const api = axios.create({
		baseURL: url,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	api.interceptors.request.use(
		async (config) => {
			const session = await getSession();
			
			if (session?.user?.id) {
				config.headers.Authorization = `Bearer ${session.accessToken}`;
			}
			
			return config;
		},
		(error) => {
			console.error('Request error:', error);
			return Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error: AxiosError<{detail: string}>) => {
			if (error.response) {
			const status = error.response.status;
			
			switch (status) {
				case 401:
                    await signOut({ redirect: false });
                    window.location.href = '/';
				break;
				case 403:
				break;
				case 404:
				break;
				case 500:
				break;
				default:
				break;
			}
			}
			return Promise.reject(error);
		}
	);
	return api;  
}

export default createAPI;