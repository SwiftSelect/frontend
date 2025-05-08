import { useResume } from './useResume';
import { useRef } from 'react';
import { ProfileFormErrors } from './useProfile';

interface ResumeComponentProps {
  onUploadComplete?: (filePath: string) => void;
  currentFile?: string;
  profileFormikErrors: ProfileFormErrors;
}

const ResumeComponent = ({ onUploadComplete, currentFile, profileFormikErrors }: ResumeComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, error, handleUploadClick, handleFileChange, handleDownloadClick } = useResume({
    onUploadComplete, 
    fileInputRef,
    currentFile,
  });


  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-6">Resume</h3>
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fa-solid fa-file-pdf text-2xl text-purple-500 mr-3"></i>
            <span>{currentFile?.split("/").at(-1) || 'No resume uploaded'}</span>
          </div>
          {currentFile && (
            <button className="text-gray-400 hover:text-purple-500">
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <button 
            type="button"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center disabled:opacity-50"
          >
            <i className="fa-solid fa-upload mr-2"></i>
            {isUploading ? 'Uploading...' : 'Upload New'}
          </button>
          {currentFile && (
            <button 
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center"
            onClick={handleDownloadClick}
            >
              <i className="fa-solid fa-download mr-2"></i>
              Download
            </button>
          )}
        </div>
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}
        {profileFormikErrors.resume && (
          <div className="mt-2 text-red-500 text-sm">
            {profileFormikErrors.resume}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeComponent;