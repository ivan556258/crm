<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Сотрудники</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Сотрудники</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-select :items="status" v-model="editedItem.type" label="Тип"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.login" label="Логин"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Пароль"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastName" label="Фамилия"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Имя"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fatherName" label="Отчество"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.phone" label="Телефон"></v-text-field>
                  </v-col>
                   <v-col cols="12" md="4">
                    <v-select :items="status" v-model="editedItem.statusRes" label="Статус"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.groundsForContract" label="Основание для договора"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
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
    name: 'AppUserProfileAll',
    data: () => ({
      dialog: false,
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
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: '_id',
        },
        { text: 'Логин', value: 'login' },
        { text: 'ФИО', value: 'lastName' },
        { text: 'Телефон', value: 'phone' },
        { text: 'Тип', value: 'type', sortable: false },
        { text: 'Статус', value: 'statusRes', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        type: '',
        email: '',
        login: '',
        password: '',
        lastName: '',
        name: '',
        fatherName: '',
        phone: '',
        statusRes: '',
        groundsForContract: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Добавить сотрудника' : 'Редактировать сотрудника'
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
            url:"http://localhost:8081/selectUserProfileData?token="+localStorage.getItem('auth')
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
            url:"http://localhost:8081/deleteUserProfileData",
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
            url:"http://localhost:8081/updateUserProfileData",
            data: {
                type: this.editedItem.type,
                  email: this.editedItem.email,
                  login: this.editedItem.login,
                  password: this.editedItem.password,
                  lastName: this.editedItem.lastName,
                  name: this.editedItem.name,
                  fatherName: this.editedItem.fatherName,
                  phone: this.editedItem.phone,
                  statusRes: this.editedItem.statusRes,
                  groundsForContract: this.editedItem.groundsForContract,
                 _id: this.editedItem._id,
                 
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertUserProfileData',
          data: {
                  type: this.editedItem.type,
                  email: this.editedItem.email,
                  login: this.editedItem.login,
                  password: this.editedItem.password,
                  lastName: this.editedItem.lastName,
                  name: this.editedItem.name,
                  fatherName: this.editedItem.fatherName,
                  phone: this.editedItem.phone,
                  statusRes: this.editedItem.statusRes,
                  groundsForContract: this.editedItem.groundsForContract,
          }
          })
        }
        this.desserts.push(this.editedItem)
        this.close()
      },
    },
  }
</script>