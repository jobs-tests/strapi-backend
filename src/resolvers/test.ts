import { create } from "../service/knex";

create().then((db) => {
    db.select('*')
        .from('planet')
        .then(data => console.log(data));

})
