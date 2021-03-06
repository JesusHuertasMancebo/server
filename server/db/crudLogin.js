var db = require('./database');
var Login = require('../app/model/login');
const { realpath } = require('fs/promises');

class CrudLogin {
    mydb=new db.Database(); 

    userPassValid(user,password,callback){
        let conn = this.mydb.getConnection();
        let sql = "select * from users where username = '"+ user +"' AND password = '" + password + "'";

        conn.query(sql,[user, password],function(err,results,fields){
            if(err){
                console.log("Error: " + err)
            }else{
                //Processar dades
                conn.end();
                callback(results,fields);
            }
        });
    }

    usuariProfeAlumne(user,callback){
        let conn = this.mydb.getConnection();
        let sql = "select *, if(professor.id_professor is null, 'alumne', 'professor') AS role from users LEFT join professor on users.id = professor.id_professor WHERE users.username = '" + user + "' LIMIT 1;";

        console.log("usuariProfeAlumne Sql: " + sql)
        conn.query(sql,function(err,[results],fields){
            if(err){
                console.log("Error: " + err)
                callback(false);
            }else{
                //Processar dades
                conn.end();
                console.log("results");
                console.log(results);
                console.log("Typeof: " + (typeof results))
                console.log("isUndefined: " + (typeof results === "undefined"))
                
                if (typeof results !== "undefined") {
                    console.log("not is undefined")
                    console.log(results)
                    return callback(results)
                } else {
                    console.log("is undefined")
                    return callback(false)
                }
            }
        });
    }

    getUser_Username(user,callback){
        let conn = this.mydb.getConnection();
        let sql = "select * from users where username = '"+user+"'";

        conn.query(sql, [user], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
            callback(results, err);
        });
    }

    getIdUser(username,callback){
        let conn = this.mydb.getConnection();
        let sql = "select id from users where username = '"+username+"'";

        conn.query(sql, [user], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
            callback(results, err);
        });
    }

    verificarDniProfesor(dni,callback){
        let conn = this.mydb.getConnection();
        let sql = "select * from dni_profe where dni = '"+dni+"'";

        conn.query(sql, [dni], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
            callback(results, err);
        });
    }

    insertarUsuario(user,callback){
        let conn = this.mydb.getConnection();
        let sql = "insert into users(username, password, full_name, avatar) values('"+user.username+"', '"+user.password+"', '"+user.full_name+"', '"+user.avatar+"')";
        console.log("sql: " + sql);
        conn.query(sql, [user.username, user.password, user.full_name, user.avatar], function(err,results){
            console.log("err -> " + err);
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
            console.log("results: ");
            console.log(results);
            callback(results, err);
        });
    }

    insertarProfesor(id, dni){
        let conn = this.mydb.getConnection();
        let sql = "insert into professor(id_professor) values("+id+")";
        console.log("sql professor: " + sql)

        conn.query(sql, [id], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
        });

        let conn2 = this.mydb.getConnection();
        sql = "insert into dni_profe(dni) values('"+dni+"')";
        console.log("sql professor: " + sql) 

        conn2.query(sql, [id], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn2.end();
            }
        });
    }

    insertarAlumno(id){
        let conn = this.mydb.getConnection();
        let sql = "insert into alumne(id_alumne) values("+id+")";

        console.log("sql alumno: " + sql)

        conn.query(sql, [id], function(err,results){
            if(err) {
                console.log("Error: " + err);
            } else {
                conn.end();
            }
        });
    }

    getAllUsers(callback){
        let conn = this.mydb.getConnection();
        let sql = "SELECT * FROM users";
        conn.query(sql,function(err,results,fields){
            if(err){
                console.log("Error: " + err)
            }else{
                //Processar dades
                conn.end();
                callback(results,fields);
            }
        });
    }
}

module.exports={
    CrudLogin:CrudLogin
}

