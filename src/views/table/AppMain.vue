<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar-title class="ml-3 mt-2">Панель управления</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-card class="text-right ml-3 mt-2" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="text-right ml-3 mt-2" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-right ml-3 mt-2" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-right ml-3 mt-2" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <v-toolbar flat color="white">
        <v-toolbar-title>Договоры аренды</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" to="/admin/UserDriverProfile/create">{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" v-on="on">{{formAutoTitle}}</v-btn>
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
                  <v-col cols="12" sm="6" md="4">
                     <v-select :items="driver" v-model="editedItem.driver" label="Водитель"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="auto" v-model="editedItem.auto" label="Автомобиль"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="tariff" v-model="editedItem.tariff" label="Тариф"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-menu
                      ref="editedItem.beginmenu"
                      v-model="editedItem.beginmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.begindate"
                          label="Дата начала"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="editedItem.begindate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-menu
                      ref="editedItem.mendmenu"
                      v-model="editedItem.endmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.enddate"
                          label="Дата окончания"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="editedItem.enddate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-switch v-model="editedItem.continues" class="ma-2" label="Продлеваемый"></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.moreInfo" label="Дополнительная информация"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="status" v-model="editedItem.status" label="Статус"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Отменить</v-btn>
              <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    picker: new Date().toISOString(),
    auto: ["Foo", "Bar", "Fizz", "Buzz"],
    driver: ["Foo", "Bar", "Fizz", "Buzz"],
    tariff: ["Foo", "Bar", "Fizz", "Buzz"],
    status: ["Foo", "Bar", "Fizz", "Buzz"],
    continues: false,
    headers: [
      {
        text: "Автомобиль",
        align: "left",
        sortable: false,
        value: "auto"
      },
      { text: "Водитель", value: "driver" },
      { text: "Тариф", value: "tariff" },
      { text: "Телефон", value: "phone" },
      { text: "Баланс", value: "balance", sortable: false },
      { text: "Штрафы", value: "penaltis", sortable: false },
      { text: "Депозит", value: "deposit", sortable: false },
      { text: "Время", value: "time", sortable: false },
      { text: 'Действия', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      _id: null,
      beginmenu: null,
      number: null,
      endmenu: null,
      enddate: null,
      begindate: null,
      moreInfo: null,
      auto: null,
      driver: null,
      tariff: null,
      status: null,
      continues: false
    },
    defaultItem: {
      _id: null,
      beginmenu: null,
      number: null,
      endmenu: null,
      enddate: null,
      begindate: null,
      moreInfo: null,
      auto: null,
      driver: null,
      tariff: null,
      status: null,
      continues: false
    }
  }),
  computed: {
    formDriveTitle() {
      return this.editedIndex === -1
        ? "Добавить водителя"
        : "Редактировать водителя";
    },
    formAutoTitle() {
      return this.editedIndex === -1
        ? "Добавить договор"
        : "Редактировать договор";
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
            url:"http://localhost:8081/selectContractData"
          })
          .then(response => {
            this.desserts = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить?') && this.desserts.splice(index, 1)
        axios({
            method: "post",
            url:"http://localhost:8081/deleteContractData",
            data: {
                 _id: item._id,
                 
            }
        })
      },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        axios({
            method: "post",
            url:"http://localhost:8081/updateContractData",
            data: {
                number: this.editedItem.number,
                driver: this.editedItem.driver,
                auto: this.editedItem.auto,
                tariff: this.editedItem.tariff,
                begindate: this.editedItem.begindate,
                enddate: this.editedItem.enddate,
                continues: this.editedItem.continues,
                moreInfo: this.editedItem.moreInfo,
                status: this.editedItem.status,
                _id: this.editedItem._id,
                 
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8081/insertContractData',
          data: {
            number: this.editedItem.number,
            driver: this.editedItem.driver,
            auto: this.editedItem.auto,
            tariff: this.editedItem.tariff,
            begindate: this.editedItem.begindate,
            enddate: this.editedItem.enddate,
            continues: this.editedItem.continues,
            moreInfo: this.editedItem.moreInfo,
            status: this.editedItem.status
          }
        })
      .then(function(){
        console.log('SUCCESS!!')
      })
      .catch(function(){
        console.log('FAILURE!!')
      })
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>