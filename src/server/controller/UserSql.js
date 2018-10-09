module.exports={
    userResgiter:{
        sql:'insert into user values(?,?,?,?,?,?,?,?,?,?,?)',
        callback(req,res,data){
            res.send('1');
        }
    },
    userLogin:{ 
        sql:'select u_password,u_status from user where u_number=?',
        callback(req,res,data){
            if (req.body.u_password == data[0].u_password){
                res.send({
                    u_status: data[0].u_status,
                    status:'1'
                })
            }else{
                res.send('0')
            }
        }
    },
    userEnter:{
        sql:"update user set u_group=?,u_status=1 where u_number=?",
        callback(req,res,data){
            if(data){
                res.send('1');
            }else{
                res.send('0')
            }
        }
    },
    getUserInfo:{
        sql:'select u_number,u_name,u_class,u_tel,u_status from user where u_number=?',
        callback(req,res,data){
            switch (data[0].u_status) {
                case 1:
                    data[0].u_status='等待面试'
                    break;
                case 4:
                    data[0].u_status='等待面试结果'
                    break;
            }
            res.send(data[0])
        }
    },
    signIn:{
        sql:'update user set u_status=2 where u_number=?',
        callback(req,res,data){
            if(data){
                res.send('1')
            }else{
                res.send('0')
            }
        }
    }
}