module.exports={
    getUserWaiting:{
        sql:'select u_number,u_name,u_sex,u_class,g_name,u_count,u_info,u_term from user left join group_info on u_group=g_id where u_status=2 and u_count<3',
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
    }
}