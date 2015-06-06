function check(selId) {
  var sel = document.getElementById(selId);
  var dropDown_sel = sel.options[sel.selectedIndex].text;
  if (dropDown_sel != "none") {

    state = 1;

    //state is a Global variable initially it is set to 0
  }
}

function applyFilters(layer) {

  // get parameters from the filters
  var ini_year = $("#ini_year").val();
  var ini_month = $("#ini_month").val();
  var end_year = $("#end_year").val();
  var end_month = $("#end_month").val();
  var crime_type = $("#crime_type").val();

  // var e = document.getElementById("crime_type");
  // var crime_type = e.options[e.selectedIndex].text;

  console.log(ini_year);
  console.log(ini_month);
  console.log(end_year);
  console.log(end_month);
  console.log(crime_type);

  if (crime_type == "ALL") {
    // create query based on data from the layer
    // debugger
    var sqlQuery =
      "WITH crimes_query as (" +
      "SELECT crimes_collapsed.community_area, count(crimes_collapsed.crimes_count) as crimes_count " +
      "FROM crimes_collapsed " +
      "WHERE " +
      "crimes_collapsed.year_month >= ('" + ini_year + "-" + ini_month + "-1T00:00:00+00:00') AND " +
      "crimes_collapsed.year_month <= ('" + end_year + "-" + end_month + "-1T00:00:00+00:00') " +
      "GROUP BY crimes_collapsed.community_area) " +
      "SELECT crimes_query.community_area, crimes_query.crimes_count, commareas.cartodb_id, commareas.the_geom_webmercator as the_geom_webmercator " +
      "FROM commareas, crimes_query " +
      "WHERE CAST(commareas.area_numbe AS INT) = crimes_query.community_area";

    var cartoCSS =
      "/** choropleth visualization */" +
      "#crimes_collapsed{" +
      "  polygon-fill: #FFFFB2;" +
      "  polygon-opacity: 0.8;" +
      "  line-color: #FFF;" +
      "  line-width: 0.5;" +
      "  line-opacity: 1;" +
      "}" +
      "#crimes_collapsed {" +
      "   polygon-fill: #B10026;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 250] {" +
      "   polygon-fill: #E31A1C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 200] {" +
      "   polygon-fill: #FC4E2A;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 150] {" +
      "   polygon-fill: #FD8D3C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 100] {" +
      "   polygon-fill: #FEB24C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 50] {" +
      "   polygon-fill: #FED976;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 25] {" +
      "   polygon-fill: #FFFFB2;" +
      "}"

    $(".cartodb-legend.choropleth li.min").text("25")
    $(".cartodb-legend.choropleth li.max").text("+250")

  } else {
    // create query based on data from the layer
    var sqlQuery =
      "WITH crimes_query as (" +
      "SELECT crimes_collapsed.community_area, count(crimes_collapsed.crimes_count) as crimes_count " +
      "FROM crimes_collapsed " +
      "WHERE " +
      "crimes_collapsed.year_month >= ('" + ini_year + "-" + ini_month + "-1T00:00:00+00:00') AND " +
      "crimes_collapsed.year_month <= ('" + end_year + "-" + end_month + "-1T00:00:00+00:00') AND " +
      "crimes_collapsed.primary_type = '" + crime_type + "' " +
      "GROUP BY crimes_collapsed.community_area) " +
      "SELECT crimes_query.community_area, crimes_query.crimes_count, commareas.cartodb_id, commareas.the_geom_webmercator as the_geom_webmercator " +
      "FROM commareas, crimes_query " +
      "WHERE CAST(commareas.area_numbe AS INT) = crimes_query.community_area";

    var cartoCSS =
      "/** choropleth visualization */" +
      "#crimes_collapsed{" +
      "  polygon-fill: #FFFFB2;" +
      "  polygon-opacity: 0.8;" +
      "  line-color: #FFF;" +
      "  line-width: 0.5;" +
      "  line-opacity: 1;" +
      "}" +
      "#crimes_collapsed {" +
      "   polygon-fill: #B10026;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 8] {" +
      "   polygon-fill: #E31A1C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 7] {" +
      "   polygon-fill: #FC4E2A;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 6] {" +
      "   polygon-fill: #FD8D3C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 4] {" +
      "   polygon-fill: #FEB24C;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 2] {" +
      "   polygon-fill: #FED976;" +
      "}" +
      "#crimes_collapsed [ crimes_count <= 1] {" +
      "   polygon-fill: #FFFFB2;" +
      "}"

    $(".cartodb-legend.choropleth li.min").text("1")
    $(".cartodb-legend.choropleth li.max").text("+10")
  }

  // change the query in the layer to update the map
  layer.setSQL(sqlQuery)

  layer.setCartoCSS(cartoCSS)



}


function createMap() {

  $("#map div").remove()

  var url = 'https://agustinbenassi.cartodb.com/api/v2_1/viz/7c15a610-0bb6-11e5-8335-0e853d047bba/viz.json';
  cartodb.createVis('map', url, {
    shareable: true,
    title: true,
    description: true,
    search: true,
    tiles_loader: true,
    center_lat: 41.876871,
    center_lon: -87.619738,
    zoom: 10
  })

  .done(function(vis, layers) {
    // layer 0 is the base layer, layer 1 is cartodb layer
    var subLayer = layers[1].getSubLayer(0);
    layers[1].setInteraction(true);

    applyFilters(subLayer);
  })

  .error(function(err) {
    console.log(err);
  });
}

window.onload = createMap;
