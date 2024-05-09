const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS 자격 증명이 환경 변수에서 찾을 수 없습니다.');
  process.exit(1);
}

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'battery001';
// 데이터 가져오는 함수 정의
const getData = async () => {
  try {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'serial_code = :cid',
      ExpressionAttributeValues: {
        ':cid': 'car001',
      },
      ProjectionExpression: 'times, #data', // 가져올 속성 지정 (times와 data 필드)
      ExpressionAttributeNames: {
        '#data': 'data',
      },
      ScanIndexForward: false, // 내림차순으로 정렬 (가장 최근 데이터부터 가져오기 위해)
      Limit: 1, // 결과를 하나만 가져오도록 제한
    };

    const result = await dynamoDB.query(params).promise();

    if (result.Items.length === 0) {
      console.log('DynamoDB에서 데이터를 찾을 수 없습니다.');
      return null;
    }

    const latestData = result.Items[0]; // 가장 최근 데이터 하나만 가져오기
    const { times, data } = latestData; // times 필드와 data 필드 추출
    const jsonData = JSON.parse(data); // data 필드의 JSON 문자열을 파싱
    const canData = jsonData.data.can_data; // can_data 필드 가져오기
    const segments = canData.split('  ').map((segment) => segment.trim()); // can_data를 파싱하여 배열로 변환
    const serial_code = jsonData.serial_code; // can_data 필드 가져오기

    console.log(serial_code);
    console.log('가장 최근 데이터의 시간:', times);
    // console.log('can_data:', segments);

    let eighty = null;
    let eightyone1 = null;
    let eightyone2 = null;
    let eightyfive1 = null;
    let eightyfive2 = null;

    for (const segment of segments) {
      if (segment.startsWith('80')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          eighty = words[2];
          break; // 세 번째 단어 값을 찾았으므로 반복문 종료
        }
      }
    }
    for (const segment of segments) {
      if (segment.startsWith('81:')) {
        const words = segment.split(' ').map((word) => word.trim());

        if (words.length >= 2) {
          eightyone1 = words[0].substring(3);
          eightyone2 = words[1];
          break;
        }
      }
    }
    if (eighty !== null) {
      console.log(eighty, '번 랙');
    }
    if (eightyone1 !== null && eightyone2 !== null) {
      const hexValue = (parseInt(eightyone2) + parseInt(eightyone1),
      16).toFixed(1); // eightyone2와 eightyone1을 합친 16진수 값 (예: '1c87')
      // 16진수를 10진수로 변환
      console.log(`${hexValue}`);
    }
  } catch (error) {
    console.error('DynamoDB에서 데이터를 읽는 중 오류 발생:', error);
    return null;
  }
};

// 1초마다 데이터 가져오기
setInterval(async () => {
  try {
    const data = await getData();
    if (data) {
    }
  } catch (error) {
    console.error('1초마다 데이터 가져오기 중 오류 발생:', error);
  }
}, 3000); // 1000밀리초 (1초)마다 getData 함수 호출

// /getdata 엔드포인트 정의
router.get('/getdata', async (req, res) => {
  try {
    const data = await getData();
    if (data) {
      res.json(data); // 가져온 데이터를 JSON 응답으로 반환
    } else {
      res.json({}); // 데이터가 없는 경우 빈 객체 반환
    }
  } catch (error) {
    console.error('getdata 엔드포인트에서 오류 발생:', error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

module.exports = router;
