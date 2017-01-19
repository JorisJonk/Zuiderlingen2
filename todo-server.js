/* global Buffer */
/* global __dirname */
var express = require("express");
var mysql = require("mysql");
var url = require("url");
var http = require("http");
var one = 'asd';
var two = 1;
var three = 2;

var port = 3000;
var app = express();
app.use(express.static(__dirname));
http.createServer(app).listen(port);


var connection = mysql.createConnection({
    //properties
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webdata'

});


connection.connect(function(error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

app.get('/removetododata', function(req, resp) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index = query["index"];
    console.log(index);
    connection.query("DELETE FROM todos WHERE ID=?", index, function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("tuple removed");
        }
        /*connection.query("INSERT INTO webdata (task, prio, due, done) VALUES ('asd','1','1','1'	)")*/
    });
})

app.get("/edittododata", function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index = query["index"];
    console.log(index);
    if (query["task"] !== undefined) {
        var tx = {
            task: query["task"],
            prio: query["prio"],
            date: query["date"],
            done: query["done"]
        }
        console.log(tx);
        connection.query("UPDATE todos SET ? WHERE ID=?", [tx, index], function(error, rows, fields) {
            if (!!error) {
                console.log("error occured");
            } else {
                console.log("tuple added");
            }
            console.log("edited " + tx.task + index);
            res.end("edited on database");
        });
    }
});



app.get('/insertdata', function(req, resp) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log("asd");
    if (query["task"] !== undefined) {
        console.log("yep");
        var tx = {
            task: query["task"],
            prio: query["prio"],
            date: query["date"],
            done: query["done"]
        };
        console.log(tx);
    }
    connection.query("INSERT INTO todos SET ?", tx, function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("tuple added");
        }
        /*connection.query("INSERT INTO webdata (task, prio, due, done) VALUES ('asd','1','1','1'	)")*/
    });
});

app.get("/todosdata", function(req, res) {
    console.log("todos requested from database!");
    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }


    });
});

app.get("/query1", function(req, res) {
    console.log("query1!");
    var result = [];
    var tx = connection.query("SELECT * FROM ToDoList WHERE Owner ='1' ",
        function(error, rows, fields) {
            if (!!error) {
                console.log("error occured");
            } else {
                console.log("retreived from database");
                res.json(rows);

            }
            //	console.log(tx);

            //  res.end(tx);


        });
});
app.get("/query2", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT * FROM ToDoItem WHERE ToDoListID = '1'", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }



    });
});
app.get("/query3", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT * From ToDoItem LIMIT 2, 4 WHERE ToDoListID = '1'", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }



    });
});
app.get("/query4", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT * From todo.ToDoItem LIMIT 2, 4 WHERE ToDoListID = '1' HAVING CreationDate > 'date1' AND CreationDate < 'date2'", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }



    });
});
app.get("/query5", function(req, res) {
    console.log("query5!");
		var result = [];

    var tx = connection.query("SELECT * From ToDoItem WHERE ParentToDo = 'x'", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }



    });
});
app.get("/query6", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT TagId FROM ItemTag WHERE ToDoId = 'x' ", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }


    });
});

app.get("/query7", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT ToDoId, Name (of *); FROM ItemTag, todo.ToDoItem, todo.Tag, todo.ToDoList WHERE (ItemTag.TagId = Tag.Id AND ToDoItem.Id = ItemTag.ToDoId AND ToDoList.Id = ToDoItem.ToDoListID) AND TagId = '2'", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
						res.json(rows);
        }

    });
});
app.get("/query8", function(req, res) {
    console.log("query1!");
		var result = [];

    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }
        res.end(tx);


    });
});
app.get("/query9", function(req, res) {
    console.log("query1!");
    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }
        res.end(tx);


    });
});
app.get("/query10", function(req, res) {
    console.log("query1!");
    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }
        res.end(tx);


    });
});
app.get("/query11", function(req, res) {
    console.log("query1!");
    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }
        res.end(tx);


    });
});
app.get("/query12", function(req, res) {
    console.log("query1!");
    var tx = connection.query("SELECT * FROM todos", function(error, rows, fields) {
        if (!!error) {
            console.log("error occured");
        } else {
            console.log("retreived from database");
        }
        res.end(tx);


    });
});
app.listen(1337);


var todos = [];
var t1 = {
    task: "Maths homework due",
    prio: 1,
    date: "12/12/2015",
    done: "false"
};
var t2 = {
    task: "English homework due",
    prio: 3,
    date: "20/12/2015",
    done: "false"
};
todos.push(t1);
todos.push(t2);

//clients requests todos
app.get("/todos", function(req, res) {
    console.log("todos requested!");
    res.json(todos);
});



//add todo to the server
app.get("/addtodo", function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (query["task"] !== undefined) {
        var tx = {
            task: query["task"],
            prio: query["prio"],
            date: query["date"],
            done: query["done"]
        };
        todos.push(tx);
        console.log("Added " + tx.task);
        res.end("Todo addeds successfully");
    } else {
        res.end("Error: missing task parameter");
    }
});

app.get("/edittodo", function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index = query["index"];
    console.log(index);
    if (query["task"] !== undefined) {
        var tx = {
            task: query["task"],
            prio: query["prio"],
            date: query["date"],
            done: query["done"]

        };
        todos[index] = tx;
        console.log("edited " + tx.task + index);
        res.end("Todo edited successfully");
    } else {
        res.end("Error: missing task parameter");
    }
});

app.get("/removetodo", function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index = query["index"];
    console.log(index);

    todos.splice(index, 1);
    console.log("removed + index");
    res.end("Todo removed successfully");

});
