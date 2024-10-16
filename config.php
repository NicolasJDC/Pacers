<?php

    $dbHost = 'Localhost';
    $dbUsername = 'root';
    $dbPassword = 'palmeiras2020';
    $dbName = 'formulario-pacers';

    $conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName )

    if($conexao->connect_errno)
    {
        echo "Erro";
    }
    else
    {
        echo "Conexão efetuada com sucesso"
    }
?>