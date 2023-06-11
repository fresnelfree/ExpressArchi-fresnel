var mysql      = require('mysql');
require('dotenv').config();
const argon2 = require('argon2')
var jwt = require('jsonwebtoken')

const connection = () => {
    let connection =  mysql.createConnection({
        host     : '35.194.12.202',
        user     : process.env.DB_USERNAME,
        password : process.env.PASSWORD,
        database : process.env.DB_NAME
    });

    return connection;
}

const disconnect = (connection) => { 
    return connection.end();
}

const select = (select, array, connection) => {
    let data =  connection.query(select,array, (e, r, f ) => {
        if (e) throw e
    })
    return data
}

const selectBy = async (sql,array,pwd,res,connection) => {
    // let user = any
    let data =  connection.query(sql,array, async (e, r, f ) => {
        if (e) throw e
        console.log("inserted :", r[0].firstname);
        if (!await argon2.verify(r[0].password, pwd)) {
            return res.status(409).json({
                error: true,
                message: ["Password/User incorrecte 1 !"]
            })
        } 
        var token = jwt.sign({ email: r[0].email }, process.env.JWT);        
        return res.status(200).json({
            error: true,
            message: ['user connecté !'],
            jwt : token    
        })
    })


    // var con = mysql.createConnection({
    //     host     : '35.194.12.202',
    //     user     : process.env.DB_USERNAME,
    //     password : process.env.PASSWORD,
    //     database : process.env.DB_NAME
    //   });
      
    //   con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     con.query(sql, array, function (err, result, fields) {
    //       if (err) throw err;
    //       console.log("1 record inserted :", result);
    //     });  
    // });  
}

module.exports = {
    select,
    selectBy,
    disconnect,
    connection
}



 
