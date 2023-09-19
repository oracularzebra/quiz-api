const pool = require("../pg");

module.exports = {
    getCategory : async function(){

        const res = await pool.query(`select distinct category from questions;`);
        
        if(res.rowCount > 0) return [true, res.rows];
        return [false, []];
    },
    getSubCategory: async function(category){
        
        const res = await pool.query(`select distinct sub_category from questions
        where category='${category}'`);
        //Returning an array.
        let subCats = res.rows.map(row => row.sub_category);
        if(res.rowCount > 0) return [true, subCats];
        return [false, []];
    }
}