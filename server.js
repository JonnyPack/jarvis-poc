const express = require('express');
const cors = require('cors');
const { validateIdea } = require('./orchestrator');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/validate', async (req, res) => {
  try {
    const { idea } = req.body;
    
    if (!idea || !idea.trim()) {
      return res.status(400).json({ error: 'Idea is required' });
    }

    console.log(`\n🌐 Server received idea: "${idea}"\n`);
    
    const result = await validateIdea(idea);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 JARVIS Server running at http://localhost:${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard.html\n`);
});
