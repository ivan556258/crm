<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title> Добавление записи т.о.</v-toolbar-title>
        
        <v-spacer></v-spacer>
          <template>
            <v-btn color="success" class="mb-2" @click="save()">{{formAutoTitle}}</v-btn>
            <v-btn color="primary" class="mb-2 ml-1" @click="save()">{{formDriveTitle}}</v-btn>
          </template>  
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Информация </v-tab>
        <v-tab> Состояние ТС </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
          <v-col cols="12" md="8">
                    <v-menu
                      ref="dateMenu"
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateData"
                          label="Дата"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="datePicker"
                        v-model="dateData"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
        </v-col>
        <v-col cols="12" md="8">
             <v-select 
                        :items="auto" 
                        :item-text="item => item.model +'  '+ item.numberSymbol + '  ' + item.owner"
                        item-value="_id" 
                        v-model="auto" 
                        label="Автомобиль">
                    </v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="typeJob" v-model="typeJob" label="Вид работ"></v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="contragents" 
                        :item-text="item => item.name +'  '+ item.contactPerson"
                        item-value="_id" 
                         v-model="contragent" 
                         label="Контрагент">
             </v-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="autoRun"
            :counter="12"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
           <v-switch v-model="foreginLicenceRegistration" class="ma-2" label="Иностранное свидетельство о регистрации"></v-switch>
        </v-col>
        <v-col cols="12" md="8">
            <v-btn color="primary" @click="addRow" class="mb-2 ml-1" >Запчасти со склада</v-btn>
        </v-col>
        <v-col cols="12" md="8" v-for="(row, index) in parts" v-bind:key="index">
          <v-text-field
            v-model="row.title"
            :counter="100"
            label="Запчасть"
            required
          ></v-text-field>
           <v-text-field
            v-model="row.description"
            :counter="100"
            label="Количество"
            required
          ></v-text-field>
          <a v-on:click="removeElement(index);" style="color: red">Удалить</a>
                  
        </v-col>
        <v-col cols="12" md="8">
            <v-btn color="primary"  @click="addOterRow" class="mb-2 ml-1" >Другие запчасти</v-btn>
        </v-col>
        <v-col cols="12" md="8" v-for="(item, i) in otherPart" v-bind:key="i + 1000">
          <v-text-field
            v-model="item.name"
            :counter="100"
            label="Наименование"
            required
          ></v-text-field>
           <v-text-field
            v-model="item.articale"
            :counter="100"
            label="Артикул"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.howmuch"
            :counter="100"
            label="Количество"
            required
          ></v-text-field>
          <v-text-field
            v-model="item.price"
            :counter="100"
            label="Цена"
            required
          ></v-text-field>
          <a v-on:click="removeOterElement(i);" style="color: red">Удалить</a>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="listJobs"
            :counter="100"
            label="Список работ и их стоимости"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="resultDyagnostic"
            :counter="100"
            label="Результаты диагностики"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="coastSparePart"
            :counter="100"
            label="Стоимость запчастей"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="coastJobs"
            :counter="10"
            label="Стоимость работ"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="statusRes" label="Статус"></v-select>
        </v-col>
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
          <v-container>
             <v-row>

         <v-col cols="12" md="8">
         <v-text-field
            v-model="tyreBrand"
            :counter="100"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="bodyCabineDamage"
            :counter="500"
            label="Повреждения кузова, оптики, ЛКП, элементов экстерьера"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
                <v-toolbar-title>Оценка состояния автомобиля</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="autoCleanliness" label="Чистота кузова"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="overallInteriorCleanliness" label="Общая чистота салона"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateCeling" label="Состояние потолка"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="statestatePassengerSeat" label="Состояние пассажирского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateDriverSeat" label="Состояние водительского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateSeatbelt" label="Состояние ремня безопастности"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateSteeringWheelAndSwitches" label="Состояние рулевого колеса и переключателей"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="statePanel" label="Состояние панели приборов"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateSwitchKPP" label="Состояние переключателя КПП"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="windscreenCondition" label="Состояние лобового стекла"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateLeftwindscreen" label="Состояние остальных стекол"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="trunkCondition" label="Состояние багажника"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="rating" v-model="stateTyre" label="Состояние шин"></v-select>
         </v-col>
               </v-row>
    </v-container>
          </v-card-text>
        </v-card>
        
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
import axios from "axios"
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        parts: [],
        otherPart:[],
        index: null,
        status: ["Ожидание", "Оплачен", "Удален"],
        auto: null,
        typeJob: ["Ремонт", "Диагностика", "ДТП"],
        autoRun: null,
        rating: ["1", "2", "3", "4", "5"],
        listJobs: null,
        contragent: null,
        contragents: null,
        statestatePassengerSeat: null,
        resultDyagnostic: null,
        coastSparePart: null,
        coastJobs: null,
        statusRes: null,
        tyreBrand: null,
        bodyCabineDamage: null,
        autoCleanliness: null,
        overallInteriorCleanliness: null,
        stateCeling: null,
        statePassengerSeat: null,
        stateDriverSeat: null,
        stateSeatbelt: null,
        stateSteeringWheelAndSwitches: null,
        statePanel: null,
        stateSwitchKPP: null,
        windscreenCondition: null,
        stateLeftwindscreen: null,
        trunkCondition: null,
        stateTyre: null,
        foreginLicenceRegistration: false,
        dateMenu: null,
        dateData: null,
        datePicker: new Date().toISOString(),
        dialog: false,
        editedIndex: -1,
      }
    },
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Сохранить и выйти' : 'Редактировать и выйти'
      },
      formAutoTitle () {
        return this.editedIndex === -1 ? 'Сохранить' : 'Редактировать'
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
            url:"http://localhost:8081/selecAutomobileData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.auto = response.data
          })
          .catch(error => {
            console.log(error)
          })

          axios({
            method: "get",
            url:"http://localhost:8081/selectCounteragentData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.contragents = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      addRow() {
            this.parts.push({
                title: "",
                description: "",
              })
            },
      removeElement(index) {
            this.rows.splice(index, 1);
      },
      addOterRow() {
            this.otherPart.push({
                name: "",
                articale: "",
                howmuch: "",
                price: "",
              })
            },
      removeOterElement(index) {
            this.otherPart.splice(index, 1);
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Вы уверены, что хотите удалить ?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      factoryParts(){
        alert()
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          console.log(JSON.stringify(this.rows))
          console.log(this.auto)
        axios({
          method: 'post',
          url: 'http://localhost:8081/insertTechnicalServiceData',
          data: {
              parts: JSON.stringify(this.parts),
              otherPart: JSON.stringify(this.otherPart),
              items: this.items,
              auto: this.auto,
              typeJob: this.typeJob,
              autoRun: this.autoRun,
              listJobs: this.listJobs,
              contragent: this.contragent,
              statestatePassengerSeat: this.statestatePassengerSeat,
              resultDyagnostic: this.resultDyagnostic,
              coastSparePart: this.coastSparePart,
              coastJobs: this.coastJobs,
              statusRes: this.statusRes,
              tyreBrand: this.tyreBrand,
              bodyCabineDamage: this.bodyCabineDamage,
              autoCleanliness: this.autoCleanliness,
              overallInteriorCleanliness: this.overallInteriorCleanliness,
              stateCeling: this.stateCeling,
              statePassengerSeat: this.statePassengerSeat,
              stateDriverSeat: this.stateDriverSeat,
              stateSeatbelt: this.stateSeatbelt,
              stateSteeringWheelAndSwitches: this.stateSteeringWheelAndSwitches,
              statePanel: this.statePanel,
              stateSwitchKPP: this.stateSwitchKPP,
              windscreenCondition: this.windscreenCondition,
              stateLeftwindscreen: this.stateLeftwindscreen,
              trunkCondition: this.trunkCondition,
              stateTyre: this.stateTyre,
              foreginLicenceRegistration: this.foreginLicenceRegistration,
              dateData: this.dateData,
          }
        })
        .then(response => {
            response.data
          })
          .catch(error => {
            console.log(error)
          })
        
        }
        this.close()
      },
    },
  }
</script>