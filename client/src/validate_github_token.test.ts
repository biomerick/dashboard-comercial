import { describe, it, expect } from 'vitest';
import axios from 'axios';

describe('GitHub Token Validation', () => {
  it('should successfully authenticate with GitHub API', async () => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is not set');
    }

    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      
      expect(response.status).toBe(200);
      console.log(`Authenticated as: ${response.data.login}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('GitHub API Error:', error.response?.data || error.message);
        throw new Error(`Authentication failed: ${error.response?.status} ${error.response?.statusText}`);
      }
      throw error;
    }
  });
});
