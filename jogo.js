console.log('Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprit X, sprit Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na sprit
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprit X, sprit Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na sprit
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

//Chao
function criarChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;


            //console.log('[chao.x]', chao.x);
            //console.log('[repeteEm]',repeteEm);
            //console.log('[movimentacao]', movimentacao % repeteEm);

            chao.x = movimentacao % repeteEm;
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, //sprit X, sprit Y
                chao.largura, chao.altura, //Tamanho do recorte na sprit
                chao.x, chao.y,
                chao.largura, chao.altura,
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, //sprit X, sprit Y
                chao.largura, chao.altura, //Tamanho do recorte na sprit
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };
    return chao;
}

//colisao 
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular');
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                console.log('Fezcolisao');
                som_HIT.play();

                
                    mudaParaTela(Telas.GAME_OVER);
                


                return;
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0, }, //asa pra cima
            { spriteX: 0, spriteY: 26, }, //asa no meio
            { spriteX: 0, spriteY: 52, }, //asa pra baixo
            { spriteX: 0, spriteY: 26, }, //asa no meio
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao

            }
        },

        desenha() {
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY, //sprit X, sprit Y
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte na sprit
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            );

        }
    }
    return flappyBird;
}

/// mensagemGetReady
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY, //sprit X, sprit Y
            mensagemGetReady.largura, mensagemGetReady.altura, //Tamanho do recorte na sprit
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        );

    }
}

///mensagem Game Over
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY, //sprit X, sprit Y
            mensagemGameOver.largura, mensagemGameOver.altura, //Tamanho do recorte na sprit
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.largura, mensagemGameOver.altura
        );

    }
}


//
// Canos
//

function criarCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                //Cano do céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                //Cano do chao
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }

                par.canoChao ={
                    x: canoChaoX,
                    y: canoChaoY
                }

            })

        },
        temColisaoComOFlappyBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                }

            
            
                if (peDoFlappy >= par.canoChao.y){
                return true;
                }
            }   
            
            return false;

        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                console.log('Passou 100 Frames')
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if(canos.temColisaoComOFlappyBird(par)){
                    console.log('voce perdeu')
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                    
                    
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }

            });
        }
    }
    return canos;

    }


    function criaPlacar(){
        const placar = {
        pontuacao: 0,
        desenha(){
           contexto.font = '35px "VT323"';
           contexto.textAlign = 'right';
           contexto.fillStyle = 'white';
           contexto.fillText(`${placar.pontuacao}`, canvas.width -10, 35); 
        },    
        atualiza(){
            const intervaloDeFrames = 20;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                placar.pontuacao = placar.pontuacao + 1;

            }
        }
    }
        return placar
    }


    //
    // Telas
    //
    const globais = {};
    let telaAtiva = {};
    function mudaParaTela(novaTela) {
        telaAtiva = novaTela;

        if (telaAtiva.inicializa) {
            telaAtiva.inicializa();

        }
    }

    const Telas = {
        INICIO: {
            inicializa() {
                globais.flappyBird = criaFlappyBird();
                globais.chao = criarChao();
                globais.canos = criarCanos();
            },
            desenha() {
                planoDeFundo.desenha();
                globais.flappyBird.desenha();
                
                globais.chao.desenha();
                mensagemGetReady.desenha();
            },
            click() {
                mudaParaTela(Telas.JOGO);
            },
            atualiza() {
                globais.chao.atualiza();
                
            }
        }

    };

    Telas.JOGO = {
        inicializa(){
            globais.placar = criaPlacar();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
        },
        click() {
            globais.flappyBird.pula();
        },
        atualiza() {
            globais.canos.atualiza();
            globais.flappyBird.atualiza();
            globais.chao.atualiza();
            globais.placar.atualiza();        }
    };

    Telas.GAME_OVER = {
        desenha(){
            mensagemGameOver.desenha();
        },
        atualiza() {

        },
        click() {
            mudaParaTela(Telas.INICIO);
        }

    }

    function loop() {
        telaAtiva.desenha();
        telaAtiva.atualiza();

        frames = frames + 1;
        requestAnimationFrame(loop);

    }

    window.addEventListener('click', function () {
        if (telaAtiva.click) {
            telaAtiva.click();
        }
    });

    mudaParaTela(Telas.INICIO);
    loop();
