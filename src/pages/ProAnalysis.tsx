import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { PDFUploader } from '../components/PDFUploader';
import { AnalysisDisplay } from '../components/AnalysisDisplay';
import { LockKeyhole, CreditCard, CheckCircle, FileText } from 'lucide-react';
import { simulateAnalysisResponse } from '../lib/api';
import toast from 'react-hot-toast';

export function ProAnalysis() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  
  const handlePurchase = () => {
    setIsPurchased(true);
    toast.success('Pro Analysis purchased successfully!');
  };
  
  const handleUploadSuccess = async (url: string) => {
    setPdfUploaded(true);
    toast.success('PDF uploaded successfully!');
    
    // Simulate API call to analyze PDF
    setIsAnalyzing(true);
    try {
      const result = await simulateAnalysisResponse();
      setAnalysis(result);
    } catch (error) {
      toast.error('Error analyzing PDF. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleUploadError = (error: Error) => {
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-950 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 border-b border-gray-800 pb-6">
            <h1 className="text-2xl font-bold text-white">Pro Credit Analysis</h1>
            <p className="text-gray-400">
              Upload your credit report for detailed AI-powered analysis
            </p>
          </div>
          
          {!isPurchased ? (
            <div className="mx-auto max-w-3xl">
              <div className="card neon-border">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-900/50">
                    <LockKeyhole className="h-8 w-8 text-primary-500" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-white">Unlock Pro Analysis</h2>
                  <p className="text-gray-400">
                    Get a comprehensive AI-powered analysis of your credit report, including dispute strategies,
                    side hustle recommendations, and credit card tips tailored to your profile.
                  </p>
                </div>
                
                <div className="mb-8 space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary-500" />
                    <div>
                      <h3 className="font-medium text-white">Advanced Credit Analysis</h3>
                      <p className="text-sm text-gray-400">
                        AI-powered insights into your credit report with concrete improvement recommendations
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary-500" />
                    <div>
                      <h3 className="font-medium text-white">Custom Dispute Strategy</h3>
                      <p className="text-sm text-gray-400">
                        Step-by-step guidance to dispute negative items and improve your credit score
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 text-primary-500" />
                    <div>
                      <h3 className="font-medium text-white">Financial Opportunity Finder</h3>
                      <p className="text-sm text-gray-400">
                        Personalized side hustle recommendations and credit card strategies for your profile
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex items-center">
                    <span className="text-3xl font-bold text-white">$75</span>
                    <span className="ml-2 text-gray-400">one-time payment</span>
                  </div>
                  
                  <button 
                    onClick={handlePurchase} 
                    className="btn btn-primary flex items-center px-8 py-3"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Purchase Pro Analysis
                  </button>
                  
                  <p className="mt-4 text-xs text-gray-500">
                    Secure payment processing. Money-back guarantee if not satisfied.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              {!pdfUploaded ? (
                <div className="card">
                  <div className="mb-6 text-center">
                    <FileText className="mx-auto mb-4 h-12 w-12 text-primary-500" />
                    <h2 className="mb-2 text-xl font-bold text-white">Upload Your Credit Report</h2>
                    <p className="text-gray-400">
                      Upload your credit report PDF to get started with your analysis
                    </p>
                  </div>
                  
                  <PDFUploader 
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
              ) : isAnalyzing ? (
                <div className="card text-center">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                    <h2 className="text-xl font-bold text-white">Analyzing Your Credit Report</h2>
                    <p className="mt-2 text-gray-400">
                      Our AI is processing your report. This may take a minute...
                    </p>
                  </div>
                </div>
              ) : analysis ? (
                <AnalysisDisplay analysis={analysis} />
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}