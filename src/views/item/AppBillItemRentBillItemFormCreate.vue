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
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Информация </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
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
           <v-select :items="selectCategoryAuto" v-model="editedItem.categoryAuto" label="Категория автомобилей"></v-select>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="selectTariff" v-on:change="changeRoute()" v-model="editedItem.tariff" label="Тарифный план"></v-select>
          </v-col>
            <v-col v-if="blockSumm == 'раз в месяц'" cols="12" md="8">
              <v-text-field
                v-model="editedItem.summPerMounth"
                :counter="10"
                label="Сумма за месяц"
                required
              ></v-text-field> 
            </v-col>
          
            <v-col v-if="blockSumm == 'за каждый день'" cols="12" md="8">
              <v-text-field
                v-model="editedItem.summPerDay"
                :counter="10"
                label="Сумма за каждый день"
                required
              ></v-text-field> 
            </v-col>
            <v-col v-if="blockSumm == 'понедельный'" cols="12" md="8">
              <v-row>
                <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summMo"
                :counter="10"
                label="Пн"
                required
              ></v-text-field> 
                </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summTu"
                :counter="10"
                label="Вт"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summWe"
                :counter="10"
                label="Ср"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summTh"
                :counter="10"
                label="Чт"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summFr"
                :counter="10"
                label="Пт"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summSa"
                :counter="10"
                label="Сб"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summSu"
                :counter="10"
                label="Вс"
                required
              ></v-text-field> 
          </v-col>
          </v-row>
        </v-col>
              
<!--         <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.contractContinue" label="При продлении договора"></v-select>
        </v-col>  -->

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
        editedItem:[{
            name: '',
            summPerMounth: '',
            summPerDay: '',
            summMo: '',
            summTu: '',
            summWe: '',
            summTh: '',
            summFr: '',
            summSa: '',
            summSu: '',
            description: '',
            categoryAuto: '',
            tariff: '',
            network: '',
            coastPerDay: '',
            contractContinue: '',
            startPayment: '',
            summAmount: '',
            statusRes: '',
        }],
        defaultItem:[{
            name: '',
            summPerMounth: '',
            summPerDay: '',
            summMo: '',
            summTu: '',
            summWe: '',
            summTh: '',
            summFr: '',
            summSa: '',
            summSu: '',
            description: '',
            categoryAuto: '',
            tariff: '',
            network: '',
            coastPerDay: '',
            contractContinue: '',
            startPayment: '',
            summAmount: '',
            statusRes: '',
          }],
        blockSumm: null,

        selectCategoryAuto:[
            "любая ",
            "эконом",
            "комфорт",
            "комфорт+",
            "бизнес",
            "VIP",
            "минивэн",
            "грузоперевозки",
            "универсал",
            "микроавтобус",
            "aвтобус",
          ],
        selectTariff:[
            "за каждый день",
            "раз в месяц",
            "понедельный",
        ],
        status: [
          "активный", 
          "неактивный",
          ],
        dialog: false,
      editedIndex: -1,
      picker: new Date().toISOString(),
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
      },
      changeRoute(){
            this.blockSumm = this.editedItem.tariff
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
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
                summPerMounth: this.editedItem.summPerMounth,
                summPerDay: this.editedItem.summPerDay,
                summMo: this.editedItem.summMo,
                summTu: this.editedItem.summTu,
                summWe: this.editedItem.summWe,
                summTh: this.editedItem.summTh,
                summFr: this.editedItem.summFr,
                summSa: this.editedItem.summSa,
                summSu: this.editedItem.summSu,
                token: localStorage.getItem('auth'),
          }
        })
      .then(function(){
        console.log('SUCCESS!!')
      })
      .catch(function(){
        console.log('FAILURE!!')
      })
      this.editedItem = Object.assign({}, this.defaultItem)
      },
    },
  }
</script>