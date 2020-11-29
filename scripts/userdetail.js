$(function () {
    //Verifica se possui o id do usuário no Local Storage.
    if (localStorage.getItem('userID') == null) {
        alert('Erro ao carregar o ID de Usuário.');
    }
    else {
        var userid = localStorage.getItem('userID');
        CarregarDetalhes(userid);
    }
});

//Carrega os detalhes do usuário e salva no Local Storage.
function CarregarDetalhes(userID) {
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
                localStorage.removeItem('users');
                var user = retorno;
                var conteudo = '';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-md-3 ">';
                conteudo += '<br>';
                conteudo += '<div class="card text-center card-body" style="background-color: #ffffff;">';
                conteudo += '<a href="users.html">';
                conteudo += '<img src="/images/usuario.svg" class="rounded-circle" style="max-width: 18rem;">';
                conteudo += '</a>';
                conteudo += '<div class="card-body">';
                conteudo += '<h5 class="card-title">' + user.name + '</h5>';
                conteudo += '<p class="card-text">' + user.username + '</p>';
                conteudo += '<p class="card-text">' + user.email + '</p>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<br>';
                conteudo += '<div>';
                conteudo += '<ul class="nav flex-column nav-pills border" style="background-color: #ffffff;">';
                conteudo += '<li class="nav-item">';
                conteudo += '<a class="nav-link active" style="background-color:#1155cc;" href="/users.html">Sobre</a>';
                conteudo += '</li>';
                conteudo += '<li class="nav-item">';
                conteudo += '<a class="nav-link" href="/posts.html">Postagens</a>';
                conteudo += '</li>';
                conteudo += '<li class="nav-item">';
                conteudo += '<a class="nav-link" href="/albums.html">Albuns</a>';
                conteudo += '</li>';
                conteudo += '</ul>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="col-md-9">';
                conteudo += '<div class="accordion" >';
                conteudo += '<br>';
                conteudo += '<div class="card">';
                conteudo += '<div class="card-header" style="background-color: #efefef;">';
                conteudo += '<h2 class="mb-0">';
                conteudo += '<button class="btn btn-block text-left" type="button">';
                conteudo += 'Endereço';
                conteudo += '</button>';
                conteudo += '</h2>';
                conteudo += '</div>';
                conteudo += '<div class="collapse show">';
                conteudo += '<div class="card-body">';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Cidade: </label>';
                conteudo += '<a> ' + user.address.city + '</a>';
                conteudo += '</div>';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>CEP: </label>';
                conteudo += '<a> ' + user.address.zipcode + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Logradouro: </label>';
                conteudo += '<a> ' + user.address.street + '</a>';
                conteudo += '</div>';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Suite: </label>';
                conteudo += '<a> ' + user.address.suite + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="card">';
                conteudo += '<div class="card-header" style="background-color: #efefef;">';
                conteudo += '<h2 class="mb-0">';
                conteudo += '<button class="btn btn-block text-left" type="button">';
                conteudo += 'Localização';
                conteudo += '</button>';
                conteudo += '</h2>';
                conteudo += '</div>';
                conteudo += '<div class="collapse show">';
                conteudo += '<div class="card-body">';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Latitude:</label>';
                conteudo += '<a> ' + user.address.geo.lat + '</a>';
                conteudo += '</div>';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Longitude:</label>';
                conteudo += '<a> ' + user.address.geo.lng + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Site:</label>';
                conteudo += '<a> ' + user.website + '</a>';
                conteudo += '</div>';
                conteudo += '<div class="col-sm-6">';
                conteudo += '<label>Telefone:</label>';
                conteudo += '<a> ' + user.phone + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="card">';
                conteudo += '<div class="card-header" style="background-color: #efefef;">';
                conteudo += '<h2 class="mb-0">';
                conteudo += '<button class="btn btn-block text-left" type="button">';
                conteudo += 'Companhia';
                conteudo += '</button>';
                conteudo += '</h2>';
                conteudo += '</div>';
                conteudo += '<div class="collapse show">';
                conteudo += '<div class="card-body">';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-12">';
                conteudo += '<label>Nome:</label>';
                conteudo += '<a> ' + user.company.name + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-12">';
                conteudo += '<label>Frase de Efeito:</label>';
                conteudo += '<a> ' + user.company.catchPhrase + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="row">';
                conteudo += '<div class="col-sm-12">';
                conteudo += '<label>BS:</label>';
                conteudo += '<a> ' + user.company.bs + '</a>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '</div><br>';
                localStorage.setItem('user', JSON.stringify(user));
                $('#userPerfil').append(conteudo);
            }
        }
    });
}