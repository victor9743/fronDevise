<template>
    <div class="container">
        <div style="margin-top: 20px; font-size: 25px; text-align: left;">
            <h1>Novo Pedido</h1>
        </div>
        <div class="card" style="margin-top: 10px;">
            <div class="card-content">
                <div style="margin-bottom: 10px; text-align: left;">
                    <h3>Selecione o processador</h3>
                </div>
                <div class="content columns">
                    <div class="column" v-for="processador in processadores" :key="processador.id">
                        <input type="radio" v-model="proc" :value="processador.id" name="processador" @change="selecProc()"> {{ processador.produto }} - Marca: {{ processador.marca }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.placasMae.length > 0" >    
            <div class="card" style="margin-top: 10px;">
                <div class="card-content">
                    <div style="margin-bottom: 10px; text-align: left;">
                        <h3>Selecione a placa-mãe</h3>
                    </div>
                    <div class="content columns">
                        <div class="column" v-for="placa in placasMae" :key="placa.id">
                            <div class="card" id="cardInfo">
                                <div class="card-content">
                                    <div style="margin-bottom: 10px;">
                                        <strong><label>Placa-mãe:</label></strong> <input type="radio" v-model="placaMae" :value="placa.id" name="placaMae" @change="selecPlac(placa.qtdSlots, placa.totalMemoria, placa.videoIntegrado)"> {{ placa.produto }}
                                    </div>
                                    <div>
                                        <strong><label>Quantidade de slots disponíveis:</label></strong> {{ placa.qtdSlots }}
                                    </div>
                                    <div>
                                        <strong><label>Total de memória disponivel:</label></strong> {{ placa.totalMemoria }} GB
                                    </div>
                                    <div>
                                        <strong><label>Processadores suportados:</label></strong>
                                        <div class="columns">
                                            <div class="column" v-for="p in placa.processador" :key="p.id">
                                                <label>{{ p }}</label>
                                            </div>
                                        </div>                                      
                                    </div>                                  
                                    <div style="text-align: left;">
                                        <strong><label>Video Intergrado? </label></strong> {{ placa.videoIntegrado ? "Sim" : "Não" }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>               
            </div>
        </div>

        <div v-if="this.memorias.length > 0 && this.slots > 0 && this.qtdMemo > 0" >
            <div class="card" style="margin-top: 10px;">
                <div class="card-content">
                    <div style="margin-bottom: 10px; text-align: left;">
                        <h3>Informe a quantidade e a(s) memória(s) que deseja integrar ao computador</h3>
                        <div class="content columns">
                            <div class="column">
                                <strong>Quantidade permitida:</strong> {{ this.qtdMemo }} GB
                            </div>
                            <div class="column">
                                <strong>Quantidade selecionada:</strong> {{ totalMemo }} GB
                            </div>
                        </div>
                        <div class="content columns">
                            <div class="column" v-for="(slot, index) in slots" :key="slot">
                                <div class="card" id="cardInfo">
                                    <div class="card-content">
                                        Slot nº {{ index + 1 }}
                                        <div v-for="memoria in memorias" :key="memoria.id">
                                            descrição: <strong>{{ memoria.produto }}</strong><br>
                                                <div>
                                                    <input type="radio" :value="memoria.tamanho[0]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[0], index)"> {{ memoria.tamanho[0] }} GB
                                                    <input type="radio" :value="memoria.tamanho[1]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[1], index)"> {{ memoria.tamanho[1] }} GB
                                                    <input type="radio" :value="memoria.tamanho[2]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[2], index)"> {{ memoria.tamanho[2] }} GB
                                                </div>
                                                <div>
                                                    <input type="radio" :value="memoria.tamanho[3]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[3], index)"> {{ memoria.tamanho[3] }} GB
                                                    <input type="radio" :value="memoria.tamanho[4]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[4], index)"> {{ memoria.tamanho[4] }} GB
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="this.totalMemo <= this.qtdMemo && this.totalMemo  > 0" id="btn">
                            <button class="button is-info" @click="selecPlacaVideo()">Selecionar Placa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="placaVAba">
            <div class="card" style="margin-top: 10px; margin-bottom: 50px;">
                <div class="card-content" id="cardInfo">
                    <div style="margin-bottom: 10px;">
                        <h3>Selecione a placa de vídeo - {{ this.videoIntegrado ? 'Opcional' : 'Obrigatório' }}</h3>
                    </div>
                    <div class="content columns">
                        <div class="column" v-for="placa in this.placasVideo" :key="placa.id">
                            <input type="radio" v-model="placaV" name="placaVideo" :value="placa.id"> {{ placa.Produto }}
                        </div>
                    </div>
                    <div v-if="this.videoIntegrado || this.placaV != null">
                        <div>
                            <strong><h3>Nome do cliente:</h3></strong>
                            <div>
                                <input class="input" type="text" v-model="nomeCliente">
                            </div>
                        </div>
                        <div v-if="this.nomeCliente != ''" id="btn" style="margin-top: 10px;">
                            <button class="button is-success" @click="salvarPedido()">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    h1, h2, h3, h4, h4 {
        font-weight: bold;
    }
    
    #cardInfo {
        margin-top: 10px; 
        text-align: left;
    }

    #btn {
        justify-content: flex-end;
        display: flex;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        created(){
            axios.get("http://localhost:3000/processadores").then(res =>{
                this.processadores = res.data;
            }).catch(err =>{
                console.log(err);
            })
        },
        data(){
            return {
                processadores: [],
                placasMae: [],
                memorias: [],
                placasVideo: [],
                proc: null,
                placaMae: null,
                placaV: null,
                slots: 0,
                qtdMemo: 0,
                qtdMemoSelec: undefined,
                totalMemo: 0,
                placaVAba: false,
                nomeCliente: "",
                videoIntegrado: false
            }
        },
        methods: {
            selecProc(){
                this.memorias = []
                this.placasVideo = []
                this.placaVAba = false
                this.nomeCliente = ""
                this.placaV = null
                this.placaMae = null

                axios.get("http://localhost:3000/placasMae", {params: {id: this.proc}}).then(res =>{
                    this.placasMae = res.data;
                }).catch(err =>{
                    console.log(err);
                })
            },
            selecPlac(slots, memoria, videoIntegrado){
                this.memorias = []
                this.slots = slots;
                this.qtdMemo = memoria
                this.qtdMemoSelec = new Array()
                this.videoIntegrado = videoIntegrado
                this.placasVideo = []
                this.placaVAba = false
                this.nomeCliente = ""
                this.placaV = null

                for(let i = 0; i < this.qtdMemoSelec.length -1; i ++){
                    this.qtdMemoSelec[i] = 0;
                }

                axios.get("http://localhost:3000/memorias").then(res =>{
                    this.memorias = res.data
                }).catch(err =>{
                   console.log(err);
                })
            },
            paramsMemo(value, index){
                this.qtdMemoSelec[parseInt(index)] = parseInt(value)

                this.totalMemo = this.qtdMemoSelec.reduce((partialSum, a) => partialSum + a, 0)
                if (this.totalMemo > this.qtdMemo){
                    alert("A quantidate de memória selecionada excede a ao limite de memória permitida da placa ")
                    this.memorias = []
                    this.totalMemo = 0
                    this.selecPlac(this.slots, this.qtdMemo)
                }
                
            },
            selecPlacaVideo(){
                axios.get("http://localhost:3000/placasVideo").then(res =>{
                    this.placasVideo = res.data;
                    this.placaVAba = true
                }).catch(err =>{
                   console.log(err);
                })
            },
            salvarPedido(){
                axios.post("http://localhost:3000/salvarPedido", {processador: this.proc, placasMae: this.placaMae, memorias: this.qtdMemoSelec, placaVideo: this.placaV, cliente: this.nomeCliente}).then(res =>{
                    if (res.status == 200) {
                        window.location.href = '/';
                        alert("Pedido salvo com sucesso !!!")
                    } else {
                        alert("Erro ao salvar pedido, favor, entrar em contato com o suporte")
                    }
                }).catch(err =>{
                   console.log(err);
                })
            }
            

        }
    }
</script>