const { createApp } = Vue;

$(document).ready(function () {
  $('.tile').click(function () {
    $('.tile').removeClass('selected');
    $(this).addClass('selected');
  });
});
createApp({
  data() {
    return {
      trainNumber: '',
      result: '',
      errorMessage: null, 
      subwayLines: [
        { id: 'line1', name: '1호선' },
        { id: 'line2', name: '2호선' },
        { id: 'line3', name: '3호선' },
        { id: 'line4', name: '4호선' },
        { id: 'line5', name: '5호선' },
        { id: 'line6', name: '6호선' },
        { id: 'line7', name: '7호선' },
        { id: 'line8', name: '8호선' },
        { id: 'line9', name: '9호선' },
        { id: 'linecenter', name: '경의<br>중앙선' },
        { id: 'lineair', name: '공항<br>철도' },
        { id: 'linechun', name: '경춘선' },
        { id: 'linesuin', name: '수인<br>분당선' },
        { id: 'linebun', name: '신<br>분당선' },
        { id: 'linekyung', name: '경강선' },
        { id: 'lineui', name: '우이<br>신설선' },
        { id: 'lineseo', name: '서해선' },
      ],
    }
  },
  methods: {
    selectTile(tileName) {
      this.selectedTile = tileName.replace(/<br>/g, ' ');
      console.log(this.selectedTile);
    },

    async searchTrain() {
      this.result = '현재 위치를 찾는중입니다...';
      this.errorMessage = null;
      var api_key = "435848";
      api_key += "4843746";
      api_key += "56c37326f";
      api_key += "59747644";
      const url = `http://swopenAPI.seoul.go.kr/api/subway/${api_key}/json/realtimePosition/0/999/${this.selectedTile}`;
      var isSearch = false;
      //(1001:1호선, 1002:2호선, 1003:3호선, 1004:4호선, 1005:5호선 1006:6호선, 1007:7호선, 1008:8호선, 1009:9호선, 1063:경의중앙선,
      // 1065:공항철도, 1067:경춘선, 1075:수인분당선 1077:신분당선, 1092:우이신설선)    

      try {
        const response = await fetch(url);
        if (!response.ok) {
          this.errorMessage = `오류 발생: ${response.status}`;
          return;
        }
        console.log(url)
        const data = await response.json();
        const positions = data.realtimePositionList;
        positions.forEach((position) => {
          const status = position.trainSttus === '1' ? '운행 중' : (position.trainSttus === '2' ? '도착' : '정보 없음');
          if (this.trainNumber.toString().substring(1) == position.trainNo.toString().substring(1)){
              this.result = `${position.statnNm}역 ${status}`
              isSearch = true;
          }
        });
        if (isSearch == false) {
          this.result = "해당 열차가 없습니다.";
        }
      
      } catch (error) {
        this.errorMessage = `요청 중 에러 발생: ${error}`;
        this.result = '오류가 발생했습니다.';
      }
    }
  }
}).mount('#app');
