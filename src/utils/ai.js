/**
 * Utility functions for interacting with the OpenAI API via internal proxy.
 */

/**
 * Generic function to call the internal OpenAI proxy
 */
const callOpenAI = async (payload) => {
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Proxy Error:', response.status, errorData);
            throw new Error(errorData.error || `Failed to generate content (Status: ${response.status})`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('AI Proxy request failed:', error);
        throw error;
    }
};

/**
 * Generate an email based on purpose, tone, and recipient.
 */
export const generateEmail = async (purpose, tone, recipient) => {
    const systemPrompt = `You are an expert email copywriter. Write a professional, well-structured email based on the user's instructions.
    
Formatting guidelines:
- Always start with a clear "Subject: " line.
- Use the requested tone consistently.
- Keep it concise but effective.
- Do not include any meta-text like "Here is your email:". Just provide the email output directly.`;

    const userPrompt = `Please write an email with the following details:
- Tone: ${tone}
- Recipient: ${recipient || 'Not specified (use generic greeting)'}
- Purpose/Goal: ${purpose}`;

    const data = await callOpenAI({ systemPrompt, userPrompt, temperature: 0.7 });
    return data.choices[0].message.content.trim();
};

/**
 * Generate a blog article based on topic, keywords, and length.
 */
export const generateBlog = async (topic, keywords, length) => {
    let lengthInstruction = "";
    if (length === 'short') lengthInstruction = "Keep it concise, around 300-400 words. Use 2-3 short sections.";
    else if (length === 'medium') lengthInstruction = "Write a standard length article, around 600-800 words with 3-5 sections.";
    else if (length === 'long') lengthInstruction = "Write a comprehensive, in-depth article, over 1000 words. Use detailed subsections.";

    const systemPrompt = `You are an expert SEO blog writer. Write an engaging, well-structured blog article entirely formatted in Markdown.
    
Guidelines:
- Start with an H1 (# Title).
- Structure the content using H2 (##) and H3 (###) headers.
- Naturally incorporate the requested keywords if provided.
- Write in an engaging, readable style with short paragraphs and bullet points where helpful.
- ${lengthInstruction}
- Output ONLY the Markdown article, no intro/outro filler.`;

    const userPrompt = `Topic: ${topic}
${keywords ? `Keywords to include: ${keywords}` : 'No specific keywords.'}`;

    const data = await callOpenAI({ systemPrompt, userPrompt, temperature: 0.8 });
    return data.choices[0].message.content.trim();
};

/**
 * Rewrite a paragraph to improve flow and professionalism.
 */
export const rewriteParagraph = async (text) => {
    const systemPrompt = `You are an expert editor. Your task is to rewrite the provided text to improve its flow, clarity, grammar, and professionalism. 
    Fix any awkward phrasing while maintaining the original meaning and core message. 
    Output ONLY the rewritten text, without any conversational filler or quotation marks.`;

    const data = await callOpenAI({ systemPrompt, userPrompt: text, temperature: 0.6 });
    return data.choices[0].message.content.trim();
};
