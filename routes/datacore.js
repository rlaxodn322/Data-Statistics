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

const tableName = 'battery001';
const newTableName = 'batterycan001';
const insertJsonToDynamoDB = async (jsonString) => {
  try {
    const data = JSON.parse(jsonString); // JSON 문자열 파싱
    // clientId 필드를 추가
    data.clientId = 'car001'; // 예시: 실제 clientId 값으로 대체
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

    // console.log(serial_code);
    // console.log('가장 최근 데이터의 시간:', times);
    // console.log('can_data:', segments);
    let hex,
      hexValue,
      hexValue1,
      hexValue2,
      hexValue3,
      hexValue4,
      hexValue5,
      hexValue6,
      hexValue7,
      hexValue8,
      hexValue9,
      hexValue10,
      hexValue11,
      hexValue12,
      hexValue13,
      hexValue14,
      hexValue15,
      hexValue16,
      hexValue17,
      hexValue18,
      hexValue19,
      hexValue20,
      hexValue21,
      hexValue22,
      hexValue23,
      hexValue24,
      hexValue25,
      hexValue26,
      hexValue27,
      hexValue28,
      hexValue29,
      hexValue30,
      hexValue31,
      hexValue32,
      hexValue33,
      hexValue34,
      hexValue35,
      hexValue36,
      hexValue37,
      hexValue38,
      hexValue39,
      hexValue40,
      hexValue41,
      hexValue42,
      hexValue43,
      hexValue44,
      hexValue45,
      hexValue46,
      hexValue47,
      hexValue48,
      hexValue49,
      hexValue50,
      hexValue51,
      hexValue52,
      hexValue53,
      hexValue54,
      hexValue55,
      hexValue56,
      hexValue57,
      hexValue58,
      hexValue59,
      hexValue60,
      hexValue61,
      hexValue62,
      hexValue63,
      hexValue64,
      hexValue65,
      hexValue66,
      hexValue67,
      hexValue68,
      hexValue69,
      hexValue70,
      hexValue71,
      hexValue72,
      hexValue73,
      hexValue74,
      hexValue75,
      hexValue76,
      hexValue77,
      hexValue78,
      hexValue79,
      hexValue80,
      hexValue81,
      hexValue82,
      hexValue83,
      hexValue84,
      hexValue85,
      hexValue86,
      hexValue87,
      hexValue88,
      hexValue89,
      hexValue90,
      hexValue91,
      hexValue92,
      hexValue93,
      hexValue94,
      hexValue95,
      hexValue96,
      hexValue97,
      hexValue98,
      hexValue99,
      hexValue100,
      hexValue101,
      hexValue102,
      hexValue103,
      hexValue104,
      hexValue105,
      hexValue106,
      hexValue107,
      hexValue108,
      hexValue109,
      hexValue110,
      hexValue111,
      hexValue112,
      hexValue113,
      hexValue114,
      hexValue115,
      hexValue116,
      hexValue117,
      hexValue118,
      hexValue119,
      hexValue120,
      hexValue121,
      hexValue122,
      hexValue123,
      hexValue124,
      hexValue125,
      hexValue126,
      hexValue127,
      hexValue128,
      hexValue129,
      hexValue130,
      hexValue131,
      hexValue132,
      hexValue133,
      hexValue134,
      hexValue135,
      hexValue136,
      hexValue137,
      hexValue138,
      hexValue139,
      hexValue140,
      hexValue141,
      hexValue142,
      hexValue143,
      hexValue144,
      hexValue145,
      hexValue146,
      hexValue147,
      hexValue148,
      hexValue149,
      hexValue150,
      hexValue151,
      hexValue152,
      hexValue153,
      hexValue154,
      hexValue155,
      hexValue156,
      hexValue157,
      hexValue158,
      hexValue159,
      hexValue160,
      hexValue161,
      hexValue162,
      hexValue163,
      hexValue164,
      hexValue165,
      hexValue166,
      hexValue167,
      hexValue168,
      hexValue169,
      hexValue170,
      hexValue171,
      hexValue172,
      hexValue173,
      hexValue174,
      hexValue175,
      hexValue176,
      hexValue177,
      hexValue178,
      hexValue179,
      hexValue180,
      hexValue181,
      hexValue182,
      hexValue183,
      hexValue184,
      hexValue185,
      hexValue186,
      hexValue187,
      hexValue188,
      hexValue189,
      hexValue190,
      hexValue191,
      hexValue192,
      hexValue193,
      hexValue194,
      hexValue195;

    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 3); // 세그먼트 타입 추출

      switch (type) {
        case '80:':
          if (words.length >= 3) {
            hexValue128 = words[2];
          }
          break;

        case '81:':
          if (words.length >= 2) {
            let eightyone1 = words[0].substring(3);
            let eightyone2 = words[1];
            hexValue129 = (parseInt(eightyone2 + eightyone1, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            let eightyone3 = words[2];
            let eightyone4 = words[3];
            hexValue130 = (parseInt(eightyone4 + eightyone3, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            let eightyone5 = words[4];
            let eightyone6 = words[5];
            hexValue131 = (parseInt(eightyone6 + eightyone5, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            let eightyone7 = words[6];
            let eightyone8 = words[7];
            hexValue132 = (parseInt(eightyone8 + eightyone7, 16) * 0.1).toFixed(
              1
            );
          }
          break;
        case '82:':
          let one1 = parseInt(words[0], 10).toString(2).padStart(8, '0');
          let one2 = parseInt(words[1], 10).toString(2).padStart(8, '0');
          let one3 = parseInt(words[2], 10).toString(2).padStart(8, '0');
          let one4 = parseInt(words[3], 10).toString(2).padStart(8, '0');
          let one5 = parseInt(words[4], 10).toString(2).padStart(8, '0');
          let one6 = parseInt(words[5], 10).toString(2).padStart(8, '0');
          let one7 = parseInt(words[6], 10).toString(2).padStart(8, '0');
          let one8 = parseInt(words[7], 10).toString(2).padStart(8, '0');

          hexValue133 = '';
          hexValue134 = '';
          hexValue135 = '';
          hexValue136 = '';
          hexValue137 = '';
          hexValue138 = '';
          hexValue139 = '';
          // if (one1.charAt(7) === '1') {
          //   hexValue133 += 'STAT_BMS_READY ';
          // }
          // if (one1.charAt(6) === '1') {
          //   hexValue133 += 'STAT_CHG_MODE ';
          // }
          // if (one1.charAt(5) === '1') {
          //   hexValue133 += 'STAT_DCH_MODE ';
          // }
          // if (one1.charAt(3) === '1') {
          //   hexValue133 += 'STAT_RELAY_DCH ';
          // }
          // if (one1.charAt(2) === '1') {
          //   hexValue133 += 'STAT_RELAY_PRE ';
          // }
          // if (one1.charAt(1) === '1') {
          //   hexValue133 += 'STAT_RELAY_CHG ';
          // }
          // if (hexValue133 === '') {
          //   hexValue133 = '?';
          // }

          if (one3.charAt(7) === '1') {
            hexValue134 += 'Pack Over Voltage Protection Fault ';
          }
          if (one3.charAt(6) === '1') {
            hexValue134 += 'Pack Under Voltage Protection Fault ';
          }
          if (one3.charAt(5) === '1') {
            hexValue134 += 'Charge Over Current Fault ';
          }
          if (one3.charAt(4) === '1') {
            hexValue134 += 'Discharge Over Current Fault ';
          }
          if (one3.charAt(3) === '1') {
            hexValue134 += 'Over SOC Fault ';
          }
          if (one3.charAt(2) === '1') {
            hexValue134 += 'Under SOC Fault ';
          }
          if (one3.charAt(1) === '1') {
            hexValue134 += 'Under SOH Fault ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue134 === '') {
            hexValue134 = '정상';
          }

          if (one4.charAt(7) === '1') {
            hexValue135 += 'Pack Over Voltage Protection Warning ';
          }
          if (one4.charAt(6) === '1') {
            hexValue135 += 'Pack Under Voltage Protection Warning ';
          }
          if (one4.charAt(5) === '1') {
            hexValue135 += 'Charge Over Current Warning ';
          }
          if (one4.charAt(4) === '1') {
            hexValue135 += 'Discharge Over Current Warning ';
          }
          if (one4.charAt(3) === '1') {
            hexValue135 += 'Over SOC Warning ';
          }
          if (one4.charAt(2) === '1') {
            hexValue135 += 'Under SOC Warning ';
          }
          if (one4.charAt(1) === '1') {
            hexValue135 += 'Under SOH Warning ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue135 === '') {
            hexValue135 = '정상';
          }

          if (one5.charAt(7) === '1') {
            hexValue136 += 'Cell Over Voltage Protection Fault ';
          }
          if (one5.charAt(6) === '1') {
            hexValue136 += 'Cell Under Voltage Protection Fault ';
          }
          if (one5.charAt(5) === '1') {
            hexValue136 += 'Cell Difference Voltage Protection Fault ';
          }
          if (one5.charAt(4) === '1') {
            hexValue136 += 'Cell Over Temperature Protection Fault ';
          }
          if (one5.charAt(3) === '1') {
            hexValue136 += 'Cell Under Temperature Protection Fault ';
          }
          if (one5.charAt(2) === '1') {
            hexValue136 += 'Cell Difference Temperature Protection Fault ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue136 === '') {
            hexValue136 = '정상';
          }

          if (one6.charAt(7) === '1') {
            hexValue137 += 'Cell Over Voltage Protection Warning ';
          }
          if (one6.charAt(6) === '1') {
            hexValue137 += 'Cell Under Voltage Protection Warning ';
          }
          if (one6.charAt(5) === '1') {
            hexValue137 += 'Cell Difference Voltage Protection Warning ';
          }
          if (one6.charAt(4) === '1') {
            hexValue137 += 'Cell Over Temperature Protection Warning ';
          }
          if (one6.charAt(3) === '1') {
            hexValue137 += 'Cell Under Temperature Protection Warning ';
          }
          if (one6.charAt(2) === '1') {
            hexValue137 += 'Cell Difference Temperature Protection Warning ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue137 === '') {
            hexValue137 = '정상';
          }

          if (one7.charAt(7) === '1') {
            hexValue138 += 'Regen Over Current Fault ';
          }
          if (one7.charAt(6) === '1') {
            hexValue138 += 'Discharge Over Temperature Fault ';
          }
          if (one7.charAt(5) === '1') {
            hexValue138 += 'Discharge Under Temperature Fault ';
          }
          if (one7.charAt(4) === '1') {
            hexValue138 += 'Charge Over Power Fault ';
          }
          if (one7.charAt(3) === '1') {
            hexValue138 += ' Discharge Over Power Fault ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue138 === '') {
            hexValue138 = '정상';
          }

          if (one8.charAt(7) === '1') {
            hexValue139 += 'Regen Over Current Warning ';
          }
          if (one8.charAt(6) === '1') {
            hexValue139 += 'Discharge Over Temperature Warning ';
          }
          if (one8.charAt(5) === '1') {
            hexValue139 += 'Discharge Under Temperature Warning ';
          }
          if (one8.charAt(4) === '1') {
            hexValue139 += 'Charge Over Power Warning ';
          }
          if (one8.charAt(3) === '1') {
            hexValue139 += ' Discharge Over Power Warning ';
          }
          // 메시지가 하나도 추가되지 않은 경우에는 정상 상태로 설정
          if (hexValue139 === '') {
            hexValue139 = '정상';
          }
          break;
        case '83:':
          if (words.length >= 2) {
            let eightyone1 = words[6];
            let eightyone2 = words[7];
            hex = (parseInt(eightyone2 + eightyone1, 16) * 0.1).toFixed(1);
          }
      }
    }

    const process1 = (dataObj, words) => {
      if (words && words.length >= 8) {
        let one101 = words[0].substring(4);
        let one102 = words[1];
        dataObj.hexValue1 = (parseInt(one102 + one101, 16) * 0.001).toFixed(3);
        for (let i = 0; i < 3; i++) {
          const index1 = 2 + i * 2;
          const index2 = 3 + i * 2;
          const one16 = words[index1];
          const hexValue = (
            parseInt(words[index2] + one16, 16) * 0.001
          ).toFixed(3);
          if (i === 0) {
            dataObj.hexValue2 = hexValue;
          } else if (i === 1) {
            dataObj.hexValue3 = hexValue;
          } else if (i === 2) {
            dataObj.hexValue4 = hexValue;
          }
        }
      }
    };

    // 호출 시점
    let dataObj = {
      hexValue1: undefined,
      hexValue2: undefined,
      hexValue3: undefined,
      hexValue4: undefined,
    };

    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 4); // 세그먼트 타입 추출

      switch (type) {
        case '110:':
          process1(dataObj, words);
          hexValue = dataObj.hexValue1;
          hexValue1 = dataObj.hexValue2;
          hexValue2 = dataObj.hexValue3;
          hexValue3 = dataObj.hexValue4;
          break;
        case '111:': // '111:'도 '110:'과 유사한 방식으로 처리
          process1(dataObj, words);
          hexValue4 = dataObj.hexValue1;
          hexValue5 = dataObj.hexValue2;
          hexValue6 = dataObj.hexValue3;
          hexValue7 = dataObj.hexValue4;
          break;
        case '112:':
          process1(dataObj, words);
          hexValue8 = dataObj.hexValue1;
          hexValue9 = dataObj.hexValue2;
          hexValue10 = dataObj.hexValue3;
          hexValue11 = dataObj.hexValue4;
          break;
        case '113:':
          process1(dataObj, words);
          hexValue12 = dataObj.hexValue1;
          hexValue13 = dataObj.hexValue2;
          hexValue14 = dataObj.hexValue3;
          hexValue15 = dataObj.hexValue4;
          break;
        case '114:':
          process1(dataObj, words);
          hexValue16 = dataObj.hexValue1;
          hexValue17 = dataObj.hexValue2;
          hexValue18 = dataObj.hexValue3;
          hexValue19 = dataObj.hexValue4;
          break;
        case '115:':
          process1(dataObj, words);
          hexValue20 = dataObj.hexValue1;
          hexValue21 = dataObj.hexValue2;
          hexValue22 = dataObj.hexValue3;
          hexValue23 = dataObj.hexValue4;
          break;
        case '116:':
          process1(dataObj, words);
          hexValue24 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue25 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue26 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue27 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '117:':
          process1(dataObj, words);
          hexValue28 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue29 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue30 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue31 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '118:':
          process1(dataObj, words);
          hexValue32 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue33 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue34 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue35 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '119:':
          process1(dataObj, words);
          hexValue36 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue37 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue38 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue39 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '11a:':
          process1(dataObj, words);
          hexValue40 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue41 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue42 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue43 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '11b:':
          process1(dataObj, words);
          hexValue44 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue45 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue46 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue47 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '11c:':
          process1(dataObj, words);
          hexValue48 = dataObj.hexValue1;
          hexValue49 = dataObj.hexValue2;
          hexValue50 = dataObj.hexValue3;
          hexValue51 = dataObj.hexValue4;
          break;
        case '11d:':
          process1(dataObj, words);
          hexValue52 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue53 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue54 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue55 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '120:':
          process1(dataObj, words);
          hexValue56 = dataObj.hexValue1;
          hexValue57 = dataObj.hexValue2;
          hexValue58 = dataObj.hexValue3;
          hexValue59 = dataObj.hexValue4;
        case '121:':
          process1(dataObj, words);
          hexValue60 = dataObj.hexValue1;
          hexValue61 = dataObj.hexValue2;
          hexValue62 = dataObj.hexValue3;
          hexValue63 = dataObj.hexValue4;
          break;
        case '122:':
          process1(dataObj, words);
          hexValue64 = dataObj.hexValue1;
          hexValue65 = dataObj.hexValue2;
          hexValue66 = dataObj.hexValue3;
          hexValue67 = dataObj.hexValue4;
          break;
        case '123:':
          process1(dataObj, words);
          hexValue68 = dataObj.hexValue1;
          hexValue69 = dataObj.hexValue2;
          hexValue70 = dataObj.hexValue3;
          hexValue71 = dataObj.hexValue4;
          break;
        case '124:':
          process1(dataObj, words);
          hexValue72 = dataObj.hexValue1;
          hexValue73 = dataObj.hexValue2;
          hexValue74 = dataObj.hexValue3;
          hexValue75 = dataObj.hexValue4;
          break;
        case '125:':
          process1(dataObj, words);
          hexValue76 = dataObj.hexValue1;
          hexValue77 = dataObj.hexValue2;
          hexValue78 = dataObj.hexValue3;
          hexValue79 = dataObj.hexValue4;
          break;
        case '126:':
          process1(dataObj, words);
          hexValue80 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue81 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue82 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue83 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '127:':
          process1(dataObj, words);
          hexValue84 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue85 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue86 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue87 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '128:':
          process1(dataObj, words);
          hexValue88 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue89 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue90 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue91 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '129:':
          process1(dataObj, words);
          hexValue92 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue93 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue94 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue95 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '12a:':
          process1(dataObj, words);
          hexValue96 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue97 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue98 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue99 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '12b:':
          process1(dataObj, words);
          hexValue100 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue101 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue102 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue103 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '12c:':
          process1(dataObj, words);
          hexValue104 = dataObj.hexValue1;
          hexValue105 = dataObj.hexValue2;
          hexValue106 = dataObj.hexValue3;
          hexValue107 = dataObj.hexValue4;
          break;
        case '12d:':
          process1(dataObj, words);
          hexValue108 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue109 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue110 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue111 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '130:':
          process1(dataObj, words);
          hexValue140 = dataObj.hexValue1;
          hexValue141 = dataObj.hexValue2;
          hexValue142 = dataObj.hexValue3;
          hexValue143 = dataObj.hexValue4;
        case '131:':
          process1(dataObj, words);
          hexValue144 = dataObj.hexValue1;
          hexValue145 = dataObj.hexValue2;
          hexValue146 = dataObj.hexValue3;
          hexValue147 = dataObj.hexValue4;
          break;
        case '132:':
          process1(dataObj, words);
          hexValue148 = dataObj.hexValue1;
          hexValue149 = dataObj.hexValue2;
          hexValue150 = dataObj.hexValue3;
          hexValue151 = dataObj.hexValue4;
          break;
        case '133:':
          process1(dataObj, words);
          hexValue152 = dataObj.hexValue1;
          hexValue153 = dataObj.hexValue2;
          hexValue154 = dataObj.hexValue3;
          hexValue155 = dataObj.hexValue4;
          break;
        case '134:':
          process1(dataObj, words);
          hexValue156 = dataObj.hexValue1;
          hexValue157 = dataObj.hexValue2;
          hexValue158 = dataObj.hexValue3;
          hexValue159 = dataObj.hexValue4;
          break;
        case '135:':
          process1(dataObj, words);
          hexValue160 = dataObj.hexValue1;
          hexValue161 = dataObj.hexValue2;
          hexValue162 = dataObj.hexValue3;
          hexValue163 = dataObj.hexValue4;
          break;
        case '136:':
          process1(dataObj, words);
          hexValue164 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue165 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue166 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue167 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '137:':
          process1(dataObj, words);
          hexValue168 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue169 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue170 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue171 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '138:':
          process1(dataObj, words);
          hexValue172 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue173 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue174 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue175 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '139:':
          process1(dataObj, words);
          hexValue176 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue177 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue178 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue179 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '13a:':
          process1(dataObj, words);
          hexValue180 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue181 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue182 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue183 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '13b:':
          process1(dataObj, words);
          hexValue184 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue185 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue186 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue187 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        case '13c:':
          process1(dataObj, words);
          hexValue188 = dataObj.hexValue1;
          hexValue189 = dataObj.hexValue2;
          hexValue190 = dataObj.hexValue3;
          hexValue191 = dataObj.hexValue4;
          break;
        case '13d:':
          process1(dataObj, words);
          hexValue192 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue193 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue194 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue195 = (dataObj.hexValue4 * 100).toFixed(1);
          break;

        case '102:':
          process1(dataObj, words);
          hexValue112 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue113 = (dataObj.hexValue2 * 10).toFixed(1);
          hexValue114 = (dataObj.hexValue3 * 10).toFixed(1);
          hexValue115 = (dataObj.hexValue4 * 10).toFixed(1);
          break;
        case '103:':
          process1(dataObj, words);
          hexValue116 = dataObj.hexValue1;
          hexValue117 = dataObj.hexValue2;
          hexValue118 = dataObj.hexValue3;
          hexValue119 = dataObj.hexValue4;
          break;
        case '104:':
          process1(dataObj, words);
          hexValue120 = (dataObj.hexValue1 * 100).toFixed(1);
          hexValue121 = (dataObj.hexValue2 * 100).toFixed(1);
          hexValue122 = (dataObj.hexValue3 * 100).toFixed(1);
          hexValue123 = (dataObj.hexValue4 * 100).toFixed(1);
          break;
        default:
          break;
      }
    }
    let jsonData1 = {
      time: times,
      Battery: hex,
      RackNumber: hexValue128,
      AllRackReady: hexValue133,
      FalutWarning: `${hexValue134} ${hexValue135} ${hexValue136} ${hexValue137} ${hexValue138} ${hexValue139}`,
      TrayCellVolt1: `${hexValue} ${hexValue1} ${hexValue2} ${hexValue3} ${hexValue4} ${hexValue5} ${hexValue6} ${hexValue7} ${hexValue8} ${hexValue9} ${hexValue10} ${hexValue11} ${hexValue12} ${hexValue13} ${hexValue14} ${hexValue15} ${hexValue16} ${hexValue17} ${hexValue18} ${hexValue19} ${hexValue20} ${hexValue21}`,
      TrayCellTemp1: `${hexValue24} ${hexValue25} ${hexValue26} ${hexValue27} ${hexValue28} ${hexValue29} ${hexValue30} ${hexValue31} ${hexValue32} ${hexValue33} ${hexValue34} ${hexValue35} ${hexValue36} ${hexValue37} ${hexValue38} ${hexValue39} ${hexValue40} ${hexValue41} ${hexValue42} ${hexValue43} ${hexValue44} ${hexValue45}`,
      TrayCellAvgVolt1: `${hexValue48}`,
      TrayCellMinVolt1: `${hexValue49}`,
      TrayCellMaxVolt1: `${hexValue50}`,
      TrayCellDifVolt1: `${hexValue51}`,
      TrayCellAvgTemp1: `${hexValue52}`,
      TrayCellMinTemp1: `${hexValue53}`,
      TrayCellMaxTemp1: `${hexValue54}`,
      TrayDifTemp1: `${hexValue55}`,
      TrayCellVolt2: `${hexValue56} ${hexValue57} ${hexValue58} ${hexValue59} ${hexValue60} ${hexValue61} ${hexValue62} ${hexValue63} ${hexValue64} ${hexValue65} ${hexValue66} ${hexValue67} ${hexValue68} ${hexValue69} ${hexValue70} ${hexValue71} ${hexValue72} ${hexValue73} ${hexValue74} ${hexValue75} ${hexValue76} ${hexValue77}`,
      TrayCellTemp2: `${hexValue80} ${hexValue81} ${hexValue82} ${hexValue83} ${hexValue84} ${hexValue85} ${hexValue86} ${hexValue87} ${hexValue88} ${hexValue89} ${hexValue90} ${hexValue91} ${hexValue92} ${hexValue93} ${hexValue94} ${hexValue95} ${hexValue96} ${hexValue97} ${hexValue98} ${hexValue99} ${hexValue100} ${hexValue101}`,
      TrayCellAvgVolt2: `${hexValue104}`,
      TrayCellMinVolt2: `${hexValue105}`,
      TrayCellMaxVolt2: `${hexValue106}`,
      TrayCellDifVolt2: `${hexValue107}`,
      TrayCellAvgTemp2: `${hexValue108}`,
      TrayCellMinTemp2: `${hexValue109}`,
      TrayCellMaxTemp2: `${hexValue110}`,
      TrayCellDifTemp2: `${hexValue111}`,

      TrayCellVolt3: `${hexValue140} ${hexValue141} ${hexValue142} ${hexValue143} ${hexValue144} ${hexValue145} ${hexValue146} ${hexValue147} ${hexValue148} ${hexValue149} ${hexValue150} ${hexValue151} ${hexValue152} ${hexValue153} ${hexValue154} ${hexValue155} ${hexValue156} ${hexValue157} ${hexValue158} ${hexValue159} ${hexValue160} ${hexValue161}`,
      TrayCellTemp3: `${hexValue164} ${hexValue165} ${hexValue166} ${hexValue167} ${hexValue168} ${hexValue169} ${hexValue170} ${hexValue171} ${hexValue172} ${hexValue173} ${hexValue174} ${hexValue175} ${hexValue176} ${hexValue177} ${hexValue178} ${hexValue179} ${hexValue180} ${hexValue181} ${hexValue182} ${hexValue183} ${hexValue184} ${hexValue185}`,
      TrayCellAvgVolt3: `${hexValue188}`,
      TrayCellMinVolt3: `${hexValue189}`,
      TrayCellMaxVolt3: `${hexValue190}`,
      TrayCellDifVolt3: `${hexValue191}`,
      TrayCellAvgTemp3: `${hexValue192}`,
      TrayCellMinTemp3: `${hexValue193}`,
      TrayCellMaxTemp3: `${hexValue194}`,
      TrayCellDifTemp3: `${hexValue195}`,

      RackRealSOC: `${hexValue112}`,
      RackSOH: `${hexValue113}`,
      UserSOC: `${hexValue114}`,
      RackCellAvgVolt: `${hexValue116}`,
      RackCellMinVolt: `${hexValue117}`,
      RackCellMaxVolt: `${hexValue118}`,
      RackCellDifVolt: `${hexValue119}`,
      RackCellAvgTemp: `${hexValue120}`,
      RackCellMinTemp: `${hexValue121}`,
      RackCellMaxTemp: `${hexValue122}`,
      RackCellDifTemp: `${hexValue123}`,
    };
    let jsonString = JSON.stringify(jsonData1, null, 2);
    // await insertJsonToDynamoDB(jsonString);
    console.log(jsonString);
  } catch (error) {
    console.error('DynamoDB에서 데이터를 읽는 중 오류 발생:', error);
    return null;
  }
};

// // 1초마다 데이터 가져오기
// setInterval(async () => {
//   try {
//     const data = await getData();
//     if (data) {
//     }
//   } catch (error) {
//     console.error('1초마다 데이터 가져오기 중 오류 발생:', error);
//   }
// }, 1000); // 1000밀리초 (1초)마다 getData 함수 호출

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
