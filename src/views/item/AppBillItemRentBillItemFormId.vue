<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление статьи</v-toolbar-title>
        <v-spacer></v-spacer>
            <v-btn color="success" class="mb-2" @click="save()" >{{formAutoTitle}}</v-btn> 
            <v-btn color="primary" class="mb-2 ml-1" >{{formDriveTitle}}</v-btn>  
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="editedItem.tabs"
        background-color="transparent"
      >
        <v-tab> Информация </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="editedItem.tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="editedItem.name"
            :counter="150"
            label="Название"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.description"
            :counter="150"
            label="Описание"
            required
          ></v-text-field>
        </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.categoryAuto" label="Категория автомобилей"></v-select>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.tariff" label="Тарифный план"></v-select>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.network" label="Размер сетки"></v-select>
          </v-col> 
          <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.coastPerDay"
            :counter="6"
            label="Стоимость за сутки"
            required
          ></v-text-field>
        </v-col> 
        <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.contractContinue" label="При продлении договора"></v-select>
        </v-col> 

         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.startPayment"
            :counter="10"
            label="Стартовый платёж"
            required
          ></v-text-field> 
         </v-col>
      
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.summAmount"
            :counter="12"
            label="Сумма залога"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.statusRes" label="Статус"></v-select>
         </v-col> 
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        dialog: false,
      editedIndex: -1,
      picker: new Date().toISOString(),
      status: [
                    "активный", 
                    "заблокированный", 
                    "проверенный", 
                    "удалённый", 
                    "неактивный", 
                    "предрегистрация", 
                    "предрегистрация", 
                    "предрегистрация",
                    "непроверенный",
                    "передан на взыскание"
                ],
      editedItem:{
                name: '',
                description: '',
                categoryAuto: '',
                tariff: '',
                network: '',
                coastPerDay: '',
                contractContinue: '',
                startPayment: '',
                summAmount: '',
                statusRes: '',
            }
        }
    },
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Сохранить и выйти' : 'Редактировать и выйти'
      },
      formAutoTitle () {
        return this.editedIndex === -1 ? 'Сохранить' : 'Редактировать'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
          axios({
            method: "get",
            url:"http://localhost:8081/selectTariffDataOne?id="+this.$route.params.id
          })
          .then(response => {
            this.editedItem = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      save () {
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertTariffData',
          data: {
                name: this.editedItem.name,
                description: this.editedItem.description,
                categoryAuto: this.editedItem.categoryAuto,
                tariff: this.editedItem.tariff,
                network: this.editedItem.network,
                coastPerDay: this.editedItem.coastPerDay,
                contractContinue: this.editedItem.contractContinue,
                startPayment: this.editedItem.startPayment,
                summAmount: this.editedItem.summAmount,
                statusRes: this.editedItem.statusRes,
          }
        })
      .then(function(){
        console.log('SUCCESS!!')
      })
      .catch(function(){
        console.log('FAILURE!!')
      })
      },
    },
  }
</script>