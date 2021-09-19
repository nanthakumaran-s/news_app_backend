import Published from "../../models/publish.model.js";

const report = async (req, res) => {
  const { newsid, type } = req.body;

  Published.findOneAndUpdate(
    { _id: newsid },
    {
      $inc: {
        report: 1,
      },
    },
    { new: true }
  )
    .then(async (data) => {
      if (data.approved.length < data.report) {
        await Published.findOneAndDelete({ _id: data._id });
        return res.json({
          success: true,
          desc: "This news is deleted",
        });
      }
      return res.json({
        success: true,
        desc: "Report updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        success: false,
        dec: "Something Went Wrong. Try Again",
      });
    });
};

export default report;
