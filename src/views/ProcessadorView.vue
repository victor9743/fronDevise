<template>
    <h2>Processador</h2>
    <div v-for="processador in processadores" :key="processador.id">
        <input type="radio" v-model="proc" :value="processador.id" name="processador" @change="selecProc()"> {{ processador.produto }} - Marca: {{ processador.marca }}
    </div>
    <hr>
    <div v-for="placa in placasMae" :key="placa.id">
        <input type="radio" v-model="placaMae" :value="placa.id" name="placaMae" @change="selecPlac(placa.qtdSlots, placa.totalMemoria)"> {{ placa.produto }}
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
        </div>
    </div>
    <hr>
    <div v-if="this.slots > 0 && this.qtdMemo > 0">
        <h2>Informe a quantidade e a(s) memória(s) que deseja integrar ao computador</h2>
        <div>
            quantidade permitida: {{ this.qtdMemo }} GB <br>
            quantidade selecionada: {{ totalMemo }} GB <br>
        </div>
        <div v-for="(slot, index) in slots" :key="slot">

            Slot nº {{ index + 1 }}
            <div v-for="memoria in memorias" :key="memoria.id">
                descrição: <strong>{{ memoria.produto }}</strong><br>
                <!-- <div v-for="memo in memoria.tamanho" :key="memo"> -->
                    <input type="radio" :value="memoria.tamanho[0]" :name="'memo'+index" @change="calculaMemo(memoria.tamanho[0], index)"> {{ memoria.tamanho[0] }} GB
                    <input type="radio" :value="memoria.tamanho[1]" :name="'memo'+index" @change="calculaMemo(memoria.tamanho[1], index)"> {{ memoria.tamanho[1] }} GB
                    <input type="radio" :value="memoria.tamanho[2]" :name="'memo'+index" @change="calculaMemo(memoria.tamanho[2], index)"> {{ memoria.tamanho[2] }} GB
                    <input type="radio" :value="memoria.tamanho[3]" :name="'memo'+index" @change="calculaMemo(memoria.tamanho[3], index)"> {{ memoria.tamanho[3] }} GB
                    <input type="radio" :value="memoria.tamanho[4]" :name="'memo'+index" @change="calculaMemo(memoria.tamanho[4], index)"> {{ memoria.tamanho[4] }} GB
                <!-- </div> -->
            </div>
            <hr>
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
                placasMae:[],
                memorias: [],
                proc: null,
                placaMae: null,
                slots: 0,
                qtdMemo: 0,
                qtdMemoSelec: [0 , 0],
                totalMemo: 0
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
            selecPlac(slots, memoria){
                this.slots = slots;
                this.qtdMemo = memoria
                axios.get("http://localhost:3000/memorias").then(res =>{
                    this.memorias = res.data
                }).catch(err =>{
                   console.log(err);
                })
            },
            calculaMemo(value, index){
                this.qtdMemoSelec[index] = parseInt(value)
                this.totalMemo = this.qtdMemoSelec[0] + this.qtdMemoSelec[1]
                
            }
        }
    }
</script>