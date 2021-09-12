import { spawnSync } from "child_process";

const autocorrect = (req, res) => {
  const { data } = req.query;

  const result = spawnSync("python", ["./py/auto_correction.py", data]);
  if (result.stderr.toString().length > 0) {
    return res.json({
      success: false,
      data: null,
      desc: "something went wrong",
    });
  }

  return res.json({
    success: true,
    data: result.stdout.toString(),
  });
};

export default autocorrect;
