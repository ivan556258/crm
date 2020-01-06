<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title> Добавление записи т.о.</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2 ml-1" @click="save()">{{formDriveTitle}}</v-btn>
            <v-btn color="success" class="mb-2" @click="save()">{{formAutoTitle}}</v-btn>
          </template>
          

        </v-dialog>    
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
                          v-model="dateDate"
                          label="Дата"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="datePicker"
                        v-model="dateDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="auto" label="Автомобиль"></v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="typeJob" label="Вид работ"></v-select>
        </v-col>
        <v-col cols="12" md="8">
             <v-select :items="status" v-model="contragent" label="Контрагент"></v-select>
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
            <v-btn color="primary" class="mb-2 ml-1" >Запчасти со склада</v-btn>
        </v-col>
        <v-col cols="12" md="8">
            <v-btn color="primary" class="mb-2 ml-1" >Другие запчасти</v-btn>
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
             <v-select :items="status" v-model="autoCleanliness" label="Чистота кузова"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="overallInteriorCleanliness" label="Общая чистота салона"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateCeling" label="Состояние потолка"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="statestatePassengerSeat" label="Состояние пассажирского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateDriverSeat" label="Состояние водительского сиденья"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateSeatbelt" label="Состояние ремня безопастности"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateSteeringWheelAndSwitches" label="Состояние рулевого колеса и переключателей"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="statePanel" label="Состояние панели приборов"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateSwitchKPP" label="Состояние переключателя КПП"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="windscreenCondition" label="Состояние лобового стекла"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateLeftwindscreen" label="Состояние остальных стекол"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="trunkCondition" label="Состояние багажника"></v-select>
         </v-col>
         <v-col cols="12" md="6">
             <v-select :items="status" v-model="stateTyre" label="Состояние шин"></v-select>
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
import axios from "axios";
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        status: ["Foo", "Bar", "Fizz", "Buzz"],
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
        dateDate: null,
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
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
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
          url: 'http://localhost:8081/insertOwnerData',
          data: {
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
              foreginLicenceRegistration: false,
              datePicker: this.datePicker,
          }
        })
        }
        this.close()
      },
    },
  }
</script>