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
    },
    getInterviewResult:{
        sql:'SELECT u_number,u_name,u_class,u_sex,ifnull(r_first_base,0)+ifnull(r_first_expent,0)+ifnull(r_second_base,0)+ifnull(r_second_expent,0)+ifnull(r_third_base,0)+ifnull(r_third_expent,0) as sum_result from user left join result on u_number=r_number order by sum_result desc;',
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
    }
}