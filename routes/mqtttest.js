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
    let hexValue = null;
    let hexValue1 = null;
    let hexValue2 = null;
    let hexValue3 = null;
    let hexValue4 = null;
    let hexValue5 = null;
    let hexValue6 = null;
    let hexValue7 = null;
    let hexValue8 = null;
    let hexValue9 = null;
    let hexValue10 = null;
    let hexValue11 = null;
    let hexValue12 = null;
    let hexValue13 = null;
    let hexValue14 = null;
    let hexValue15 = null;
    let hexValue16 = null;
    let hexValue17 = null;
    let hexValue18 = null;
    let hexValue19 = null;
    let hexValue20 = null;
    let hexValue21 = null;
    let hexValue22 = null;
    let hexValue23 = null;
    let hexValue24 = null;
    let hexValue25 = null;
    let hexValue26 = null;
    let hexValue27 = null;
    let hexValue28 = null;
    let hexValue29 = null;
    let hexValue30 = null;
    let hexValue31 = null;
    let one161 = null;
    let one162 = null;
    let one163 = null;
    let one164 = null;
    let one165 = null;
    let one166 = null;
    let one167 = null;
    let one168 = null;
    let one171 = null;
    let one172 = null;
    let one173 = null;
    let one174 = null;
    let one175 = null;
    let one176 = null;
    let one177 = null;
    let one178 = null;
    let one181 = null;
    let one182 = null;
    let one183 = null;
    let one184 = null;
    let one185 = null;
    let one186 = null;
    let one187 = null;
    let one188 = null;
    let one191 = null;
    let one192 = null;
    let one193 = null;
    let one194 = null;
    let one195 = null;
    let one196 = null;
    let one197 = null;
    let one198 = null;
    let one1A1 = null;
    let one1A2 = null;
    let one1A3 = null;
    let one1A4 = null;
    let one1A5 = null;
    let one1A6 = null;
    let one1A7 = null;
    let one1A8 = null;
    let one1B1 = null;
    let one1B2 = null;
    let one1B3 = null;
    let one1B4 = null;
    let one1B5 = null;
    let one1B6 = null;
    let one1B7 = null;
    let one1B8 = null;

    for (const segment of segments) {
      if (segment.startsWith('80:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          eighty = words[2];
        }
      }
      if (segment.startsWith('81:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 2) {
          eightyone1 = words[0].substring(3);
          eightyone2 = words[1];
          hexValue = (
            parseInt(eightyone2, 16) + parseInt(eightyone1, 16)
          ).toFixed(1); // eightyone2와 eightyone1을 합친 16진수 값 (예: '1c87')
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('116:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one161 = words[0].substring(4);
          one162 = words[1];
          hexValue1 = (
            parseInt(one162, 16) +
            parseInt(one161, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('116:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 8) {
          for (let i = 0; i < 3; i++) {
            let index1 = 2 + i * 2;
            let index2 = 3 + i * 2;
            let one16 = words[index1];
            let hexValue = (
              parseInt(words[index2], 16) +
              parseInt(one16, 16) / 10
            ).toFixed(1);

            // 변수에 값을 할당
            if (i === 0) {
              one163 = one16;
              hexValue2 = hexValue;
            } else if (i === 1) {
              one165 = one16;
              hexValue3 = hexValue;
            } else if (i === 2) {
              one167 = one16;
              hexValue4 = hexValue;
            }
          }
        }
      }
      if (segment.startsWith('117:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one171 = words[0].substring(4);
          one172 = words[1];
          hexValue5 = (
            parseInt(one172, 16) +
            parseInt(one171, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('117:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 8) {
          for (let i = 0; i < 3; i++) {
            let index1 = 2 + i * 2;
            let index2 = 3 + i * 2;
            let one17 = words[index1];
            let hexValue = (
              parseInt(words[index2], 16) +
              parseInt(one17, 16) / 10
            ).toFixed(1);

            // 변수에 값을 할당
            if (i === 0) {
              one173 = one17;
              hexValue6 = hexValue;
            } else if (i === 1) {
              one175 = one17;
              hexValue7 = hexValue;
            } else if (i === 2) {
              one177 = one17;
              hexValue8 = hexValue;
            }
          }
        }
      }
      if (segment.startsWith('118:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one181 = words[0].substring(4);
          one182 = words[1];
          hexValue9 = (
            parseInt(one182, 16) +
            parseInt(one181, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('118:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 8) {
          for (let i = 0; i < 3; i++) {
            let index1 = 2 + i * 2;
            let index2 = 3 + i * 2;
            let one18 = words[index1];
            let hexValue = (
              parseInt(words[index2], 16) +
              parseInt(one18, 16) / 10
            ).toFixed(1);

            // 변수에 값을 할당
            if (i === 0) {
              one183 = one18;
              hexValue10 = hexValue;
            } else if (i === 1) {
              one185 = one18;
              hexValue11 = hexValue;
            } else if (i === 2) {
              one187 = one18;
              hexValue12 = hexValue;
            }
          }
        }
      }

      if (segment.startsWith('119:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one191 = words[0].substring(4);
          one192 = words[1];
          hexValue13 = (
            parseInt(one192, 16) +
            parseInt(one191, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('119:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 8) {
          for (let i = 0; i < 3; i++) {
            let index1 = 2 + i * 2;
            let index2 = 3 + i * 2;
            let one19 = words[index1];
            let hexValue = (
              parseInt(words[index2], 16) +
              parseInt(one19, 16) / 10
            ).toFixed(1);

            // 변수에 값을 할당
            if (i === 0) {
              one193 = one19;
              hexValue14 = hexValue;
            } else if (i === 1) {
              one195 = one19;
              hexValue15 = hexValue;
            } else if (i === 2) {
              one197 = one19;
              hexValue16 = hexValue;
            }
          }
        }
      }
      if (segment.startsWith('11a:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one1A1 = words[0].substring(4);
          one1A2 = words[1];
          hexValue17 = (
            parseInt(one1A2, 16) +
            parseInt(one1A1, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('11a:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 8) {
          for (let i = 0; i < 3; i++) {
            let index1 = 2 + i * 2;
            let index2 = 3 + i * 2;
            let one11a = words[index1];
            let hexValue = (
              parseInt(words[index2], 16) +
              parseInt(one11a, 16) / 10
            ).toFixed(1);

            // 변수에 값을 할당
            if (i === 0) {
              one1A3 = one11a;
              hexValue18 = hexValue;
            } else if (i === 1) {
              one1A5 = one11a;
              hexValue19 = hexValue;
            } else if (i === 2) {
              one1A7 = one11a;
              hexValue20 = hexValue;
            }
          }
        }
      }
      if (segment.startsWith('11b:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one1B1 = words[0].substring(4);
          one1B2 = words[1];
          hexValue21 = (
            parseInt(one1B2, 16) +
            parseInt(one1B1, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
        }
      }
      if (segment.startsWith('11b:')) {
        const words = segment.split(' ').map((word) => word.trim());
        if (words.length >= 3) {
          one1B3 = words[2];
          one1B4 = words[3];
          hexValue22 = (
            parseInt(one1B4, 16) +
            parseInt(one1B3, 16) / 10
          ).toFixed(1);
          // 16진수를 10진수로 변환
          break;
        }
      }
    }

    console.log('Rack Number/', eighty);
    console.log('Rack 전체의 평균 전압/', hexValue);
    console.log(
      'cell 1,2,3,4 온도/',
      hexValue1,
      hexValue2,
      hexValue3,
      hexValue4
    );
    console.log(
      'cell 5,6,7,8 온도/',
      hexValue5,
      hexValue6,
      hexValue7,
      hexValue8
    );
    console.log(
      'cell 9,10,11,12 온도/',
      hexValue9,
      hexValue10,
      hexValue11,
      hexValue12
    );
    console.log(
      'cell 13,14,15,16 온도/',
      hexValue13,
      hexValue14,
      hexValue15,
      hexValue16
    );
    console.log(
      'cell 17,18,19,20 온도/',
      hexValue17,
      hexValue18,
      hexValue19,
      hexValue20
    );
    console.log('cell 21, 22 온도/', hexValue21, hexValue22);
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
