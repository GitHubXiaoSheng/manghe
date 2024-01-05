const getWxOrder = (count, des, orderNo) => {
    var openId = localStorage.getItem('openId')
    return post('api/userCard/GetWxOrder', {
        orderNo: orderNo,
        count: count,
        openId: openId,
        des: des
    })
}
const wxPay = (orderId) => {

}
export default {
    getWxOrder, wxPay
}