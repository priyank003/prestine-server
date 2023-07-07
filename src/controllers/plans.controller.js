const PLANS = {
  "3.50": {
    id: 1,
    name: "$3.50 / month",
    amount: 3.5,
    interval: req.body.planInterval,
    interval_count: req.body.planIntervalCount,
  },
};

const httpCreateSubscription = async (req, res) => {};

module.exports = {
  httpCreateSubscription,
};
