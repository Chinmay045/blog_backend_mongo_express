const db = require('../config/db.js');

class User {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static async findByEmail(email) {
        let sql = "SELECT * FROM USERS WHERE EMAIL = ?";
        let [rs] = await db.execute(sql, [email]);
        return rs;
    }

    async save() {
        let sql = "INSERT INTO USERS (NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)";
        let [rs] = await db.execute(sql, [this.name, this.email, this.password]);
        return rs;
    }

    static async findAllUsers() {
        let sql = "SELECT * FROM USERS";
        return await db.execute(sql);
    }

    static async findByID(userID) {
        let sql = "SELECT * FROM USERS WHERE USER_ID = ?";
        let [rs, fields] = await db.execute(sql, [userID]);
        let user = rs[0];
        return user;
    }


}

module.exports = User;