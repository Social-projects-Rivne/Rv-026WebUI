function mySearch() {
    // Declare variables
    var input, filter, divId, div, span;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    divId = document.getElementById("myUL");
    div = divId.getElementsByTagName('div');

    // Loop through all list items, and hide those who don't match the search query
    for (var i = 0; i < div.length; i++) {
        span = div[i].getElementsByTagName("span")[0];
            if (span.innerHTML.toUpperCase().indexOf(filter) > -1) {
                div[i].style.display = "";
            } else {
                div[i].style.display = "none";
            }
    }


}


module.exports = mySearch;

/*загальному діву з рецептами додати ід myUL
*
* */