import benchmark from "api-benchmark";
import fs from "fs";
import __dirname from "../../utils/path.js";

console.warn(
  "This Test May Be use DB CRUD Operations. Don't Run Test In Production."
);
console.log(
  "This test will create new user and update it several times. Run Only In Dev DB"
);

const services = {
  server: "http://localhost:8080",
};

const routes = {
  signup: {
    method: "post",
    route: "/api/auth/v1/signup",
    headers: {
      Accept: "application/json",
    },
    data: {
      username: "riyaz",
      email: "riyaz@example.com",
      fullname: "Riyazur Razak",
      password: "rioragul@27",
      deviceid:
        "123438518543799134885375128517235123851375714751438503475154907351347",
      home_location: {
        city: "Karur",
        state: "Tamil Nadu",
        country: "India",
      },
      platform: "Android",
    },
  },
  signin: {
    method: "get",
    route: "/api/auth/v1/signin",
    query: {
      username: "sanjaiy",
      password: "popz",
    },
  },
  username_available: {
    method: "get",
    route: "/api/auth/v1/isusername-available",
    query: {
      username: "riyaz",
    },
  },
  change_location: {
    method: "patch",
    route: "/api/auth/v1/change-location",
    headers: {
      Accept: "application/json",
    },
    data: {
      username: "riyaz",
      current_location: {
        city: "Erode",
        state: "Tamil Nadu",
        country: "India",
      },
    },
  },
};

const options = {
  debug: true,
  minSamples: 500,
  maxTime: 10,
};

benchmark.measure(services, routes, options, (err, results) => {
  if (err) console.error("----error happened----");
  else console.log("----test completed----");
  benchmark.getHtml(results, (err, html) => {
    fs.writeFileSync(`${__dirname}/auth/benchmarks/stats.html`, html);
    console.log(`report saved in ${__dirname}/auth/benchmarks/stats.html`);
  });
});
