$(document).ready(function() {
    $("#simulate").click(function(e) {
        e.preventDefault();


        $.get("/drive", function(res) {
            $("#info").html("Memory increase starting...");
        });
    });

    $("#stop").click(function(e) {
        e.preventDefault();


        $.get("/stop", function(res) {
            $("#info").html("");
        });
    });
}); 