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
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Водители</v-toolbar-title>
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
          <template>
            <v-btn color="primary" class="my-2 ml-1" to="/admin/UserDriverProfile/create">{{formDriveTitle}}</v-btn>
          </template>
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
    name: 'AppVehicleMaintenanceAll',
    data: () => ({
      dialog: false,
      search: "",
      headers: [
        {
          text: 'Фамилия',
          align: 'left',
          sortable: false,
          value: 'lastname',
        },
        { text: 'Телефон', value: 'phone' },
        { text: 'Серия и номер', value: 'seriaAndNumberPassport' },
        { text: 'Дата рождения', value: 'brithday' },
        { text: 'Номер ВУ', value: 'numberDriverLicence', sortable: false },
        { text: 'Баланс', value: 'balance', sortable: false },
        { text: 'Штрафы', value: 'penalty', sortable: false },
        { text: 'Депозит', value: 'deposit', sortable: false },
        { text: 'Статус', value: 'status', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        lastname: null,
        firstname: null,
        fathername: null,
        seriaAndNumberPassport: null,
        locationBrithday: null,
        addressRegistration: null,
        isOwner: false,
        phone: null,
        email: null,
        inn: null,
        classInsurance: null,
        numberDriverLicence: null,
        dateIssuedDriverLicenceMenu: null,
        dateIssuedDriverLicenceDate: null,
        addressInLifes: null,
        moreContacts: null,
        foreginDriversLicence: false,
        isSelfCar: false,
        carBrandAndNumber: null,
        rating: null,
        commentaries: null,
        brithdaymenu: null,
        informDriverBalanceChanges: false,
        informDriverBalanceLittle: false,
        informDriverNewPenalty: false,
        informDriverOilChange: false,
        allowedBlocked: false,
        onAutomaticRentMoney: false,
        thresholdBalanceForDriver: null,
        dateIssuedMenu: null,
        dateIssuedDate: null,
        brithday: null,
        issued: null,
        codePollicia: null,
        brithdaypicker: new Date().toISOString(),
        dateIssuedPicker: new Date().toISOString(),
        dateIssuedDriverLicencePicker: new Date().toISOString(),
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Добавить клиента' : 'Редактировать клиент'
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
            url:"http://localhost:8081/selectDriverData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      editItem (item) {
        this.$router.push({ path: `/admin/UserDriverProfile/${item._id}` })
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        axios({
            method: "post",
            url:"http://localhost:8081/deleteDriverData",
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
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