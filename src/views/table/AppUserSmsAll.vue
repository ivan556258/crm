<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>История SMS</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">История SMS</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                      <v-select :items="status" v-model="editedItem.recipient" label="Получатель"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Номер телефона"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.message" label="Сообщение"></v-text-field>
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
  import axios from "axios";
  export default {
    name: 'AppUserSmsAll',
    data: () => ({
      dialog: false,
      status: ["Foo", "Bar", "Fizz", "Buzz"],
      headers: [
        {
          text: 'Имя получателя',
          align: 'left',
          sortable: false,
          value: 'recipient',
        },
        { text: 'Номер телефона', value: 'phone' },
        { text: 'Сообщение', value: 'message' },
        { text: 'Время создания', value: 'protein' },
        { text: 'Статус', value: 'status', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        recipient: '',
        phone: '',
        message: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Отправить SMS' : 'Отправить SMS'
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
            url:"http://localhost:8081/selectUserSmsData"
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
            url:"http://localhost:8081/deleteUserSmsData",
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
            url: 'http://localhost:8081/updateUserSmsData',
            data: {
                  recipient: this.editedItem.recipient,
                  phone: this.editedItem.phone,
                  message: this.editedItem.message,
                  _id: this.editedItem._id,
            }
          })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
            method: 'post',
            url: 'http://localhost:8081/insertUserSmsData',
            data: {
                  recipient: this.editedItem.recipient,
                  phone: this.editedItem.phone,
                  message: this.editedItem.message,
            }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>