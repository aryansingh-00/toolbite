/**
 * Utility functions for AI Image processing via internal proxies.
 */

/**
 * Generate an image from a text prompt using OpenAI (via internal proxy).
 */
export const generateImage = async (prompt) => {
    // Local Development Bypass
    if (import.meta.env.DEV && import.meta.env.VITE_OPENAI_API_KEY) {
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'dall-e-3',
                    prompt: prompt,
                    n: 1,
                    size: '1024x1024'
                })
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || 'OpenAI Image API Error');
            }
            const data = await response.json();
            return data.data[0].url;
        } catch (error) {
            console.error('Direct Image Generation failed:', error);
            throw error;
        }
    }

    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'image',
                prompt: prompt
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed to generate image (Status: ${response.status})`);
        }

        const data = await response.json();
        return data.data[0].url;
    } catch (error) {
        console.error('Image Generation Error:', error);
        throw error;
    }
};

/**
 * Remove the background from an image using the internal proxy.
 */
export const removeBackground = async (imageFile) => {
    // Local Development Bypass
    if (import.meta.env.DEV && import.meta.env.VITE_REMOVE_BG_API_KEY) {
        try {
            const formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_file', imageFile);
            
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': import.meta.env.VITE_REMOVE_BG_API_KEY
                },
                body: formData
            });
            
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Remove.bg Error: ${errText || 'Connection failed'}`);
            }
            
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Direct Background Removal failed:', error);
            // Fallback to proxy if possible, but it will likely 404 in dev
        }
    }

    try {
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', imageFile);
        
        const response = await fetch('/api/remove-bg', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to remove background: ${errText || 'Proxy error'}`);
        }
        
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Background Removal Error:', error);
        throw error;
    }
};

/**
 * Enhance an image using the internal proxy.
 */
export const enhanceImage = async (imageFile) => {
    // Local Development Bypass
    if (import.meta.env.DEV && import.meta.env.VITE_DEEPAI_API_KEY) {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            
            const response = await fetch('https://api.deepai.org/api/waifu2x', {
                method: 'POST',
                headers: {
                    'api-key': import.meta.env.VITE_DEEPAI_API_KEY
                },
                body: formData
            });
            
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.err || 'DeepAI Error');
            }
            
            const data = await response.json();
            return data.output_url;
        } catch (error) {
            console.error('Direct Image Enhancement failed:', error);
        }
    }

    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const response = await fetch('/api/enhance-image', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to enhance image (Status: ${response.status})`);
        }
        
        const data = await response.json();
        return data.output_url;
    } catch (error) {
        console.error('Image Enhancer Error:', error);
        throw error;
    }
};
