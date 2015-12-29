(function ($) {
    $('button').on('click', function () {
        // will clear the current content area in case you are generating a new dataset
        $('.content-area table').remove();
        // add spinner for loading
        $('<i class="fa fa-spin"/>').appendTo('body');
        
        // retrieves the API URL from the options box
        var jsonPage = $('select option:selected').attr('value');

        $.getJSON(jsonPage, function (data) {
            // access the data section (rows) of the dataset
            var urlData = data.data;
            var columnData = data.meta.view.columns;

            // list of relevent indexes in the data arrays
            var indexes = [];
            // list of the column names (relevent ones would match index in "indexes" array)
            var col_names = [];

            // iterate trhough each element in columns, add column names to array and
            // put relevant column indexes in indexes array for use later
            for (var i = 0; i < columnData.length; i++) {
                col_names.push(columnData[i].name);
                if ((columnData[i].id) != -1) {
                    indexes.push(i);
                }
            }


            // where we will store table of information we want to print
            var $table;

            // Create the header row of the table
            var resultTable = "<thead><tr>";
            // pull relevant column names using indexes array
            for (var i = 0; i < indexes.length; i++) {
                resultTable = resultTable + "<th>" + col_names[indexes[i]] + "</th>";
            }
            resultTable = resultTable + "</tr></thead>";

            // Create the body of the table
            var results = "<tbody>";
             $.each(urlData, function (key, val) {
                results = results + "<tr>";
                //iterate through the different rows and build the rows in the table
                for (var i = 0; i < indexes.length; i++) {
                    results = results + '<td>' + val[indexes[i]] + '</td>';
                }
                results = results + "</tr>";
            });
             resultTable = resultTable + results + "</tbody>";


            
            // remove spinner from page
            $('.fa-spin').remove();
            
            // append table to page
            $table = $('<table />').appendTo('.content-area');
            
            //append data objects we want to appear to list
            $table.append(resultTable);
        });
});
}(jQuery));