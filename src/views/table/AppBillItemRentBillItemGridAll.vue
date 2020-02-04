<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
<div class="d-flex">
</div>
  
      <v-toolbar flat color="white">
        <v-toolbar-title>Статьи</v-toolbar-title>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" class="mb-2 ml-1" to="/admin/BillItem/RentBillItemForm/create">Добавить тариф</v-btn>
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
    name: 'AppBillItemRentBillItemGridAll',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Категория', value: 'categoryAuto' },
        { text: 'Описание', value: 'description' },
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        categoryAuto: '',
        description: '',
      },
    }),
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Добавить статью раходов' : 'Редактировать статью раходов'
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
            url:"http://localhost:8081/selectTariffData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      editItem (item) {
        this.$router.push({ path: `/admin/BillItem/RentBillItemForm/${item._id}` })
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        axios({
            method: "post",
            url:"http://localhost:8081/deleteTariffData",
            data: {
                 _id: item._id, 
            }
        })
      },
    },
  }
</script>