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
      <template v-slot:item.isPart="{ item }">
        <v-chip :color="getColor(item.isPart)" dark>
          <div v-if="item.isPart">да</div>
          <div v-else>нет</div>
          </v-chip>
      </template>
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
</div>
  
      <v-toolbar flat color="white">
        <v-toolbar-title>Запчасти (склад)</v-toolbar-title>
        
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
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" v-on="on">Добавление номенклатуры</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Запчасти (склад)</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.brand" label="Бренд"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.article" label="Артикул"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-switch class="ma-2" v-model="editedItem.isPart" label="В наличи запчасть"></v-switch>
                   </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.summ" label="Сумма"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.howMuch" label="Кол-во шт"></v-text-field>
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
    name: 'AppStockAll',
    data: () => ({
      dialog: false,
      loading: false,
      searchTable: null,
      select: null,
      states: [],
      search:'',
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Бренд', value: 'brand'},
        { text: 'Артикул', value: 'article', sortable: false  },
        { text: 'Время создания', value: 'dateInsert' },
        { text: 'Наличие', value: 'isPart'},
        { text: 'Цена 1 шт', value: 'summ'},
        { text: 'Кол-во шт', value: 'howMuch'},
        { text: 'Действия', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        brand: '',
        article: '',
        YesOrNo:'',
        howMuch:'',
        isPart: false,
        summ: '',
        insertTime:'',
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
            url:"http://localhost:8081/selectNomenclatureData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      getColor (yes) {
        if (yes) return 'green'
        else return 'red'
      },
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        let isDelete = false
        isDelete = confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        if(isDelete === false)
        return 
        axios({
            method: "post",
            url:"http://localhost:8081/deleteNomenclatureData",
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
            url:"http://localhost:8081/updateNomenclatureData",
            data: {
                  name: this.editedItem.name,
                  brand: this.editedItem.brand,
                  article: this.editedItem.article,
                  isPart: this.editedItem.isPart,
                  summ: this.editedItem.summ,
                  howMuch: this.editedItem.howMuch,
                  _id: this.editedItem._id,
                  token: localStorage.getItem('auth')
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
           axios({
              method: 'post',
              url: 'http://localhost:8081/insertNomenclatureData',
              data: {
                  name: this.editedItem.name,
                  brand: this.editedItem.brand,
                  article: this.editedItem.article,
                  isPart: this.editedItem.isPart,
                  summ: this.editedItem.summ,
                  howMuch: this.editedItem.howMuch,
                  token: localStorage.getItem('auth')
              }
           })
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