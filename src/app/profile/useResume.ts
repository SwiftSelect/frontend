import { useState } from 'react';
import axios from 'axios';
import profileService from '@/app/api/profile/profile';

interface UseResumeProps {
	onUploadComplete?: (filePath: string) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	currentFile?: string;
}

export const useResume = ({ onUploadComplete, fileInputRef, currentFile }: UseResumeProps) => {
	const [filePath, setFilePath] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const uploadResume = async (file: File) => {
		try {
			const response = await profileService.getSignedUploadUrl(file?.name);

			setIsUploading(true);
			setError(null);

			const fullPath = `${response.file_path}`;

			await axios.put(response.signed_url, file, {
				headers: {
					'Content-Type': file.type
				}
			});

			if (onUploadComplete) {
				setFilePath(fullPath);
				onUploadComplete(fullPath);
			}
		} catch (err) {
			setError('Failed to upload resume');
			console.error('Error uploading resume:', err);
		} finally {
			setIsUploading(false);
		}
	};

	const handleDownloadClick = async () => { 
		try{
			const response = await profileService.getSignedViewUrl(currentFile ?? '');
			window.open(response.signed_url);
		} catch(err){
			setError('Failed to get resume');
			console.error('Error getting resume:', err);
			throw err;
		}
	}

	const handleUploadClick = () => {
		fileInputRef?.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			await uploadResume(file);
		}
	};

	return {
		uploadResume,
		isUploading,
		error,
		filePath,
		handleUploadClick,
		handleFileChange,
		handleDownloadClick
	};
};

export default useResume; 