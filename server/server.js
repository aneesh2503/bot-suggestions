const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle AI prompt generation
app.post('/api/ai-generate', async (req, res) => {
  const { prompt } = req.body;
  
  // Call the AI model for prompt-based generation (e.g., OpenAI, etc.)
  try {
    const aiResponse = await axios.post('AI_API_URL', {
      prompt: prompt,
      // Include any necessary API keys or parameters
    });
    
    // Assuming AI returns a structured response
    const aiData = aiResponse.data; // Modify this depending on the response structure
    
    res.json({
      data: {
        businessUnit: aiData.businessUnit,
        region: aiData.region,
        endUser: aiData.endUser,
        priority: aiData.priority,
        industry: aiData.industry,
        category: aiData.category,
        costCenter: aiData.costCenter,
        projectName: aiData.projectName,
        projectBudget: aiData.projectBudget,
        currency: aiData.currency,
        dueDate: aiData.dueDate,
        projectDescription: aiData.projectDescription,
        items: aiData.items || []
      }
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Error generating AI data' });
  }
});

// Route to handle form submission
app.post('/api/submit-form', (req, res) => {
  const { businessUnit, region, endUser, priority, industry, category, costCenter, projectName, projectBudget, currency, dueDate, projectDescription, items } = req.body;

  // Simulating form submission and storing data
  // You can replace this with your own database logic
  const formId = Math.floor(Math.random() * 10000); // Random form ID for now

  // Assuming the form submission is successful
  res.json({ formId: formId });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
