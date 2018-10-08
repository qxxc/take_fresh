module.exports={
    userResgiter:{
        sql:'insert into user values(?,?,?,?,?,?,?,?,?,?,?)',
        callback(req,res,data){
            res.send('1');
        }
    },
    userLogin:{ 
        sql:'select u_password from user where u_number=?',
        callback(req,res,data){
            if (req.body.u_password == data[0].u_password){
                res.send('1')
            }else{
                res.send('0')
            }
        }
    }
}