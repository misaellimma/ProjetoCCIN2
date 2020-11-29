var comments = '';
$(function () {
    //Verifica se possui o id de usuário no Local Storage.
    if (localStorage.getItem('userID') == null) {
        alert('Erro ao carregar o ID de usuário.');
    }
    else {
        var userid = localStorage.getItem('userID');
        CarregarUser(userid);
        CarregarDetalhesPosts(userid);
    }
});

//Função que carrega o perfil do usuário.
function CarregarUser(userID) {
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

//Função que Carrega as postagens do usuário.
function CarregarDetalhesPosts(userID){
    var tempPosts = localStorage.getItem('posts');
    var posts = JSON.parse(tempPosts);

    var tempUser = localStorage.getItem('user');
    var user = JSON.parse(tempUser);

    for (var i = 0; i < posts.length; i++) {
        var item = posts[i];
        var conteudo = '';
        conteudo += '<div class="card">';
        conteudo += '<div class="card-header" style="background-color: #c9daf8;">';
        conteudo += '<a href="/users.html" style="color: #000000;">' + user.name + '</a>';
        conteudo += '</div>';
        conteudo += '<div class="card-body">';
        conteudo += '<h5 class="card-title">' + item.Title + '</h5>';
        conteudo += '<p class="card-text">' + item.Body + '</p>';
        conteudo += '<div class="accordion">';
        conteudo += '<div class="card">';
        conteudo += '<div class="card-header">';
        conteudo += '<h2 class="mb-0">';
        conteudo += '<button class="btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#recolhe' + item.Id + '" aria-expanded="false" onclick="CarregarComments(' + item.Id + '); return false;">';
        conteudo += 'Comentários';
        conteudo += '</button>';
        conteudo += '</h2>';
        conteudo += '</div>';
        conteudo += '<div id="recolhe' + item.Id + '" class="collapse">';
        conteudo += '<div class="card-body" id="comments' + item.Id + '">';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '<br>';
        $('#postsUser').append(conteudo);
    }
    localStorage.removeItem('posts');
}

//Função que carrega os comentários da postagem.
function CarregarComments(postID) {
    if(sessionStorage.getItem('conteudo' + postID) == null){
        $('#comments' + postID).empty();
        var urlServico = 'https://jsonplaceholder.typicode.com/comments?postId=' + postID;
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
                    var conteudo = '';
                    for (var i = 0; i < retorno.length; i++) {
                        var item = retorno[i];
                        conteudo += '<nav class=" navbar navbar-light rounded" style="background-color: #e9f0fd;">';
                        conteudo += '<span class="navbar-text">';
                        conteudo += '<a>' + item.name + '<br>' + item.email + '</a><br>';
                        conteudo += item.body;
                        conteudo += '</span>';
                        conteudo += '</nav>';
                        conteudo += '<br>';
                    }
                    $('#comments' + postID).append(conteudo);
                    sessionStorage.setItem('conteudo' + postID, String(true));
                }
            }
        });
    }else{
        sessionStorage.removeItem('conteudo'+ postID);
    }  
}