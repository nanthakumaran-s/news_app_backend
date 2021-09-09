import PublishModel from "../../models/publish.model.js";
import Sandbox from "../../models/sandbox.model.js"; // for demo purposes only

const search = (req, res) => {
  const { query } = req.query;
  Sandbox.search(
    {
      query_string: {
        query: `*${query}*`,
        analyzer: "keyword",
      },
    },
    { hydrate: true },
    function (err, results) {
      // results here
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          data: null,
          desc: "Something Went Wrong. Try Again Later.",
        });
      }
      return res.json({
        success: true,
        data: results.hits["hits"],
      });
    }
  );
};

export default search;
