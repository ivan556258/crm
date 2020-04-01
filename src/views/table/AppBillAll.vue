<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="desserts"
    sort-by="dateInsert"
    item-key="_id"
    show-select
    class="elevation-1"
  >
    <template v-slot:item.summ="{ item }">
      <v-chip :color="getColor(item.tariff)" dark>{{ item.summ }}</v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Транзакции</v-toolbar-title>
        
 <v-spacer></v-spacer>
  <v-card class="search">
        <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск по таблице"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  </v-card>
<v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Транзакции</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                        <v-select 
                              :items="tariff" 
                              :item-text="item => item.name"  
                              item-value="_id" 
                              v-model="editedItem.item" label="Статья"></v-select>
                  </v-col>
                  <v-col cols="12" md="8">
                        <v-select
                         :items="drivers" 
                         :item-text="item => item.lastname +'  '+ item.firstname + '  ' + item.fathername"  
                         item-value="_id" 
                         v-model="editedItem.score"
                         label="Счёт">
                        </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.summ" label="Cумма"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.description" label="Описание"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="8">
                        <v-switch v-model="editedItem.addTransaction" class="ma-2" label="Провести транзакцию"></v-switch>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios"
  export default {
    name: 'AppBillAll',
    data: () => ({
      dialog: false,
      drivers: [],
      tariff: "",
      search: "",
      driverName: [],
      driverId: [],
      headers: [
        {
          text: 'ФИО',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Статья', value: 'tariff' },
        { text: 'Сумма', value: 'summ' },
        { text: 'Описание', value: 'description' },
        { text: 'Время создания', value: 'dateInsert', sortable: false },
        //{ text: 'Статус', value: 'addTransaction', sortable: false },
        { text: 'Создатель', value: 'autor', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        driverId: '',
        scoreName: '',
        name: '',
        item: '',
        score: '',
        summ: '',
        description: '',
        addTransaction: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Добавить транзакцию' : 'Редактировать транзакцию'
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
            url:"http://localhost:8081/selectTransactionData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            console.log(response.data['0']);
            this.desserts = response.data
            
          })
          .catch(error => {
            console.log(error)
          })
          axios({
            method: "get",
            url:"http://localhost:8081/selectDriverData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.drivers = response.data 
          })
          .catch(error => {
            console.log(error)
          })
           axios({
            method: "get",
            url:"http://localhost:8081/selectAccountBillItemData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.tariff = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getColor (score) {
        console.log(score);
        
        if (score === "Зарплата") return 'green'
        else return 'red'
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        let isDelete = false
        isDelete = confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        if(isDelete === false)
        return 
        axios({
            method: "post",
            url:"http://localhost:8081/deleteTransactionData",
            data: {
                 _id: item._id,  
            }
        })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          axios({
            method: "post",
            url:"http://localhost:8081/updateTransactionData",
            data: {
                item: this.editedItem.item,
                score: this.editedItem.score,
                summ: this.editedItem.summ,
                description: this.editedItem.description,
                addTransaction: this.editedItem.addTransaction,
                _id: this.editedItem._id, 
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertTransactionData',
          data: {
              item: this.editedItem.item,
              score: this.editedItem.score,
              summ: this.editedItem.summ,
              description: this.editedItem.description,
              addTransaction: this.editedItem.addTransaction,
              token: localStorage.getItem('auth'),
          }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
<style scoped>
.search {
    border: 0!important;
    border-radius: 0!important;
    width: 331px;
    box-shadow: none;
}
</style>