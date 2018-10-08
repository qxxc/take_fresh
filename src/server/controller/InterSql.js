module.exports={
    getUserWaiting:{
        sql:'select u_number,u_name,u_sex,u_class,g_name,u_count,u_info,u_term,u_tel from user left join group_info on u_group=g_id where u_status=2 and u_count<3',
        callback(req,res,data){
            res.send(data);
        }
    },
    getUserResult:{
        sql:'select * from result where r_number=?',
        callback(req,res,data){
            res.send(data[0]);
        }
    },
    changeUserStatus:{
        sql:'Update user set u_status=3 where u_number=?',
        callback(req,res,data){
        }
    },
    updateUserResult:{
        callback(req,res,data){
        }
    },
    getInterviewResult:{
        sql:'SELECT u_number,u_name,u_class,u_sex,u_count,u_info,u_tel,u_term,u_status,ifnull(r_first_base,0)+ifnull(r_first_expent,0)+ifnull(r_second_base,0)+ifnull(r_second_expent,0)+ifnull(r_third_base,0)+ifnull(r_third_expent,0) as sum_result from user left join result on u_number=r_number where u_count=3 and u_status>=4 order by sum_result desc;',
        callback(req,res,data){
            data.forEach((item,index,array)=>{
                if(item.u_sex){
                    item.u_sex='男'
                }else{
                    item.u_sex='女'
                }
            })
            res.send(data);
        }
    },
    goBackUserStatus:{
        sql:'update user set u_status=2 where u_number=?',
        callback(req,res,data){
            console.log(data);
            res.send('1')
        }
    },
    loginInter:{
        sql:'select I_id,I_number,I_password,I_name from interviewer where I_number=?',
        callback(req,res,data){
            console.log(data)
            if (req.body.username == data[0].I_number && req.body.password == data[0].I_password){
                res.send({
                    username:data[0].I_number,
                    name:data[0].I_name
                })
            }else{
                res.send('0');
            }
        }
    },
    registerSubmit:{
        sql:'insert interviewer(I_number,I_password,I_name,I_term,I_group) values(?,?,?,?,?)',
        callback(req,res,data){
            res.send('1');
        }
    },
    allowUser:{
        sql:'update user set u_status=5 where u_number=?',
        callback(req,res,data){
            res.send('1');
        }
    }
}