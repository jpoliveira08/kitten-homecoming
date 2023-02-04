<?php

function somar(int $number, int $number2) {
    $total = $number + $number2;

    return $total;
}

$soma = somar(1, 2);

echo $soma;

xdebug_info();
