const axios = require("axios");
const { config } = require("../../config.js");

const getMise = async (req, res) => {
  const key = config.seoulKey;
  const { gu } = req.query;
  const url = `http://openAPI.seoul.go.kr:8088/${key}/json/ListAirQualityByDistrictService/1/5/${gu}`;

  try {
    const response = await axios.get(`${url}`);
    res.json({
      gu: response.data.ListAirQualityByDistrictService.row[0].MSRSTENAME,
      pm10: response.data.ListAirQualityByDistrictService.row[0].PM10,
    });
  } catch (error) {
    console.error(error);
  }
};

const getWeather = async (req, res) => {
  const { date } = req.query;
  const queryParams = new URLSearchParams({
    serviceKey: config.weatherKey,
    pageNo: 1,
    numOfRows: 50,
    dataType: "JSON",
    base_date: date,
    base_time: "1100",
    nx: 55,
    ny: 127,
  });

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${queryParams.toString()}`;

  try {
    const response = await axios.get(`${url}`);
    let result = {
      TMP: "test",
    };

    response.data.response.body.items.item.forEach((item) => {
      if (item.category === "TMP") {
        result.TMP = item.fcstValue;
      }
    });

    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

const getGang = async (req, res) => {
  const { date } = req.query;
  const queryParams = new URLSearchParams({
    serviceKey: config.weatherKey,
    pageNo: 1,
    numOfRows: 50,
    dataType: "JSON",
    base_date: date,
    base_time: "1100",
    nx: 55,
    ny: 127,
  });

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${queryParams.toString()}`;

  try {
    const response = await axios.get(`${url}`);
    let result = {
      POP: "test",
      REH: "test",
      PCP: "test",
    };

    response.data.response.body.items.item.forEach((item) => {
      if (item.category === "POP") {
        result.POP = item.fcstValue;
        console.log(result);
      } else if (item.category === "REH") {
        result.REH = item.fcstValue;
      } else if (item.category === "PCP") {
        result.PCP = item.fcstValue;
      }
    });

    res.json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMise,
  getWeather,
  getGang,
};
