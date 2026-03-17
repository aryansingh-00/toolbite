/**
 * Utility functions for AI Image processing.
 * Ensure necessary API keys are set in your .env file:
 * VITE_OPENAI_API_KEY
 * VITE_REMOVE_BG_API_KEY
 * VITE_DEEPAI_API_KEY
 */

const getEnvVar = (key, name) => {
    const val = import.meta.env[key];
    if (!val) {
        throw new Error(`Missing API Key: ${name}. Please add ${key} to your .env file.`);
    }
    return val;
};

/**
 * Generate an image from a text prompt using OpenAI (DALL-E 3).
 */
export const generateImage = async (prompt) => {
    const apiKey = getEnvVar('VITE_OPENAI_API_KEY', 'OpenAI');
    
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: '1024x1024'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to generate image from OpenAI');
        }

        const data = await response.json();
        return data.data[0].url;
    } catch (error) {
        console.error('Image Generation Error:', error);
        throw error;
    }
};

/**
 * Remove the background from an image using the Remove.bg API.
 */
export const removeBackground = async (imageFile) => {
    const apiKey = getEnvVar('VITE_REMOVE_BG_API_KEY', 'Remove.bg');
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', imageFile);
    
    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': apiKey,
            },
            body: formData
        });
        
        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Failed to remove background: ${errBody || 'Please verify your Remove.bg API key.'}`);
        }
        
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Background Removal Error:', error);
        throw error;
    }
};

/**
 * Enhance an image using a generic endpoint (example defaults to DeepAI Super Resolution).
 */
export const enhanceImage = async (imageFile) => {
    const apiKey = getEnvVar('VITE_DEEPAI_API_KEY', 'DeepAI');
    const formData = new FormData();
    formData.append('image', imageFile);
    
    try {
        const response = await fetch('https://api.deepai.org/api/torch-srgan', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
            },
            body: formData
        });
        
        if (!response.ok) {
            const errBody = await response.json();
            throw new Error(`Failed to enhance image: ${errBody.error || 'Please verify your DeepAI API key.'}`);
        }
        
        const data = await response.json();
        return data.output_url;
    } catch (error) {
        console.error('Image Enhancer Error:', error);
        throw error;
    }
};
