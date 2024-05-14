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
const tableName = 'batterycan001';

router.get('/getdata', async (req, res) => {
  try {
    // DynamoDB에서 최근 데이터 읽기
    const params = {
      TableName: tableName,
      ScanIndexForward: false, // 최신 데이터 먼저 정렬
      Limit: 1, // 결과를 최대 5개로 제한
      KeyConditionExpression: 'clientId = :cid', // 파티션 키 조건
      ExpressionAttributeValues: {
        ':cid': 'car001', // 실제 clientId 값으로 바꿔야 함
      },
      ProjectionExpression: 'mydata, #ts', // #ts로 timestamp 대체
      ExpressionAttributeNames: {
        '#ts': 'data',
      },
    };

    const result = await dynamoDB.query(params).promise();
    // console.log(result);
    if (result.Items.length === 0) {
      // 데이터가 없을 때의 처리
      console.log('DynamoDB에서 데이터를 찾을 수 없습니다.');

      res.json([]);
      return;
    }

    const transformedData = result.Items.map((item) => ({
      data: item,
      // 추가 필드가 있다면 여기에 추가
    }));

    console.log(
      'DynamoDB에서 최근 데이터:',
      JSON.stringify(transformedData, null, 2)
    );
    console.log(transformedData);
    res.json(transformedData);
  } catch (error) {
    console.error('DynamoDB에서 데이터를 읽는 중 오류 발생:', error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

router.get('/getdata1', async (req, res) => {
  try {
    // 더미 데이터 생성
    const dummyData = generateDummyData([10, 20, 30]);

    res.json(dummyData);
  } catch (error) {
    console.error('데이터 생성 중 오류 발생:', error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

module.exports = router;
