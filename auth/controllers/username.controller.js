import { client } from "../middleware/redis.js";

const isUsername = (req, res) => {
  const { username } = req.query;
  client.lrange("usernames", 0, -1, (err, data) => {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
        isavailable: null,
        desc: "Something happened wrong. Try again Later",
      });
    }
    console.log(data);
    return res.json({
      success: true,
      isavailable: !data.includes(username),
    });
  });
};

export default isUsername;
