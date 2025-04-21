import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, AlertCircle } from 'lucide-react';
import { uploadPDF } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface PDFUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: Error) => void;
}

export function PDFUploader({ onUploadSuccess, onUploadError }: PDFUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdf = acceptedFiles[0];
    if (pdf && pdf.type === 'application/pdf') {
      setFile(pdf);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  });

  const handleUpload = async () => {
    if (!file || !user) return;
    
    setUploading(true);
    try {
      const { url } = await uploadPDF(file, user.id);
      onUploadSuccess(url);
    } catch (error) {
      console.error('Error uploading file:', error);
      onUploadError(error as Error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-primary-500 bg-primary-900/10' : 'border-gray-700 hover:border-primary-500'} 
          ${isDragReject ? 'border-error-500 bg-error-900/10' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          {!file ? (
            <>
              <Upload className="h-12 w-12 text-gray-400" />
              <p className="text-lg text-gray-300">
                {isDragActive
                  ? "Drop your credit report PDF here..."
                  : "Drag & drop your credit report PDF here, or click to select"}
              </p>
              <p className="text-sm text-gray-500">PDF files only (max 10MB)</p>
            </>
          ) : (
            <>
              <FileText className="h-12 w-12 text-primary-500" />
              <p className="text-lg text-gray-300">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}
        </div>
      </div>

      {isDragReject && (
        <div className="mt-2 flex items-center text-error-500">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span className="text-sm">Only PDF files are accepted</span>
        </div>
      )}

      {file && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setFile(null)}
            className="btn btn-ghost mr-2"
            disabled={uploading}
          >
            Remove
          </button>
          <button
            onClick={handleUpload}
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></div>
                Uploading...
              </>
            ) : (
              "Upload PDF"
            )}
          </button>
        </div>
      )}
    </div>
  );
}