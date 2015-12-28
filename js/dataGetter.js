(function ($) {
    $('button').on('click', function () {
        // will clear the current content area in case you are generating a new dataset
        $('.content-area ul').remove();
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


            // where we will store list of information we want to print
            var dataObjects = [];
            var $ul;
            
            $.each(urlData, function (key, val) {
                //iterate through the different rows and build a list
                var results = '<li id="' + key + '">';
                for (var i = 0; i < indexes.length; i++) {
                    results = results + '<span class="' + col_names[indexes[i]] + '">' + 
                    col_names[indexes[i]] + ': ' + val[indexes[i]] + '</span><br>';
                }
                results = results + '</li>';
                dataObjects.push(results);
            });
            
            // remove spinner from page
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').appendTo('.content-area');
            
            //append data objects we want to appear to list
            $ul.append(dataObjects);
        });
});
}(jQuery));