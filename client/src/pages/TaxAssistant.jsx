import { useState } from 'react';
import { Send } from 'lucide-react';

const commonQuestions = [
  {
    title: 'What deductions can I claim?',
    description: 'Learn about available tax deductions',
  },
  {
    title: 'How do I file an extension?',
    description: 'Get help with tax filing extensions',
  },
  {
    title: 'Understanding tax credits',
    description: 'Explore available tax credits',
  },
];

const getAIResponse = (message) => {
  const responses = {
    'deductions': 'Common tax deductions include: \n- Business expenses\n- Pension contributions\n- Charitable donations\n- Home office expenses',
    'credits': 'Available tax credits may include: \n- R&D tax credits\n- Employment allowance\n- Marriage allowance',
    'extension': 'To file a tax extension: \n1. Submit form SA371\n2. Request must be made before the deadline\n3. Provide valid reason for extension',
    'default': "I can help you with tax-related questions. You can ask about deductions, credits, filing requirements, or any other tax matters."
  };

  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('deduction')) return responses.deductions;
  if (lowerMessage.includes('credit')) return responses.credits;
  if (lowerMessage.includes('extension')) return responses.extension;
  return responses.default;
};

function TaxAssistant() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setChatHistory(prev => [...prev, { type: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuestionClick = (question) => {
    handleSendMessage({ preventDefault: () => {} });
    setMessage(question.title);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-sm overflow-y-auto">
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-medium text-gray-900">Tax Assistant</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Get instant answers to your tax-related questions
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      msg.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can I help you with your taxes today?"
              className="flex-1 rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="w-80 ml-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Common Questions
          </h2>
          <div className="space-y-4">
            {commonQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-4 rounded-lg border hover:bg-gray-50"
              >
                <h3 className="text-sm font-medium text-gray-900">
                  {question.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {question.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaxAssistant;
