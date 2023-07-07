const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const UTILS = require("../utils/format-numbers.js");

const PLANS_INFO = {
  7: {
    name: "$7 / month",
    amount: "$7.00",
    interval: "month",
    interval_count: 1,
    id: "price_1NNTOEGREri87tsDaKgCAF2Q",
  },
};

function getAllProductsAndPlans() {
  return Promise.all([stripe.products.list({}), stripe.plans.list({})]).then(
    (stripeData) => {
      var products = stripeData[0].data;
      var plans = stripeData[1].data;

      plans = plans
        .sort((a, b) => {
          /* Sort plans in ascending order of price (amount)
           * Ref: https://www.w3schools.com/js/js_array_sort.asp */
          return a.amount - b.amount;
        })
        .map((plan) => {
          /* Format plan price (amount) */
          amount = UTILS.formatUSD(plan.amount);
          return { ...plan, amount };
        });

      products.forEach((product) => {
        const filteredPlans = plans.filter((plan) => {
          return plan.product === product.id;
        });

        product.plans = filteredPlans;
      });

      return products;
    }
  );
}
function createCustomerAndSubscription(requestBody) {
  return stripe.customers
    .create({
      source: requestBody.stripeToken,
      email: requestBody.customerEmail,
    })
    .then((customer) => {
      stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: requestBody.planId,
          },
        ],
      });
    });
}

module.exports = {
  getAllProductsAndPlans,
  createCustomerAndSubscription,
};
