<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Накладные приходные</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">Добавление накладной</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление накладной</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                      <v-select :items="status" v-model="editedItem.type" label="Тип"></v-select>
                  </v-col>
                  <v-col cols="12" md="8">
                      <v-select :items="status" v-model="editedItem.provider" label="Поставщик"></v-select>
                  </v-col>
                  <v-col cols="12" md="8">
                      <v-btn color="primary" class="my-2 ml-1">Позиция</v-btn>
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
    name: 'AppStockInvoicePurchaseInvoiceGridAll',
    data: () => ({
      dialog: false,
      status: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: 'Номер',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Сотрудник', value: 'fat' },
        { text: 'Поставщик', value: 'provider' },
        { text: 'Количество позиций', value: 'protein' },
        { text: 'Общая сумма', value: 'actionx', sortable: false },
        { text: 'Время создания', value: 'actsion', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        type: '',
        provider: '',
      },
      defaultItem: {
        type: '',
        provider: '',
      },
    }),
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
            url:"http://localhost:8081/selectReceptionNotesData"
          })
          .then(response => {
            this.desserts = response.data
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
            url:"http://localhost:8081/deleteReceptionNotesData",
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
              method: 'post',
              url: 'http://localhost:8081/updateReceptionNotesData',
              data: {
                  type: this.editedItem.type,
                  provider: this.editedItem.provider,
                  position: this.editedItem.position,
                  _id: this.editedItem._id,
              }
          })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
              method: 'post',
              url: 'http://localhost:8081/insertReceptionNotesData',
              data: {
                  type: this.editedItem.type,
                  provider: this.editedItem.provider,
                  position: this.editedItem.position,
              }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>