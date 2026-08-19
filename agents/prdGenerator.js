const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generatePRD(productIdea, marketResearch) {
  try {
    console.log(`\n📝 Generating PRD for: "${productIdea}"\n`);

    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Based on this market research, generate a comprehensive Product Requirements Document. Respond ONLY with valid JSON (no markdown, no extra text).

Product Idea: ${productIdea}

Market Research:
- Market Size: ${marketResearch.market_size}
- Main Competitors: ${marketResearch.main_competitors.join(', ')}
- Trends: ${marketResearch.trends.join(', ')}
- Opportunity Score: ${marketResearch.opportunity_score}/10

Generate a PRD with this exact JSON structure:
{
  "title": "product name",
  "problem_statement": "what problem does this solve?",
  "solution": "how does this product solve it?",
  "target_users": ["user segment 1", "user segment 2"],
  "key_features": [
    {"name": "feature name", "description": "what it does"},
    {"name": "feature name", "description": "what it does"}
  ],
  "success_metrics": ["metric 1", "metric 2", "metric 3"],
  "competitive_advantage": "what makes this different from competitors?",
  "estimated_launch_timeline": "timeframe to launch"
}`,
        },
      ],
    });

    const responseText = message.content[0].text;
    const prdData = JSON.parse(responseText);
    
    console.log('✅ PRD Generated:\n');
    console.log(`Title: ${prdData.title}`);
    console.log(`Problem: ${prdData.problem_statement}`);
    console.log(`Solution: ${prdData.solution}`);
    console.log(`Target Users: ${prdData.target_users.join(', ')}`);
    console.log(`Features: ${prdData.key_features.map(f => f.name).join(', ')}`);
    console.log(`Success Metrics: ${prdData.success_metrics.join(', ')}`);
    console.log(`Competitive Advantage: ${prdData.competitive_advantage}`);
    console.log(`Timeline: ${prdData.estimated_launch_timeline}\n`);

    return prdData;
  } catch (error) {
    console.error('❌ Error generating PRD:', error.message);
    throw error;
  }
}

module.exports = { generatePRD };
