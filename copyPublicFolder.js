const path = require("path");
const fs = require("fs-extra");

function copyPublicFolder() {
  fs.copySync(
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "build"),
    {
      dereference: true,
      filter: file => !file.includes("index")
    }
  );
}

copyPublicFolder();
