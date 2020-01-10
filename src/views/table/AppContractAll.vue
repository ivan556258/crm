<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Договоры аренды</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="my-2 ml-1" v-on="on">{{formDriveTitle}}</v-btn>
          </template>
          
          <v-card>
            <v-card-title>
              <span class="headline">Договоры аренды</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.number" label="Номер"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select :items="status" v-model="editedItem.driver" label="Водитель"></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select :items="status" v-model="editedItem.auto" label="Автомобиль"></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select :items="status" v-model="editedItem.tariff" label="Тариф"></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-menu
                      ref="dateStartMenu"
                      v-model="dateStartMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateStartDate"
                          label="Дата начала"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateStartPicker"
                        v-model="dateStartDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-menu
                      ref="dateEndMenu"
                      v-model="dateEndMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateEndDate"
                          label="Дата окончания"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateEndPicker"
                        v-model="dateEndDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" md="4">
                      <v-switch v-model="editedItem.extendedBy" class="ma-2" label="Продлеваемый"></v-switch>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.moreInfo" label="Дополнительная информация"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.statusRes" label="Статус"></v-text-field>
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
      <v-icon small @click="deleteItem(item)">
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'AppContractAll',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Номер',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Автомобиль', value: 'fat' },
        { text: 'Тариф', value: 'carbs' },
        { text: 'Водитель', value: 'protein' },
        { text: 'Телефон', value: 'action', sortable: false },
        { text: 'Баланс', value: 'action', sortable: false },
        { text: 'Штрафы', value: 'action', sortable: false },
        { text: 'Депозит', value: 'action', sortable: false },
        { text: 'Дата начала', value: 'action', sortable: false },
        { text: 'Статус', value: 'action', sortable: false },
        { text: 'Действия', value: 'action', sortable: false },
      ],
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
      desserts: [],
      editedIndex: -1,
      dateStartDate: "",
      dateStartMenu: "",
      dateEndDate: "",
      dateEndMenu: "",
      dateStartPicker: "",
      dateEndPicker: "",
      editedItem: {
        number: '',
        driver: 0,
        auto: 0,
        tariff: 0,
        extendedBy: 0,
        moreInfo: 0,
        statusRes: 0,
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
        return this.editedIndex === -1 ? 'Добавить договор аренды' : 'Редактировать договор аренды'
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
          url: 'http://localhost:8081/insertContractRentData',
          data: {
              dateStartPicker: this.dateStartPicker,
              dateEndPicker: this.dateEndPicker,
              number: this.editedItem.number,
              driver: this.editedItem.driver,
              auto: this.editedItem.auto,
              tariff: this.editedItem.tariff,
              extendedBy: this.editedItem.extendedBy,
              moreInfo: this.editedItem.moreInfo,
              statusRes: this.editedItem.statusRes,
          }
          })
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>