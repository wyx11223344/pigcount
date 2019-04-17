let baseUrl = "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://localhost:8066/"  //这里是本地的请求url
        break
    case 'production':
        baseUrl = "http://manage.mrwanmisshen.com/pigcount/"   //生产环境url
        break
}

export default {
    baseUrl: baseUrl,
}