/*
 * © Copyright 2026 Adobe. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var clientlib = require("aem-clientlib-generator");
var path = require("path");
var process = require("process");


const CLIENTLIB_DIR = process.env.npm_config_directory || "theme-clientlibs"
const CLIENTLIB_CATEGORY = process.env.npm_config_category

if(!CLIENTLIB_CATEGORY){
  throw 'category parameter should be present'
}
clientlib(
  [
    {
      categories: [CLIENTLIB_CATEGORY],
      name: CLIENTLIB_CATEGORY,
      cssProcessor: ["default:none", "min:none"],
      jsProcessor: ["default:none", "min:gcc;compilationLevel=whitespace"],
      allowProxy: true,
      customProperties: [
        "formsTheme"
      ],
      formsTheme: "true",
      serializationFormat: "xml",
      assets: {
        resources: {
          base: "css/resources/images",
          files: ["dist/**/*.svg", "dist/**/*.gif", "dist/**/*.png"]
        },
        js: [
          { src: "dist/theme.js", dest: "theme.js" },
          {
            src: "dist/theme.js.map",
            dest: "theme.js.map",
          },
        ],
        css: ["dist/theme.css", "dist/theme.css.map"],
      },
    }
  ],
  {
    cwd: __dirname,
    clientLibRoot: path.join(__dirname, CLIENTLIB_DIR),
  },
  function () {
    console.log("clientlibs created");
  }
);

