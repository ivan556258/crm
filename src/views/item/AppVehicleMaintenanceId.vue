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
                      ref="editedItem.dateMenu"
                      v-model="editedItem.dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dateData"
                          label="Дата"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.datePicker"
                        v-model="editedItem.dateData"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.auto" label="Автомобиль"></v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.typeJob" label="Вид работ"></v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.contragent" label="Контрагент"></v-select>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.autoRun"
            :counter="12"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
           <v-switch v-model="editedItem.foreginLicenceRegistration" class="ma-2" label="Иностранное свидетельство о регистрации"></v-switch>
        </v-col>
        <v-col cols="12" md="8">
            <v-btn color="primary" class="mb-2 ml-1" >Запчасти со склада</v-btn>
        </v-col>
        <v-col cols="12" md="8">
            <v-btn color="primary" class="mb-2 ml-1" >Другие запчасти</v-btn>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.listJobs"
            :counter="100"
            label="Список работ и их стоимости"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.resultDyagnostic"
            :counter="100"
            label="Результаты диагностики"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.coastSparePart"
            :counter="100"
            label="Стоимость запчастей"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.coastJobs"
            :counter="10"
            label="Стоимость работ"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="editedItem.statusRes" label="Статус"></v-select>
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
            v-model="editedItem.tyreBrand"
            :counter="100"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.bodyCabineDamage"
            :counter="500"
            label="Повреждения кузова, оптики, ЛКП, элементов экстерьера"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
                <v-toolbar-title>Оценка состояния автомобиля</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.autoCleanliness" label="Чистота кузова"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.overallInteriorCleanliness" label="Общая чистота салона"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateCeling" label="Состояние потолка"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.statestatePassengerSeat" label="Состояние пассажирского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateDriverSeat" label="Состояние водительского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateSeatbelt" label="Состояние ремня безопастности"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateSteeringWheelAndSwitches" label="Состояние рулевого колеса и переключателей"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.statePanel" label="Состояние панели приборов"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateSwitchKPP" label="Состояние переключателя КПП"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.windscreenCondition" label="Состояние лобового стекла"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateLeftwindscreen" label="Состояние остальных стекол"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.trunkCondition" label="Состояние багажника"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="editedItem.stateTyre" label="Состояние шин"></v-select>
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
        status: ["Foo", "Bar", "Fizz", "Buzz"],
        editedItem:{
                    auto: null,
                    typeJob: null,
                    autoRun: null,
                    listJobs: null,
                    contragent: null,
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
        },
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
            url:"http://localhost:8081/selectTechnicalServiceDataOne?id="+this.$route.params.id
          })
          .then(response => {
            this.editedItem = response.data
            console.log(response.data);
            
          })
          .catch(error => {
            console.log(error)
          })
      },
      save () {
        axios({
          method: 'post',
          url: 'http://localhost:8081/updateTechnicalServiceData',
          data: {
              auto: this.editedItem.auto,
              typeJob: this.editedItem.typeJob,
              autoRun: this.editedItem.autoRun,
              listJobs: this.editedItem.listJobs,
              contragent: this.editedItem.contragent,
              statestatePassengerSeat: this.editedItem.statestatePassengerSeat,
              resultDyagnostic: this.editedItem.resultDyagnostic,
              coastSparePart: this.editedItem.coastSparePart,
              coastJobs: this.editedItem.coastJobs,
              statusRes: this.editedItem.statusRes,
              tyreBrand: this.editedItem.tyreBrand,
              bodyCabineDamage: this.editedItem.bodyCabineDamage,
              autoCleanliness: this.editedItem.autoCleanliness,
              overallInteriorCleanliness: this.editedItem.overallInteriorCleanliness,
              stateCeling: this.editedItem.stateCeling,
              statePassengerSeat: this.editedItem.statePassengerSeat,
              stateDriverSeat: this.editedItem.stateDriverSeat,
              stateSeatbelt: this.editedItem.stateSeatbelt,
              stateSteeringWheelAndSwitches: this.editedItem.stateSteeringWheelAndSwitches,
              statePanel: this.editedItem.statePanel,
              stateSwitchKPP: this.editedItem.stateSwitchKPP,
              windscreenCondition: this.editedItem.windscreenCondition,
              stateLeftwindscreen: this.editedItem.stateLeftwindscreen,
              trunkCondition: this.editedItem.trunkCondition,
              stateTyre: this.editedItem.stateTyre,
              foreginLicenceRegistration: this.editedItem.foreginLicenceRegistration,
              dateData: this.editedItem.dateData,
              _id: this.$route.params.id,
          }
        })
      },
    },
  }
</script>