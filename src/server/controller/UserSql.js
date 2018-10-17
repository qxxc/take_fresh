module.exports={
    userResgiter:{
        sql:'insert into user values(null,?,?,?,?,?,?,?,?,?,?,?)',
        callback(req,res,data){
	if(data){           
	 	res.send('1');
       	}
	else{
		res.send('0')
	}
    }},
    userLogin:{ 
        sql:'select u_password,u_status from user where u_number=?',
        callback(req,res,data){
	    if(data.length==0){
		    res.send('undefined');
		    return ;
        }
	    if (req.body.u_password == data[0].u_password){
                res.send({
                    u_status: data[0].u_status,
                    status:'1'
                })
            }else{
                res.send({
                    status: '0'
                })
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
        sql:'select u_number,u_name,u_class,u_tel,u_status,u_count from user where u_number=?',
        callback(req,res,data){
            switch (data[0].u_status) {
                case 1:
                    switch (data[0].u_count){
                        case 0:
                            data[0].u_status = '等待一面'
                            break;
                        case 1:
                            data[0].u_status = '等待二面'
                            break;
                        case 2:
                            data[0].u_status = '等待三面'
                            break;
                    }
                    break;
                case 2:
                    switch (data[0].u_count) {
                        case 0:
                            data[0].u_status = '等待一面'
                            break;
                        case 1:
                            data[0].u_status = '等待二面'
                            break;
                        case 2:
                            data[0].u_status = '等待三面'
                            break;
                    }
                    break;
                case 4:
                    switch (data[0].u_count) {
                        case 1:
                            data[0].u_status = '等待一面结果'
                            break;
                        case 2:
                            data[0].u_status = '等待二面结果'
                            break;
                        case 3:
                            data[0].u_status = '等待三面结果'
                            break;
                    }       
                    break;
            	case 5:
                    switch (data[0].u_count) {
                        case 1:
                            data[0].u_status = '一面通过'
                            break;
                        case 2:
                            data[0].u_status = '二面通过'
                            break;
                        case 3:
                            data[0].u_status = '三面通过'
                            break;
                    }       
                    break;
		case 6:
                    switch (data[0].u_count) {
                        case 1:
                            data[0].u_status = '一面未通过'
                            break;
                        case 2:
                            data[0].u_status = '二面未通过'
                            break;
                        case 3:
                            data[0].u_status = '三面未通过'
                            break;
                    }
                    break;
            }
            delete data[0].u_count
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
