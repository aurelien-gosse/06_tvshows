//voici la doc de l'API: https://developers.themoviedb.org/3/tv

/*
    au chargement de la page, il faut charger les séries les plus populaires.
    au click sur chaque tab, il faut changer la source (les meilleures, ce soir à la TV, etc...) - regardez l'attribut data !
    au click sur une série, il faut afficher les détails de la série. les templates handlebars sont déjà faits 
*/
let source = $("#entry-template").html();
let template = Handlebars.compile(source);

let source2 = $("#single-tv-show").html();
let template2 = Handlebars.compile(source2);

// fonction
function chargementSeries() {
  $(".loader").addClass("active");
  $(".change.active").removeClass("active");
  $(this).addClass("active");
  
  let dataTv = $(this).data("tv") || "popular";
  //let dataTv = $(this).data("tv");
  /*if (!dataTv) {
    dataTv = "popular"
  }*/

  $.getJSON("//api.themoviedb.org/3/tv/" + dataTv + "?api_key=6631e5f1dc96088e0d26b86da29b5b6a&page=1")
    .done(function (series) {
      $(".loader").removeClass("active");
      let html = template(series.results);
      $(".tv").html(html);
    })
    .fail(function () {
      alert("error, sorry!");
    });
}

// Requete 1, par défaut au chargement de la page
chargementSeries();

// Requete 2, au click sur un bouton
$(".change").on("click", chargementSeries); //ici on passe la fonction en variable

// Requete 3, au click sur une série
$(".tv").on('click', ".tv-show", function () {  //delegation d'événement

  let idFilm = $(this).attr("id");

  $.getJSON("//api.themoviedb.org/3/tv/" + idFilm + "?api_key=6631e5f1dc96088e0d26b86da29b5b6a&page=1")
    .done(function (film) {
      let html2 = template2(film);
      $(".single-tv").html(html2);
      $(".single-tv").addClass("active");
      // croix de fermeture
      $(".close").addClass("active");
    })
    .fail(function () {
      alert("sorry!");
    });
});

//croix fermeture
$(".close").on("click", function () {
  $(".close").removeClass("active");
  $(".single-tv").removeClass("active");
});