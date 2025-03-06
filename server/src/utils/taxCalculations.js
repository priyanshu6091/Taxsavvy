    export const calculateTaxLiability = (income, expenses, deductions) => {
    const taxableIncome = Math.max(income - expenses - deductions, 0);
    const basicTaxRate = 0.2; // 20% basic rate
    const higherTaxRate = 0.4; // 40% higher rate
    
    let taxLiability = 0;
    if (taxableIncome <= 50000) {
      taxLiability = taxableIncome * basicTaxRate;
    } else {
      taxLiability = (50000 * basicTaxRate) + ((taxableIncome - 50000) * higherTaxRate);
    }
    
    return {
      taxableIncome,
      taxLiability,
      effectiveRate: (taxLiability / income) * 100
    };
  };
  
  export const generateRecommendations = (income, expenses, deductions) => {
    const recommendations = [];
  
    if (income > 100000) {
      recommendations.push({
        title: 'Pension Contributions',
        description: 'Consider increasing pension contributions to reduce taxable income',
        impact: 'High',
      });
    }
  
    if (expenses < income * 0.2) {
      recommendations.push({
        title: 'Business Expenses Review',
        description: 'You might be missing out on legitimate business expenses',
        impact: 'Medium',
      });
    }
  
    if (deductions < 10000) {
      recommendations.push({
        title: 'Tax Deductions',
        description: 'Explore additional tax deductions you might be eligible for',
        impact: 'Medium',
      });
    }
  
    return recommendations;
  };