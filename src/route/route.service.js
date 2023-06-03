const routeRepository = require("./route.repository.js");
const { config } = require("../../config.js");
const axios = require("axios");

const getRoute = async (req, res) => {
  try {
    const { imageId } = req.params;
    const images = await routeRepository.getImagesByImageId(imageId);

    if (!images || images.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const urls = images.map((image) => image.url);

    //미세먼지
    const key = config.seoulKey;
    const { gu } = req.query;
    const miseUrl = `http://openAPI.seoul.go.kr:8088/${key}/json/ListAirQualityByDistrictService/1/5/${gu}`;
    const miseResponse = await axios.get(`${miseUrl}`);
    const pm10 = miseResponse.data.ListAirQualityByDistrictService.row[0].PM10;

    //날씨
    const { date } = req.query;
    const weatherQueryParams = new URLSearchParams({
      serviceKey: config.weatherKey,
      pageNo: 1,
      numOfRows: 50,
      dataType: "JSON",
      base_date: date,
      base_time: "1100",
      nx: 55,
      ny: 127,
    });

    const weatherUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${weatherQueryParams.toString()}`;

    const weatherResponse = await axios.get(`${weatherUrl}`);

    let weatherResult = {
      TMP: "test",
    };

    weatherResponse.data.response.body.items.item.forEach((item) => {
      if (item.category === "TMP") {
        weatherResult.TMP = item.fcstValue;
      }
    });

    //강수량
    const gangQueryParams = new URLSearchParams({
      serviceKey: config.weatherKey,
      pageNo: 1,
      numOfRows: 50,
      dataType: "JSON",
      base_date: date,
      base_time: "1100",
      nx: 55,
      ny: 127,
    });

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${gangQueryParams.toString()}`;

    const gangResponse = await axios.get(`${url}`);

    let gangResult = {
      POP: "test",
      REH: "test",
      PCP: "test",
    };

    gangResponse.data.response.body.items.item.forEach((item) => {
      if (item.category === "POP") {
        gangResult.POP = item.fcstValue;
      } else if (item.category === "REH") {
        gangResult.REH = item.fcstValue;
      } else if (item.category === "PCP") {
        gangResult.PCP = item.fcstValue;
      }
    });

    // 산책 경로 추천
    let recommendedRoutes = [];

    let flag = "";

    if (pm10 <= 30 && gangResult.POP <= 30 && weatherResult.TMP >= 20) {
      flag = "좋음";
    } else if (pm10 <= 50 && gangResult.POP <= 50 && weatherResult.TMP >= 15) {
      flag = "보통";
    } else {
      flag = "나쁨";
    }

    urls.forEach((url) => {
      let route = { url };
      if (
        (flag === "좋음" && url.includes("_3")) ||
        (flag === "보통" && url.includes("_2")) ||
        (flag === "나쁨" && url.includes("_1"))
      ) {
        route.recommended = true;
      } else {
        route.recommended = false;
      }
      recommendedRoutes.push(route);
    });

    res.status(200).json({ success: true, flag, routes: recommendedRoutes });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createRoute = async (req, res) => {
  try {
    const { url, imageId } = req.body;

    // 이미지 생성
    const newImageId = await routeRepository.createImage(url, imageId);

    res.status(201).json({ success: true, imageId: newImageId });
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getRoute,
  createRoute,
};
