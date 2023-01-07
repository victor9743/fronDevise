<template>
    <h2>Processador</h2>
    <div v-for="processador in processadores" :key="processador.id">
        <input type="radio" v-model="proc" :value="processador.id" name="processador" @change="selecProc()"> {{ processador.produto }} - Marca: {{ processador.marca }}
    </div>
    <hr>
    <div v-for="placa in placasMae" :key="placa.id">
        <input type="radio" v-model="placaMae" :value="placa.id" name="placaMae" @change="selecPlac(placa.qtdSlots, placa.totalMemoria, placa.videoIntegrado)"> {{ placa.produto }}
        <div>
            Detalhes:
            <div>
                <label>Quantidade de slots disponíveis:</label> <strong>{{ placa.qtdSlots }}</strong>
            </div>

            <div>
                <label>Total de memória disponivel</label> <strong>{{ placa.totalMemoria }}</strong> GB
            </div>

            <label>Processadores suportados:</label>
            <div v-for="p in placa.processador" :key="p.id">
                <strong>{{ p }}</strong>
            </div>

            <label>Video Intergrado:</label> {{ placa.videoIntegrado ? "Sim" : "Não" }}
            <div>

            </div>
        </div>
    </div>
    <hr>
    <div v-if="this.slots > 0 && this.qtdMemo > 0" style="margin-bottom: 40px">
        <h2>Informe a quantidade e a(s) memória(s) que deseja integrar ao computador</h2>
        <div>
            quantidade permitida: {{ this.qtdMemo }} GB <br>
            quantidade selecionada: {{ totalMemo }} GB <br>
        </div>
        <div v-for="(slot, index) in slots" :key="slot">

            Slot nº {{ index + 1 }}
            <div v-for="memoria in memorias" :key="memoria.id">
                descrição: <strong>{{ memoria.produto }}</strong><br>
                    <input type="radio" :value="0"  :name="'memo'+index" @change="paramsMemo(0, index)"> Sem Memória
                    <input type="radio" :value="memoria.tamanho[0]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[0], index)"> {{ memoria.tamanho[0] }} GB
                    <input type="radio" :value="memoria.tamanho[1]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[1], index)"> {{ memoria.tamanho[1] }} GB
                    <input type="radio" :value="memoria.tamanho[2]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[2], index)"> {{ memoria.tamanho[2] }} GB
                    <input type="radio" :value="memoria.tamanho[3]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[3], index)"> {{ memoria.tamanho[3] }} GB
                    <input type="radio" :value="memoria.tamanho[4]" :name="'memo'+index" @change="paramsMemo(memoria.tamanho[4], index)"> {{ memoria.tamanho[4] }} GB
            </div>
            <hr>
        </div>
        <div v-if="this.totalMemo <= this.qtdMemo && this.totalMemo  > 0">
            <button @click="selecPlacaVideo()">Selecionar Placa</button>
        </div>
    </div>

    <div v-if="placaVAba">
        <h2>Selecione a placa de vídeo - {{ this.videoIntegrado ? 'Opcional' : 'Obrigatório' }}</h2>
        <div v-for="placa in this.placasVideo" :key="placa.id">
            <input type="radio" v-model="placaV" name="placaVideo" :value="placa.id"> {{ placa.Produto }}
        </div>
        <div v-if="this.videoIntegrado || this.placaV != null">
            <div style="margin-top: 50px">
                <label>Nome do cliente:</label>
                <div>
                    <input type="text" v-model="nomeCliente">
                </div>
            </div>
            <div v-if="this.nomeCliente != ''">
                <button @click="salvarPedido()">Salvar</button>
            </div>
        </div>
    </div>

</template>
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
                    console.log(res);
                }).catch(err =>{
                   console.log(err);
                })
            }
            

        }
    }
</script>