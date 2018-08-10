module.exports={
    select_adminstrator:{
        sql: 'select a_id,a_number,a_password,a_name,a_status from adminstrator where a_number=?',
        callback(req, res, data) {
            if (req.body.username == data[0].a_number && req.body.password == data[0].a_password && data[0].a_status == 0) { res.send(data[0].a_id+''); }
            else if (req.body.username == data[0].a_number && data[0].a_status == 1){ res.send('-1'); }
            else{ res.send('0')}
        }
    }, 
    insertActionDate: {
        sql: 'insert action(A_number,A_adminstrator,A_term,A_start_date,A_status) values(?,?,?,?,?)',
        callback(req, res, data) {
            res.send('1')
        }
    },
    changaStatus:{
        sql:'update adminstrator set a_status=1 where a_id=?',
        callback(){
            return 0;
        }
    },
    getAdminInfo:{
        sql:'select a_number as 学号,a_name as 姓名,a_password as 密码,a_term as 学年,a_tel as 联系方式 from adminstrator where a_id=?',
        callback(req,res,data){
            data[0]['密码']='********'
            res.send(data[0]);
        }
    },
    insertAdmin:{
        sql:'insert adminstrator(a_number,a_password,a_name,a_term,a_tel,a_status) values(?,?,?,?,?,0)',
        callback(req,res,data){
            res.send('1')
        }
    },
    changIStatus:{
        sql:'update interviewer set I_status=? where I_id=?',
        callback(req,res){
            var count=0;
            return function() {
                count++;
                console.log(req.body, req.body.length , count);
                if(req.body.length==count){
                    res.send('1')
                }
            }
        }
    },
    getInterApply:{
        sql: 'select I_id,I_number,I_name,g_name from interviewer as a left join group_info as b on a.I_group=b.g_id where I_status=0',
        callback(req,res,data){
            res.send(data)
        }
    },
    getAllUser:{
        sql:'select user.u_group,count(user.u_name) as number,group_info.g_name from user left join group_info on user.u_group=group_info.g_id where user.u_term=? group by user.u_group',
        callback(req,res,data){
            res.send(data);
        }
    },
    insertAction: {
        sql: 'insert action(A_number,A_adminstrator,A_term,A_status) values(?,?,?,?)',
        callback(req, res, data) {
            res.send('1')
        }
    },
    beginAction:{
        sql:'update action set A_start_date=?,A_status=? where A_id=?',
        callback(req, res, data) {
            res.send('1')
        }
    },
    endAction: {
        sql: 'update action set A_end_date=?,A_status=? where A_id=?',
        callback(req, res, data) {
            res.send('1')
        }
    },
    selectAction: {
        sql: 'select * from action',
        callback(req, res, data) {
            res.json(data);
        }
    },
    getAction:{
        sql:'select * from action where A_start_date<? and A_end_date>?',
        callback(req,res,data){
            res.json(data);
        }
    },
    getInter:{
        sql:'select I_id,I_number,I_name,I_term,g_name from interviewer as a left join group_info as b on a.I_group=b.g_id where a.I_status=1',
        callback(req,res,data){
            res.json(data);
        }
    },
    deleteInter:{
        sql:'delete from interviewer where I_id=?',
        callback(req,res,data){
            res.send('1');
        }
    }
}