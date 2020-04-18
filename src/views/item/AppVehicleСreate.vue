<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Редактирование автомобиля</v-toolbar-title>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="success" class="mb-2" @click="save(0)">{{formAutoTitle}}</v-btn>
            <v-btn color="primary" class="mb-2 ml-1" @click="save(1)">{{formDriveTitle}}</v-btn>
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
        <v-tab> Комисии </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="editedItem.brand"
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
            v-model="editedItem.model"
            :counter="100"
            label="Модель"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
        <v-select 
        :items="owner" 
        :item-text="item => item.name"
         v-model="editedItem.owner" 
         label="Владелец"></v-select>
        </v-col>
         <v-col
          cols="12"
          md="8"
        >
        <v-select :items="category" v-model="editedItem.category" label="Категория"></v-select>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="editedItem.autoRun"
            :counter="12"
            label="Пробег"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-menu
                      ref="startOperationMenu"
                      v-model="editedItem.startOperationMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.startOperationDate"
                          label="Начало эксплуатации"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.startOperationPicker"
                        v-model="editedItem.startOperationDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>

        <v-col cols="12" md="8">
          <v-menu
                      ref="editedItem.finishOperationMenu"
                      v-model="editedItem.finishOperationMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.finishOperationDate"
                          label="Окончание эксплуатации"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="finishOperationPicker"
                        v-model="editedItem.finishOperationDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>

        <v-col cols="12" md="8">
            <v-select :items="status" v-model="editedItem.statusRes" label="Статус"></v-select>
        </v-col>

         <v-col cols="12" md="12">
          <v-toolbar-title>ТО и Страховка</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.nameInsuranceCompany"
            :counter="100"
            label="Название страховой компании"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.numberInsuranceCompany"
            :counter="50"
            label="Номер страхового полиса"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="editedItem.periodInsurancePolicyValidityMenu"
                      v-model="editedItem.periodInsurancePolicyValidityMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.periodInsurancePolicyValidityDate"
                          label="Срок действия страхового полиса"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.periodInsurancePolicyValidityPicker"
                        v-model="editedItem.periodInsurancePolicyValidityDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="editedItem.termValidityTOMenu"
                      v-model="editedItem.termValidityTOMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.termValidityTODate"
                          label="Срок окончания действия ТО"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.termValidityTOPicker"
                        v-model="editedItem.termValidityTODate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.oilChangeMileageKm"
            :counter="12"
            label="Пробег замены масла, км"
            required
          ></v-text-field> 
         </v-col>
    


  
         <v-col cols="12" md="12">
          <v-toolbar-title>Оборудование</v-toolbar-title>
         </v-col>
        <v-col cols="12" md="6">
            <v-select :items="tyreType" v-model="editedItem.tyreType" label="Тип шин"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.brandTyre"
            :counter="50"
            label="Марка шин"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.beaconNumber"
            :counter="50"
            label="Номер маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.IMEIbeacon"
            :counter="50"
            label="IMEI маяка"
            required
          ></v-text-field> 
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.additionalEquipment"
            :counter="500"
            label="Дополнительное оборудование"
            required
          ></v-text-field> 
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
          <v-col cols="12" md="12">
                <v-toolbar-title>Паспорт ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.seriaAndNumberOfPTS"
            :counter="50"
            label="Серия и номер ПТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.VIN"
            :counter="50"
            label="VIN"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.nameTypeTS"
            :counter="50"
            label="Наименование, тип ТС"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.categoryTS"
            :counter="50"
            label="Категория ТС"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.yearIssued"
            :counter="4"
            label="Год выпуска"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.modelNumberMotor"
            :counter="100"
            label="Модель, номер двигателя"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.chassisFrame"
            :counter="100"
            label="Шасси (рама)"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.colorCabina"
            :counter="100"
            label="Цвет кузова (кабины, прицепа)"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.enginePower"
            :counter="4"
            label="Мощность двигателя, ЛС/КВт"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.engineWorkingVolume"
            :counter="4"
            label="Рабочий объем двигателя, куб. см"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.motorType"
            :counter="50"
            label="Тип двигателя"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.ecologyClaas"
            :counter="100"
            label="Экологический класс"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
         <v-text-field
            v-model="editedItem.allwedMaxWeight"
            :counter="6"
            label="Разрешенная максимальная масса, кг"
            required
          ></v-text-field> 
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.weightWithoutLoads"
            :counter="6"
            label="Масса без нагрузки, кг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.whoIssuedPTS"
            :counter="50"
            label="Кем выдан ПТС"
            required
          ></v-text-field> 
         </v-col>


          <v-col cols="12" md="12">
                <v-toolbar-title>Свидетельство о регистрации ТС</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch class="ma-2" v-model="editedItem.foreginLicenceRegistration" label="Иностранное свидетельство о регистрации"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.numberSymbol"
            :counter="10"
            label="Ном. знак"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.seriaAndNumberSTS"
            :counter="25"
            label="Серия и номер СТС"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="editedItem.dateIssuedSTSMenu"
                      v-model="editedItem.dateIssuedSTSMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dateIssuedSTDate"
                          label="Дата выдачи СТС"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="editedItem.dateIssuedSTSPicker"
                        v-model="editedItem.dateIssuedSTDate"
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
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
                  <v-container>
                        <v-row>
                                      <v-col cols="12" md="8">
                                      <v-text-field
                                          v-model="editedItem.commissionPerDay"
                                          :counter="16"
                                          label="Коммисия за сутки в рублях"
                                          required
                                      ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="8">
                                      <v-text-field
                                          v-model="editedItem.commissionPerTransacrion"
                                          :counter="16"
                                          label="Коммисия за транзакцию в процентах"
                                          required
                                      ></v-text-field>
                                      </v-col>
                        </v-row>
                  </v-container>
            </template>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
        <div class="bottom-block-success" v-show="ok">
        <v-alert type="success">
          Данные добавлены
        </v-alert>
      </div>
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
            status: [
              "Не выбрана",
              "Cвободный", 
              "Удалённый", 
              "Неактивный", 
              "Обслуживание",
              "В аренде"
              ],
            tyreType: [
              "Всесезонная",
              "Летняя",
              "Зимняя",
              ],
            category: [
              "Не выбрана",
              "Эконом",
              "Комфорт",
              "Комфорт+",
              "Бизнес",
              "VIP",
              "Минивэн",
              "Грузоперевозки",
              "универсал",
              "Микроавтобус",
              "Автобус",
              ],
            owner: [],
            ok: false,
            dialog: false,
            editedIndex: -1,
            editedItem:{
                dateIssuedSTSMenu: null,
                startOperationMenu: null,
                finishOperationMenu: null,
                periodInsurancePolicyValidityMenu: null,
                termValidityTOMenu: null,
                statusRes: null,
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
                startOperationDate: null,
                finishOperationDate: null,
                periodInsurancePolicyValidityDate: null,
                termValidityTODate: null,
                dateIssuedSTDate: null,
                commissionPerDay: null,
                commissionPerTransacrion: null,
                picker: new Date().toISOString(),

            }
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
            url:"http://localhost:8081/selectOwnerData?token="+localStorage.getItem('auth')
          })
          .then(response => {
            this.owner = response.data  
            /* console.log(this.owner);
            this.owner.push({
              _id: "100",
              name: "Таксопарк",
              token: localStorage.getItem('auth')
            })  */  
          })
          .catch(error => {
            console.log(error)
          }) 
      },
      save (id) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          axios({
          method: 'post',
          url: 'http://localhost:8081/insertAutomobileData',
          data: {
            _id: this.$route.params.id,
            statusRes: this.editedItem.statusRes,
            picker: this.editedItem.picker,
            brand: this.editedItem.brand,
            model: this.editedItem.model,
            owner: this.editedItem.owner[0],
            category: this.editedItem.category,
            autoRun: this.editedItem.autoRun,
            nameInsuranceCompany: this.editedItem.nameInsuranceCompany,
            numberInsuranceCompany: this.editedItem.numberInsuranceCompany,
            oilChangeMileageKm: this.editedItem.oilChangeMileageKm,
            tyreType: this.editedItem.tyreType,
            brandTyre: this.editedItem.brandTyre,
            beaconNumber: this.editedItem.beaconNumber,
            IMEIbeacon: this.editedItem.IMEIbeacon,
            additionalEquipment: this.editedItem.additionalEquipment,
            seriaAndNumberOfPTS: this.editedItem.seriaAndNumberOfPTS,
            VIN: this.editedItem.VIN,
            nameTypeTS: this.editedItem.nameTypeTS,
            categoryTS: this.editedItem.categoryTS,
            chassisFrame: this.editedItem.chassisFrame,
            modelNumberMotor: this.editedItem.modelNumberMotor,
            yearIssued: this.editedItem.yearIssued,
            colorCabina: this.editedItem.colorCabina,
            enginePower: this.editedItem.enginePower,
            engineWorkingVolume: this.editedItem.engineWorkingVolume,
            motorType: this.editedItem.motorType,
            ecologyClaas: this.editedItem.ecologyClaas,
            allwedMaxWeight: this.editedItem.allwedMaxWeight,
            weightWithoutLoads: this.editedItem.weightWithoutLoads,
            foreginLicenceRegistration: this.editedItem.foreginLicenceRegistration,
            numberSymbol: this.editedItem.numberSymbol,
            whoIssuedPTS: this.editedItem.whoIssuedPTS,
            seriaAndNumberSTS: this.editedItem.seriaAndNumberSTS,
            startOperationDate: this.editedItem.startOperationDate,
            startOperationPicker: this.editedItem.startOperationPicker,
            finishOperationDate: this.editedItem.finishOperationDate,
            finishOperationPicker: this.editedItem.finishOperationPicker,
            periodInsurancePolicyValidityDate: this.editedItem.periodInsurancePolicyValidityDate,
            periodInsurancePolicyValidityPicker: this.editedItem.periodInsurancePolicyValidityPicker,
            termValidityTODate: this.editedItem.termValidityTODate,
            termValidityTOPicker: this.editedItem.termValidityTOPicker,
            dateIssuedSTDate: this.editedItem.dateIssuedSTDate,
            dateIssuedSTSPicker: this.editedItem.dateIssuedSTSPicker,
            commissionPerDay: new String(this.editedItem.commissionPerDay),
            commissionPerTransacrion: new String(this.editedItem.commissionPerTransacrion),
            token: localStorage.getItem('auth')
          }
        })
        this.ok = true
        setTimeout(()=>{
                    this.ok = false
        }, 2000);
        if(id === 1)
        this.$router.push('/admin/Vehicle/all')
        }
      },
    },
  }
</script>
<style scoped>
.bottom-block-success {
    position: fixed;
    bottom: 5px;
    right: 25px;
}
</style>