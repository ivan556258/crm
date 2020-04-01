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
<div class="d-flex">
<v-card
    class="text-right ml-3 mt-2"
    max-width="314"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  <v-card
    class="text-right ml-3 mt-2"
    max-width="314"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>

  <v-card
    class="text-right ml-3 mt-2"
    max-width="314"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</div>
  
      <v-toolbar flat color="white">
        <v-toolbar-title>Техобслуживание</v-toolbar-title>
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
            <v-btn color="primary" class="mb-2 ml-1" to="/admin/VehicleMaintenance/create">{{formDriveTitle}}</v-btn>
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
      search:"",
      headers: [
        {
          text: 'Дата',
          align: 'left',
          sortable: false,
          value: 'dateData',
        },
        { text: 'Автомобиль', value: 'auto', sortable: false },
        { text: 'Водитель', value: 'driver', sortable: false },
        { text: 'КМ', value: 'autoRun' },
        { text: 'З/М', value: 'changeOil', sortable: false },
        { text: 'Работы', value: 'listJobs', sortable: false },
        { text: 'Диагностика', value: 'resultDyagnostic', sortable: false },
        { text: 'Сумма', value: 'summ', sortable: false },
        { text: 'ОЦ', value: 'rating', sortable: false },
        { text: 'Статус', value: 'statusRes', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        date: '',
        auto: '',
        driver: '',
        autoRun: '',
        changeOil: '',
        listJobs: '',
        resultDyagnostic: '',
        summ: '',
        rating: '',
        statusRes: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return 'Добавление записи т.о. '
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
            url:"http://localhost:8081/selectTechnicalServiceData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      editItem (item) {
        this.$router.push({ path: `/admin/VehicleMaintenance/${item._id}` })
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        axios({
            method: "post",
            url:"http://localhost:8081/deleteTechnicalServiceData",
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