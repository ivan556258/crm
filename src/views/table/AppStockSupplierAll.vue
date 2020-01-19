<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Контрагенты</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">Добавление контрагента</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Добавление контрагента</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.website" label="Вебсайт"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.phone" label="Телефон"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="8">
                      <v-select :items="status" v-model="editedItem.type" label="Тип"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.nameLow" label="Юридическое название"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.address" label="Адрес"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.contactPerson" label="Контактное лицо"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.note" label="Примечание"></v-text-field>
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
    name: 'AppStockSupplierAll',
    data: () => ({
      dialog: false,
      status: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Вебсайт', value: 'website' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Контактное лицо', value: 'contactPerson', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        website: '',
        phone: '',
        email: '',
        type: '',
        nameLow: '',
        address: '',
        contactPerson: '',
        note: '',
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
            url:"http://localhost:8081/selectCounteragentData"
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
            url:"http://localhost:8081/deleteCounteragentData",
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
            url:"http://localhost:8081/updateCounteragentData",
            data: {
                 name: this.editedItem.name,
                  website: this.editedItem.website,
                  phone: this.editedItem.phone,
                  email: this.editedItem.email,
                  type: this.editedItem.type,
                  nameLow: this.editedItem.nameLow,
                  address: this.editedItem.address,
                  contactPerson: this.editedItem.contactPerson,
                  note: this.editedItem.note,
                  _id: this.editedItem._id,
                 
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
              method: 'post',
              url: 'http://localhost:8081/insertCounteragentData',
              data: {
                  name: this.editedItem.name,
                  website: this.editedItem.website,
                  phone: this.editedItem.phone,
                  email: this.editedItem.email,
                  type: this.editedItem.type,
                  nameLow: this.editedItem.nameLow,
                  address: this.editedItem.address,
                  contactPerson: this.editedItem.contactPerson,
                  note: this.editedItem.note,
              }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>