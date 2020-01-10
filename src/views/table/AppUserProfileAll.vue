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
          value: 'name',
        },
        { text: 'Логин', value: 'fat' },
        { text: 'ФИО', value: 'carbs' },
        { text: 'Телефон', value: 'protein' },
        { text: 'Тип', value: 'action', sortable: false },
        { text: 'Статус', value: 'action', sortable: false },
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
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
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
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>