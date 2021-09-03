// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '@/utils/util';

console.log('logs');

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log,
        };
      }),
    });
  },
});
