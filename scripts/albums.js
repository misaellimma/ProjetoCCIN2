var albums = [];
var fotos = [];

$(function () {
    //Verifica se possui o id de usuário no Local Storage.
    if(localStorage.getItem('userID') == null){
        alert('Erro ao carregar o ID de Usuário.');
    }else{
        var userid = localStorage.getItem('userID');

        //Verifica se possui albums no Local Storage.
        if (localStorage.getItem('albums') == null) {
            CarregarAlbums(userid);
        }
        else {
            var temp = localStorage.getItem('albums');
            albums = JSON.parse(temp);
        }
    }
    CarregarFotos();
    CarregarPerfil(userid);
    PreencherAlbums(userid);
});

//Função que carrega a pagina.
function CarregarPagina(pagina, destino) {
    $.ajax({
        type: "GET",
        url: pagina,
        async: false,   
        success: function (r) {
            $(destino).html(r);
        }
    });
}

//Função que carrega os albuns de fotos.
function CarregarAlbums(userID) {
    var urlServico = 'https://jsonplaceholder.typicode.com/albums';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados de Users. Status: " + status);
            }
            else {
                for (var i = 0; i < retorno.length; i++) {
                    var item = retorno[i];
                    if(item.userId == userID){
                        var album = {
                            UserId: item.userId,
                            Id: item.id,
                            Title: item.title
                        };

                        albums.push(album);
                    }
                }
                localStorage.setItem('albums', JSON.stringify(albums));
            }
        }
    });
}

//Função que carrega a primeira foto do album.
function CarregarFotos() {
    var urlServico = 'https://jsonplaceholder.typicode.com/photos';
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados de Users. Status: " + status);
            }
            else {
                var j = 1;
                for (var i = 1; i < retorno.length; i++) {
                    var item = retorno[i];
                    if(item.albumId == j){
                        j++;
                        var foto = {
                            Id: item.id,
                            AlbumId: item.albumId,
                            ThumbnailUrl: item.thumbnailUrl
                        };
                        fotos.push(foto);
                    }
                }
                localStorage.setItem('fotos', JSON.stringify(fotos));
            }
        }
    });
}

//Função que carrega o perfil do usuário.
function CarregarPerfil(userID) {
    var urlServico = 'https://jsonplaceholder.typicode.com/users/' + userID;
    $.ajax({
        type: "GET",
        url: urlServico,
        async: false,
        data: null,
        cache: false,
        success: function (retorno) {
            if (retorno.lenght == 0) {
                alert("Erro ao obter os dados de Users. Status: " + status);
            }
            else {
                item = retorno;
                var conteudo = '';
                conteudo += '<div class="card text-center card-body" style="background-color: #ffffff;">';
                conteudo += '<a href="users.html">';
                conteudo += '<img src="/images/usuario.svg" class="rounded-circle" style="max-width: 18rem;">';
                conteudo += '</a>';
                conteudo += '<div class="card-body">';
                conteudo += '<h5 class="card-title">' + item.name + '</h5>';
                conteudo += '<p class="card-text">' + item.username + '</p>';
                conteudo += '<p class="card-text">' + item.email + '</p>';
                conteudo += '</div>';
                conteudo += '</div>';
                $('#perfil').append(conteudo);
            }
        }
    });
}

//Função que preenche os albuns com as fotos na página.
function PreencherAlbums(userID) {
    for (var i = 0; i < albums.length; i++) {
        var item = albums[i];
        var thumb = fotos[i];
        
        var conteudo = '';
        conteudo += '<div class="col-md-4">';
        conteudo += '<figure class="figure">';
        conteudo += '<a href="fotos.html" onclick="Detalhes(' + item.Id + ');">';
        conteudo += '<img src="' + thumb.ThumbnailUrl + '" class="figure-img img-fluid rounded" style="width: 25rem;">';
        conteudo += '<figcaption class="figure-caption">' + item.Title + '</figcaption>';
        conteudo += '</a>';
        conteudo += '</figure>';
        conteudo += '<br>';
        conteudo += '</div>';
        $('#albumUser').append(conteudo);
    }
    localStorage.removeItem('albums');
    localStorage.removeItem('fotos');
}

//Função que chama a página de fotos enviando o id do album.
function Detalhes(albumID) {
    localStorage.setItem('albumID', albumID);
    CarregarPagina('fotos.html' + albumID);
}
