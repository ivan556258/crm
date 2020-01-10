<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление статьи</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" >{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" @click="save()" >{{formAutoTitle}}</v-btn>
          </template>
        </v-dialog>    
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
            v-model="name"
            :counter="150"
            label="Название"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="description"
            :counter="150"
            label="Описание"
            required
          ></v-text-field>
        </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="categoryAuto" label="Категория автомобилей"></v-select>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="tariff" label="Тарифный план"></v-select>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="network" label="Размер сетки"></v-select>
          </v-col> 
          <v-col cols="12" md="8">
          <v-text-field
            v-model="coastPerDay"
            :counter="6"
            label="Стоимость за сутки"
            required
          ></v-text-field>
        </v-col> 
        <v-col cols="12" md="8">
           <v-select :items="status" v-model="contractContinue" label="При продлении договора"></v-select>
        </v-col> 

         <v-col cols="12" md="8">
          <v-text-field
            v-model="startPayment"
            :counter="10"
            label="Стартовый платёж"
            required
          ></v-text-field> 
         </v-col>
      
         <v-col cols="12" md="8">
          <v-text-field
            v-model="summAmount"
            :counter="12"
            label="Сумма залога"
            required
          ></v-text-field> 
         </v-col>

         <v-col cols="12" md="8">
           <v-select :items="status" v-model="statusRes" label="Статус"></v-select>
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
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
        ]
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
        /* if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close() */
        console.log(this.lastname);
        console.log(this.informDriverBalanceChanges);
        
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertRentBillItemFormData',
          data: {
                name: this.name,
                description: this.description,
                categoryAuto: this.categoryAuto,
                tariff: this.tariff,
                network: this.network,
                coastPerDay: this.coastPerDay,
                contractContinue: this.contractContinue,
                startPayment: this.startPayment,
                summAmount: this.summAmount,
                statusRes: this.statusRes,
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