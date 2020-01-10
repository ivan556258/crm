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
        
        <v-dialog v-model="dialogPlus" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="success" class="my-2 ml-1" v-on="on">Пополнить</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление транзакции (Пополнить)</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                      <v-select :items="status" v-model="editedItem.cash" label="Счет"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                      <v-select :items="status" v-model="editedItem.item" label="Статья"></v-select>
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
              <v-btn color="blue darken-1" text @click="closePlus">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="savePlus">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogMinus" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="error" class="my-2 ml-1" v-on="on">Списать</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление транзакции (Списать)</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                      <v-select :items="status" v-model="editedItem.cash" label="Счет"></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                      <v-select :items="status" v-model="editedItem.item" label="Статья"></v-select>
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
              <v-btn color="blue darken-1" text @click="closeMinus">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="saveMinus">Сохранить</v-btn>
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
      dialogPlus: false,
      dialogMinus: false,
      status: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: 'Счет',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Договор', value: 'fat' },
        { text: 'Создал', value: 'carbs' },
        { text: 'Статья', value: 'protein' },
        { text: 'Сумма', value: 'action', sortable: false },
        { text: 'Описание', value: 'action', sortable: false },
        { text: 'Время создания', value: 'action', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        cash: '',
        item: '',
        summ: '',
        description: '',
        protein: '',
        addTransaction: '',
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Внести' : 'Списать'
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
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
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
      closePlus () {
        this.dialogPlus = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      closeMinus () {
        this.dialogMinus = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      savePlus () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
            method: "post",
            url: "http://localhost:8081/insertAccountBillData",
            data:{
                cash: this.editedItem.cash,
                item: this.editedItem.item,
                summ: this.editedItem.summ,
                description: this.editedItem.description,
                protein: this.editedItem.protein,
                addTransaction: this.editedItem.addTransaction,
                statusCash: 1
            }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      saveMinus () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
            method: "post",
            url: "http://localhost:8081/insertAccountBillData",
            data:{
                cash: this.editedItem.cash,
                item: this.editedItem.item,
                summ: this.editedItem.summ,
                description: this.editedItem.description,
                protein: this.editedItem.protein,
                addTransaction: this.editedItem.addTransaction,
                statusCash: 0 // если списываем
            }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>