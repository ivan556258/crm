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
                    <v-text-field v-model="number" label="Номер"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-select :items="driver" v-model="driver" label="Водитель"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="autos" v-model="autos" label="Автомобиль"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="tariff" v-model="tariff" label="Тариф"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-menu
                      ref="beginmenu"
                      v-model="beginmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="begindate"
                          label="Дата начала"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="begindate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-menu
                      ref="endmenu"
                      v-model="endmenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="enddate"
                          label="Дата окончания"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="enddate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-switch v-model="continues" class="ma-2" label="Продлеваемый"></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="moreInfo" label="Дополнительная информация"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="status" v-model="status" label="Статус"></v-select>
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
        text: "Автомобиль",
        align: "left",
        sortable: false,
        value: "auto"
      },
      { text: "Водитель", value: "draw" },
      { text: "Тариф", value: "tariff" },
      { text: "Телефон", value: "phone" },
      { text: "Баланс", value: "balance", sortable: false },
      { text: "Штрафы", value: "penaltis", sortable: false },
      { text: "Депозит", value: "deposit", sortable: false },
      { text: "Время", value: "time", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
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
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
        alert("problem")
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:8081/insertContractData',
          data: {
            number: this.number,
            driver: this.driver,
            auto: this.autos,
            tariff: this.tariff,
            begindate: this.begindate,
            enddate: this.enddate,
            continues: this.continues,
            moreInfo: this.moreInfo,
            status: this.status
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