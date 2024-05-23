const express = require('express');
const AWS = require('aws-sdk');

const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();
//이거
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
const dynamoDBNew = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-2',
});

const tableName = process.env.DynamoTable3;
const newTableName = process.env.NewDynamoTable;
const insertJsonToDynamoDB = async (jsonString) => {
  try {
    const data = JSON.parse(jsonString); // JSON 문자열 파싱

    if (
      data.RackNumber === '06' ||
      data.RackNumber === '07' ||
      data.RackNumber === '08' ||
      data.RackNumber === '09'
    ) {
      console.log(
        'RackNumber가 06, 07, 08, 09인 경우 DynamoDB에 삽입하지 않습니다.'
      );
      return; // RackNumber가 해당 값들인 경우 삽입하지 않고 함수 종료
    }
    // clientId 필드를 추가
    data.clientId = 'car003'; // 예시: 실제 clientId 값으로 대체
    // DynamoDB에 삽입할 아이템 생성
    const item = {
      clientId: data.clientId, // 파티션 키
      time: data.time, // 정렬 키 (숫자형으로 변환된 timestamp)
      data: data, // 기존 데이터 포함
      RackNumber: data.RackNumber,
    };

    const params = {
      TableName: newTableName,
      Item: item, // DynamoDB에 삽입할 아이템
    };

    await dynamoDBNew.put(params).promise(); // DynamoDB에 데이터 삽입

    console.log('데이터가 성공적으로 DynamoDB에 추가되었습니다.');
  } catch (error) {
    console.error('DynamoDB에 데이터를 추가하는 중 오류 발생:', error);
    throw error;
  }
};

// 데이터 가져오는 함수 정의
const getData = async () => {
  try {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'serial_code = :cid',
      ExpressionAttributeValues: {
        ':cid': 'car903',
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

    // console.log(serial_code);
    // console.log('가장 최근 데이터의 시간:', times);
    // console.log('can_data:', segments);
    let hex, hexValue128;

    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 3); // 세그먼트 타입 추출

      switch (type) {
        case '80:':
          if (words.length >= 3) {
            hexValue128 = words[2];
          }
          break;
      }
    }

    let jsonData1 = {
      time: times,
      Battery: hex,
      RackNumber: hexValue128,
    };
    let jsonString = JSON.stringify(jsonData1, null, 2);
    await insertJsonToDynamoDB(jsonString);
    console.log(jsonString);
  } catch (error) {
    console.error('DynamoDB에서 데이터를 읽는 중 오류 발생:', error);
    return null;
  }
};

// //1초마다 데이터 가져오기
setInterval(async () => {
  try {
    const data = await getData();
    if (data) {
    }
  } catch (error) {
    console.error('1초마다 데이터 가져오기 중 오류 발생:', error);
  }
}, 4000); // 1000밀리초 (1초)마다 getData 함수 호출

//getdata 엔드포인트 정의
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
