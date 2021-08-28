const User = require ('../models/userModel');

async function pushActivityChangeCash (username, activity) {
  return await User.findOneAndUpdate(
    { userName: username},
    {
      $push: {activities: { $each: [activity], $position:0 }}, 
      $inc: {cash: activity.action === 'buy' ? -Number((activity.netAmount).toFixed(2)): activity.netAmount}
    },
    {new: true}
  );
}


exports.updateHoldings = async (req, res) => {
  try {

    const username = req.user.userName;
    const activity = req.body;

    if (!username) return res.status(401).send({message: 'Unauthenticated'});

    let updatedUser = await pushActivityChangeCash(username, activity);

    const userHoldings = (await User.findOne({ userName: username}, 'holdings')).holdings;
    let companyHolding = userHoldings.filter(userHolding => userHolding.company === activity.company)[0];

    if (activity.action === 'buy') {
      if (companyHolding) {
        companyHolding.avgCost = Number((((companyHolding.avgCost * companyHolding.quantity) + activity.netAmount)/(companyHolding.quantity + activity.quantity)).toFixed(2))
        companyHolding.quantity += activity.quantity;
      } else {
        companyHolding = {
          company: activity.company,
          ticker: activity.ticker,
          quantity: activity.quantity,
          avgCost: Number((activity.price).toFixed(2)),
        }
        updatedUser = await User.findOneAndUpdate(
          { userName: username},
          {$push: {holdings: companyHolding}},
          {new: true}
        );
        res.status(200);
        res.send(updatedUser);
        return;
      }
    } else {
      if(activity.quantity === companyHolding.quantity) companyHolding = false;
      else {
        companyHolding.quantity -= activity.quantity;
      }
    }

    if (companyHolding) {
      updatedUser = await User.findOneAndUpdate(
        { userName: username},
        {
          $pull: {holdings: {company: activity.company}}
        },
        {new: true}
      );
      updatedUser = await User.findOneAndUpdate(
        { userName: username},
        {
          $push: {holdings: companyHolding}
        },
        {new: true}
      );
    }
    else {
        updatedUser = await User.findOneAndUpdate(
          { userName: username},
          {$pull: {holdings: {company: activity.company}}},
          {new: true}
        );
    }
    res.status(200);
    res.send(updatedUser);

  } catch (error) {
    res.status(500);
    res.send(error);

  }
}


