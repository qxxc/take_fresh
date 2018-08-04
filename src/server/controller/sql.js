module.exports={
    select_adminstrator:{
        sql: 'select a_number,a_password,a_name from adminstrator where a_number=?',
        callback(req, res, data) {
            if (req.body.username == data[0].a_number && req.body.password == data[0].a_password) { res.send('1'); }
            else { res.send('0'); }
        }
    }, 
    insertActionDate: {
        sql: 'insert action(A_number,A_adminstrator,A_term,A_start_date,A_status) values(?,?,?,?,?)',
        callback(req, res, data) {
            res.send('1')
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
        sql:'select * from interviewer',
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