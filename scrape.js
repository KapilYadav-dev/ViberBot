const request = require("request");
const cheerio = require("cheerio");
var TinyURL = require("tinyurl");

function doWork(ctx, videoUrl) {
  var data = [];
  url = "https://qdownloader.io/download?url=" + videoUrl;
  request(url, async (error, response, html) => {
    try {
      const $ = cheerio.load(html);
      var downloadBlock = $(".downloadsTable").eq(0).find("tbody").find("tr");
      downloadBlock.each(function (i, elem) {
        var a = $(this);
        var quality = a.find("td").eq(0).text();
        var download_url = a.find("td").eq(3).find("a").attr("href");
        if (!quality.includes("1080p") && download_url != null) {
          data[i] = {
            download_url: download_url,
          };
        }
      });
      data = data.filter(function () {
        return true;
      });
      if (data == null) ctx.reply("Error occured 🤕");
      else {
        var response = data[1].download_url;
        TinyURL.shorten(response, function (res, err) {
          if (err) ctx.reply("Error occured 🤕");
          else ctx.reply("Here is your link...\n" + res);
        });
      }
    } catch (err) {
      ctx.reply("Error occured 🤕");
    }
  });
}
module.exports.doWork = doWork;
