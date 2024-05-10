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

    let eighty,
      eightyone1,
      eightyone2,
      eightyone3,
      eightyone4,
      eightyone5,
      eightyone6,
      eightyone7,
      eightyone8,
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
      one021,
      one022,
      one023,
      one024,
      one025,
      one026,
      one027,
      one101,
      one102,
      one103,
      one104,
      one105,
      one106,
      one107,
      one108,
      one111,
      one112,
      one113,
      one114,
      one115,
      one116,
      one117,
      one118,
      one121,
      one122,
      one123,
      one124,
      one125,
      one126,
      one127,
      one128,
      one131,
      one132,
      one133,
      one134,
      one135,
      one136,
      one137,
      one138,
      one141,
      one142,
      one143,
      one144,
      one145,
      one146,
      one147,
      one148,
      one161,
      one162,
      one163,
      one164,
      one165,
      one166,
      one167,
      one168,
      one171,
      one172,
      one173,
      one174,
      one175,
      one176,
      one177,
      one178,
      one181,
      one182,
      one183,
      one184,
      one185,
      one186,
      one187,
      one188,
      one191,
      one192,
      one193,
      one194,
      one195,
      one196,
      one197,
      one198,
      one1A1,
      one1A2,
      one1A3,
      one1A4,
      one1A5,
      one1A6,
      one1A7,
      one1A8,
      one1B1,
      one1B2,
      one1B3,
      one1B4,
      one1B5,
      one1B6,
      one1B7,
      one1B8;

    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 3); // 세그먼트 타입 추출

      switch (type) {
        case '80:':
          if (words.length >= 3) {
            eighty = words[2];
          }
          break;

        case '81:':
          if (words.length >= 2) {
            eightyone1 = words[0].substring(3);
            eightyone2 = words[1];
            hexValue = (parseInt(eightyone2 + eightyone1, 16) * 0.1).toFixed(1);
          }
          if (words.length >= 2) {
            eightyone3 = words[2];
            eightyone4 = words[3];
            hexValue45 = (parseInt(eightyone4 + eightyone3, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            eightyone5 = words[4];
            eightyone6 = words[5];
            hexValue46 = (parseInt(eightyone6 + eightyone5, 16) * 0.1).toFixed(
              1
            );
          }
          if (words.length >= 2) {
            eightyone7 = words[6];
            eightyone8 = words[7];
            hexValue47 = (parseInt(eightyone8 + eightyone7, 16) * 0.1).toFixed(
              1
            );
          }
          break;

        default:
          break;
      }
    }
    for (const segment of segments) {
      const words = segment.split(' ').map((word) => word.trim());
      const type = words[0].substring(0, 4); // 세그먼트 타입 추출

      switch (type) {
        case '102:':
          if (words.length >= 8) {
            one021 = words[0].substring(4);
            one022 = words[1];
            hexValue48 = (parseInt(one022 + one021, 16) * 0.1).toFixed(1);

            for (let i = 0; i < 2; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.01
              ).toFixed(1);

              if (i === 0) {
                one023 = one16;
                hexValue49 = hexValue;
              } else if (i === 1) {
                one025 = one16;
                hexValue50 = hexValue;
              }
            }
          }
          break;

        case '110:':
          if (words.length >= 8) {
            one101 = words[0].substring(4);
            one102 = words[1];
            hexValue23 = (parseInt(one102 + one101, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one103 = one16;
                hexValue24 = hexValue;
              } else if (i === 1) {
                one105 = one16;
                hexValue25 = hexValue;
              } else if (i === 2) {
                one107 = one16;
                hexValue26 = hexValue;
              }
            }
          }
          break;

        case '111:':
          if (words.length >= 8) {
            one111 = words[0].substring(4);
            one112 = words[1];
            hexValue27 = (parseInt(one112 + one111, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one113 = one16;
                hexValue28 = hexValue;
              } else if (i === 1) {
                one115 = one16;
                hexValue29 = hexValue;
              } else if (i === 2) {
                one117 = one16;
                hexValue30 = hexValue;
              }
            }
          }
          break;
        case '112:':
          if (words.length >= 8) {
            one121 = words[0].substring(4);
            one122 = words[1];
            hexValue31 = (parseInt(one122 + one121, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one123 = one16;
                hexValue32 = hexValue;
              } else if (i === 1) {
                one125 = one16;
                hexValue33 = hexValue;
              } else if (i === 2) {
                one127 = one16;
                hexValue34 = hexValue;
              }
            }
          }
          break;
        case '113:':
          if (words.length >= 8) {
            one131 = words[0].substring(4);
            one132 = words[1];
            hexValue35 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one133 = one16;
                hexValue36 = hexValue;
              } else if (i === 1) {
                one135 = one16;
                hexValue37 = hexValue;
              } else if (i === 2) {
                one137 = one16;
                hexValue38 = hexValue;
              }
            }
          }
          break;
        case '114:':
          if (words.length >= 8) {
            one131 = words[0].substring(4);
            one132 = words[1];
            hexValue39 = (parseInt(one132 + one131, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one133 = one16;
                hexValue40 = hexValue;
              } else if (i === 1) {
                one135 = one16;
                hexValue41 = hexValue;
              } else if (i === 2) {
                one137 = one16;
                hexValue42 = hexValue;
              }
            }
          }
          break;
        case '115:':
          if (words.length >= 8) {
            one141 = words[0].substring(4);
            one142 = words[1];
            hexValue43 = (parseInt(one142 + one141, 16) * 0.001).toFixed(3);

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const index2 = 3 + i * 2;
              const one16 = words[index1];
              const hexValue = (
                parseInt(words[index2] + one16, 16) * 0.001
              ).toFixed(3);

              if (i === 0) {
                one143 = one16;
                hexValue44 = hexValue;
              } else if (i === 1) {
                one145 = one16;
                hexValue45 = hexValue;
              } else if (i === 2) {
                one147 = one16;
                hexValue46 = hexValue;
              }
            }
          }
          break;

        case '116:':
          if (words.length >= 8) {
            one161 = words[0].substring(4);
            // one162 = words[1];
            hexValue1 = (parseInt(one161, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              const one16 = words[index1];
              const hexValue = (parseInt(one16, 16) / 10).toFixed(1);
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
          break;

        case '117:':
          if (words.length >= 8) {
            one171 = words[0].substring(4);
            hexValue5 = (parseInt(one171, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              const index1 = 2 + i * 2;
              let one17 = words[index1];
              let hexValue = (parseInt(one17, 16) / 10).toFixed(1);
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
          break;
        case '118:':
          if (words.length >= 8) {
            one181 = words[0].substring(4);

            hexValue9 = (parseInt(one181, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one18 = words[index1];
              let hexValue = (parseInt(one18, 16) / 10).toFixed(1);

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
          break;
        case '119:':
          if (words.length >= 8) {
            one191 = words[0].substring(4);

            hexValue13 = (parseInt(one191, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환

            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one19 = words[index1];
              let hexValue = (parseInt(one19, 16) / 10).toFixed(1);

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
          break;
        case '11a:':
          if (words.length >= 8) {
            one1A1 = words[0].substring(4);

            hexValue17 = (parseInt(one1A1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            for (let i = 0; i < 3; i++) {
              let index1 = 2 + i * 2;

              let one11a = words[index1];
              let hexValue = (parseInt(one11a, 16) / 10).toFixed(1);

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
          break;
        case '11b:':
          if (words.length >= 8) {
            one1B1 = words[0].substring(4);

            hexValue21 = (parseInt(one1B1, 16) / 10).toFixed(1);
            // 16진수를 10진수로 변환
            if (segment.startsWith('11b:')) {
              const words = segment.split(' ').map((word) => word.trim());
              if (words.length >= 3) {
                one1B3 = words[2];
                one1B4 = words[3];
                hexValue22 = (parseInt(one1B3, 16) / 10).toFixed(1);
                // 16진수를 10진수로 변환
                break;
              }
            }
          }
          break;
        default:
          break;
      }
    }
    console.log('Rack Number/', eighty);
    console.log('Rack 전체의 평균 전압/', hexValue);
    console.log('Rack 전체의 평균 전류/', hexValue45);
    console.log('Rack 전체의 합산 전류/', hexValue46);
    console.log('Rack 전체의 평균 파워/', hexValue47);
    console.log('Rack RealSOC/', hexValue48);
    console.log('Rack SOH/', hexValue49);
    console.log('Rack UserSOC/', hexValue50);

    console.log(
      'cell 전압/',
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
      hexValue44
    );

    console.log(
      'cell  온도/',
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
      hexValue22
    );
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
