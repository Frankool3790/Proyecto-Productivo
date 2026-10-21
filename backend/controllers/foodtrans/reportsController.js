const {
  businessPlanSections,
  financialProjection,
  riskMatrix,
} = require('../../data/foodtransSeed');

function getBusinessPlan(req, res) {
  res.json({
    sections: businessPlanSections,
  });
}

function getReports(req, res) {
  const totalIncome = financialProjection.reduce((total, row) => total + row.income, 0);
  const totalCosts = financialProjection.reduce(
    (total, row) => total + row.admin + row.sales + row.production,
    0,
  );

  res.json({
    financialProjection,
    riskMatrix,
    summary: {
      totalIncome,
      totalCosts,
      estimatedMargin: totalIncome - totalCosts,
    },
  });
}

module.exports = {
  getBusinessPlan,
  getReports,
};
