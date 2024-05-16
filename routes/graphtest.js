const express = require('express');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const router = express.Router();
dotenv.config();

// AWS 설정 및 DynamoDB DocumentClient 생성
AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'batterycan001';

router.get('/getdata', async (req, res) => {
  try {
    const startTime = req.query.startTime; // 요청에서 시작 시간 가져오기
    const endTime = req.query.endTime; // 요청에서 종료 시간 가져오기

    // DynamoDB에서 해당 시간 범위의 데이터 읽기
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'clientId = :cid AND #ts BETWEEN :start AND :end',
      ExpressionAttributeValues: {
        ':cid': 'car001', // 실제 clientId 값으로 바꿔야 함
        ':start': startTime,
        ':end': endTime,
      },
      ProjectionExpression: 'mydata, #ts, #otherData, #otherData1', // #ts로 timestamp 대체
      ExpressionAttributeNames: {
        '#ts': 'time',
        '#otherData': 'data',
        '#otherData1': 'RackNumber',
      },
      ScanIndexForward: false, // 최신 데이터 먼저 정렬
      Limit: 20, // 결과를 최대 1개로 제한
    };

    const result = await dynamoDB.query(params).promise();

    if (result.Items.length === 0) {
      console.log('DynamoDB에서 해당 시간 범위의 데이터를 찾을 수 없습니다.');
      res.json([]); // 데이터가 없으면 빈 배열 반환
      return;
    }
    //console.log(result);
    const transformedData = result.Items.map((item) => ({
      ...item,
      // 추가 필드가 있다면 여기에 추가
    }));
    console.log(transformedData);
    res.json(transformedData); // 요청에 따른 데이터 반환
  } catch (error) {
    console.error('DynamoDB에서 데이터를 읽는 중 오류 발생:', error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

module.exports = router;
