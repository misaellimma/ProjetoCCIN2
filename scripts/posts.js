 var posts = [];

 $(function () {
    //Verifica se possui o id de usuário no Local Storage.
    if(localStorage.getItem('userID') == null){
        alert('Erro ao carregar o ID de Usuário.');
    }else{
        var userid = localStorage.getItem('userID');

        //Verifica se possui posts no Local Storage.
        if (localStorage.getItem('posts') == null) {
            CarregarPosts(userid);
        }
        else {
            var temp = localStorage.getItem('posts');
            posts = JSON.parse(temp);
        }
    }
});

//Função que carrega as postagens e salva no Local Storage.
function CarregarPosts(userID) {
    var urlServico = 'https://jsonplaceholder.typicode.com/posts?userId=' + userID;
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

                    var post = {
                        Userid: item.userId,
                        Id: item.id,
                        Title: item.title,
                        Body: item.body
                    };
                    posts.push(post);
                }
                localStorage.setItem('posts', JSON.stringify(posts));
            }
        }
    });
}