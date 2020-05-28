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
        <v-toolbar-title>Владельцы</v-toolbar-title>
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
            <v-btn color="primary" class="my-2 ml-1" to="/admin/VehicleOwner/create">{{formDriveTitle}}</v-btn>
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
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Телефон', value: 'phone' },
        { text: '% выручки', value: 'profitInterest' },
        { text: '% прибыли', value: 'percentageRevenue' },
        { text: 'В день', value: 'perDay' },
        { text: 'В месяц', value: 'perMounth'},
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        name: '',
        phone: '',
        proceedings: '',
        perDay: '',
        perMounth: '',
      },
      defaultItem: {
        _id: '',
        name: '',
        phone: '',
        proceedings: '',
        perDay: '',
        perMounth: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Добавить владельца' : 'Редактировать владельца'
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
            url:"http://localhost:8081/selectOwnerData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      editItem (item) {
        this.$router.push({ path: `/admin/VehicleOwner/${item._id}` })
      },
     deleteItem (item) {
        const index = this.desserts.indexOf(item)
        let isDelete = false
        isDelete = confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        if(isDelete === false)
        return 
        axios({
            method: "post",
            url:"http://localhost:8081/deleteOwnerData",
            data: {
                 _id: item._id,
                 
            }
        })
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