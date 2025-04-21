import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Loader2, FileText, AlertTriangle } from 'lucide-react';
import { analyzePDF } from '../lib/api/chat';
import { uploadAndExtractText } from '../lib/api/pdfco';
import toast from 'react-hot-toast';

export function DirectAnalysis() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB');
      return;
    }

    setLoading(true);
    setText('');
    setAnalysis('');

    const extractionToast = toast.loading('Extracting text from PDF...');
    
    try {
      const extracted = await uploadAndExtractText(file);
      setText(extracted);
      toast.success('Text extracted successfully', { id: extractionToast });

      const analysisToast = toast.loading('Analyzing credit report...');
      const ai = await analyzePDF(extracted);
      setAnalysis(ai);
      toast.success('Analysis complete!', { id: analysisToast });
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error(err.message || 'Failed to process PDF', { id: extractionToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Direct Credit Analysis</h1>
            <p className="text-gray-400">Upload your credit report for instant AI analysis</p>
          </div>

          <div className="card max-w-3xl mx-auto">
            <div className="mb-6">
              <label className="form-label">Upload Credit Report (PDF)</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700 px-6 py-10">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-400"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        disabled={loading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PDF up to 10MB</p>
                </div>
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                <span className="ml-3 text-gray-400">Processing your credit report...</span>
              </div>
            )}

            {text && !loading && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-2">Extracted Text</h2>
                <div className="bg-gray-900 rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{text}</pre>
                </div>
              </div>
            )}

            {analysis && !loading && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">AI Analysis</h2>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="prose prose-invert max-w-none">
                    {analysis.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}