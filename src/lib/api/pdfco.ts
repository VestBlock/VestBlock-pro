import axios from 'axios';
import FormData from 'form-data';

export async function uploadAndExtractText(file: File): Promise<string> {
  try {
    // Create form data for direct upload
    const formData = new FormData();
    formData.append('file', file);

    // Direct upload to PDF.co
    const uploadResponse = await axios.post('https://api.pdf.co/v1/pdf/makesearchable', formData, {
      headers: {
        'x-api-key': import.meta.env.VITE_PDFCO_KEY,
        'Content-Type': 'multipart/form-data',
      },
      params: {
        async: false,
        inline: true,
      },
    });

    if (!uploadResponse.data?.body?.text) {
      throw new Error('No text extracted from PDF');
    }

    return uploadResponse.data.body.text;
  } catch (error: any) {
    console.error('Error in uploadAndExtractText:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error('Invalid PDF.co API key');
    } else if (error.response?.status === 413) {
      throw new Error('PDF file is too large');
    } else {
      throw new Error('Failed to extract text from PDF');
    }
  }
}