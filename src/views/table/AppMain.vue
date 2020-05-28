<template>
  <v-data-table 
  :headers="headers" 
  :items="desserts" 
  :search="search" 
  sort-by="calories" 
  class="elevation-1"
  item-key="_id"
  show-select
  >
  <template v-slot:item.tariffName="{ item }">
     
          <div v-if="item.tariffName === null">Индивидуальный</div>
          <div v-else>{{item.tariffName}}</div>
         
  </template>
    <template v-slot:item.balance="{ item }">
          <div> {{getBalnce(item.driver)}}</div>
  </template>

  <template v-slot:item.pawn="{ item }">
          <div>{{getPawn(item.driver)}}</div>
  </template>

  <template v-slot:item.penaltis="{ item }">
          <div>{{getPenalty(item.driver)}}</div>
  </template>

    <template v-slot:top>
      <v-toolbar-title class="ml-3 mt-2">Панель управления</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <v-card class="text-right ml-3 mt-2 bg-cover bg-in-job-1" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 bg-style-job">Машин в работе</v-list-item-title>
              <v-list-item-subtitle><span class="color-score">{{autoCountWork}}</span></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="text-right ml-3 mt-2 bg-cover bg-in-job-2" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 bg-style-job">Свободно машин</v-list-item-title>
              <v-list-item-subtitle><span class="color-score">{{autoCountFree}}</span></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-right ml-3 mt-2 bg-cover bg-in-job-3" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 bg-style-job">Машин в обслуживании</v-list-item-title>
              <v-list-item-subtitle><span class="color-score">{{autoCountServiceTechnical}}</span></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>Подробнее</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="text-right ml-3 mt-2 bg-cover bg-in-job-4" max-width="314" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 bg-style-job">Сумма балансов</v-list-item-title>
              <v-list-item-subtitle><span class="color-score">18888</span></v-list-item-subtitle>
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
                        <v-select 
                             :items="drivers" 
                             :item-text="item => item.lastname +' '+ item.firstname + '  ' + item.fathername"  
                              item-value="_id" 
                              v-model="editedItem.driver" 
                              label="Водитель">
                        </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select 
                        :items="auto" 
                        :item-text="item => item.model +'  '+ item.numberSymbol + '  ' + item.owner"
                        item-value="_id" 
                        v-model="editedItem.auto" 
                        label="Автомобиль">
                    </v-select>
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
                    <v-text-field v-model="editedItem.moreInfo" label="Дополнительная информация"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="status" v-model="editedItem.status" label="Статус"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                     <v-switch v-model="editedItem.continues" class="ma-2" label="Продлеваемый"></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-switch @change="individualFunc()" v-model="editedItem.individual" class="ma-2" label="Индивидуальные комисии"></v-switch>
                  </v-col>
                  <v-col v-if="editedItem.individual" cols="12" md="6">
                      <v-select :items="selectTariff" @change="changeRoute()" v-model="editedItem.tariffIndi" label="Тарифный план"></v-select>
                  </v-col>
            
                  <v-col v-if="editedItem.tariffIndi == 'раз в месяц' && editedItem.individual" cols="12" md="8">
              <v-text-field
                v-model="editedItem.summPerMounth"
                :counter="10"
                label="Сумма за месяц"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
            </v-col>
          
           <v-col v-if="editedItem.tariffIndi == 'за каждый день' && editedItem.individual" cols="12" md="8">
              <v-text-field
                v-model="editedItem.summPerDay"
                :counter="10"
                label="Сумма за каждый день"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
            </v-col>
            <v-col v-if="editedItem.tariffIndi == 'понедельный' && editedItem.individual" cols="12" md="8">
              <v-row>
                <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summMo"
                :counter="10"
                label="Пн"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
                </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summTu"
                :counter="10"
                label="Вт"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summWe"
                :counter="10"
                label="Ср"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summTh"
                :counter="10"
                label="Чт"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summFr"
                :counter="10"
                label="Пт"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summSa"
                :counter="10"
                label="Сб"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
          <v-col cols="12" md="4">
              <v-text-field
                v-model="editedItem.summSu"
                :counter="10"
                label="Вс"
                @change="tariffIndividualFunc()"
                required
              ></v-text-field> 
          </v-col>
         
                </v-row>
            </v-col>
            <v-col v-if="editedItem.individual === false" cols="12" sm="6" md="6">
                 
            <v-select
              :disabled="isUpdating"
              :items="tariff"
              label="Тариф"
              v-model="editedItem.tariffName"
              item-text="name"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                >
                {{ data.item.name }}  
                </v-chip>
              </template>
              <template v-slot:item="data">
                
                  <v-list-item-content>
                    <v-list-item-title @click.capture="tariffFunc(
                                data.item.name, 
                                data.item.tariff, 
                                data.item.summPerMounth,
                                data.item.summPerDay,
                                data.item.summMo,
                                data.item.summTu,
                                data.item.summWe,
                                data.item.summTh,
                                data.item.summFr,
                                data.item.summSa,
                                data.item.summSu,
                                data.item.statusRes,
                                )" v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
              </template>
            </v-select>
             
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
    isUpdating: false,
    autoCountFree: null,
    autoCountWork: null,
    autoCountServiceTechnical: null,
    dialog: false,
    picker: new Date().toISOString(),
    penalty: [],
    auto: [],
    drivers: [],
    search: "",
    status:[
        "Активный",
        "Неактивный",
      ],
    items: "",
    continues: false,
    headers: [
      {
        text: "Автомобиль",
        align: "left",
        sortable: false,
        value: "autoStr"
      },
      { text: "Водитель", value: "driverStr" },
      { text: "Тариф", value: "tariffName" },
      { text: "Телефон", value: "driverPhone" },
      { text: "Баланс", value: "balance", sortable: false },
      { text: "Штрафы", value: "penaltis", sortable: false },
      { text: "Депозит", value: "pawn", sortable: false },
      { text: "Окончание договора", value: "enddate", sortable: false },
      { text: 'Действия', value: 'action', sortable: false },
    ],
    desserts: [],
    tariff: [],
    editedIndex: -1,
    selectTariff:[
            "за каждый день",
            "раз в месяц",
            "понедельный",
        ],
    editedItem: {
      desserts:[],
      _id: null,
      beginmenu: null,
      tariffIndi: null,
      individual: false,
      driverPhone: null,
      number: null,
      balance: null,
      endmenu: null,
      enddate: null,
      begindate: null,
      moreInfo: null,
      auto: null,
      driver: null,
      tariff: [],
      autoStr: null,
      driverStr: null,
      tariffStr: null,
      status: null,
      continues: false,
      blockSumm: null,
      selectTariff:[
            "за каждый день",
            "раз в месяц",
            "понедельный",
        ],
      summPerMounth: '',
      summPerDay: '',
      summMo: '',
      summTu: '',
      summWe: '',
      summTh: '',
      summFr: '',
      summSa: '',
      summSu: '',
    },
    defaultItem: {
      _id: null,
      beginmenu: null,
      number: null,
      individual: false,
      balance: null,
      endmenu: null,
      enddate: null,
      selectTariff:[
            "за каждый день",
            "раз в месяц",
            "понедельный",
        ],
      begindate: null,
      moreInfo: null,
      auto: null,
      driver: null,
      tariffName: null,
      driverPhone: null,
      status: null,
      continues: false,
      blockSumm: null,
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
      initialize () {
//
        axios({
            method: "get",
            url:"http://localhost:8081/selectContractData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.desserts = response.data
    // general data that are separated
            for (let index = 0; index < response.data.length; index++) {
              // individual can be as general list so and individal for each driver
              // if from general list there just
                if (response.data[index].individual === false) {
                  this.desserts[index].tariffName = response.data[index].tariff[0].name
              // but if contract individual for driver 
              // mean fields need pick up 
                } else {
                  this.desserts[index].tariffIndi = response.data[index].tariff[0].tariff;
                  this.desserts[index].tariffName = 'Индивидуальный'
                          if (response.data[index].tariff[0].tariff == "за каждый день") {
                            this.desserts[index].summPerDay = response.data[index].tariff[0].summPerDay
                          }
                          if (response.data[index].tariff[0].tariff == "раз в месяц") {
                            this.desserts[index].summPerMounth = response.data[index].tariff[0].summPerMounth
                          }
                          if (response.data[index].tariff[0].tariff == "понедельный") {
                            this.desserts[index].summMo = response.data[index].tariff[0].summMo
                            this.desserts[index].summTu = response.data[index].tariff[0].summTu
                            this.desserts[index].summWe = response.data[index].tariff[0].summWe
                            this.desserts[index].summTh = response.data[index].tariff[0].summTh
                            this.desserts[index].summFr = response.data[index].tariff[0].summFr
                            this.desserts[index].summSa = response.data[index].tariff[0].summSa
                            this.desserts[index].summSu = response.data[index].tariff[0].summSu
                          }
                }
            }
          })
          .catch(error => {
            console.log(error)
          })

// tariff

        axios({
            method: "get",
            url:"http://localhost:8081/selectTariffData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.tariff = response.data
          })
          .catch(error => {
            console.log(error)
          })

// driver

          axios({
            method: "get",
            url:"http://localhost:8081/selectDriverData?free=1&token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.drivers = response.data 
            
          })
          .catch(error => {
            console.log(error)
          })

// automobiles 
          axios({
            method: "get",
            url:"http://localhost:8081/selectAutomobileData?free=1&token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.auto = response.data
          })
          .catch(error => {
            console.log(error)
          })

// list counts automobiles 
// FREE
          axios({
            method: "get",
            url:"http://localhost:8081/selectAutomobileCountData?free=1&token="+localStorage.getItem('auth')
          })
          .then(response => {
                this.autoCountFree = response.data
          })
          .catch(error => {
            console.log(error)
          })
        
// IN WORK
          axios({
            method: "get",
            url:"http://localhost:8081/selectAutomobileCountData?free=0&token="+localStorage.getItem('auth')
          })
          .then(response => {
                this.autoCountWork = response.data
          })
          .catch(error => {
            console.log(error)
          })

// IN TECHNICAL SERVICE
          axios({
            method: "get",
            url:"http://localhost:8081/selectAutomobileCountData?free=3&token="+localStorage.getItem('auth')
          })
          .then(response => {
                this.autoCountServiceTechnical = response.data
          })
          .catch(error => {
            console.log(error)
          })
// THIS PENALTY
          axios({
            method: "get",
            url:"http://localhost:8081/selectPenaltyData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.penalty = response.data
          })
          .catch(error => {
            console.log(error)
          })

      },
    getBalnce(id){
        // input array contain some elements. 
        let array = this.drivers
        // Here find function returns the value of the first element 
        // in the array that satisfies the provided testing 
        // function (return element > 10). 
          for (var i=0; i < array.length; i++) {
              if (array[i]._id == id) {
                  return array[i].balance
              }
          }

    },
    getPawn(id){
        // input array contain some elements. 
        let array = this.drivers
        // Here find function returns the value of the first element 
        // in the array that satisfies the provided testing 
        // function (return element > 10). 
          for (var i=0; i < array.length; i++) {
              if (array[i]._id == id) {
                  return array[i].pawn
              }
          }
    },
    getPenalty(id){
        // input array contain some elements. 
        let array = this.penalty
        // Here find function returns the value of the first element 
        // in the array that satisfies the provided testing 
        // function (return element > 10). 
          for (var i=0; i < array.length; i++) {
              if (array[i].score == id) {
                  return array[i].summ
              }
          }
    },
    individualFunc(){
            this.editedItem.selectTariff = [
            "за каждый день",
            "раз в месяц",
            "понедельный",
            ]
    },
    tariffFunc(name, tariff, summPerMounth, summPerDay, summMo, summTu, summWe, summTh, summFr,summSa, summSu, statusRes){
        this.editedItem.tariff = []
        this.editedItem.tariff.push({ 
              name: name, 
              tariff: tariff, 
              summPerMounth: summPerMounth,
              summPerDay: summPerDay,
              summMo: summMo,
              summTu: summTu,
              summWe: summWe,
              summTh: summTh,
              summFr: summFr,
              summSa: summSa,
              summSu: summSu,
              statusRes: statusRes,
        })
    },
    changeRoute(){
            this.editedItem.blockSumm = this.editedItem.tariffName
    },
    tariffIndividualFunc(){
        this.editedItem.tariff = []
        this.editedItem.tariff.push({
              name: "6544", 
              tariff: this.editedItem.tariffIndi, 
              summPerMounth: this.editedItem.summPerMounth,
              summPerDay: this.editedItem.summPerDay,
              summMo: this.editedItem.summMo,
              summTu: this.editedItem.summTu,
              summWe: this.editedItem.summWe,
              summTh: this.editedItem.summTh,
              summFr: this.editedItem.summFr,
              summSa: this.editedItem.summSa,
              summSu: this.editedItem.summSu,
              statusRes: this.editedItem.statusRes,
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
                driver: this.editedItem.driver,
                auto: this.editedItem.auto,
                begindate: this.editedItem.begindate,
                enddate: this.editedItem.enddate,
                moreInfo: this.editedItem.moreInfo,
                status: this.editedItem.status,
                continues: this.editedItem.continues,
                individual: this.editedItem.individual,
                tariff: JSON.stringify(this.editedItem.tariff),
                _id: this.editedItem._id,
                 
            }
        })
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        console.log(this.editedItem);
        
        axios({
          method: 'post',
          url: 'http://localhost:8081/insertContractData',
          data: {
            driver: this.editedItem.driver,
            auto: this.editedItem.auto,
            begindate: this.editedItem.begindate,
            enddate: this.editedItem.enddate,
            moreInfo: this.editedItem.moreInfo,
            status: this.editedItem.status,
            continues: this.editedItem.continues,
            individual: this.editedItem.individual,
            tariff: JSON.stringify(this.editedItem.tariff),
            token: localStorage.getItem('auth')
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
<style scoped>
.bg-cover{
  background-size: cover
}
.bg-in-job-1 {
    background-image: linear-gradient(180deg,#fec134,#52af50);
    border-color: rgb(220, 220, 220);
    background-color: white;
}
.bg-in-job-2{
    background-image: linear-gradient(180deg,#fec134,#52af50);
    border-color: rgb(220, 220, 220);
    background-color: white;
}
.bg-in-job-3{
    background-image: linear-gradient(180deg,#fec134,#52af50);
    border-color: rgb(220, 220, 220);
    background-color: white;
}
.bg-in-job-4{
    background-image: linear-gradient(180deg,#fec134,#52af50);
    border-color: rgb(220, 220, 220);
    background-color: white;
}
.bg-style-job {
    color: rgb(255, 255, 255);
    font-weight: bold!important;
    text-shadow: 2px 1px 6px #bda8a8;
}
.theme--light.v-card.v-card--outlined {
    border: none;
}
.color-score {
    font-size: 1.4rem;
    font-weight: 900;
    color: white;
}
.search {
    border: 0!important;
    border-radius: 0!important;
    width: 331px;
    box-shadow: none;
}
</style>