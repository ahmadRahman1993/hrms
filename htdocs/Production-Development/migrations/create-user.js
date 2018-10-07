/**
 * Created by Muhammad Annis on 8/18/2016.
 */
"use strict";

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface
            .createTable('user', {
                id: {type: Sequelize.INT, allowNull:false, autoIncrement:true},
                first_name: {type: Sequelize.STRING, allowNull:false},
                last_name: {type: Sequelize.STRING, allowNull:false},
                login_id: {type: Sequelize.STRING, allowNull:false},
                password: {type: Sequelize.STRING, allowNull:false},
                address: Sequelize.TEXT,
                email: Sequelize.STRING,
                contact_no: Sequelize.STRING,
                image: Sequelize.BLOB,
                gender: Sequelize.STRING
            });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface
            .dropTable('user');
    }
};