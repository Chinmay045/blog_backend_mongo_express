const db = require('../config/db.js');


class Blog {

    constructor(title, description, image, user_id) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.user_id = user_id;
    }

    static findAllBlog() {
        let sql = 'SELECT * FROM BLOG';
        return db.execute(sql);
    }

    static async findByUserID() {
        let sql = 'SELECT * FROM BLOG WHERE USER_ID = ?'
        let [rs] = await db.execute(sql, [USERID]);
        return rs;
    }

    static async findByIdAndUpdate(blogId, title, description) {
        let sql = 'UPDATE BLOG SET TITLE=?, DESCRIPTION = ? WHERE USER_ID =?';
        let [rs] = await db.execute(sql, [title, description, blogId]);
        return rs;
    }

    static async findBlogById(id) {
        let sql = 'SELECT * FROM BLOG WHERE USER_ID =?';
        let rs = db.execute(sql, [id]);
        return rs;
    }

    static async deleteBlogById(id) {
        let sql = 'DELETE  FROM BLOG WHERE USER_ID =?';
        let rs = db.execute(sql, [id]);
        return rs;
    }


    async save() {
        let sql = 'INSERT INTO BLOG (TITLE, DESCRIPTION, IMAGE, USER_ID) VALUES(?,?,?,?)';
        let [rs] = await db.execute(sql, [this.title, this.description, this.image, this.user_id]);
        return rs;
    }

}

module.exports = Blog;