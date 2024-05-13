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
      hexValue121;

    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 3); // 세그먼트 타입 추출

      switch (type) {
        case '80:':
          if (words.length >= 3) {
            hex = words[2];
          }
          break;

        case '81:':
          if (words.length >= 2) {
            let eightyone1 = words[0].substring(3);
            let eightyone2 = words[1];
            hexValue = (parseInt(eightyone2 + eightyone1, 16) * 0.1).toFixed(1);
          }
          if (words.length >= 2) {
            let eightyone3 = words[2];
            let eightyone4 = words[3];
            hexValue45 = (parseInt(eightyone4 + eightyone3, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            let eightyone5 = words[4];
            let eightyone6 = words[5];
            hexValue46 = (parseInt(eightyone6 + eightyone5, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            let eightyone7 = words[6];
            let eightyone8 = words[7];
            hexValue47 = (parseInt(eightyone8 + eightyone7, 16) * 0.1).toFixed(
              1
            );
          }
          break;
        case '82:':
          let one = words[0];
          let one1 = words[1];
          let one2 = words[2];
          let one3 = words[3];
          let one4 = words[4];
          let one5 = words[5];
          let one6 = words[6];
          let one7 = words[7];
          let oneone = parseInt(one, 10);
          let one11 = parseInt(one, 10);
          let one22 = parseInt(one, 10);
          let one33 = parseInt(one, 10);
          let one44 = parseInt(one, 10);
          let one55 = parseInt(one, 10);
          let one66 = parseInt(one, 10);
          let one77 = parseInt(one, 10);

          hexValue121 = one4.toString(2);
      }
    }
    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 4); // 세그먼트 타입 추출

      switch (type) {
        case '102:':
          if (words.length >= 8) {
            let one021 = words[0].substring(4);
            let one022 = words[1];
            hexValue48 = (parseInt(one022 + one021, 16) * 0.1).toFixed(1);

            for (let i = 0; i < 2; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.01
              ).toFixed(1);

              if (i === 0) {
                hexValue49 = hexValue;
              } else if (i === 1) {
                hexValue50 = hexValue;
              }
            }
          }
          break;

        case '110:':
          if (words.length >= 8) {
            let one101 = words[0].substring(4);
            let one102 = words[1];
            hexValue23 = (parseInt(one102 + one101, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue24 = hexValue;
              } else if (i === 1) {
                hexValue25 = hexValue;
              } else if (i === 2) {
                hexValue26 = hexValue;
              }
            }
          }
          break;

        case '111:':
          if (words.length >= 8) {
            let one111 = words[0].substring(4);
            let one112 = words[1];
            hexValue27 = (parseInt(one112 + one111, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue28 = hexValue;
              } else if (i === 1) {
                hexValue29 = hexValue;
              } else if (i === 2) {
                hexValue30 = hexValue;
              }
            }
          }
          break;
        case '112:':
          if (words.length >= 8) {
            let one121 = words[0].substring(4);
            let one122 = words[1];
            hexValue31 = (parseInt(one122 + one121, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue32 = hexValue;
              } else if (i === 1) {
                hexValue33 = hexValue;
              } else if (i === 2) {
                hexValue34 = hexValue;
              }
            }
          }
          break;
        case '113:':
          if (words.length >= 8) {
            let one131 = words[0].substring(4);
            let one132 = words[1];
            hexValue35 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue36 = hexValue;
              } else if (i === 1) {
                hexValue37 = hexValue;
              } else if (i === 2) {
                hexValue38 = hexValue;
              }
            }
          }
          break;
        case '114:':
          if (words.length >= 8) {
            let one131 = words[0].substring(4);
            let one132 = words[1];
            hexValue39 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue40 = hexValue;
              } else if (i === 1) {
                hexValue41 = hexValue;
              } else if (i === 2) {
                hexValue42 = hexValue;
              }
            }
          }
          break;
        case '115:':
          if (words.length >= 8) {
            let one141 = words[0].substring(4);
            let one142 = words[1];
            hexValue43 = (parseInt(one142 + one141, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue44 = hexValue;
              } else if (i === 1) {
                hexValue45 = hexValue;
              } else if (i === 2) {
                hexValue46 = hexValue;
              }
            }
          }
          break;

        case '116:':
          if (words.length >= 8) {
            let one161 = words[0].substring(4);
            // one162 = words[1];
            hexValue1 = (parseInt(one161, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const one16 = words[index1];
              const hexValue = (parseInt(one16, 16) / 10).toFixed(1);
              // 변수에 값을 할당
              if (i === 0) {
                hexValue2 = hexValue;
              } else if (i === 1) {
                hexValue3 = hexValue;
              } else if (i === 2) {
                hexValue4 = hexValue;
              }
            }
          }
          break;

        case '117:':
          if (words.length >= 8) {
            let one171 = words[0].substring(4);
            hexValue5 = (parseInt(one171, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              let one17 = words[index1];
              let hexValue = (parseInt(one17, 16) / 10).toFixed(1);
              // 변수에 값을 할당
              if (i === 0) {
                hexValue6 = hexValue;
              } else if (i === 1) {
                hexValue7 = hexValue;
              } else if (i === 2) {
                hexValue8 = hexValue;
              }
            }
          }
          break;
        case '118:':
          if (words.length >= 8) {
            let one181 = words[0].substring(4);

            hexValue9 = (parseInt(one181, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one18 = words[index1];
              let hexValue = (parseInt(one18, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue10 = hexValue;
              } else if (i === 1) {
                hexValue11 = hexValue;
              } else if (i === 2) {
                hexValue12 = hexValue;
              }
            }
          }
          break;
        case '119:':
          if (words.length >= 8) {
            let one191 = words[0].substring(4);

            hexValue13 = (parseInt(one191, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one19 = words[index1];
              let hexValue = (parseInt(one19, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue14 = hexValue;
              } else if (i === 1) {
                hexValue15 = hexValue;
              } else if (i === 2) {
                hexValue16 = hexValue;
              }
            }
          }
          break;
        case '11a:':
          if (words.length >= 8) {
            let one1A1 = words[0].substring(4);

            hexValue17 = (parseInt(one1A1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one11a = words[index1];
              let hexValue = (parseInt(one11a, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue18 = hexValue;
              } else if (i === 1) {
                hexValue19 = hexValue;
              } else if (i === 2) {
                hexValue20 = hexValue;
              }
            }
          }
          break;
        case '11b:':
          if (words.length >= 8) {
            let one1B1 = words[0].substring(4);

            hexValue21 = (parseInt(one1B1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            if (segment.startsWith('11b:')) {
              const words = segment.split(' ').map((word) => word.trim());
              if (words.length >= 3) {
                let one1B3 = words[2];

                hexValue22 = (parseInt(one1B3, 16) / 10).toFixed(1);
                // 16진수를 10진수로 변환
                break;
              }
            }
          }
          break;

        case '11c:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue51 = (parseInt(one2 + one1, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue52 = hexValue;
              } else if (i === 1) {
                hexValue53 = hexValue;
              } else if (i === 2) {
                hexValue54 = hexValue;
              }
            }
          }
          break;
        case '11d:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue55 = (parseInt(one2 + one1, 16) * 0.1).toFixed(1);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.1
              ).toFixed(1);

              if (i === 0) {
                hexValue56 = hexValue;
              } else if (i === 1) {
                hexValue57 = hexValue;
              } else if (i === 2) {
                hexValue58 = hexValue;
              }
            }
          }
          break;

        //
        case '103:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue59 = (parseInt(one2 + one1, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue60 = hexValue;
              } else if (i === 1) {
                hexValue61 = hexValue;
              } else if (i === 2) {
                hexValue62 = hexValue;
              }
            }
          }
          break;
        case '104:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue63 = (parseInt(one2 + one1, 16) * 0.1).toFixed(1);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.1
              ).toFixed(1);

              if (i === 0) {
                hexValue64 = hexValue;
              } else if (i === 1) {
                hexValue65 = hexValue;
              } else if (i === 2) {
                hexValue66 = hexValue;
              }
            }
          }
          break;

        //

        case '120:':
          if (words.length >= 8) {
            let one101 = words[0].substring(4);
            let one102 = words[1];
            hexValue67 = (parseInt(one102 + one101, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue68 = hexValue;
              } else if (i === 1) {
                hexValue69 = hexValue;
              } else if (i === 2) {
                hexValue70 = hexValue;
              }
            }
          }
          break;

        case '121:':
          if (words.length >= 8) {
            let one111 = words[0].substring(4);
            let one112 = words[1];
            hexValue71 = (parseInt(one112 + one111, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue72 = hexValue;
              } else if (i === 1) {
                hexValue73 = hexValue;
              } else if (i === 2) {
                hexValue74 = hexValue;
              }
            }
          }
          break;
        case '122:':
          if (words.length >= 8) {
            let one121 = words[0].substring(4);
            let one122 = words[1];
            hexValue75 = (parseInt(one122 + one121, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue76 = hexValue;
              } else if (i === 1) {
                hexValue77 = hexValue;
              } else if (i === 2) {
                hexValue78 = hexValue;
              }
            }
          }
          break;
        case '123:':
          if (words.length >= 8) {
            let one131 = words[0].substring(4);
            let one132 = words[1];
            hexValue79 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue80 = hexValue;
              } else if (i === 1) {
                hexValue81 = hexValue;
              } else if (i === 2) {
                hexValue82 = hexValue;
              }
            }
          }
          break;
        case '124:':
          if (words.length >= 8) {
            let one131 = words[0].substring(4);
            let one132 = words[1];
            hexValue83 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue84 = hexValue;
              } else if (i === 1) {
                hexValue85 = hexValue;
              } else if (i === 2) {
                hexValue86 = hexValue;
              }
            }
          }
          break;
        case '125:':
          if (words.length >= 8) {
            let one141 = words[0].substring(4);
            let one142 = words[1];
            hexValue87 = (parseInt(one142 + one141, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue88 = hexValue;
              }
            }
          }
          break;

        case '126:':
          if (words.length >= 8) {
            let one161 = words[0].substring(4);
            // one162 = words[1];
            hexValue91 = (parseInt(one161, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const one16 = words[index1];
              const hexValue = (parseInt(one16, 16) / 10).toFixed(1);
              // 변수에 값을 할당
              if (i === 0) {
                hexValue92 = hexValue;
              } else if (i === 1) {
                hexValue93 = hexValue;
              } else if (i === 2) {
                hexValue94 = hexValue;
              }
            }
          }
          break;

        case '127:':
          if (words.length >= 8) {
            let one171 = words[0].substring(4);
            hexValue95 = (parseInt(one171, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              let one17 = words[index1];
              let hexValue = (parseInt(one17, 16) / 10).toFixed(1);
              // 변수에 값을 할당
              if (i === 0) {
                hexValue96 = hexValue;
              } else if (i === 1) {
                hexValue97 = hexValue;
              } else if (i === 2) {
                hexValue98 = hexValue;
              }
            }
          }
          break;
        case '128:':
          if (words.length >= 8) {
            let one181 = words[0].substring(4);

            hexValue99 = (parseInt(one181, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one18 = words[index1];
              let hexValue = (parseInt(one18, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue100 = hexValue;
              } else if (i === 1) {
                hexValue101 = hexValue;
              } else if (i === 2) {
                hexValue102 = hexValue;
              }
            }
          }
          break;
        case '129:':
          if (words.length >= 8) {
            let one191 = words[0].substring(4);

            hexValue103 = (parseInt(one191, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one19 = words[index1];
              let hexValue = (parseInt(one19, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue104 = hexValue;
              } else if (i === 1) {
                hexValue105 = hexValue;
              } else if (i === 2) {
                hexValue106 = hexValue;
              }
            }
          }
          break;
        case '12a:':
          if (words.length >= 8) {
            let one1A1 = words[0].substring(4);

            hexValue107 = (parseInt(one1A1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one11a = words[index1];
              let hexValue = (parseInt(one11a, 16) / 10).toFixed(1);

              // 변수에 값을 할당
              if (i === 0) {
                hexValue108 = hexValue;
              } else if (i === 1) {
                hexValue109 = hexValue;
              } else if (i === 2) {
                hexValue110 = hexValue;
              }
            }
          }
          break;
        case '12b:':
          if (words.length >= 8) {
            let one1B1 = words[0].substring(4);

            hexValue111 = (parseInt(one1B1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            if (segment.startsWith('11b:')) {
              const words = segment.split(' ').map((word) => word.trim());
              if (words.length >= 3) {
                let one1B3 = words[2];

                hexValue112 = (parseInt(one1B3, 16) / 10).toFixed(1);
                // 16진수를 10진수로 변환
                break;
              }
            }
          }
          break;

        case '12c:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue113 = (parseInt(one2 + one1, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                hexValue114 = hexValue;
              } else if (i === 1) {
                hexValue115 = hexValue;
              } else if (i === 2) {
                hexValue116 = hexValue;
              }
            }
          }
          break;
        case '12d:':
          if (words.length >= 8) {
            let one1 = words[0].substring(4);
            let one2 = words[1];
            hexValue117 = (parseInt(one2 + one1, 16) * 0.1).toFixed(1);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one3 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one3, 16) * 0.1
              ).toFixed(1);

              if (i === 0) {
                hexValue118 = hexValue;
              } else if (i === 1) {
                hexValue119 = hexValue;
              } else if (i === 2) {
                hexValue120 = hexValue;
              }
            }
          }
          break;
        default:
          break;
      }
    }

    let jsonData1 = {};
    // jsonData1.serial_code = serial_code;
    jsonData1.time = times;
    jsonData1.RackNumber = hex;
    jsonData1.RackAvgVolt = hexValue;
    jsonData1.RackAvgCurr = hexValue45;
    jsonData1.RackSumCurr = hexValue46;
    jsonData1.RackSumPower = hexValue47;
    jsonData1.RackRealSOC = hexValue48;
    jsonData1.RackSOH = hexValue49;
    jsonData1.UserSOC = hexValue50;
    jsonData1.RackCellAvgVolt = hexValue59;
    jsonData1.RackCellMinVolt = hexValue60;
    jsonData1.RackCellMaxVolt = hexValue61;
    jsonData1.RackCellDifVolt = hexValue62;
    jsonData1.RackCellAvgTemp = hexValue63;
    jsonData1.RackCellMinTemp = hexValue64;
    jsonData1.RackCellMaxTemp = hexValue65;
    jsonData1.RackCellDifTemp = hexValue66;
    jsonData1.TrayCellAvgVolt1 = hexValue51;
    jsonData1.TrayCellMinVolt1 = hexValue52;
    jsonData1.TrayCellMaxVolt1 = hexValue53;
    jsonData1.TrayCellDifVolt1 = hexValue54;
    jsonData1.TrayCellAvgTemp1 = hexValue55;
    jsonData1.TrayCellMinTemp1 = hexValue56;
    jsonData1.TrayCellMaxTemp1 = hexValue57;
    jsonData1.TrayCellDifTemp1 = hexValue58;
    jsonData1.TrayCellVolt1 = `${hexValue23} ${hexValue24} ${hexValue25} ${hexValue26} ${hexValue27} ${hexValue28} ${hexValue29} ${hexValue30} ${hexValue31} ${hexValue32} ${hexValue33} ${hexValue34} ${hexValue35} ${hexValue36} ${hexValue37} ${hexValue38} ${hexValue39} ${hexValue40} ${hexValue41} ${hexValue42} ${hexValue43} ${hexValue44}`;

    jsonData1.TrayCellTemp1 = `${hexValue1} ${hexValue2} ${hexValue3} ${hexValue4} ${hexValue5} ${hexValue6} ${hexValue7} ${hexValue8} ${hexValue9} ${hexValue10} ${hexValue11} ${hexValue12} ${hexValue13} ${hexValue14} ${hexValue15} ${hexValue16} ${hexValue17} ${hexValue18} ${hexValue19} ${hexValue20} ${hexValue21} ${hexValue22}`;
    jsonData1.TrayCellAvgVolt2 = hexValue113;
    jsonData1.TrayCellMinVolt2 = hexValue114;
    jsonData1.TrayCellMaxVolt2 = hexValue115;
    jsonData1.TrayCellDifVolt2 = hexValue116;
    jsonData1.TrayCellAvgTemp2 = hexValue117;
    jsonData1.TrayCellMinTemp2 = hexValue118;
    jsonData1.TrayCellMaxTemp2 = hexValue119;
    jsonData1.TrayCellDifTemp2 = hexValue120;
    jsonData1.TrayCellVolt2 = `${hexValue67} ${hexValue68} ${hexValue69} ${hexValue70} ${hexValue71} ${hexValue72} ${hexValue73} ${hexValue74} ${hexValue75} ${hexValue76} ${hexValue77} ${hexValue78} ${hexValue79} ${hexValue80} ${hexValue81} ${hexValue82} ${hexValue83} ${hexValue84} ${hexValue85} ${hexValue86} ${hexValue87} ${hexValue88}`;

    jsonData1.TrayCellTemp2 = `${hexValue91} ${hexValue92} ${hexValue93} ${hexValue94} ${hexValue95} ${hexValue96} ${hexValue97} ${hexValue98} ${hexValue99} ${hexValue100} ${hexValue101} ${hexValue102} ${hexValue103} ${hexValue104} ${hexValue105} ${hexValue106} ${hexValue107} ${hexValue108} ${hexValue109} ${hexValue110}`;

    let jsonString = JSON.stringify(jsonData1);
    // await insertJsonToDynamoDB(jsonString);
    // console.log(jsonString);
    console.log(hexValue121);
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
}, 1000); // 1000밀리초 (1초)마다 getData 함수 호출

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
