var users = [];

$(function () {
    //Verifica se possui users no Local Storage.
    if (localStorage.getItem('users') == null) {
        localStorage.removeItem('userID');
        CarregarUsers();
    }
    else {
        var temp = localStorage.getItem('users');
        users = JSON.parse(temp);
    }
    PreencherUsersInicio();
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

//Função que carrega os usuários.
function CarregarUsers() {
    var urlServico = 'https://jsonplaceholder.typicode.com/users';
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
                    var user = {
                        Id: item.id,
                        Name: item.name,
                        Username: item.username,
                        Email: item.email
                    };
                    users.push(user);
                }
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    });
}

//Preenche a tela inicial com os usuários.
function PreencherUsersInicio() {
    for (var i = 0; i < users.length; i++) {
        var item = users[i];
        var conteudo = '';
        conteudo += '<div class="col md">';
        conteudo += '<div class="card text-center card-body" style="min-width: 13rem; max-width: 18rem; background-color: #ffffff; margin: auto; float: none;">';
        conteudo += '<a href="users.html" onclick="Detalhes(' + item.Id + ');">';
        conteudo += '<img src="/images/usuario.svg" class="rounded-circle">';
        conteudo += '</a>';
        conteudo += '<div class="d-inline-block text-truncate">';
        conteudo += '<h6 class="card-title">' + item.Name + '</h5>';
        conteudo += '<p class="card-text">' + item.Username + '</p>';
        conteudo += '<a href="/users.html" class="btn btn-primary btn-block" onclick="Detalhes(' + item.Id + ');">Ver Perfil</a>';
        conteudo += '</div>';
        conteudo += '</div>';
        conteudo += '<br>';
        conteudo += '</div>';
        $('#usersInicio').append(conteudo);
    }
}

//Função que chama a página de usuário enviando o id do usuário.
function Detalhes(userID) {
    localStorage.setItem('userID', userID);
    CarregarPagina('user.html' + userID);
}
