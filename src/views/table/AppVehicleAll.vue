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
        <v-toolbar-title>Автомобили</v-toolbar-title>

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
            <v-btn color="primary" class="mb-2 ml-1" to="/admin/auto/create">{{addAuto}}</v-btn>
          </template>
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios"
export default {
  name: "AppMain",
  data: () => ({
    dialog: false,
    search: "",
    beginmenu: null,
    number: null,
    endmenu: null,
    enddate: null,
    begindate: null,
    moreInfo: null,
    picker: new Date().toISOString(),
    autos: ["Foo", "Bar", "Fizz", "Buzz"],
    driver: ["Foo", "Bar", "Fizz", "Buzz"],
    tariff: ["Foo", "Bar", "Fizz", "Buzz"],
    status: ["Foo", "Bar", "Fizz", "Buzz"],
    continues: false,
    headers: [
      {
        text: "Название",
        align: "left",
        sortable: false,
        value: "brand"
      },
      { text: "Категория ТС", value: "categoryTS" },
      { text: "Серия и номер СТС", value: "seriaAndNumberSTS" },
      { text: "Категория", value: "category" },
      { text: "Тип шин", value: "tyreType" },
      { text: "Статус", value: "statusRes" },
      { text: "Действия", value: "action", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: null,
      driver: null,
      tariff: null,
      phone: null,
      balance: null,
      penaltis: null,
      deposit: null
    },
    defaultItem: {
      name: null,
      driver: null,
      tariff: null,
      phone: null,
      balance: null,
      penaltis: null,
      deposit: null
    }
  }),
  computed: {
    addAuto() {
      return "Добавить автомобиль"
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios({
            method: "get",
            url:"http://localhost:8081/selecAutomobileData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    editItem(item) {
      this.$router.push({ path: `/admin/Vehicle/${item._id}` })
    },
    deleteItem (item) {
        const index = this.desserts.indexOf(item)
        let isDelete = false
        isDelete = confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        if(isDelete === false)
        return 
        axios({
            method: "post",
            url:"http://localhost:8081/deleteAutomobileData",
            data: {
                 _id: item._id,
                 
            }
        })
    },
  }
};
</script>

<style scoped>
.search {
    border: 0!important;
    border-radius: 0!important;
    width: 331px;
    box-shadow: none;
}
</style>