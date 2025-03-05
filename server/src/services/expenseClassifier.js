import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

// Fallback classification rules
const fallbackRules = {
  keywords: {
    Transportation: ['uber', 'lyft', 'taxi', 'train', 'flight', 'bus', 'transport'],
    'Business Expense': ['office', 'supplies', 'software', 'equipment', 'subscription'],
    Education: ['course', 'training', 'workshop', 'seminar', 'conference'],
    Healthcare: ['medical', 'health', 'doctor', 'pharmacy', 'hospital'],
    Personal: ['restaurant', 'cafe', 'entertainment', 'movie', 'dining']
  }
};

function fallbackClassification(description, companyName) {
  const text = `${description} ${companyName}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(fallbackRules.keywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return {
        category,
        confidence: 0.7,
        isDeductible: ['Business Expense', 'Education', 'Healthcare', 'Transportation'].includes(category)
      };
    }
  }
  
  return {
    category: 'Uncategorized',
    confidence: 0.5,
    isDeductible: false
  };
}

export async function classifyTransaction(description, companyName) {
  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `${description} from ${companyName}`,
        parameters: { 
          candidate_labels: Object.keys(fallbackRules.keywords).concat(['Uncategorized'])
        }
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.log("Falling back to rule-based classification due to API error");
      return fallbackClassification(description, companyName);
    }

    const category = result.labels[0];
    const confidence = result.scores[0];
    const isDeductible = ['Business Expense', 'Education', 'Healthcare', 'Transportation'].includes(category);

    return { category, confidence, isDeductible };
  } catch (error) {
    console.log("Falling back to rule-based classification due to:", error.message);
    return fallbackClassification(description, companyName);
  }
}
