
$(document).ready(function(){

    $.getJSON("http://localhost:3000/todos",function (data) {
    console.log(data);
    });



    $.getJSON("http://localhost:3000/todos",function (todos) {
    var tr;
    for (var i = 0; i < todos.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + todos[i].task + "</td>");
        tr.append("<td>" + todos[i].prio + "</td>");
        tr.append("<td>" + todos[i].date + "</td>");
        tr.append("<td>" + todos[i].done + "</td>");
        tr.append("<td>" + '<button id="edit_but' + i + '"></button></td>');
        tr.append("<td>" + '<button data-id=' +i+ ' id="remove_but' + i + '"></button></td>');
        $('table').append(tr);

       var rmb= "remove_but"
       console.log("Hallo")
      console.log(rmb + i)
      document.getElementById(rmb + i).addEventListener("click", function(){
        console.log(i)
        $.get("http://localhost:3000/removetodo?index="+1)

      }
    )
}
    });


    // bij Submit de todo toevoegen met de data uit de velden.
    document.getElementById('add_submit').addEventListener("click", function(){

      var task = {
        task: document.getElementById('add_taskname').value,
  			prio: document.getElementById('add_priority').value,
  			date: document.getElementById('add_date').value,
  			done: document.getElementById('add_done').value
  		};
      $.get("http://localhost:3000/addtodo", task);
    })
});

            document.getElementById('query1').addEventListener("click", function() {
                var result = $.get("http://localhost:1337/query1" ,function( result ) {
                console.log("query1 uitgevoerd");
               document.getElementById('div111').innerHTML = JSON.stringify(result);
             });

            });
            document.getElementById('query2').addEventListener("click", function() {
                var result = $.get("http://localhost:1337/query2", function(result) {
                 document.getElementById('div222').innerHTML = JSON.stringify(result);
            });
              });
            document.getElementById('query3').addEventListener("click", function() {
                var result = $.get("http://localhost:1337/query3");
                 document.getElementById('div333').innerHTML = JSON.stringify(result);
            });

});
