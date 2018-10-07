/**
 * Created by Ahmad Rahman on 10/27/2016.
 */
"use strict";
var path      = require("path");
var config    = require(path.join(__dirname, '..', 'config', 'config.json'));//[env];
var Sequelize = require("sequelize");
var sequelize = new Sequelize(config.db_name, config.username, config.password, {
    timezone: '+05:00',
    host: config.host,
    port: config.port,
    logging: false, //logging closed
    dialect: config.dialect,
    define: {
        timestamps: false
    }
});


var db = {};

/*
 var admin = sequelize.define("admin", {
 id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
 login_id: {type: Sequelize.STRING, allowNull: false, unique: true},
 login_password: {type: Sequelize.STRING, allowNull: false}

 },
 {
 freezeTableName: true,

 // define the table's name
 tableName: 'admin'
 }
 );
 */

var company = sequelize.define("company", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
        address: Sequelize.TEXT,
        description: Sequelize.TEXT,
        email: {type: Sequelize.STRING, allowNull: false},
        contact_office: Sequelize.STRING,
        image: Sequelize.STRING,
        start_date: {type: Sequelize.DATEONLY, allowNull: true}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'company'
    }
);


var user = sequelize.define("user", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        first_name: {type: Sequelize.STRING, allowNull: false},
        last_name: {type: Sequelize.STRING, allowNull: false},
        login_id: {type: Sequelize.STRING, allowNull: false, unique: true},
        login_password: {type: Sequelize.STRING, allowNull: false},
        salary: Sequelize.INTEGER,
        /*address: Sequelize.TEXT,
         email: {type: Sequelize.STRING, allowNull: false},
         contact_cell: Sequelize.STRING,
         contact_office: Sequelize.STRING,*/
        image: Sequelize.STRING,
        gender: {type: Sequelize.STRING, allowNull: false},
        designation: {type: Sequelize.STRING, allowNull: false},
        joining_date: {type: Sequelize.DATEONLY, allowNull: true},
        termination_date: {type: Sequelize.DATEONLY, allowNull: true},
        manager: {type: Sequelize.STRING, allowNull: true}
        //department:{type: Sequelize.STRING, allowNull: true}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'user'
    }
);

var role = sequelize.define("role", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'role'
    }
);

var privilege =sequelize.define("privilege", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'privilege'
    }
);

var user_role = sequelize.define("user_role", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'user_role'
    }
);

var role_privilege = sequelize.define("role_privilege", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'role_privilege'
    }
);

var contact = sequelize.define("contact", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        type: {type: Sequelize.STRING, allowNull: false},
        value: {type: Sequelize.STRING, allowNull: false}
    },
    {
        freezeTableName: true,
        // define the table's name
        tableName: 'contact'
    }
);
/*
 var user_contact = sequelize.define("user_contact", {
 id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
 type: {type: Sequelize.STRING, allowNull: false},
 value: {type: Sequelize.STRING, allowNull: false}
 },
 {
 freezeTableName: true,
 // define the table's name
 tableName: 'user_contact'
 }
 );
 */
var doc = sequelize.define("document", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
        location: {type: Sequelize.STRING, allowNull: false},
        type: {type: Sequelize.STRING, allowNull: false}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'document'
    }
);

var asset = sequelize.define("asset", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: {type: Sequelize.STRING, allowNull: false},
        quantity: {type: Sequelize.INTEGER}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'asset'
    }
);

var event = sequelize.define("event",{
        id: {type: Sequelize.INTEGER, primaryKey:true,allowNull:false, autoIncrement:true},
        time: {type: Sequelize.DATE, allowNull: true},
        comment: {type: Sequelize.TEXT},
        event_id: {type: Sequelize.INTEGER}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'event'
    });

var event_code = sequelize.define("event_code",{
        id: {type: Sequelize.INTEGER, primaryKey:true,allowNull:false, autoIncrement:true},
        name: {type:Sequelize.TEXT}
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'event_code'
    });

var todo = sequelize.define("todo", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        task: Sequelize.TEXT
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'todo'
    });

var leaves_types = sequelize.define("leaves_types", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        name: Sequelize.TEXT,
        yearly_leaves:Sequelize.FLOAT,
        status: Sequelize.TEXT
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'leaves_types'
    });

var user_leaves = sequelize.define("user_leaves", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        leave_date: Sequelize.DATEONLY,
        leave_deduction:Sequelize.FLOAT,
        comments:Sequelize.TEXT
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'user_leaves'
    });

var user_leaves_balance = sequelize.define("user_leaves_balance", {
        id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
        total_leave:Sequelize.FLOAT,
        available_leave:Sequelize.FLOAT,
        availed_leave:Sequelize.FLOAT,
        comments:Sequelize.TEXT
    },
    {
        freezeTableName: true,

        // define the table's name
        tableName: 'user_leaves_balance'
    });

/////////////////Relations declaration among tables
/*
 admin.hasMany(company, {
 foreignKey: 'admin_id'//This will add admin_id in company table
 });
 */

company.hasMany(leaves_types, {
    foreignKey: 'company_id'//This will add company_id in leaves_types table
});
company.hasMany(user, {
    foreignKey: 'company_id'//This will add company_id in user table
});
company.hasMany(asset, {
    foreignKey: 'company_id'//This will add company_id in asset table
});
company.hasMany(role, {
    foreignKey: 'company_id'//This will add company_id in role table
});
user.hasMany(doc, {
    foreignKey: 'user_id'//This will add user_id in document table
});
user.hasMany(asset, {
    foreignKey: 'user_id'//This will add user_id in asset table
});
user.hasMany(todo, {
    foreignKey: 'user_id'//This will add user_id in to do table
});
user.hasMany(event, {
    foreignKey: 'user_id'//This will add user_id in event table
});
user.hasMany(contact, {
    foreignKey: 'user_id'//This will add user_id in contact table
});
user.hasMany(user_leaves, {
    foreignKey: 'user_id'//This will add user_id in user_leaves table
});
user.hasMany(user_leaves_balance, {
    foreignKey: 'user_id'//This will add user_id in user_leaves_balance table
});
//leaves_types.hasMany(user_leaves,{
//    foreignKey: 'leave_type' //This will add leaves_type_id in user_leaves table
//});
//leaves_types.hasMany(user_leaves_balance,{
//    foreignKey: 'leave_type' //This will add leaves_type_id in user_leaves_balance table
//});
/*
 user.hasMany(leaves, {
 foreignKey: 'user_id'//This will add user_id in leaves table
 });
 */
user.hasMany(user_role, {
    foreignKey: 'user_id'//This will add user_id in user_role table
});
role.hasMany(user_role, {
    foreignKey: 'role_id'//This will add role_id in user_role table
});
role.hasMany(role_privilege, {
    foreignKey: 'role_id'//This will add role_id in role_privilege table
});
privilege.hasMany(role_privilege,{
    foreignKey: 'privilege_id'//This will add privilege_id in role_privilege table
});
/*
 event_code.hasMany(event,{
 foreignKey: 'event_id'//This will add event_id in event table
 });
 */
/*
 leaves_types.hasMany(event,{
 foreignKey: 'leaves_type_id'//This will add leaves_type_id in event table
 });
 */


//code for associations<START>
user_leaves_balance.belongsTo(leaves_types, { foreignKey: 'leaves_type_id'});
user_leaves.belongsTo(leaves_types, { foreignKey: 'leaves_type_id'});
//code for associations<END>


sequelize.sync().then(function() {
    console.log('databade sync table created successfully');
    event.destroy({truncate: true}).then(function(){
        var objects = require('../objects');
        console.log("------------------------getAttendanceFromDeviceStartup route--------------------------------------");
        objects.device.getAttendanceFromDeviceAtStartup("192.168.1.99", "4370");
    })
}, function(err) {
    console.log('An error occur while creating table');
});

db['company']=company;
db['user']=user;
db['role']=role;
db['user_role']=user_role;
db['privilege']=privilege;
db['role_privilege']=role_privilege;
db['contact']=contact;
db['doc']=doc;
db['asset']=asset;
db['event']=event;
db['event_code']=event_code;

db['todo'] = todo;
db['leaves_types']=leaves_types;
db['user_leaves']=user_leaves;
db['user_leaves_balance']=user_leaves_balance;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db ;
