<template>
    <div class="container">
        <div id="tituloPedido">
            <h2>Tabela de pedidos</h2>
        </div>

        <div class="table-container column">
            <table class="table table is-bordered" id="tabela">
                <thead>
                    <th id="colunaId">id</th>
                    <th id="colunaPedido">pedido</th>
                    <th id="colunaOpcao">Opção</th>
                </thead>
                <tbody id="corpoTabela">
                    <tr v-for="pedido in pedidos" :key="pedido.id">
                        <td>{{pedido.id}}</td>
                        <td>{{pedido.cliente}}</td>
                        <td><button class="button is-small is-link" @click="detalhesPedido(pedido.id)">Detalhes</button></td>
                    </tr>
                </tbody>
            </table>
            <div :class="{modal: true, 'is-active': this.mostrarPedido }">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="card">
                        <div class="card-content">
                            <div class="content" v-html="this.Detalhepedido" id="detalhes">
                            </div>
                        </div>
                        <div class="card-content" style="justify-content: flex-end; display: flex;">
                            <button class="button is-link is-light" @click="hideModal()">Fechar</button>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
        <div id="divCadastrar">
            <router-link to="/novoPedido" class="button is-primary">Cadastrar Pedido</router-link>
        </div>
    </div>
</template>
<style scoped>
    .modal-close{
        display: none;
    }

    #detalhes{
        text-align: left;
    }

    #corpoTabela{
        text-align: left;
    }

    #tabela{
        margin-top: 10px;
    }

    #colunaId {
        width: 1%;
    }

    #colunaPedido {
        width: 90%;
    }

    #colunaOpcao {
        width: 9%;
    }

    #tituloPedido {
        margin-top: 50px;
        font-weight: bold;
        font-size: 20px;
    }

    #divCadastrar {
        justify-content: flex-end;
        display: flex;
        margin-bottom: 5%;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        created(){
            axios.get("http://localhost:3000/pedidos").then(res =>{
                this.pedidos = res.data;
            }).catch(err =>{
                console.log(err);
            })
        },
        methods: {
            hideModal(){
                this.mostrarPedido = false
            },
            detalhesPedido(pedido){
                this.mostrarPedido = true

                axios.get("http://localhost:3000/detalhesPedido",{params: {id: pedido} }).then(res =>{
                    this.Detalhepedido = "<div id='detalhes'>"+
                                "<h2 style='text-align:center'>Detalhes do Pedido</h2><hr>"+
                                "<div class='columns is-flex'>"+
                                    "<div class='column'>"+
                                        "<label>Cliente: <strong>"+res.data[1]+"</strong> </label><br>"+
                                    "</div>"+
                                    "<div class='column'>"+
                                        "<label>Data de Criação: <strong>"+res.data[0]+"</strong></label>"+
                                    "</div>"+
                                    "<hr>"+
                                "</div>"+
                                "<div>"+
                                    "<label>Processador: <strong>"+res.data[2].produto+"</strong></label><br>"+
                                    "<label>Marca: <strong>"+res.data[2].marca+"</strong></label>"+
                                "<div>"+
                                "<div>"+
                                    "<label>Placa mãe: <strong>"+res.data[3].produto+"</strong></label><br>"+
                                    "<div style='margin-left: 15px'>"+
                                        "<label><strong>Detalhes da placa</strong></label><br>"+
                                        "<label>Quantidade de slots disponiveis: <strong>"+res.data[3].qtdSlots+"</strong></label><br>"+
                                        "<label>Quantidade de memória disponivel: <strong>"+res.data[3].totalMemoria+"</strong> GB</label><br>"+
                                        "<label>Possui video integrado? <strong>"+ (res.data[3].videoIntegrado ? "Sim" : "Não") +"</strong></label><br>"+
                                    "</div>"+
                                    "<div>"+
                                        "<label>Memória(s) RAM</label>"+
                                            "<div style='margin-left: 15px'>"+
                                                this.memorias(res.data[4])+
                                            "</div>"+
                                    "</div>"+
                                    "<div style='margin-bottom: -50px'>"+
                                        "<label>Placa de vídeo: <strong>"+(res.data[5].Produto == null ? "Não possui placa de vídeo." : res.data[5].Produto) +"</strong></label>"+
                                        "<hr>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                }).catch(err =>{
                    console.log(err);
                })
            },
            memorias(array){
                let campoMemoria = ""

                for(let i=0; i< array.length; i++) {
                    campoMemoria +="<label><strong>"+ array[i] +"</strong></label><br>"
                }

                return campoMemoria;
            }
        },  
        data(){
            return {
                pedidos: [],
                mostrarPedido: false,
                Detalhepedido: ""
            }
        }
        
    }
</script>