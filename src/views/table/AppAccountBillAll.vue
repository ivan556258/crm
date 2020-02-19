<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Приход-расход</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="success" class="my-2 ml-1" @click="plus" v-on="on">Пополнить</v-btn>
            <v-btn color="error" class="my-2 ml-1" @click="minus" v-on="on">Списать</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление транзакции ({{formDriveTitle}})</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                        <v-select 
                              :items="tariff" 
                              :item-text="item => item.name"  
                              item-value="_id" 
                              v-model="editedItem.item" 
                              label="Статья"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                        <v-select
                         :items="drivers" 
                         :item-text="item => item.lastname +'  '+ item.firstname + '  ' + item.fathername"  
                         item-value="_id" 
                         v-model="editedItem.score"
                         label="Счёт">
                        </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.summ" label="Сумма"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
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
              <v-btn color="blue darken-1" text @click="closePlus()">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="save()">Сохранить</v-btn>
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
import axios from "axios";
  export default {
    name: 'AppAccountBillAll',
    data: () => ({
      dialog: false,
      drivers: null,
      tariff: null,
      headers: [
        {
          text: 'Счет',
          align: 'left',
          sortable: false,
          value: 'score',
        },
        { text: 'Договор', value: 'contract' },
        { text: 'Создал', value: 'autor' },
        { text: 'Статья', value: 'tariff' },
        { text: 'Сумма', value: 'summ', sortable: false },
        { text: 'Описание', value: 'description', sortable: false },
        { text: 'Время создания', value: 'dateInsert', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        score: '',
        name: '',
        item: '',
        summ: '',
        description: '',
        addTransaction: false,
        statusCash: null,
      }
    }),
    computed: {
      formDriveTitle () {
        return this.editedItem.statusCash === true ? 'поплнить' : 'списать'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created() {
      this.initialize()
    },
    methods: {
      initialize() {
        axios({
            method: "get",
            url:"http://localhost:8081/selectAccountBillData?token="+localStorage.getItem('auth')
          })
          .then(response => {
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
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        axios({
            method: "post",
            url:"http://localhost:8081/deleteAccountBillData",
            data: {
                 _id: item._id,
            }
        })
      },
      close () {
        this.dialogPlus = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      plus(){
          this.editedItem.statusCash = 1
      },
      minus(){
          this.editedItem.statusCash = 0
      },
      closePlus () {
        this.dialogPlus = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      closeMinus () {
        this.close()
      },
      save () {
        if (this.editedIndex > -1) {
          axios({
            method: 'post',
            url: 'http://localhost:8081/updateAccountBillData',
            data: {
                  cash: this.editedItem.cash,
                  item: this.editedItem.item,
                  score: this.editedItem.score,
                  summ: this.editedItem.summ,
                  description: this.editedItem.description,
                  protein: this.editedItem.protein,
                  addTransaction: this.editedItem.addTransaction,
                  statusCash: this.editedItem.statusCash, // если списываем
                  _id: this.editedItem._id,
            }
          })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
            method: "post",
            url: "http://localhost:8081/insertAccountBillData",
            data:{
                cash: this.editedItem.cash,
                item: this.editedItem.item,
                score: this.editedItem.score,
                summ: this.editedItem.summ,
                description: this.editedItem.description,
                protein: this.editedItem.protein,
                addTransaction: this.editedItem.addTransaction,
                statusCash: this.editedItem.statusCash, // если списываем
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