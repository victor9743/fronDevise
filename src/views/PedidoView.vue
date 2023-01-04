<template>
    <div class="container">
        <h2>Tabela de pedidos</h2>
        <div class="table-container column .is-half">
            <table class="table table is-bordered">
                <thead>
                    <th>id</th>
                    <th>pedido</th>
                    <th>detalhes</th>
                </thead>
                <tbody>
                    <tr v-for="pedido in pedidos" :key="pedido.id">
                        <td>{{pedido.id}}</td>
                        <td>{{pedido.cliente}}</td>
                        <td>Detalhes</td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/processadores">Cadastrar Pedido</router-link>
        </div>
    </div>
</template>
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
        data(){
            return {
                pedidos: []
            }
        }
        
    }
</script>

<style scoped>

</style>