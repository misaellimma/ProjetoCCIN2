var fotos = [];

$(function () {
    //Verifica se possui o id de usuário no Local Storage.
    if(localStorage.getItem('userID') == null){
        alert('Erro ao carregar o ID de Usuário.');
    }else{
        var userid = localStorage.getItem('userID');

        //Verifica se possui o id do album no Local Storage.
        if(localStorage.getItem('albumID') == null){
            alert('Erro ao carregar o ID do Album.');
        }else{
            var albumid = localStorage.getItem('albumID');

            //Verifica se possui fotos no Local Storage.
            if (localStorage.getItem('fotos') == null) {
                CarregarFotos(albumid);
            }
            else {
                var temp = localStorage.getItem('fotos');
                fotos = JSON.parse(temp);
            }
        }
    }
    CarregarPerfil(userid)
    PreencherFotos();
});

//Função que carrega as fotos do album e salva no Local Storage.
function CarregarFotos(albumID) {
    var urlServico = 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumID;
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
                    var foto = {
                        AlbumId: item.albumId,
                        Id: item.id,
                        Title: item.title,
                        Url: item.url,
                    };
                    fotos.push(foto);
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
                conteudo += '<img src="/images/usuario.svg" class="rounded-circle">';
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

//Função que preenche as fotos na página.
function PreencherFotos() {
    for (var i = 0; i < fotos.length; i++) {
        var item = fotos[i];
        var conteudo = '';
        conteudo += '<div class="col-md-4">';
        conteudo += '<figure class="figure">';
        conteudo += '<img src="' + item.Url + '" class="figure-img img-fluid rounded">';
        conteudo += '<figcaption class="figure-caption">' + item.Title + '</figcaption>';
        conteudo += '</figure>';
        conteudo += '</div>';
        $('#fotos').append(conteudo);
    }
    localStorage.removeItem('fotos');
}