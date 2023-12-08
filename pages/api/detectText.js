// pages/api/detectText.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const replicateApiToken = process.env.REPLICATE_API_TOKEN; // 从环境变量获取 API 令牌
      const response = await fetch('https://replicate.com/hieunc229/detect-ai-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${replicateApiToken}` // 添加鉴权令牌到请求头
          // Add any required headers here, such as API keys
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
