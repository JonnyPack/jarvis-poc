const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function analyzeMarket(productIdea) {
  try {
    console.log(`\n🔍 Analyzing market for: "${productIdea}"\n`);

    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analyze the market opportunity for this product idea. Respond ONLY with valid JSON (no markdown, no extra text).

Product Idea: ${productIdea}

Respond with this exact JSON structure:
{
  "market_size": "estimated TAM in dollars (e.g., '$2.3B')",
  "main_competitors": ["list", "of", "main", "competitors"],
  "trends": ["relevant", "market", "trends"],
  "opportunity_score": number between 1-10,
  "reasoning": "brief explanation of your score"
}`,
        },
      ],
    });

    // Extract the response text
    const responseText = message.content[0].text;
    
    // Parse JSON response
    const marketData = JSON.parse(responseText);
    
    console.log('✅ Market Analysis Complete:\n');
    console.log(`Market Size: ${marketData.market_size}`);
    console.log(`Competitors: ${marketData.main_competitors.join(', ')}`);
    console.log(`Trends: ${marketData.trends.join(', ')}`);
    console.log(`Opportunity Score: ${marketData.opportunity_score}/10`);
    console.log(`\nReasoning: ${marketData.reasoning}\n`);

    return marketData;
  } catch (error) {
    console.error('❌ Error analyzing market:', error.message);
    throw error;
  }
}

module.exports = { analyzeMarket };