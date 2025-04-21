export async function analyzePDF(text: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert credit advisor. Analyze the provided credit report and provide a detailed response with the following sections:

1. Credit Score Analysis
2. Recommended Disputes
3. Score Improvement Tips
4. Side Hustle Recommendations
5. Credit Card Recommendations

Format the response in a clear, professional manner with section headers.`
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Failed to generate analysis';
  } catch (error) {
    console.error('Error in analyzePDF:', error);
    throw error;
  }
}