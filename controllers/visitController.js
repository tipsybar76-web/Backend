const Visit = require("../models/Visits");

// ================= TRACK DAILY VISIT =================
exports.trackVisit = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    let visit = await Visit.findOne({ date: today });

    if (visit) {
      visit.count += 1;
      await visit.save();
    } else {
      await Visit.create({ date: today, count: 1 });
    }

    res.status(200).send("Visit Tracked");
  } catch (err) {
    res.status(500).json(err);
  }
};
