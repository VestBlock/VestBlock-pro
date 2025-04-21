import { supabase } from './supabase';

export async function uploadPDF(file: File, userId: string): Promise<{ url: string }> {
  try {
    // Convert file to base64
    const base64File = await fileToBase64(file);
    
    // Call the Vercel Edge Function for PDF analysis
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        'X-PDF-API-Key': import.meta.env.VITE_PDFCO_KEY
      },
      body: JSON.stringify({ pdf: base64File, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze PDF');
    }

    const data = await response.json();
    
    // Store the PDF in Supabase storage
    const { data: uploadData, error } = await supabase
      .storage
      .from('pdfs')
      .upload(`${userId}/${file.name}`, file, {
        upsert: true,
      });
      
    if (error) throw error;
    
    return { url: uploadData.path };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
}

// Helper function to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]); // Remove the data:application/pdf;base64, part
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

// For demo purposes - simulates the response from the API
export function simulateAnalysisResponse(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: "Your credit report shows a score of 710, which is considered good. There are 2 potential negative items that could be disputed.",
        credit_score: 710,
        recommendations: [
          "Consider paying down your credit card balances to below 30% utilization",
          "Avoid opening new credit accounts in the next 6 months",
          "Dispute the collection account from 2019 as it may be past the statute of limitations"
        ],
        dispute_strategy: "We recommend sending a validation letter to the collection agency for the medical bill from 2019. Under the FCRA, they have 30 days to validate the debt or it must be removed.",
        side_hustles: [
          "With your current credit profile, you could qualify for credit card churning to maximize travel rewards",
          "Consider becoming an Airbnb host with your good credit score to secure property financing",
          "Your credit score allows you to qualify for delivery service gigs with lower insurance rates"
        ],
        credit_card_tips: [
          "You qualify for the Chase Sapphire Preferred with 60,000 bonus points",
          "Consider a balance transfer card with 0% APR to save on interest",
          "The Amex Blue Cash Preferred would give you 6% back on groceries and streaming"
        ]
      });
    }, 2000);
  });
}