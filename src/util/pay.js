const inWxOrder = (amount, des, orderNo) => {
    var openId = localStorage.getItem('openId')
    return post('api/userCard/GetWxOrder', {
        orderNo: orderNo,
        amount: amount,
        openId: openId,
        des: des
    })
}
const wxPay = (orderId) => {

}
export default {
    inWxOrder, wxPay
}