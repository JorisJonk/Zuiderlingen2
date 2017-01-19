var agenda = [];
var tx = {
    date: "11-12-2016",
    activiteit: "Kerstconcert"
};
agenda.push(tx);
var tx2 = {
    date: "28-12-2016",
    activiteit: "Repetitie"
};
agenda.push(tx2);
var tx3 = {
    date: "4-12-2016",
    activiteit: "Repetitie"
};
agenda.push(tx3);
var tx4 = {
    date: "11-01-2017",
    activiteit: "Repetitie"
};
agenda.push(tx4);


$.fn.moveIt = function() {
    var $window = $(window);
    var instances = [];

    $(this).each(function() {
        instances.push(new moveItItem($(this)));
    });

    window.onscroll = function() {
        var scrollTop = $window.scrollTop();
        instances.forEach(function(inst) {
            inst.update(scrollTop);
        });
    }
}

var moveItItem = function(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop) {
    var pos = 2 * scrollTop / this.speed;
    this.el.css('transform', 'translateY(' + -pos + 'px)');
};

$(function() {
    $('[data-scroll-speed]').moveIt();
});

$(function() {
    var scrolled = 0;
    var lastScrolled = 0;
    $(document).on('scroll', function(evt) {

        var pos = $(document).scrollTop();
        scrolled += Math.abs(pos - lastScrolled);
        lastScrolled = pos;
        $('#scrolled').html(pos);
    });
});

/*
$(document).ready(function() {
    var agendatable = document.getElementById('agendatable');
    for (i = 0; i < agenda.length; i++) {
        var tablerow = document.createElement("tr");
        tablerow.id = "tr";
        var tabledata1 = document.createElement("td");
        var tabledata2 = document.createElement("td");
        var tekst = agenda[i]['date'];

        var activiteit = agenda[i]['activiteit'];
        var node = document.createTextNode(tekst);
        var node2 = document.createTextNode(activiteit);
        tabledata1.appendChild(node);
        tabledata2.appendChild(node2);
        tablerow.appendChild(tabledata1);
        tablerow.appendChild(tabledata2);
        agendatable.appendChild(tablerow);

    }

});
*/
$(document).ready(function() {
document.getElementById("getagendabutton").addEventListener('click', function() {

$.getJSON("http://localhost:3000/getagenda", function(array){
    console.log(JSON.stringify(array[1]["date"]));

     var agendatable = document.getElementById('agenda2');
     console.log(agendatable);
     removeoldnodes();
     for (i = 0; i < array.length; i++) {
       console.log(array.length + i);
         var tablerow = document.createElement("tr");
         tablerow.id = "tr";
         var tabledata1 = document.createElement("td");
         var tabledata2 = document.createElement("td");
         var tekst = array[i]['date'];
         console.log(tekst);
         var activiteit = array[i]['activiteit'];
         var node = document.createTextNode(tekst);
         var node2 = document.createTextNode(activiteit);
         tabledata1.appendChild(node);
         tabledata2.appendChild(node2);
         tablerow.appendChild(tabledata1);
         tablerow.appendChild(tabledata2);
         agendatable.appendChild(tablerow);
       }
});

    });
  });

$(document).ready(function() {
  document.getElementById("submit1").addEventListener('click', function(){
    $.getJSON("http://localhost:3000/getagenda", function(array){
  var datum = document.getElementById("invoer1").value;
  var activiteite = document.getElementById("invoer2").value;
  var indeks = document.getElementById("invoer3").value;
  console.log(datum + activiteite + indeks);
  var arraylength = array.length;
  var adding = {
    date: datum,
    activiteit: activiteite,
    index: indeks

  };
  $.getJSON("http://localhost:3000/adddate", adding);
});
  });


});

function removeoldnodes(){
  //getelement, check if nodes, if so remove by id
  var checkp = document.getElementById('agenda2');
  var checkc = document.getElementById('tr');

  while(checkc !== null) {
    var parent = document.getElementById("agenda2");
    var child = document.getElementById("tr");

    parent.removeChild(child);
    checkc = document.getElementById("tr");
  }

}

    /*  console.log(JSON.stringify(agendaarray));
    var notparsed = '[{"date":"11-12-2016", "activiteit":"Kerstconcert" },{ "date":"27-12-2016", "activiteit":"Repetitie" },{"date":"04-01-2016", "activiteit":"Repetitie" },{"date":"11-01-2016", "activiteit":"Repetitie"}]';
    var parsed = JSON.parse(notparsed);
//JSON.parse(agendaarray);
console.log(parsed[3]["date"] + " eerste array de datum dus 11-12-2016");

var agendatable = document.getElementById('agendatable');
for (i = 0; i < agendaarray.length; i++) {
  console.log(agendaarray.length + i);
    var tablerow = document.createElement("tr");
    tablerow.id = "tr";
    var tabledata1 = document.createElement("td");
    var tabledata2 = document.createElement("td");
    var tekst = agendaarray[i]['date'];
    console.log(tekst);
    var activiteit = agendaarray[i]['activiteit'];
    var node = document.createTextNode(tekst);
    var node2 = document.createTextNode(activiteit);
    tabledata1.appendChild(node);
    tabledata2.appendChild(node2);
    tablerow.appendChild(tabledata1);
    tablerow.appendChild(tabledata2);
    agendatable.appendChild(tablerow);

}
});
*/
//document on ready

/*
function showinvoer(){
  console.log("aangeroepen showinvoer")
document.getElementById('aanmeldinvoer1').style.visibility = "visible";
document.getElementById('aanmeldsubmit1').style.visibility = "visible";


}
function showinvoer2(){
  console.log("aangeroepen showinvoer2")
document.getElementById('aanmeldinvoer2').style.visibility = "visible";
document.getElementById('aanmeldsubmit2').style.visibility = "visible";

}*/
