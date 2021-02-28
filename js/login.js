$(function(){
    // // console.log(111111111)
    // //登录功能
    // $('.submit').click(function(e){
    //     let account = $('.userName').val().trim();
    //     let password = $('.userPass').val().trim();

    //     if(account === '' || password === ''){
    //         alert('账号和密码不能为空');
    //         return
    //     }
    //     //可以自己通过正则按自己校验你的用户和密码的规则 test
    //     password = md5(password);
    //     // console.log(account,password);

    //     //发送ajax请求
    //     axios.post('/user/login',{
    //         account,
    //         password
    //     }).then(res =>{
    //         console.log(res);
    //     }).catch(err =>{
    //         console.log(err);
    //     })
    // })
    //



    //登录功能
    $('.submit').click(async function(e){
        let account = $('.userName').val().trim();
        let password = $('.userPass').val().trim();

        if(account ==='' || password ===''){
            alert('账号和密码不能为空');
            return
        }
        //可以自己通过正则自己校验你的用户名和密码的规则 test
        password = md5(password);
        //发送ajax请求
        let res = await axios.post('/user/login',{account,password})
        // console.log(res)
        if(parseInt(res.code) ===0){
            alert('登陆成功');
            window.location.href='index.html';
            return
        }
        alert('用户名和密码错误')
    })
})