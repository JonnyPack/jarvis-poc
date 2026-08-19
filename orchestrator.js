const { analyzeMarket } = require('./agents/marketResearch');
const { generatePRD } = require('./agents/prdGenerator');

async function validateIdea(productIdea) {
  try {
    console.log(`\n🚀 JARVIS Idea Validation Starting\n`);
    console.log(`Idea: "${productIdea}"\n`);
    console.log(`════════════════════════════════════\n`);

    // Step 1: Run Agent 1 (Market Research)
    console.log(`Step 1/2: Analyzing Market Opportunity...\n`);
    const marketResearch = await analyzeMarket(productIdea);

    // Step 2: Run Agent 2 (PRD Generation)
    console.log(`\nStep 2/2: Generating Product Specification...\n`);
    const prd = await generatePRD(productIdea, marketResearch);

    // Combine results
    const result = {
      idea: productIdea,
      market_research: marketResearch,
      prd: prd,
      completed_at: new Date().toISOString(),
      status: 'validation_complete'
    };

    console.log(`════════════════════════════════════`);
    console.log(`\n✅ VALIDATION COMPLETE\n`);
    console.log(`Next Steps:`);
    console.log(`- Review market analysis`);
    console.log(`- Review product specification`);
    console.log(`- Decision: BUILD / REFINE / PARK\n`);

    return result;
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    throw error;
  }
}

module.exports = { validateIdea };
