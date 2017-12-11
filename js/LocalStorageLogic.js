(function () {
    var Person = {
        Name: "",
        Date: "",
        Points:"",
        Size:"",
    };


    var applogic = {

        clearuielements: function () {
            var inputs = document.getElementsByClassName("c1");
            for (i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
            }
        },

        saveitem: function () {
            var lscount = localStorage.length;
            var inputs = document.getElementsByClassName("c1");
            Person.Name = inputs[0].value;
            Person.Date = inputs[1].value;
            Person.Points = inputs[2].value;
            Person.Size = inputs[3].value;
            localStorage.setItem("Person_" + lscount, JSON.stringify(Person));
            location.reload();
        },

        loaddata: function () {
            var datacount = localStorage.length;
            if (datacount > 0)
            {
                var render = "<table border='0' width='445px' align='center'>";
                render += "<tr><th>Имя</th><th>Дата</th><th>Очки</th><th>Размер</th></tr>";
                for (i = 0; i < datacount; i++) {
                    var key = localStorage.key(i);
                    var person = localStorage.getItem(key);
                    var data = JSON.parse(person);

                    render += "<tr><td>" + data.Name + " </td>";
                    render += "<td>" + data.Date + "</td>";
                    render += "<td>" + data.Points + "</td>";
                    render += "<td>" + data.Size + "</td>";
                }
                render+="</table>";
                dvcontainer.innerHTML = render;
            }
        },

        clearstorage: function () {
            var storagecount = localStorage.length;
            if (storagecount > 0)
            {
                for (i = 0; i < storagecount; i++) {
                    localStorage.clear();
                }
            }
            window.location.reload();
        }
    };

    var btnsave = document.getElementById('btnsave');
    btnsave.addEventListener('click', applogic.saveitem, false);

    var btnclear = document.getElementById('btnclear');
    btnclear.addEventListener('click', applogic.clearuielements, false);

    var btnclearstorage = document.getElementById('btnclearstorage');
    btnclearstorage.addEventListener('click', applogic.clearstorage, false);

    window.onload = function () {
        applogic.loaddata();
    };
})();