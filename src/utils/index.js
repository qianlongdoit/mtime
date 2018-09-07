export function formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join("/");
    const t2 = [hour, minute, second].map(formatNumber).join(":");

    return `${t1} ${t2}`;
}

//  封装网络请求
export function request(options) {
    wx.showLoading({
        title: "加载中"    //数据请求前loading
    });

    return new Promise((resolve, reject) => {
        wx.request({
            url: options.url,
            method: options.method || "GET",
            data: options.data,
            header: options.header || {
                "content-type": "application/json"
            },
            success(res) {
                wx.hideLoading();
                resolve(res);
            },
            fail(err) {
                wx.hideLoading();
                reject(err);
            },
            complete() {
                wx.hideLoading();
            }
        });
    });
}

export function convertDate(s) {
    return s.slice(0, 4) + '年' + s.slice(4, 6) + '月' + s.slice(6) + '日';
}
// export default {
//     formatNumber,
//     formatTime,
//     request
// };


