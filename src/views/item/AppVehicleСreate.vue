<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление автомобиля</v-toolbar-title>
        
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
        <v-tab> Регистрационные данные </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="brand"
            :counter="100"
            label="Марка"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="model"
            :counter="100"
            label="Модель"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
        <v-select :items="status" v-model="owner" label="Владелец"></v-select>
        </v-col>
         <v-col
          cols="12"
          md="8"
        >
        <v-select :items="status" v-model="category" label="Категория"></v-select>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="autoRun"
            :counter="12"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-menu
                      ref="startOperationMenu"
                      v-model="startOperationMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startOperationDate"
                          label="Начало эксплуатации"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="startOperationPicker"
                        v-model="startOperationDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>

        <v-col cols="12" md="8">
          <v-menu
                      ref="finishOperationMenu"
                      v-model="finishOperationMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="finishOperationDate"
                          label="Окончание эксплуатации"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="finishOperationPicker"
                        v-model="finishOperationDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>

        <v-col cols="12" md="8">
            <v-select :items="status" v-model="statusRes" label="Статус"></v-select>
        </v-col>

         <v-col cols="12" md="12">
          <v-toolbar-title>ТО и Страховка</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="nameInsuranceCompany"
            :counter="100"
            label="Название страховой компании"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="numberInsuranceCompany"
            :counter="50"
            label="Номер страхового полиса"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="periodInsurancePolicyValidityMenu"
                      v-model="periodInsurancePolicyValidityMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="periodInsurancePolicyValidityDate"
                          label="Срок действия страхового полиса"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="periodInsurancePolicyValidityPicker"
                        v-model="periodInsurancePolicyValidityDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="termValidityTOMenu"
                      v-model="termValidityTOMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="termValidityTODate"
                          label="Срок окончания действия ТО"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="termValidityTOPicker"
                        v-model="termValidityTODate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="oilChangeMileageKm"
            :counter="12"
            label="Пробег замены масла, км"
            required
          ></v-text-field> 
         </v-col>
    


  
         <v-col cols="12" md="12">
          <v-toolbar-title>Оборудование</v-toolbar-title>
         </v-col>
        <v-col cols="12" md="6">
            <v-select :items="status" v-model="tyreType" label="Тип шин"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="brandTyre"
            :counter="50"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="beaconNumber"
            :counter="50"
            label="Номер маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="IMEIbeacon"
            :counter="50"
            label="IMEI маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="additionalEquipment"
            :counter="500"
            label="Дополнительное оборудование"
            required
          ></v-text-field> 
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
          <v-container>
             <v-row>
          <v-col cols="12" md="12">
                <v-toolbar-title>Паспорт ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="seriaAndNumberOfPTS"
            :counter="50"
            label="Серия и номер ПТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="VIN"
            :counter="50"
            label="VIN"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="nameTypeTS"
            :counter="50"
            label="Наименование, тип ТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="categoryTS"
            :counter="50"
            label="Категория ТС"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="yearIssued"
            :counter="4"
            label="Год выпуска"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="modelNumberMotor"
            :counter="100"
            label="Модель, номер двигателя"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="chassisFrame"
            :counter="100"
            label="Шасси (рама)"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="colorCabina"
            :counter="100"
            label="Цвет кузова (кабины, прицепа)"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="enginePower"
            :counter="4"
            label="Мощность двигателя, ЛС/КВт"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="engineWorkingVolume"
            :counter="4"
            label="Рабочий объем двигателя, куб. см"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="motorType"
            :counter="50"
            label="Тип двигателя"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="ecologyClaas"
            :counter="100"
            label="Экологический класс"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="allwedMaxWeight"
            :counter="6"
            label="Разрешенная максимальная масса, кг"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="weightWithoutLoads"
            :counter="6"
            label="Масса без нагрузки, кг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="whoIssuedPTS"
            :counter="50"
            label="Кем выдан ПТС"
            required
          ></v-text-field> 
         </v-col>


          <v-col cols="12" md="12">
                <v-toolbar-title>Свидетельство о регистрации ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch class="ma-2" v-model="foreginLicenceRegistration" label="Иностранное свидетельство о регистрации"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="numberSymbol"
            :counter="10"
            label="Ном. знак"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="seriaAndNumberSTS"
            :counter="25"
            label="Серия и номер СТС"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="dateIssuedSTSMenu"
                      v-model="dateIssuedSTSMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateIssuedSTSDate"
                          label="Дата выдачи СТС"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateIssuedSTSPicker"
                        v-model="dateIssuedSTSDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
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
    name: 'AppVehicleCreate',
    data () {
      return {
            tabs: null,
            status: ["Foo", "Bar", "Fizz", "Buzz"],
            statusRes: null,
            dialog: false,
            editedIndex: -1,
            picker: new Date().toISOString(),
            valid: false,
            brand: null,
            model: null,
            owner: null,
            category: null,
            autoRun: null,
            nameInsuranceCompany: null,
            numberInsuranceCompany: null,
            oilChangeMileageKm: null,
            tyreType: null,
            brandTyre: null,
            beaconNumber: null,
            IMEIbeacon: null,
            additionalEquipment: null,
            seriaAndNumberOfPTS: null,
            VIN: null,
            nameTypeTS: null,
            categoryTS: null,
            chassisFrame: null,
            modelNumberMotor: null,
            yearIssued: null,
            colorCabina: null,
            enginePower: null,
            engineWorkingVolume: null,
            motorType: null,
            ecologyClaas: null,
            allwedMaxWeight: null,
            weightWithoutLoads: null,
            foreginLicenceRegistration: false,
            numberSymbol: null,
            whoIssuedPTS: null,
            seriaAndNumberSTS: null,
            startOperationMenu: null,
            startOperationDate: null,
            startOperationPicker: new Date().toISOString(),
            finishOperationMenu: null,
            finishOperationDate: null,
            finishOperationPicker: new Date().toISOString(),
            periodInsurancePolicyValidityMenu: null,
            periodInsurancePolicyValidityDate: null,
            periodInsurancePolicyValidityPicker: new Date().toISOString(),
            termValidityTOMenu: null,
            termValidityTODate: null,
            termValidityTOPicker: new Date().toISOString(),
            dateIssuedSTSMenu: null,
            dateIssuedSTSDate: null,
            dateIssuedSTSPicker: new Date().toISOString(),
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
          console.log(this.termValidityTODate);
          
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertAutomobileData',
          data: {
            statusRes: this.statusRes,
            picker: this.picker,
            brand: this.brand,
            model: this.model,
            owner: this.owner,
            category: this.category,
            autoRun: this.autoRun,
            nameInsuranceCompany: this.nameInsuranceCompany,
            numberInsuranceCompany: this.numberInsuranceCompany,
            oilChangeMileageKm: this.oilChangeMileageKm,
            tyreType: this.tyreType,
            brandTyre: this.brandTyre,
            beaconNumber: this.beaconNumber,
            IMEIbeacon: this.IMEIbeacon,
            additionalEquipment: this.additionalEquipment,
            seriaAndNumberOfPTS: this.seriaAndNumberOfPTS,
            VIN: this.VIN,
            nameTypeTS: this.nameTypeTS,
            categoryTS: this.categoryTS,
            chassisFrame: this.chassisFrame,
            modelNumberMotor: this.modelNumberMotor,
            yearIssued: this.yearIssued,
            colorCabina: this.colorCabina,
            enginePower: this.enginePower,
            engineWorkingVolume: this.engineWorkingVolume,
            motorType: this.motorType,
            ecologyClaas: this.ecologyClaas,
            allwedMaxWeight: this.allwedMaxWeight,
            weightWithoutLoads: this.weightWithoutLoads,
            foreginLicenceRegistration: this.foreginLicenceRegistration,
            numberSymbol: this.numberSymbol,
            whoIssuedPTS: this.whoIssuedPTS,
            seriaAndNumberSTS: this.seriaAndNumberSTS,
            startOperationDate: this.startOperationDate,
            finishOperationDate: this.finishOperationDate,
            periodInsurancePolicyValidityDate: this.periodInsurancePolicyValidityDate,
            termValidityTODate: this.termValidityTODate,
            dateIssuedSTDate: this.dateIssuedSTSDate,
          }
        })
        }
        this.close()
      },
    },
  }
</script>