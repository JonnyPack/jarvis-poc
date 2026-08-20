const fs = require('fs');
const path = require('path');

async function saveIdea(ideaResult) {
  try {
    // Create timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `idea-${timestamp}.json`;
    const filepath = path.join(__dirname, '../consultancy/ideas', filename);

    // Ensure directory exists
    const dirpath = path.join(__dirname, '../consultancy/ideas');
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath, { recursive: true });
    }

    // Add metadata
    const ideaWithMetadata = {
      ...ideaResult,
      saved_at: new Date().toISOString(),
      version: '1.0'
    };

    // Write to file
    fs.writeFileSync(filepath, JSON.stringify(ideaWithMetadata, null, 2));

    console.log(`\n💾 Idea saved to: ${filename}`);
    console.log(`📁 Location: consultancy/ideas/${filename}\n`);

    return {
      filename,
      filepath,
      saved: true
    };
  } catch (error) {
    console.error('❌ Error saving idea:', error.message);
    throw error;
  }
}

module.exports = { saveIdea };
