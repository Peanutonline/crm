$(function () {
    init();

    let $plan = $.Callbacks(); // 用来实现发布订阅

    $plan.add((_,baseInfo)=>{
        //渲染用户信息和实现退出登录
        // console.log('渲染用户信息和实现退出登录:',baseInfo)
        $('.baseBox>span').html(`你好,${baseInfo.name || ''}`)
    })

    // 实现退出登录
    $('.baseBox>a').click(async function(){
        let result = await axios.get('/user/signout');
        if(result.code == 0){
            //退出登录成功
            window.location.href = 'login.html';
            return;
        }
        //退出登录失败
        alert('网络不给力,稍后再试')
    })
    $plan.add((power)=>{
        //渲染菜单
        console.log('渲染菜单:',power)
    })
    async function init() {
        //判断当前用户有没有登陆
        let result = await axios.get('/user/login');
        console.log(result)
        if (result.code != 0) {
            alert('您还没有登录，请先登录...')
            window.location.href = 'login.html';
            return;
        }
        // 代表你登录成功了  要发送ajax请求
        // let xx = await axios.all([
        //     axios.get('/user/power'),
        //     axios.get('/user/info')
        // ])
        // console.log(xx)
        //解析赋值如下
        let [power,baseInfo] = await axios.all([
            axios.get('/user/power'),
            axios.get('/user/info')
        ])
        baseInfo.code ===0 ? baseInfo = baseInfo.data : null;
        $plan.fire(power,baseInfo)
    }

})